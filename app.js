/* ============================================
   CricBoxd — Main Application
   Router, Components, Interactions
   ============================================ */

// ============================================
// APP STATE
// ============================================
const AppState = {
  currentPage: 'home',
  spoilerShield: false,
  filters: {
    format: 'All',
    tournament: 'All',
    team: 'All',
    year: 'All',
    sort: 'rating'
  },
  diaryFilters: {
    format: 'All',
    team: 'All',
    rating: 'All'
  },
  // In-memory diary (extends the sample data)
  userDiary: [...DIARY_ENTRIES],
  likedReviews: new Set()
};

// ============================================
// ROUTER
// ============================================
const Router = {
  init() {
    window.addEventListener('hashchange', () => this.route());
    this.route();
  },

  route() {
    const hash = window.location.hash.slice(1) || 'home';
    const page = hash.split('/')[0];
    AppState.currentPage = page;
    this.render(page);
    this.updateNavActive(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  render(page) {
    const app = document.getElementById('app');
    switch (page) {
      case 'home':    app.innerHTML = Pages.home(); break;
      case 'matches': app.innerHTML = Pages.matches(); break;
      case 'diary':   app.innerHTML = Pages.diary(); break;
      case 'profile': app.innerHTML = Pages.profile(); break;
      case 'lists':   app.innerHTML = Pages.lists(); break;
      default:        app.innerHTML = Pages.home(); break;
    }
    // Add page enter animation
    app.firstElementChild?.classList.add('page-enter');
    // Initialize page-specific behavior
    this.initPage(page);
    // Observe scroll animations
    observeScrollAnimations();
  },

  updateNavActive(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });
  },

  initPage(page) {
    switch (page) {
      case 'matches': initMatchesPage(); break;
      case 'diary':   initDiaryPage(); break;
      case 'profile': initProfilePage(); break;
      case 'lists':   initListsPage(); break;
    }
  }
};

// ============================================
// COMPONENT: Stump Rating Display
// ============================================
function renderStumpRating(rating, size = 'sm') {
  if (size === 'sm') {
    let html = '<span class="stump-rating-sm">';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        html += '<span class="stump-pip filled"></span>';
      } else if (i - 0.5 <= rating) {
        html += '<span class="stump-pip half"></span>';
      } else {
        html += '<span class="stump-pip"></span>';
      }
    }
    html += '</span>';
    if (rating > 0) {
      html += `<span class="rating-number">${rating.toFixed(1)}</span>`;
    }
    return html;
  }
  
  // Large display version
  let html = '<span class="stump-rating">';
  for (let i = 1; i <= 5; i++) {
    const cls = i <= Math.floor(rating) ? 'filled' : (i - 0.5 <= rating ? 'half' : 'empty');
    html += `<span class="stump-unit ${cls}">
      <svg viewBox="0 0 12 28"><rect x="3" y="0" width="6" height="28" rx="3" fill="currentColor"/></svg>
    </span>`;
  }
  html += '</span>';
  return html;
}

// ============================================
// COMPONENT: Interactive Stump Rating Input
// ============================================
function renderStumpRatingInput(currentRating = 0) {
  let html = `<div class="stump-rating-input ${currentRating > 0 ? 'active' : ''}" data-rating="${currentRating}">`;
  html += '<div class="bail-top"></div>';
  for (let i = 1; i <= 5; i++) {
    const cls = i <= currentRating ? 'filled' : '';
    html += `<div class="stump-clickable ${cls}" data-value="${i}">
      <div class="stump-wood"></div>
    </div>`;
  }
  html += `<span class="rating-number" style="margin-left:12px;font-size:1.1rem">${currentRating > 0 ? currentRating.toFixed(1) : '—'}</span>`;
  html += '</div>';
  return html;
}

// ============================================
// COMPONENT: Match Card
// ============================================
function renderMatchCard(match) {
  const team1 = getTeam(match.team1);
  const team2 = getTeam(match.team2);
  const tournament = getTournament(match.tournament);

  return `
    <div class="match-card" data-match-id="${match.id}" onclick="openMatchDetail('${match.id}')">
      <div class="match-card-header">
        <span class="format-badge ${match.format.toLowerCase()}">${match.format}</span>
        <span class="match-card-date">${formatDate(match.date)}</span>
      </div>
      <div class="match-card-teams">
        <div class="match-card-team">
          <span class="team-name">
            <span class="team-flag" style="color:${team1.color}">${team1.short}</span>
            ${team1.name}
          </span>
          <span class="team-score">${match.score1}</span>
        </div>
        <div class="match-card-team">
          <span class="team-name">
            <span class="team-flag" style="color:${team2.color}">${team2.short}</span>
            ${team2.name}
          </span>
          <span class="team-score">${match.score2}</span>
        </div>
      </div>
      <div class="match-card-result">${match.result}</div>
      <div class="match-card-footer">
        <div class="match-card-rating">
          ${renderStumpRating(match.communityRating)}
        </div>
        <span class="match-card-logs">${match.totalLogs.toLocaleString()} logs</span>
      </div>
    </div>
  `;
}

// ============================================
// COMPONENT: Format Badge
// ============================================
function renderFormatBadge(format) {
  return `<span class="format-badge ${format.toLowerCase()}">${format}</span>`;
}

