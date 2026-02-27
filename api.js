/* ============================================
   CricBoxd — Live API Layer
   CricketData.org (api.cricapi.com) Integration
   ============================================ */

const CricAPI = {
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

  // ---- Clear cache (force refresh) ----

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

  // ---- Normalize API match to CricBoxd format ----

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
      _raw: apiMatch
    };
  },

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