/* ============================================
   CricBoxd — Live API Layer
   Dual-source: ESPN Cricinfo RSS (zero-config) +
   CricketData.org (optional upgrade)
   ============================================ */

const CricAPI = {

  // ============================================
  // PRIMARY SOURCE: ESPN Cricinfo RSS (zero-config)
  // ============================================
  RSS_URL: 'https://api.rss2json.com/v1/api.json?rss_url=https://static.cricinfo.com/rss/livescores.xml',
  RSS_CACHE_TTL: 30 * 1000, // 30 seconds
  _rssCache: null,
  _rssCacheTime: 0,

  // Fallback sample data shown when rss2json.com is unreachable
  RSS_FALLBACK: [
    {
      id: 'rss_fallback_1',
      team1: 'India', team1Code: 'IND',
      team2: 'Australia', team2Code: 'AUS',
      score1: '287/4', score2: '215/8',
      score1Innings: ['287/4'], score2Innings: ['215/8'],
      battingTeam: 1,
      status: 'live',
      result: 'India 287/4 · Australia 215/8',
      format: 'T20',
      date: new Date().toISOString().substring(0, 10),
      venue: 'Venue TBA',
      tournamentName: 'Sample Data — RSS unavailable',
      communityRating: 0,
      totalLogs: 0,
      tags: [],
      watchLinks: [],
      topScorer: null,
      bestBowler: null,
      potm: null,
      espnLink: null,
      _source: 'fallback'
    },
    {
      id: 'rss_fallback_2',
      team1: 'England', team1Code: 'ENG',
      team2: 'New Zealand', team2Code: 'NZ',
      score1: '—', score2: '—',
      score1Innings: [], score2Innings: [],
      battingTeam: null,
      status: 'upcoming',
      result: 'Match upcoming',
      format: 'ODI',
      date: new Date().toISOString().substring(0, 10),
      venue: 'Venue TBA',
      tournamentName: 'Sample Data — RSS unavailable',
      communityRating: 0,
      totalLogs: 0,
      tags: [],
      watchLinks: [],
      topScorer: null,
      bestBowler: null,
      potm: null,
      espnLink: null,
      _source: 'fallback'
    }
  ],

  /**
   * Fetch live scores from ESPN Cricinfo RSS via rss2json.com.
   * Returns an array of normalized match objects.
   * Caches for 30 seconds. Falls back to sample data on error.
   */
  async fetchLiveScores() {
    // Return from cache if fresh
    if (this._rssCache && (Date.now() - this._rssCacheTime) < this.RSS_CACHE_TTL) {
      return { data: this._rssCache, fromCache: true, error: null, source: 'rss' };
    }

    try {
      const response = await fetch(this.RSS_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = await response.json();

      if (!json || json.status !== 'ok' || !Array.isArray(json.items)) {
        throw new Error('Invalid RSS response');
      }

      const matches = json.items
        .map(item => this.parseRssMatch(item))
        .filter(Boolean);

      this._rssCache = matches;
      this._rssCacheTime = Date.now();

      return { data: matches, fromCache: false, error: null, source: 'rss' };
    } catch (err) {
      // Return fallback data so the app still renders
      return {
        data: this.RSS_FALLBACK,
        fromCache: false,
        error: err.message || 'RSS_FETCH_ERROR',
        source: 'fallback'
      };
    }
  },

  /**
   * Force-invalidate the RSS cache so the next fetchLiveScores() hits the network.
   */
  clearRssCache() {
    this._rssCache = null;
    this._rssCacheTime = 0;
  },

  /**
   * Parse a single rss2json item into a normalized CricBoxd match object.
   *
   * Handles:
   *   "England 161/6 * v New Zealand 159/7"          — live
   *   "Karnataka 293/10 & 186/4 * v J&K 584/10"     — Test multi-innings
   *   "Sri Lanka v Pakistan"                          — upcoming
   *
   * Returns null for unparseable items.
   */
  parseRssMatch(item) {
    if (!item || !item.title) return null;

    // Decode HTML entities (&amp; → &, etc.)
    const raw = this._decodeHtml(item.title);

    // Split on " v " (with spaces on both sides)
    const vIdx = raw.indexOf(' v ');
    if (vIdx === -1) return null;

    const part1 = raw.substring(0, vIdx).trim();   // team1 side
    const part2 = raw.substring(vIdx + 3).trim();  // team2 side

    // --- Parse each side: extract team name, innings scores, batting marker ---
    const side1 = this._parseSide(part1);
    const side2 = this._parseSide(part2);

    if (!side1 || !side2) return null;

    // Determine batting team (1 or 2 or null)
    let battingTeam = null;
    if (side1.isBatting) battingTeam = 1;
    else if (side2.isBatting) battingTeam = 2;

    // Status: if either side has scores → live; else upcoming
    const hasScores = side1.innings.length > 0 || side2.innings.length > 0;
    const status = hasScores ? 'live' : 'upcoming';

    // Score strings for display (latest innings only, or all innings joined with " & ")
    const score1 = side1.innings.length > 0 ? side1.innings.join(' & ') : '—';
    const score2 = side2.innings.length > 0 ? side2.innings.join(' & ') : '—';

    // Extract match ID and build ESPN link
    let matchId = null;
    let espnLink = null;
    if (item.link) {
      const m = item.link.match(/\/match\/(\d+)/);
      if (m) {
        matchId = m[1];
        espnLink = `https://www.espncricinfo.com/ci/engine/match/${matchId}.html`;
      } else {
        // Fallback: grab number before .html in any form
        const m2 = item.link.match(/(\d{6,})/);
        if (m2) {
          matchId = m2[1];
          espnLink = `https://www.espncricinfo.com/ci/engine/match/${matchId}.html`;
        }
      }
    }
    if (!espnLink && item.guid) {
      const m3 = item.guid.match(/\/(\d{6,})\./);
      if (m3) {
        matchId = m3[1];
        espnLink = `https://www.espncricinfo.com/ci/engine/match/${matchId}.html`;
      }
    }

    const id = matchId ? `rss_${matchId}` : `rss_${Math.random().toString(36).slice(2)}`;

    // Build a human-readable result string
    let result;
    if (status === 'upcoming') {
      result = 'Match upcoming';
    } else if (battingTeam === 1) {
      result = `${side1.teamName} batting`;
    } else if (battingTeam === 2) {
      result = `${side2.teamName} batting`;
    } else {
      result = 'In progress';
    }

    return {
      id,
      team1: side1.teamName,
      team1Code: this._teamCode(side1.teamName),
      team2: side2.teamName,
      team2Code: this._teamCode(side2.teamName),
      score1,
      score2,
      // Keep individual innings arrays for potential future use
      score1Innings: side1.innings,
      score2Innings: side2.innings,
      battingTeam,
      status,
      result,
      format: this._guessFormat(side1.innings, side2.innings),
      date: new Date().toISOString().substring(0, 10),
      venue: 'Venue TBA',
      tournamentName: '',
      espnLink,
      matchId,
      // Community fields — no data yet for live matches
      communityRating: 0,
      totalLogs: 0,
      tags: [],
      watchLinks: espnLink ? [espnLink] : [],
      topScorer: null,
      bestBowler: null,
      potm: null,
      _source: 'rss',
      _raw: item
    };
  },

  /**
   * Parse one side of a score string, e.g.:
   *   "England 161/6 *"          → { teamName: "England", innings: ["161/6"], isBatting: true }
   *   "Karnataka 293/10 & 186/4 *" → { teamName: "Karnataka", innings: ["293/10","186/4"], isBatting: true }
   *   "Sri Lanka"                 → { teamName: "Sri Lanka", innings: [], isBatting: false }
   */
  _parseSide(str) {
    if (!str) return null;

    const isBatting = str.includes('*');
    // Remove the batting marker
    let s = str.replace(/\*/g, '').trim();

    // A score token looks like: digits/digits (e.g. "293/10", "161/6")
    // We'll split by " & " after extracting the team name prefix

    // Strategy: walk right-to-left, collect score tokens separated by " & "
    // Everything before the first score token is the team name

    // Split on " & " to separate potential multi-innings
    const parts = s.split(/\s*&\s*/);

    const innings = [];
    let teamParts = [];

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i].trim();
      if (i === 0) {
        // First part may be "TeamName 293/10" or just "TeamName"
        const scoreMatch = p.match(/^(.*?)\s+(\d+\/\d+)\s*$/);
        if (scoreMatch) {
          teamParts.push(scoreMatch[1].trim());
          innings.push(scoreMatch[2]);
        } else {
          // No score in this part — the entire string is the team name
          teamParts.push(p);
        }
      } else {
        // Subsequent parts after "&" should be pure scores like "186/4"
        const pureScore = p.match(/^(\d+\/\d+)$/);
        if (pureScore) {
          innings.push(pureScore[1]);
        } else {
          // Could be "TeamName score" if the team name contains & — handle gracefully
          const scoreMatch = p.match(/^(.*?)\s+(\d+\/\d+)\s*$/);
          if (scoreMatch) {
            innings.push(scoreMatch[2]);
          }
        }
      }
    }

    const teamName = teamParts.join(' & ').trim();
    if (!teamName) return null;

    return { teamName, innings, isBatting };
  },

  /**
   * Decode common HTML entities in a string.
   */
  _decodeHtml(str) {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
  },

  /**
   * Guess format from innings scores.
   * Tests have multiple innings with high scores; T20s rarely exceed ~250;
   * ODIs cap at 50 overs.  We can't be certain from RSS, so default to 'LIVE'.
   */
  _guessFormat(innings1, innings2) {
    const allInnings = [...innings1, ...innings2];
    if (allInnings.length >= 3) return 'Test'; // multi-innings strongly implies Test
    // Check for >300 in any innings — likely Test/ODI
    const hasHighScore = allInnings.some(score => {
      const runs = parseInt(score.split('/')[0], 10);
      return runs > 300;
    });
    if (hasHighScore) return 'Test';
    return 'T20'; // Default: most live matches are T20
  },

  // ============================================
  // SECONDARY SOURCE: CricketData.org (optional)
  // ============================================
  apiKey: null,
  cache: new Map(),
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  BASE_URL: 'https://api.cricapi.com/v1',

  // ---- Key management ----

  setApiKey(key) {
    this.apiKey = key ? key.trim() : null;
  },

  isConfigured() {
    return !!this.apiKey;
  },

  // ---- Cached fetch wrapper ----

  async fetchEndpoint(endpoint, params = {}) {
    if (!this.apiKey) {
      return { data: null, fromCache: false, error: 'NO_API_KEY' };
    }

    const queryParams = new URLSearchParams({ apikey: this.apiKey, ...params });
    const url = `${this.BASE_URL}/${endpoint}?${queryParams.toString()}`;
    const cacheKey = url;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return { data: cached.data, fromCache: true, error: null };
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return { data: null, fromCache: false, error: 'INVALID_KEY' };
        }
        if (response.status === 429) {
          return { data: null, fromCache: false, error: 'RATE_LIMIT' };
        }
        return { data: null, fromCache: false, error: `HTTP_${response.status}` };
      }

      const json = await response.json();

      if (json.status === 'failure') {
        if (json.reason && json.reason.toLowerCase().includes('api')) {
          return { data: null, fromCache: false, error: 'INVALID_KEY' };
        }
        return { data: null, fromCache: false, error: json.reason || 'API_ERROR' };
      }

      const result = json.data || [];
      this.cache.set(cacheKey, { data: result, timestamp: Date.now() });

      return { data: result, fromCache: false, error: null };
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        return { data: null, fromCache: false, error: 'NETWORK_ERROR' };
      }
      return { data: null, fromCache: false, error: 'FETCH_ERROR' };
    }
  },

  // ---- Clear CricketData.org cache ----

  clearCache() {
    this.cache.clear();
  },

  // ---- API endpoints ----

  async getCurrentMatches() {
    const result = await this.fetchEndpoint('currentMatches', { offset: 0 });
    if (result.error || !result.data) return result;
    return {
      ...result,
      data: Array.isArray(result.data)
        ? result.data.map(m => this.normalizeMatch(m, 'live'))
        : []
    };
  },

  async getMatches(offset = 0) {
    const result = await this.fetchEndpoint('matches', { offset });
    if (result.error || !result.data) return result;
    return {
      ...result,
      data: Array.isArray(result.data)
        ? result.data.map(m => this.normalizeMatch(m))
        : []
    };
  },

  async getMatchInfo(matchId) {
    const result = await this.fetchEndpoint('match_info', { id: matchId });
    if (result.error || !result.data) return result;
    const match = Array.isArray(result.data) ? result.data[0] : result.data;
    return {
      ...result,
      data: match ? this.normalizeMatch(match) : null
    };
  },

  async getSeries(offset = 0) {
    return this.fetchEndpoint('series', { offset });
  },

  // ---- Normalize CricketData.org match → CricBoxd format ----

  normalizeMatch(apiMatch, forceStatus) {
    if (!apiMatch) return null;

    const teams = Array.isArray(apiMatch.teams) ? apiMatch.teams : [];
    const teamInfo = Array.isArray(apiMatch.teamInfo) ? apiMatch.teamInfo : [];

    const team1Name = teams[0] || teamInfo[0]?.name || 'Team A';
    const team2Name = teams[1] || teamInfo[1]?.name || 'Team B';

    const scoreArr = Array.isArray(apiMatch.score) ? apiMatch.score : [];
    const score1Obj = scoreArr[0];
    const score2Obj = scoreArr[1];

    const formatScore = (s) => {
      if (!s) return 'N/A';
      const runs = s.r != null ? s.r : '';
      const wkts = s.w != null ? `/${s.w}` : '';
      const overs = s.o != null ? ` (${s.o})` : '';
      return runs !== '' ? `${runs}${wkts}${overs}` : 'N/A';
    };

    const rawStatus = (apiMatch.status || '').toLowerCase();
    const matchType = (apiMatch.matchType || apiMatch.matchtype || '').toUpperCase();

    let status = forceStatus || 'completed';
    if (!forceStatus) {
      if (rawStatus.includes('live') || rawStatus.includes('in progress') || rawStatus.includes('ongoing')) {
        status = 'live';
      } else if (
        rawStatus.includes('yet to begin') ||
        rawStatus.includes('upcoming') ||
        rawStatus.includes('scheduled') ||
        rawStatus === ''
      ) {
        status = 'upcoming';
      } else {
        status = 'completed';
      }
    }

    let format = 'T20';
    const mt = matchType.toLowerCase();
    if (mt.includes('test')) format = 'Test';
    else if (mt.includes('odi') || mt.includes('loi')) format = 'ODI';
    else if (mt.includes('t20') || mt.includes('twenty')) format = 'T20';

    let result = apiMatch.status || '';
    if (status === 'upcoming') result = 'Match upcoming';
    if (status === 'live') result = apiMatch.status || 'Match in progress';

    const rawDate = apiMatch.dateTimeGMT || apiMatch.date || '';
    let dateStr = '';
    if (rawDate) {
      try { dateStr = rawDate.substring(0, 10); } catch (e) { dateStr = ''; }
    }

    const id = `api_${apiMatch.id || apiMatch.matchId || Math.random().toString(36).slice(2)}`;

    return {
      id,
      _apiId: apiMatch.id || apiMatch.matchId || null,
      team1: team1Name,
      team2: team2Name,
      team1Code: this._teamCode(team1Name),
      team2Code: this._teamCode(team2Name),
      score1: formatScore(score1Obj),
      score2: formatScore(score2Obj),
      result,
      date: dateStr || new Date().toISOString().substring(0, 10),
      venue: apiMatch.venue || 'Venue TBA',
      format,
      tournament: apiMatch.series_id || apiMatch.seriesId || '',
      tournamentName: apiMatch.series || apiMatch.seriesName || apiMatch.name || '',
      status,
      communityRating: 0,
      totalLogs: 0,
      tags: [],
      watchLinks: [],
      topScorer: null,
      bestBowler: null,
      potm: null,
      espnLink: null,
      _source: 'cricketdata',
      _raw: apiMatch
    };
  },

  // ---- Helper: derive a short team code ----

  _teamCode(name) {
    if (!name) return '???';
    const upper = name.toUpperCase();
    const knownMap = {
      'INDIA': 'IND', 'AUSTRALIA': 'AUS', 'ENGLAND': 'ENG',
      'PAKISTAN': 'PAK', 'NEW ZEALAND': 'NZ', 'SOUTH AFRICA': 'SA',
      'SRI LANKA': 'SL', 'WEST INDIES': 'WI', 'BANGLADESH': 'BAN',
      'AFGHANISTAN': 'AFG', 'ZIMBABWE': 'ZIM', 'IRELAND': 'IRE',
      'SCOTLAND': 'SCO', 'UAE': 'UAE', 'NAMIBIA': 'NAM',
      'NEPAL': 'NEP', 'OMAN': 'OMA', 'USA': 'USA',
      'HONG KONG': 'HK', 'KUWAIT': 'KUW', 'KENYA': 'KEN',
      'INDONESIA': 'IDN', 'SINGAPORE': 'SIN', 'MALAYSIA': 'MAS',
      'CHENNAI SUPER KINGS': 'CSK', 'MUMBAI INDIANS': 'MI',
      'ROYAL CHALLENGERS BENGALURU': 'RCB', 'ROYAL CHALLENGERS BANGALORE': 'RCB',
      'KOLKATA KNIGHT RIDERS': 'KKR', 'SUNRISERS HYDERABAD': 'SRH',
      'DELHI CAPITALS': 'DC', 'RAJASTHAN ROYALS': 'RR',
      'PUNJAB KINGS': 'PBKS', 'GUJARAT TITANS': 'GT',
      'LUCKNOW SUPER GIANTS': 'LSG'
    };
    if (knownMap[upper]) return knownMap[upper];
    const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 3).toUpperCase();
    if (words.length === 2) return (words[0][0] + words[1].substring(0, 2)).toUpperCase();
    return words.map(w => w[0]).join('').substring(0, 3).toUpperCase();
  },

  // ---- Error message helpers ----

  getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'NO_API_KEY':    return 'No API key configured.';
      case 'INVALID_KEY':   return 'Invalid API key. Please check your key.';
      case 'RATE_LIMIT':    return 'API rate limit reached (100 hits/day on free tier).';
      case 'NETWORK_ERROR': return 'Network error — check your internet connection.';
      default:              return `API error: ${errorCode}`;
    }
  }
};