// ============================================
// PAGES
// ============================================
const Pages = {

  // ========== HOME PAGE ==========
  home() {
    // Top rated matches for trending
    const trending = sortMatches(MATCHES, 'rating').slice(0, 6);
    const recentActivity = ACTIVITY_FEED.slice(0, 8);

    return `
      <div class="home-page">
        <!-- HERO -->
        <section class="hero">
          <div class="container">
            <div class="hero-badge">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <rect x="3" y="1" width="2" height="14" rx="1" fill="var(--amber)"/>
                <rect x="7" y="1" width="2" height="14" rx="1" fill="var(--amber)"/>
                <rect x="11" y="1" width="2" height="14" rx="1" fill="var(--amber)"/>
              </svg>
              The Letterboxd for Cricket
            </div>
            <h1>Your <span class="accent">Cricket</span> Diary</h1>
            <p class="hero-subtitle">Every match tells a story. Log yours. Rate matches, write reviews, build your diary, and discover the greatest games ever played.</p>
            <div class="hero-actions">
              <a href="#matches" class="btn btn-primary">Browse Matches</a>
              <a href="#diary" class="btn btn-secondary">View Your Diary</a>
            </div>
          </div>
        </section>

        <!-- TRENDING MATCHES -->
        <section class="section trending-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Trending This Week</h2>
              <a href="#matches" class="btn btn-ghost btn-sm">See all matches →</a>
            </div>
            <div class="matches-grid stagger-children fade-in-up">
              ${trending.map(m => renderMatchCard(m)).join('')}
            </div>
          </div>
        </section>

        <!-- STUMP DIVIDER -->
        <div class="stump-divider">
          <span class="stump"></span>
          <span class="stump"></span>
          <span class="stump"></span>
        </div>

        <!-- RECENTLY LOGGED / ACTIVITY -->
        <section class="section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Community Activity</h2>
            </div>
            <div class="activity-feed fade-in-up">
              ${recentActivity.map(a => this.renderActivityItem(a)).join('')}
            </div>
          </div>
        </section>

        <!-- STUMP DIVIDER -->
        <div class="stump-divider">
          <span class="stump"></span>
          <span class="stump"></span>
          <span class="stump"></span>
        </div>

        <!-- POPULAR LISTS TEASER -->
        <section class="section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Popular Lists</h2>
              <a href="#lists" class="btn btn-ghost btn-sm">All lists →</a>
            </div>
            <div class="lists-grid stagger-children fade-in-up">
              ${LISTS.slice(0, 4).map(l => this.renderListCard(l)).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  // ========== MATCHES PAGE ==========
  matches() {
    const allTeamCodes = [...new Set(MATCHES.flatMap(m => [m.team1, m.team2]))].sort();
    const years = [...new Set(MATCHES.map(m => m.date.substring(0, 4)))].sort().reverse();

    return `
      <div class="matches-page">
        <section class="section" style="padding-top:var(--space-2xl)">
          <div class="container">
            <h1 class="section-title" style="margin-bottom:var(--space-xl)">Matches</h1>
            
            <!-- FILTERS -->
            <div class="filters-bar" id="matches-filters">
              <div class="filter-group">
                <span class="filter-label">Format</span>
                <button class="filter-btn active" data-filter="format" data-value="All">All</button>
                <button class="filter-btn" data-filter="format" data-value="Test">Test</button>
                <button class="filter-btn" data-filter="format" data-value="ODI">ODI</button>
                <button class="filter-btn" data-filter="format" data-value="T20">T20</button>
              </div>
              <div class="filter-group">
                <span class="filter-label">Tournament</span>
                <select class="filter-select" data-filter="tournament">
                  <option value="All">All Tournaments</option>
                  ${TOURNAMENTS.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                </select>
              </div>
              <div class="filter-group">
                <span class="filter-label">Team</span>
                <select class="filter-select" data-filter="team">
                  <option value="All">All Teams</option>
                  ${allTeamCodes.map(c => `<option value="${c}">${getTeam(c).name}</option>`).join('')}
                </select>
              </div>
              <div class="filter-group sort-select">
                <span class="filter-label">Sort</span>
                <select class="filter-select" data-sort="true">
                  <option value="rating">Top Rated</option>
                  <option value="logs">Most Logged</option>
                  <option value="date">Most Recent</option>
                </select>
              </div>
            </div>

            <!-- MATCHES GRID -->
            <div class="matches-grid stagger-children" id="matches-grid">
              ${sortMatches(MATCHES, 'rating').map(m => renderMatchCard(m)).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  // ========== DIARY PAGE ==========
  diary() {
    return `
      <div class="diary-page">
        <section class="section" style="padding-top:var(--space-2xl)">
          <div class="container">
            <div class="section-header">
              <h1 class="section-title">Your Diary</h1>
              <button class="btn btn-primary btn-sm" onclick="openLogModal()">+ Log a Match</button>
            </div>

            <!-- DIARY FILTERS -->
            <div class="filters-bar" id="diary-filters">
              <div class="filter-group">
                <span class="filter-label">Format</span>
                <button class="filter-btn active" data-filter="format" data-value="All">All</button>
                <button class="filter-btn" data-filter="format" data-value="Test">Test</button>
                <button class="filter-btn" data-filter="format" data-value="ODI">ODI</button>
                <button class="filter-btn" data-filter="format" data-value="T20">T20</button>
              </div>
            </div>

            <div class="diary-layout">
              <!-- ENTRIES -->
              <div class="diary-entries" id="diary-entries">
                ${this.renderDiaryEntries(AppState.userDiary)}
              </div>

              <!-- SIDEBAR STATS -->
              <div class="diary-sidebar">
                <div class="sidebar-card">
                  <h3 class="sidebar-card-title">Your Stats</h3>
                  <div class="stat-row">
                    <span class="stat-label">Matches Logged</span>
                    <span class="stat-value">${AppState.userDiary.length}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Hours Watched</span>
                    <span class="stat-value">${Math.round(AppState.userDiary.length * 3.2)}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Avg Rating</span>
                    <span class="stat-value">${(AppState.userDiary.reduce((s, e) => s + e.rating, 0) / AppState.userDiary.length).toFixed(1)}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">This Month</span>
                    <span class="stat-value">${AppState.userDiary.filter(e => e.dateWatched.startsWith('2026-02')).length}</span>
                  </div>
                </div>

                <div class="sidebar-card">
                  <h3 class="sidebar-card-title">Format Breakdown</h3>
                  <div class="chart-container">
                    <canvas id="format-chart"></canvas>
                  </div>
                </div>

                <div class="sidebar-card">
                  <h3 class="sidebar-card-title">Top Teams Watched</h3>
                  ${this.renderTopTeams()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  // ========== PROFILE PAGE ==========
  profile() {
    const user = CURRENT_USER;
    const favMatches = user.favoriteMatches.map(id => getMatch(id)).filter(Boolean);

    return `
      <div class="profile-page">
        <section class="section" style="padding-top:var(--space-2xl)">
          <div class="container">
            <!-- PROFILE HEADER -->
            <div class="profile-header fade-in-up">
              <div class="profile-avatar-large">${user.avatar}</div>
              <div class="profile-info">
                <h1>${user.displayName}</h1>
                <p class="profile-handle">@${user.username}</p>
                <p class="profile-bio">${user.bio}</p>
                <div class="profile-stats-row">
                  <div class="profile-stat">
                    <div class="profile-stat-value">${user.matchesLogged}</div>
                    <div class="profile-stat-label">Matches</div>
                  </div>
                  <div class="profile-stat">
                    <div class="profile-stat-value">${user.reviewsWritten}</div>
                    <div class="profile-stat-label">Reviews</div>
                  </div>
                  <div class="profile-stat">
                    <div class="profile-stat-value">${user.hoursWatched}</div>
                    <div class="profile-stat-label">Hours</div>
                  </div>
                  <div class="profile-stat">
                    <div class="profile-stat-value">${user.favoriteFormat}</div>
                    <div class="profile-stat-label">Fav Format</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TEAMS SUPPORTED -->
            <div class="mb-xl fade-in-up">
              <h3 class="section-title" style="font-size:1.25rem">Teams Supported</h3>
              <div class="flex gap-sm flex-wrap" style="margin-top:var(--space-md)">
                ${user.teamsSupported.map(code => {
                  const team = getTeam(code);
                  return `<span class="format-badge" style="background:${team.color};font-size:0.85rem;padding:6px 16px">${team.name}</span>`;
                }).join('')}
              </div>
            </div>

            <!-- FOUR FAVORITES -->
            <div class="favorites-section fade-in-up">
              <h3 class="section-title" style="font-size:1.25rem">Four Favorite Matches</h3>
              <div class="favorites-grid" style="margin-top:var(--space-md)">
                ${favMatches.map((m, i) => `
                  <div class="favorite-card" onclick="openMatchDetail('${m.id}')">
                    <span class="favorite-num">${i + 1}</span>
                    <div class="favorite-teams">${getTeam(m.team1).short} vs ${getTeam(m.team2).short}</div>
                    <div class="favorite-event">${getTournament(m.tournament)?.name || ''}</div>
                    <div class="mt-sm">${renderStumpRating(m.communityRating)}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- BADGES -->
            <div class="badges-section fade-in-up">
              <h3 class="section-title" style="font-size:1.25rem">Badges</h3>
              <div class="badges-grid" style="margin-top:var(--space-md)">
                ${Object.entries(BADGES).map(([key, badge]) => {
                  const earned = user.badges.includes(key);
                  return `
                    <div class="badge-card ${earned ? 'earned' : ''}">
                      <div class="badge-icon">${badge.icon}</div>
                      <div>
                        <div class="badge-name">${badge.name}</div>
                        <div class="badge-desc">${badge.desc}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- RECENT DIARY -->
            <div class="fade-in-up">
              <div class="section-header">
                <h3 class="section-title" style="font-size:1.25rem">Recent Diary Entries</h3>
                <a href="#diary" class="btn btn-ghost btn-sm">Full diary →</a>
              </div>
              <div class="diary-entries" style="margin-top:var(--space-md)">
                ${this.renderDiaryEntries(AppState.userDiary.slice(0, 6))}
              </div>
            </div>

            <div class="seam-line"></div>

            <!-- LISTS CREATED -->
            <div class="fade-in-up">
              <h3 class="section-title" style="font-size:1.25rem">Lists Created</h3>
              <div class="lists-grid" style="margin-top:var(--space-md)">
                ${LISTS.filter(l => l.creator === user.id).map(l => this.renderListCard(l)).join('')}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  // ========== LISTS PAGE ==========
  lists() {
    return `
      <div class="lists-page">
        <section class="section" style="padding-top:var(--space-2xl)">
          <div class="container">
            <div class="section-header">
              <h1 class="section-title">Lists</h1>
              <button class="btn btn-primary btn-sm" onclick="showToast('List creation coming soon!', 'warning')">+ Create a List</button>
            </div>
            <p class="text-secondary mb-xl">Community-curated collections of the best cricket matches.</p>
            <div class="lists-grid stagger-children fade-in-up" id="lists-grid">
              ${LISTS.map(l => this.renderListCard(l)).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  // ========== SHARED COMPONENTS ==========

  renderActivityItem(activity) {
    const user = getUser(activity.userId);
    if (!user) return '';

    if (activity.action === 'created_list') {
      const list = LISTS.find(l => l.id === activity.listId);
      return `
        <div class="activity-item">
          <div class="activity-avatar">${user.avatar}</div>
          <div class="activity-content">
            <div class="activity-action">
              <span class="activity-user">${user.username}</span> created a new list:
              <span class="activity-match">"${list?.title || 'Unknown List'}"</span>
            </div>
            <div class="activity-time">${activity.time}</div>
          </div>
        </div>
      `;
    }

    const match = getMatch(activity.matchId);
    if (!match) return '';
    const team1 = getTeam(match.team1);
    const team2 = getTeam(match.team2);

    const actionText = activity.action === 'logged' ? 'logged' : 'reviewed';
    const ratingHtml = activity.rating ? renderStumpRating(activity.rating) : '';

    return `
      <div class="activity-item">
        <div class="activity-avatar">${user.avatar}</div>
        <div class="activity-content">
          <div class="activity-action">
            <span class="activity-user">${user.username}</span> ${actionText}
            <span class="activity-match">${team1.name} vs ${team2.name}</span>
            ${ratingHtml}
          </div>
          ${activity.review ? `<div class="activity-review">"${activity.review}"</div>` : ''}
          <div class="activity-time">${activity.time}</div>
        </div>
      </div>
    `;
  },

  renderListCard(list) {
    const creator = getUser(list.creator);
    const previewMatches = list.matchIds.slice(0, 4).map(id => getMatch(id)).filter(Boolean);

    return `
      <div class="list-card" onclick="openListDetail('${list.id}')">
        <div class="list-card-preview">
          ${previewMatches.map(m => `
            <div class="list-preview-item">
              ${getTeam(m.team1).short}<br>vs<br>${getTeam(m.team2).short}
            </div>
          `).join('')}
          ${list.matchIds.length > 4 ? `<div class="list-preview-item">+${list.matchIds.length - 4} more</div>` : ''}
        </div>
        <div class="list-card-body">
          <h3 class="list-card-title">${list.title}</h3>
          <div class="list-card-meta">
            <span class="list-card-author">${creator?.username || 'Unknown'}</span>
            <span>${list.matchIds.length} matches</span>
            <span>♥ ${list.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  },

  renderDiaryEntries(entries) {
    // Sort entries by dateWatched descending
    const sorted = [...entries].sort((a, b) => new Date(b.dateWatched) - new Date(a.dateWatched));
    
    let html = '';
    let currentMonth = '';

    sorted.forEach(entry => {
      const match = getMatch(entry.matchId);
      if (!match) return;

      const monthYear = getMonthYear(entry.dateWatched);
      if (monthYear !== currentMonth) {
        currentMonth = monthYear;
        html += `<div class="diary-month-header">${monthYear}</div>`;
      }

      const dateObj = new Date(entry.dateWatched + 'T00:00:00');
      const day = dateObj.getDate();
      const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' });
      const team1 = getTeam(match.team1);
      const team2 = getTeam(match.team2);

      html += `
        <div class="diary-entry" onclick="openMatchDetail('${match.id}')">
          <div class="diary-entry-date">
            <div class="diary-entry-day">${day}</div>
            <div class="diary-entry-month">${monthShort}</div>
          </div>
          <div>
            <div class="diary-entry-match">${team1.name} vs ${team2.name}</div>
            <div class="diary-entry-meta">
              ${renderFormatBadge(match.format)} · ${match.venue.split(',')[0]} · ${entry.howWatched}
            </div>
            ${entry.take ? `<div class="diary-entry-take">${entry.take}</div>` : ''}
          </div>
          <div class="diary-entry-rating">
            ${renderStumpRating(entry.rating)}
          </div>
        </div>
      `;
    });

    return html || '<p class="text-muted text-center mt-xl">No diary entries yet. Start logging matches!</p>';
  },

  renderTopTeams() {
    // Count team appearances in diary
    const teamCounts = {};
    AppState.userDiary.forEach(entry => {
      const match = getMatch(entry.matchId);
      if (!match) return;
      teamCounts[match.team1] = (teamCounts[match.team1] || 0) + 1;
      teamCounts[match.team2] = (teamCounts[match.team2] || 0) + 1;
    });

    const sorted = Object.entries(teamCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return sorted.map(([code, count]) => {
      const team = getTeam(code);
      return `
        <div class="stat-row">
          <span class="stat-label" style="display:flex;align-items:center;gap:6px">
            <span class="team-flag" style="color:${team.color};font-size:0.65rem">${team.short}</span>
            ${team.name}
          </span>
          <span class="stat-value">${count}</span>
        </div>
      `;
    }).join('');
  }
};


// ============================================
// MATCH DETAIL MODAL
// ============================================
function openMatchDetail(matchId) {
  const match = getMatch(matchId);
  if (!match) return;

  const team1 = getTeam(match.team1);
  const team2 = getTeam(match.team2);
  const tournament = getTournament(match.tournament);
  const reviews = getMatchReviews(matchId);

  // Determine pitch report from tags
  const dominantTag = match.tags[0] || 'Standard';
  const pitchType = getPitchType(match);

  const container = document.getElementById('match-detail-container');
  container.innerHTML = `
    <div class="match-detail">
      <!-- HEADER -->
      <div class="match-detail-header">
        <div class="match-detail-format">
          ${renderFormatBadge(match.format)}
          <span class="text-muted" style="margin-left:8px;font-size:0.85rem">${tournament?.name || ''}</span>
        </div>
        <h2 class="match-detail-title">${team1.name} vs ${team2.name}</h2>
        <p class="match-detail-venue">${match.venue} · ${formatDate(match.date)}</p>
        
        <div class="match-detail-scores">
          <div class="match-detail-team">
            <div class="team-name">
              <span class="team-flag" style="color:${team1.color}">${team1.short}</span>
              ${team1.name}
            </div>
            <div class="team-score">${match.score1}</div>
          </div>
          <div class="match-detail-vs">vs</div>
          <div class="match-detail-team">
            <div class="team-name">
              <span class="team-flag" style="color:${team2.color}">${team2.short}</span>
              ${team2.name}
            </div>
            <div class="team-score">${match.score2}</div>
          </div>
        </div>
        
        <div class="match-result">${match.result}</div>
      </div>

      <!-- COMMUNITY RATING -->
      <div class="community-rating">
        <div class="community-rating-label">Community Rating</div>
        <div class="community-rating-value">${match.communityRating.toFixed(1)}</div>
        <div style="margin:8px 0">${renderStumpRating(match.communityRating, 'lg')}</div>
        <div class="community-rating-count">${match.totalLogs.toLocaleString()} members have logged this match</div>
      </div>

      <!-- LOG BUTTON -->
      <div class="text-center mb-xl">
        <button class="btn btn-primary" onclick="openLogModal('${match.id}')">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
          Log This Match
        </button>
      </div>

      <!-- PITCH REPORT -->
      <div class="pitch-report">
        <div class="pitch-report-title">
          <svg viewBox="0 0 20 20" width="18" height="18" fill="var(--amber)"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7h2v2H9V7zm0 4h2v4H9v-4z"/></svg>
          Pitch Report — ${pitchType}
        </div>
        <div class="pitch-report-tags">
          ${match.tags.map((tag, i) => `<span class="pitch-tag ${i === 0 ? 'dominant' : ''}">${tag}</span>`).join('')}
        </div>
      </div>

      <!-- MATCH STATS -->
      <h3 style="font-family:var(--font-display);margin-bottom:var(--space-md)">Match Stats</h3>
      <div class="match-stats-grid">
        <div class="match-stat-card">
          <div class="match-stat-label">Top Scorer</div>
          <div class="match-stat-value">${match.topScorer.name}</div>
          <div class="match-stat-detail">${match.topScorer.score} (${getTeam(match.topScorer.team).short})</div>
        </div>
        <div class="match-stat-card">
          <div class="match-stat-label">Best Bowler</div>
          <div class="match-stat-value">${match.bestBowler.name}</div>
          <div class="match-stat-detail">${match.bestBowler.figures} (${getTeam(match.bestBowler.team).short})</div>
        </div>
        <div class="match-stat-card">
          <div class="match-stat-label">Player of the Match</div>
          <div class="match-stat-value">${match.potm}</div>
          <div class="match-stat-detail">Community voted</div>
        </div>
        <div class="match-stat-card">
          <div class="match-stat-label">Venue</div>
          <div class="match-stat-value">${match.venue.split(',')[0]}</div>
          <div class="match-stat-detail">${match.venue.split(',')[1]?.trim() || ''}</div>
        </div>
      </div>

      <!-- REVIEWS -->
      ${reviews.length > 0 ? `
        <div class="reviews-section">
          <h3 style="font-family:var(--font-display);margin-bottom:var(--space-md)">Popular Reviews</h3>
          ${reviews.slice(0, 4).map(r => renderReviewCard(r)).join('')}
        </div>
      ` : ''}

      <!-- WHERE TO WATCH -->
      <div class="where-to-watch">
        <h3 style="font-family:var(--font-display);margin-bottom:var(--space-md)">Where to Watch</h3>
        <div class="watch-links">
          ${match.watchLinks.map(link => `<span class="watch-link">${link}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  document.getElementById('match-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function renderReviewCard(review) {
  const user = getUser(review.userId);
  if (!user) return '';
  const isLiked = AppState.likedReviews.has(review.id);

  return `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${user.avatar}</div>
        <div>
          <div class="review-user">${user.username}</div>
          <div class="review-date">${formatDate(review.date)} · ${renderStumpRating(review.rating)}</div>
        </div>
      </div>
      <div class="review-text">${review.text}</div>
      <div class="review-footer">
        <button class="review-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${review.id}', this, event)">
          ♥ <span class="like-count">${review.likes + (isLiked ? 1 : 0)}</span>
        </button>
      </div>
    </div>
  `;
}

function getPitchType(match) {
  const tags = match.tags.map(t => t.toLowerCase());
  if (tags.includes('thriller') || tags.includes('last-ball finish')) return 'Thriller';
  if (tags.includes('batting paradise') || tags.includes('century')) return 'Batting Paradise';
  if (tags.includes('bowling masterclass')) return 'Bowling Dominant';
  if (tags.includes('one-sided') || tags.includes('boring')) return 'One-sided Affair';
  if (tags.includes('classic') || tags.includes('must-watch')) return 'Instant Classic';
  if (tags.includes('upset')) return 'Giant Killing';
  return 'Competitive Match';
}


// ============================================
// LOG MATCH MODAL
// ============================================
function openLogModal(matchId) {
  // Close match detail modal if open
  document.getElementById('match-modal').classList.add('hidden');

  const container = document.getElementById('log-form-container');
  const today = new Date().toISOString().split('T')[0];

  container.innerHTML = `
    <form class="log-form" id="log-form" onsubmit="submitLog(event)">
      <!-- Match Selection -->
      <div class="form-group">
        <label class="form-label">Match</label>
        <select class="form-select" id="log-match" required>
          <option value="">Select a match...</option>
          ${MATCHES.map(m => {
            const t1 = getTeam(m.team1);
            const t2 = getTeam(m.team2);
            const selected = m.id === matchId ? 'selected' : '';
            return `<option value="${m.id}" ${selected}>${t1.name} vs ${t2.name} — ${formatDate(m.date)} (${m.format})</option>`;
          }).join('')}
        </select>
      </div>

      <!-- Date Watched -->
      <div class="form-group">
        <label class="form-label">Date Watched</label>
        <input type="date" class="form-input" id="log-date" value="${today}" required>
      </div>

      <!-- How Watched -->
      <div class="form-group">
        <label class="form-label">How did you watch?</label>
        <div class="watch-method-group" id="watch-method">
          <div class="watch-method-option" data-value="At Stadium" onclick="selectWatchMethod(this)">
            <span class="watch-method-icon">🏟️</span>
            At Stadium
          </div>
          <div class="watch-method-option selected" data-value="Live on TV" onclick="selectWatchMethod(this)">
            <span class="watch-method-icon">📺</span>
            Live on TV
          </div>
          <div class="watch-method-option" data-value="Replay" onclick="selectWatchMethod(this)">
            <span class="watch-method-icon">⏪</span>
            Replay
          </div>
          <div class="watch-method-option" data-value="Highlights Only" onclick="selectWatchMethod(this)">
            <span class="watch-method-icon">⚡</span>
            Highlights Only
          </div>
        </div>
      </div>

      <!-- Rating -->
      <div class="form-group">
        <label class="form-label">Your Rating</label>
        ${renderStumpRatingInput(0)}
      </div>

      <!-- Take / Review -->
      <div class="form-group">
        <label class="form-label">Your Take <span style="opacity:0.5;font-weight:400;text-transform:none">(optional)</span></label>
        <textarea class="form-textarea" id="log-take" placeholder="What did you think? Was it a classic or a snoozer?"></textarea>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label class="form-label">Tags</label>
        <div class="tags-grid" id="log-tags">
          ${WATCH_TAGS.map(tag => `<span class="tag-chip" data-tag="${tag}" onclick="toggleTag(this)">${tag}</span>`).join('')}
        </div>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:var(--space-md)">
        Save to Diary
      </button>
    </form>
  `;

  document.getElementById('log-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Init interactive rating
  initStumpRatingInput();
}

function selectWatchMethod(el) {
  el.parentElement.querySelectorAll('.watch-method-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function toggleTag(el) {
  el.classList.toggle('selected');
}

function initStumpRatingInput() {
  const container = document.querySelector('.stump-rating-input');
  if (!container) return;

  const stumps = container.querySelectorAll('.stump-clickable');
  const ratingDisplay = container.querySelector('.rating-number');

  stumps.forEach(stump => {
    stump.addEventListener('click', () => {
      const value = parseInt(stump.dataset.value);
      container.dataset.rating = value;
      container.classList.add('active');
      
      stumps.forEach(s => {
        const v = parseInt(s.dataset.value);
        s.classList.toggle('filled', v <= value);
      });
      
      ratingDisplay.textContent = value.toFixed(1);
    });

    stump.addEventListener('mouseenter', () => {
      const value = parseInt(stump.dataset.value);
      stumps.forEach(s => {
        const v = parseInt(s.dataset.value);
        s.querySelector('.stump-wood').style.opacity = v <= value ? '0.8' : '0.3';
      });
    });
  });

  container.addEventListener('mouseleave', () => {
    const currentRating = parseInt(container.dataset.rating) || 0;
    stumps.forEach(s => {
      const v = parseInt(s.dataset.value);
      s.querySelector('.stump-wood').style.opacity = '';
    });
  });
}

function submitLog(event) {
  event.preventDefault();

  const matchId = document.getElementById('log-match').value;
  const dateWatched = document.getElementById('log-date').value;
  const howWatched = document.querySelector('.watch-method-option.selected')?.dataset.value || 'Live on TV';
  const rating = parseInt(document.querySelector('.stump-rating-input')?.dataset.rating) || 0;
  const take = document.getElementById('log-take').value;
  const selectedTags = Array.from(document.querySelectorAll('.tag-chip.selected')).map(el => el.dataset.tag);

  if (!matchId) {
    showToast('Please select a match', 'warning');
    return;
  }
  if (rating === 0) {
    showToast('Please rate the match', 'warning');
    return;
  }

  // Add to diary
  const newEntry = { matchId, dateWatched, howWatched, rating, take, tags: selectedTags };
  AppState.userDiary.unshift(newEntry);

  // Close modal
  document.getElementById('log-modal').classList.add('hidden');
  document.body.style.overflow = '';

  // Show success
  const match = getMatch(matchId);
  const t1 = getTeam(match.team1);
  const t2 = getTeam(match.team2);
  showToast(`Logged ${t1.short} vs ${t2.short}! ★${rating}`, 'success');

  // Re-render if on diary page
  if (AppState.currentPage === 'diary') {
    Router.render('diary');
  }
}


// ============================================
// LIST DETAIL (opens in match modal)
// ============================================
function openListDetail(listId) {
  const list = LISTS.find(l => l.id === listId);
  if (!list) return;

  const creator = getUser(list.creator);
  const matches = list.matchIds.map(id => getMatch(id)).filter(Boolean);

  const container = document.getElementById('match-detail-container');
  container.innerHTML = `
    <div class="match-detail">
      <div style="margin-bottom:var(--space-xl)">
        <h2 class="match-detail-title">${list.title}</h2>
        <p class="text-secondary">${list.description}</p>
        <p class="text-muted mt-sm">
          By <span class="text-amber">${creator?.username || 'Unknown'}</span> · ${list.matchIds.length} matches · ♥ ${list.likes.toLocaleString()}
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--space-md)">
        ${matches.map((m, i) => {
          const t1 = getTeam(m.team1);
          const t2 = getTeam(m.team2);
          return `
            <div class="diary-entry" onclick="openMatchDetail('${m.id}')" style="cursor:pointer">
              <div class="diary-entry-date">
                <div class="diary-entry-day" style="font-size:1.25rem;color:var(--amber)">${i + 1}</div>
              </div>
              <div>
                <div class="diary-entry-match">${t1.name} vs ${t2.name}</div>
                <div class="diary-entry-meta">
                  ${renderFormatBadge(m.format)} · ${m.venue.split(',')[0]} · ${formatDate(m.date)}
                </div>
              </div>
              <div class="diary-entry-rating">
                ${renderStumpRating(m.communityRating)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  document.getElementById('match-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}


// ============================================
// SEARCH
// ============================================
function initSearch() {
  const toggleBtn = document.getElementById('search-toggle');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const closeBtn = document.getElementById('search-close');

  toggleBtn.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
    if (!overlay.classList.contains('hidden')) {
      setTimeout(() => input.focus(), 100);
    }
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    input.value = '';
    results.innerHTML = '';
  });

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length < 2) {
      results.innerHTML = '';
      return;
    }

    const matchResults = MATCHES.filter(m => {
      const t1 = getTeam(m.team1);
      const t2 = getTeam(m.team2);
      const searchStr = `${t1.name} ${t2.name} ${m.venue} ${m.format} ${getTournament(m.tournament)?.name || ''}`.toLowerCase();
      return searchStr.includes(query);
    }).slice(0, 5);

    const userResults = USERS.filter(u => {
      return u.username.toLowerCase().includes(query) || u.displayName.toLowerCase().includes(query);
    }).slice(0, 3);

    let html = '';

    matchResults.forEach(m => {
      const t1 = getTeam(m.team1);
      const t2 = getTeam(m.team2);
      html += `
        <div class="search-result-item" onclick="document.getElementById('search-overlay').classList.add('hidden');openMatchDetail('${m.id}')">
          <span class="search-result-type">Match</span>
          <div>
            <div class="search-result-text">${t1.name} vs ${t2.name}</div>
            <div class="search-result-meta">${m.format} · ${formatDate(m.date)} · ${m.venue.split(',')[0]}</div>
          </div>
        </div>
      `;
    });

    userResults.forEach(u => {
      html += `
        <div class="search-result-item" onclick="document.getElementById('search-overlay').classList.add('hidden');window.location.hash='profile'">
          <span class="search-result-type">User</span>
          <div>
            <div class="search-result-text">${u.displayName}</div>
            <div class="search-result-meta">@${u.username} · ${u.matchesLogged} matches logged</div>
          </div>
        </div>
      `;
    });

    if (!html) {
      html = '<div class="search-result-item"><span class="text-muted">No results found</span></div>';
    }

    results.innerHTML = html;
  });
}


// ============================================
// SPOILER SHIELD
// ============================================
function initSpoilerShield() {
  const btn = document.getElementById('spoiler-shield-btn');
  const visibleIcon = btn.querySelector('.shield-icon-visible');
  const hiddenIcon = btn.querySelector('.shield-icon-hidden');

  btn.addEventListener('click', () => {
    AppState.spoilerShield = !AppState.spoilerShield;
    document.body.classList.toggle('spoiler-active', AppState.spoilerShield);
    btn.classList.toggle('active', AppState.spoilerShield);
    
    if (AppState.spoilerShield) {
      visibleIcon.style.display = 'none';
      hiddenIcon.style.display = 'block';
      showToast('Spoiler Shield ON — Results are blurred. Hover to reveal.', 'warning');
    } else {
      visibleIcon.style.display = 'block';
      hiddenIcon.style.display = 'none';
      showToast('Spoiler Shield OFF — All results visible.', 'success');
    }
  });
}


// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const links = document.getElementById('nav-links');

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}


// ============================================
// MODAL CLOSE HANDLERS
// ============================================
function initModals() {
  // Match detail modal
  document.getElementById('match-modal-close').addEventListener('click', () => {
    document.getElementById('match-modal').classList.add('hidden');
    document.body.style.overflow = '';
  });

  // Log modal
  document.getElementById('log-modal-close').addEventListener('click', () => {
    document.getElementById('log-modal').classList.add('hidden');
    document.body.style.overflow = '';
  });

  // Click outside to close
  ['match-modal', 'log-modal'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        document.getElementById(id).classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
      });
      document.body.style.overflow = '';
      
      // Also close search
      document.getElementById('search-overlay').classList.add('hidden');
    }
  });
}


// ============================================
// PAGE-SPECIFIC INIT FUNCTIONS
// ============================================

function initMatchesPage() {
  const filtersBar = document.getElementById('matches-filters');
  if (!filtersBar) return;

  // Format filter buttons
  filtersBar.querySelectorAll('.filter-btn[data-filter="format"]').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersBar.querySelectorAll('.filter-btn[data-filter="format"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.filters.format = btn.dataset.value;
      renderFilteredMatches();
    });
  });

  // Select dropdowns
  filtersBar.querySelectorAll('.filter-select[data-filter]').forEach(select => {
    select.addEventListener('change', () => {
      AppState.filters[select.dataset.filter] = select.value;
      renderFilteredMatches();
    });
  });

  // Sort
  filtersBar.querySelector('.filter-select[data-sort]')?.addEventListener('change', (e) => {
    AppState.filters.sort = e.target.value;
    renderFilteredMatches();
  });

  // Force the grid visible immediately on page load
  const grid = document.getElementById('matches-grid');
  if (grid) {
    // Force immediate visibility for above-the-fold content
    requestAnimationFrame(() => {
      grid.classList.add('visible');
    });
  }
}

function renderFilteredMatches() {
  const filtered = filterMatches(MATCHES, AppState.filters);
  const sorted = sortMatches(filtered, AppState.filters.sort);
  
  const grid = document.getElementById('matches-grid');
  if (!grid) return;

  grid.classList.remove('visible');
  
  setTimeout(() => {
    grid.innerHTML = sorted.length > 0 
      ? sorted.map(m => renderMatchCard(m)).join('')
      : '<p class="text-muted text-center" style="grid-column:1/-1;padding:var(--space-2xl)">No matches found matching your filters.</p>';
    
    setTimeout(() => grid.classList.add('visible'), 50);
  }, 200);
}

function initDiaryPage() {
  // Format chart
  const chartCanvas = document.getElementById('format-chart');
  if (chartCanvas && window.Chart) {
    const formatCounts = { Test: 0, ODI: 0, T20: 0 };
    AppState.userDiary.forEach(entry => {
      const match = getMatch(entry.matchId);
      if (match) formatCounts[match.format]++;
    });

    new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Test', 'ODI', 'T20'],
        datasets: [{
          data: [formatCounts.Test, formatCounts.ODI, formatCounts.T20],
          backgroundColor: ['#e74c3c', '#3498db', '#2ecc71'],
          borderColor: 'transparent',
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#8b949e',
              font: { family: "'Source Sans 3', sans-serif", size: 12 },
              padding: 12
            }
          }
        },
        cutout: '65%'
      }
    });
  }

  // Diary format filters
  const filtersBar = document.getElementById('diary-filters');
  if (filtersBar) {
    filtersBar.querySelectorAll('.filter-btn[data-filter="format"]').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.diaryFilters.format = btn.dataset.value;
        
        let entries = AppState.userDiary;
        if (AppState.diaryFilters.format !== 'All') {
          entries = entries.filter(e => {
            const match = getMatch(e.matchId);
            return match && match.format === AppState.diaryFilters.format;
          });
        }
        
        const container = document.getElementById('diary-entries');
        if (container) {
          container.innerHTML = Pages.renderDiaryEntries(entries);
        }
      });
    });
  }
}

function initProfilePage() {
  // Animations are handled by scroll observer
}

function initListsPage() {
  const grid = document.getElementById('lists-grid');
  if (grid) {
    requestAnimationFrame(() => {
      grid.classList.add('visible');
    });
  }
}


// ============================================
// LIKE TOGGLE
// ============================================
function toggleLike(reviewId, btn, event) {
  event.stopPropagation();
  const countEl = btn.querySelector('.like-count');
  const currentCount = parseInt(countEl.textContent);

  if (AppState.likedReviews.has(reviewId)) {
    AppState.likedReviews.delete(reviewId);
    btn.classList.remove('liked');
    countEl.textContent = currentCount - 1;
  } else {
    AppState.likedReviews.add(reviewId);
    btn.classList.add('liked');
    countEl.textContent = currentCount + 1;
  }
}


// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg viewBox="0 0 20 20" width="16" height="16" fill="${type === 'success' ? 'var(--success)' : 'var(--warning)'}">
      ${type === 'success' 
        ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>'
        : '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>'}
    </svg>
    ${message}
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


// ============================================
// SCROLL ANIMATION OBSERVER
// ============================================
function observeScrollAnimations() {
  // Small delay to ensure DOM is painted before observing
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '50px 0px 0px 0px' }
      );

      document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
        observer.observe(el);
      });
    });
  });
}


// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initSpoilerShield();
  initMobileMenu();
  initModals();
  Router.init();

  // Nav background on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(139, 148, 158, 0.15)';
    } else {
      nav.style.borderBottomColor = 'rgba(139, 148, 158, 0.08)';
    }
    lastScroll = window.scrollY;
  });
});
