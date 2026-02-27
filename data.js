/* ============================================
   CricBoxd — Data Layer
   All sample data for matches, users, reviews,
   lists, diary entries, and activity feed.
   ============================================ */

// ============================================
// TEAMS
// ============================================
const TEAMS = {
  IND: { name: 'India', short: 'IND', color: '#1a75ff' },
  AUS: { name: 'Australia', short: 'AUS', color: '#ffd700' },
  ENG: { name: 'England', short: 'ENG', color: '#002f6c' },
  PAK: { name: 'Pakistan', short: 'PAK', color: '#01411c' },
  NZ:  { name: 'New Zealand', short: 'NZ', color: '#000000' },
  SA:  { name: 'South Africa', short: 'SA', color: '#007749' },
  SL:  { name: 'Sri Lanka', short: 'SL', color: '#0a1f5c' },
  WI:  { name: 'West Indies', short: 'WI', color: '#7b0042' },
  BAN: { name: 'Bangladesh', short: 'BAN', color: '#006a4e' },
  AFG: { name: 'Afghanistan', short: 'AFG', color: '#0066b2' },
  // IPL Teams
  CSK: { name: 'Chennai Super Kings', short: 'CSK', color: '#f9cd05' },
  MI:  { name: 'Mumbai Indians', short: 'MI', color: '#004ba0' },
  RCB: { name: 'Royal Challengers Bengaluru', short: 'RCB', color: '#ec1c24' },
  KKR: { name: 'Kolkata Knight Riders', short: 'KKR', color: '#3a225d' },
  SRH: { name: 'Sunrisers Hyderabad', short: 'SRH', color: '#ff822a' },
  DC:  { name: 'Delhi Capitals', short: 'DC', color: '#004c93' },
  RR:  { name: 'Rajasthan Royals', short: 'RR', color: '#ea1a85' },
  PBKS:{ name: 'Punjab Kings', short: 'PBKS', color: '#ed1b24' },
  GT:  { name: 'Gujarat Titans', short: 'GT', color: '#1c1c2b' },
  LSG: { name: 'Lucknow Super Giants', short: 'LSG', color: '#a72056' }
};

// ============================================
// TOURNAMENTS / SERIES
// ============================================
const TOURNAMENTS = [
  { id: 'ipl2025', name: 'IPL 2025', year: 2025, type: 'T20' },
  { id: 't20wc2026', name: 'ICC T20 World Cup 2026', year: 2026, type: 'T20' },
  { id: 'ashes2025', name: 'The Ashes 2025', year: 2025, type: 'Test' },
  { id: 'indaus_odi', name: 'India vs Australia ODI Series 2025', year: 2025, type: 'ODI' },
  { id: 'wc2019', name: 'ICC Cricket World Cup 2019', year: 2019, type: 'ODI' },
  { id: 'wc2011', name: 'ICC Cricket World Cup 2011', year: 2011, type: 'ODI' },
  { id: 'ashes2019', name: 'The Ashes 2019', year: 2019, type: 'Test' },
  { id: 'ipl2024', name: 'IPL 2024', year: 2024, type: 'T20' },
  { id: 't20wc2024', name: 'ICC T20 World Cup 2024', year: 2024, type: 'T20' }
];

// ============================================
// MATCHES — Comprehensive sample data
// ============================================
const MATCHES = [
  // --- IPL 2025 ---
  {
    id: 'm001',
    team1: 'CSK', team2: 'MI',
    score1: '189/4 (20)', score2: '185/7 (20)',
    result: 'CSK won by 4 runs',
    date: '2025-04-12',
    venue: 'Wankhede Stadium, Mumbai',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 4.3,
    totalLogs: 1247,
    topScorer: { name: 'Ruturaj Gaikwad', team: 'CSK', score: '87(51)' },
    bestBowler: { name: 'Jasprit Bumrah', team: 'MI', figures: '3/29' },
    potm: 'Ruturaj Gaikwad',
    tags: ['Thriller', 'Last-ball finish', 'IPL Classic'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm002',
    team1: 'RCB', team2: 'KKR',
    score1: '227/4 (20)', score2: '198/8 (20)',
    result: 'RCB won by 29 runs',
    date: '2025-04-15',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 4.0,
    totalLogs: 983,
    topScorer: { name: 'Virat Kohli', team: 'RCB', score: '113(52)' },
    bestBowler: { name: 'Sunil Narine', team: 'KKR', figures: '2/38' },
    potm: 'Virat Kohli',
    tags: ['Century', 'Batting paradise', 'Classic'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm003',
    team1: 'SRH', team2: 'DC',
    score1: '167/5 (20)', score2: '169/3 (18.4)',
    result: 'DC won by 7 wickets',
    date: '2025-04-18',
    venue: 'Rajiv Gandhi Intl Stadium, Hyderabad',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 3.2,
    totalLogs: 654,
    topScorer: { name: 'Jake Fraser-McGurk', team: 'DC', score: '78(41)' },
    bestBowler: { name: 'Bhuvneshwar Kumar', team: 'SRH', figures: '1/32' },
    potm: 'Jake Fraser-McGurk',
    tags: ['Chase masterclass'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm004',
    team1: 'RR', team2: 'GT',
    score1: '144/9 (20)', score2: '145/2 (16.3)',
    result: 'GT won by 8 wickets',
    date: '2025-04-20',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 2.8,
    totalLogs: 412,
    topScorer: { name: 'Shubman Gill', team: 'GT', score: '72*(48)' },
    bestBowler: { name: 'Rashid Khan', team: 'GT', figures: '3/18' },
    potm: 'Rashid Khan',
    tags: ['One-sided', 'Bowling masterclass'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm005',
    team1: 'CSK', team2: 'RCB',
    score1: '204/5 (20)', score2: '205/6 (19.5)',
    result: 'RCB won by 4 wickets',
    date: '2025-05-02',
    venue: 'MA Chidambaram Stadium, Chennai',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 4.7,
    totalLogs: 2103,
    topScorer: { name: 'MS Dhoni', team: 'CSK', score: '58*(23)' },
    bestBowler: { name: 'Mohammed Siraj', team: 'RCB', figures: '2/36' },
    potm: 'Virat Kohli',
    tags: ['Thriller', 'Last-ball finish', 'Classic', 'Century'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm006',
    team1: 'MI', team2: 'PBKS',
    score1: '214/3 (20)', score2: '215/5 (19.4)',
    result: 'PBKS won by 5 wickets',
    date: '2025-05-08',
    venue: 'Wankhede Stadium, Mumbai',
    format: 'T20',
    tournament: 'ipl2025',
    communityRating: 4.5,
    totalLogs: 887,
    topScorer: { name: 'Rohit Sharma', team: 'MI', score: '92(48)' },
    bestBowler: { name: 'Arshdeep Singh', team: 'PBKS', figures: '2/41' },
    potm: 'Shreyas Iyer',
    tags: ['Upset', 'Thriller', 'Last-ball finish'],
    watchLinks: ['JioCinema', 'Willow TV']
  },

  // --- ICC T20 World Cup 2026 ---
  {
    id: 'm007',
    team1: 'IND', team2: 'PAK',
    score1: '186/5 (20)', score2: '179/8 (20)',
    result: 'India won by 7 runs',
    date: '2026-02-15',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    format: 'T20',
    tournament: 't20wc2026',
    communityRating: 4.8,
    totalLogs: 3842,
    topScorer: { name: 'Suryakumar Yadav', team: 'IND', score: '82*(48)' },
    bestBowler: { name: 'Jasprit Bumrah', team: 'IND', figures: '3/24' },
    potm: 'Suryakumar Yadav',
    tags: ['Thriller', 'Classic', 'Rivalry', 'Must-watch'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },
  {
    id: 'm008',
    team1: 'AUS', team2: 'ENG',
    score1: '198/6 (20)', score2: '196/9 (20)',
    result: 'Australia won by 2 runs',
    date: '2026-02-22',
    venue: 'Eden Gardens, Kolkata',
    format: 'T20',
    tournament: 't20wc2026',
    communityRating: 4.6,
    totalLogs: 1563,
    topScorer: { name: 'Travis Head', team: 'AUS', score: '91(49)' },
    bestBowler: { name: 'Mark Wood', team: 'ENG', figures: '4/33' },
    potm: 'Travis Head',
    tags: ['Thriller', 'Last-ball finish', 'Semi-Final'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },
  {
    id: 'm009',
    team1: 'IND', team2: 'AUS',
    score1: '192/4 (20)', score2: '163/9 (20)',
    result: 'India won by 29 runs',
    date: '2026-02-27',
    venue: 'Wankhede Stadium, Mumbai',
    format: 'T20',
    tournament: 't20wc2026',
    communityRating: 4.5,
    totalLogs: 4210,
    topScorer: { name: 'Virat Kohli', team: 'IND', score: '76(49)' },
    bestBowler: { name: 'Jasprit Bumrah', team: 'IND', figures: '4/18' },
    potm: 'Jasprit Bumrah',
    tags: ['Classic', 'Final', 'Bowling masterclass', 'Must-watch'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },
  {
    id: 'm010',
    team1: 'NZ', team2: 'SA',
    score1: '158/7 (20)', score2: '152/10 (19.3)',
    result: 'New Zealand won by 6 runs',
    date: '2026-02-20',
    venue: 'MA Chidambaram Stadium, Chennai',
    format: 'T20',
    tournament: 't20wc2026',
    communityRating: 3.9,
    totalLogs: 721,
    topScorer: { name: 'Kane Williamson', team: 'NZ', score: '64(47)' },
    bestBowler: { name: 'Trent Boult', team: 'NZ', figures: '3/28' },
    potm: 'Trent Boult',
    tags: ['Thriller', 'Upset'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },

  // --- The Ashes 2025 ---
  {
    id: 'm011',
    team1: 'ENG', team2: 'AUS',
    score1: '393 & 273', score2: '386 & 282/5',
    result: 'Australia won by 5 wickets',
    date: '2025-06-18',
    venue: 'Edgbaston, Birmingham',
    format: 'Test',
    tournament: 'ashes2025',
    communityRating: 4.4,
    totalLogs: 1876,
    topScorer: { name: 'Steve Smith', team: 'AUS', score: '142 & 67' },
    bestBowler: { name: 'James Anderson', team: 'ENG', figures: '5/89 & 2/61' },
    potm: 'Steve Smith',
    tags: ['Classic', 'Ashes drama', 'Batting masterclass'],
    watchLinks: ['Sky Sports', 'BT Sport', 'Kayo']
  },
  {
    id: 'm012',
    team1: 'ENG', team2: 'AUS',
    score1: '258 & 312', score2: '250 & 154',
    result: 'England won by 166 runs',
    date: '2025-07-02',
    venue: "Lord's, London",
    format: 'Test',
    tournament: 'ashes2025',
    communityRating: 4.1,
    totalLogs: 1432,
    topScorer: { name: 'Joe Root', team: 'ENG', score: '134 & 52' },
    bestBowler: { name: 'Stuart Broad', team: 'ENG', figures: '4/52 & 5/37' },
    potm: 'Stuart Broad',
    tags: ['Bowling masterclass', 'Classic', 'Home of Cricket'],
    watchLinks: ['Sky Sports', 'BT Sport', 'Kayo']
  },

  // --- IND vs AUS ODI Series ---
  {
    id: 'm013',
    team1: 'IND', team2: 'AUS',
    score1: '312/6 (50)', score2: '289/10 (47.3)',
    result: 'India won by 23 runs',
    date: '2025-09-14',
    venue: 'Wankhede Stadium, Mumbai',
    format: 'ODI',
    tournament: 'indaus_odi',
    communityRating: 3.8,
    totalLogs: 967,
    topScorer: { name: 'Shubman Gill', team: 'IND', score: '126(115)' },
    bestBowler: { name: 'Mohammed Shami', team: 'IND', figures: '4/52' },
    potm: 'Shubman Gill',
    tags: ['Century', 'Chase falls short'],
    watchLinks: ['JioCinema', 'Willow TV']
  },
  {
    id: 'm014',
    team1: 'IND', team2: 'AUS',
    score1: '267/8 (50)', score2: '268/4 (46.2)',
    result: 'Australia won by 6 wickets',
    date: '2025-09-17',
    venue: 'Arun Jaitley Stadium, Delhi',
    format: 'ODI',
    tournament: 'indaus_odi',
    communityRating: 3.5,
    totalLogs: 743,
    topScorer: { name: 'Marnus Labuschagne', team: 'AUS', score: '98(104)' },
    bestBowler: { name: 'Mitchell Starc', team: 'AUS', figures: '3/48' },
    potm: 'Marnus Labuschagne',
    tags: ['Chase masterclass'],
    watchLinks: ['JioCinema', 'Willow TV']
  },

  // --- Historical Classics ---
  {
    id: 'm015',
    team1: 'ENG', team2: 'NZ',
    score1: '241/10 (50)', score2: '241/8 (50)',
    result: 'England won (Super Over)',
    date: '2019-07-14',
    venue: "Lord's, London",
    format: 'ODI',
    tournament: 'wc2019',
    communityRating: 5.0,
    totalLogs: 8942,
    topScorer: { name: 'Ben Stokes', team: 'ENG', score: '84*(98)' },
    bestBowler: { name: 'Jimmy Neesham', team: 'NZ', figures: '3/43' },
    potm: 'Ben Stokes',
    tags: ['Greatest match ever', 'Super Over', 'World Cup Final', 'Thriller', 'Last-ball finish', 'Must-watch', 'Classic'],
    watchLinks: ['Sky Sports', 'ESPN+']
  },
  {
    id: 'm016',
    team1: 'IND', team2: 'SL',
    score1: '274/6 (50)', score2: '275/4 (48.2)',
    result: 'India won by 6 wickets',
    date: '2011-04-02',
    venue: 'Wankhede Stadium, Mumbai',
    format: 'ODI',
    tournament: 'wc2011',
    communityRating: 4.9,
    totalLogs: 7234,
    topScorer: { name: 'Gautam Gambhir', team: 'IND', score: '97(122)' },
    bestBowler: { name: 'Lasith Malinga', team: 'SL', figures: '2/42' },
    potm: 'MS Dhoni',
    tags: ['World Cup Final', 'Classic', 'Dhoni finishes off in style', 'Must-watch', 'Emotional'],
    watchLinks: ['Disney+ Hotstar']
  },
  {
    id: 'm017',
    team1: 'ENG', team2: 'AUS',
    score1: '67 & 362', score2: '179 & 246',
    result: 'England won by 1 wicket',
    date: '2019-08-25',
    venue: 'Headingley, Leeds',
    format: 'Test',
    tournament: 'ashes2019',
    communityRating: 4.9,
    totalLogs: 5431,
    topScorer: { name: 'Ben Stokes', team: 'ENG', score: '135*(219)' },
    bestBowler: { name: 'Josh Hazlewood', team: 'AUS', figures: '5/30 & 4/85' },
    potm: 'Ben Stokes',
    tags: ['Greatest Test innings', 'Stokes masterclass', 'Classic', 'Thriller', 'Comeback', 'Must-watch'],
    watchLinks: ['Sky Sports', 'Kayo']
  },
  {
    id: 'm018',
    team1: 'IND', team2: 'AUS',
    score1: '244 & 334', score2: '369 & 212/3',
    result: 'Australia won by 7 wickets',
    date: '2024-03-05',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    format: 'Test',
    tournament: 'indaus_odi',
    communityRating: 3.3,
    totalLogs: 891,
    topScorer: { name: 'Yashasvi Jaiswal', team: 'IND', score: '104 & 78' },
    bestBowler: { name: 'Nathan Lyon', team: 'AUS', figures: '5/67 & 3/82' },
    potm: 'Nathan Lyon',
    tags: ['Spin battle', 'Century'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV']
  },

  // --- T20 WC 2024 ---
  {
    id: 'm019',
    team1: 'IND', team2: 'SA',
    score1: '176/7 (20)', score2: '169/8 (20)',
    result: 'India won by 7 runs',
    date: '2024-06-29',
    venue: 'Kensington Oval, Barbados',
    format: 'T20',
    tournament: 't20wc2024',
    communityRating: 4.8,
    totalLogs: 6121,
    topScorer: { name: 'Virat Kohli', team: 'IND', score: '76(59)' },
    bestBowler: { name: 'Jasprit Bumrah', team: 'IND', figures: '2/18' },
    potm: 'Virat Kohli',
    tags: ['World Cup Final', 'Thriller', 'Classic', 'Emotional', 'Must-watch', 'Kohli farewell'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },
  {
    id: 'm020',
    team1: 'IND', team2: 'PAK',
    score1: '119/10 (19)', score2: '113/7 (20)',
    result: 'India won by 6 runs',
    date: '2024-06-09',
    venue: 'Nassau County, New York',
    format: 'T20',
    tournament: 't20wc2024',
    communityRating: 4.4,
    totalLogs: 4530,
    topScorer: { name: 'Rishabh Pant', team: 'IND', score: '42(31)' },
    bestBowler: { name: 'Jasprit Bumrah', team: 'IND', figures: '3/14' },
    potm: 'Jasprit Bumrah',
    tags: ['Low scorer', 'Thriller', 'Rivalry', 'Bowling masterclass'],
    watchLinks: ['Disney+ Hotstar', 'Willow TV', 'ESPN+']
  },

  // --- IPL 2024 ---
  {
    id: 'm021',
    team1: 'KKR', team2: 'SRH',
    score1: '208/7 (20)', score2: '113/10 (15.4)',
    result: 'KKR won by 95 runs',
    date: '2024-05-26',
    venue: 'MA Chidambaram Stadium, Chennai',
    format: 'T20',
    tournament: 'ipl2024',
    communityRating: 3.6,
    totalLogs: 1230,
    topScorer: { name: 'Venkatesh Iyer', team: 'KKR', score: '52(26)' },
    bestBowler: { name: 'Mitchell Starc', team: 'KKR', figures: '2/14' },
    potm: 'Mitchell Starc',
    tags: ['One-sided', 'IPL Final', 'Dominant'],
    watchLinks: ['JioCinema']
  },
  {
    id: 'm022',
    team1: 'CSK', team2: 'GT',
    score1: '214/4 (20)', score2: '171/10 (19.1)',
    result: 'CSK won by 43 runs',
    date: '2024-04-05',
    venue: 'MA Chidambaram Stadium, Chennai',
    format: 'T20',
    tournament: 'ipl2024',
    communityRating: 3.8,
    totalLogs: 876,
    topScorer: { name: 'MS Dhoni', team: 'CSK', score: '37*(16)' },
    bestBowler: { name: 'Ravindra Jadeja', team: 'CSK', figures: '3/22' },
    potm: 'Ravindra Jadeja',
    tags: ['Dhoni cameo', 'Batting paradise'],
    watchLinks: ['JioCinema']
  }
];


// ============================================
// SAMPLE USERS
// ============================================
const USERS = [
  {
    id: 'u001',
    username: 'Rohit_Fan47',
    displayName: 'Rohit Mehta',
    avatar: 'RM',
    bio: 'Mumbai Indians forever. Rohit Sharma supremacy. Watching cricket since 2003 WC.',
    matchesLogged: 247,
    reviewsWritten: 89,
    hoursWatched: 620,
    favoriteFormat: 'T20',
    favoriteMatches: ['m015', 'm016', 'm019', 'm005'],
    badges: ['ipl_addict', 'centurion'],
    teamsSupported: ['MI', 'IND']
  },
  {
    id: 'u002',
    username: 'ViratKing18',
    displayName: 'Arun Krishnan',
    avatar: 'AK',
    bio: 'Virat is the GOAT, no debate. RCB till I die. Test cricket is the best cricket.',
    matchesLogged: 312,
    reviewsWritten: 156,
    hoursWatched: 890,
    favoriteFormat: 'Test',
    favoriteMatches: ['m017', 'm019', 'm002', 'm016'],
    badges: ['test_purist', 'ipl_addict', 'centurion', 'wc_warrior'],
    teamsSupported: ['RCB', 'IND']
  },
  {
    id: 'u003',
    username: 'TestCricketPurist',
    displayName: 'Srinivas Iyer',
    avatar: 'SI',
    bio: 'Day 5 Test cricket > everything. Wisden subscriber. Cricket is a religion.',
    matchesLogged: 189,
    reviewsWritten: 134,
    hoursWatched: 1240,
    favoriteFormat: 'Test',
    favoriteMatches: ['m017', 'm011', 'm012', 'm015'],
    badges: ['test_purist', 'centurion'],
    teamsSupported: ['IND', 'AUS']
  },
  {
    id: 'u004',
    username: 'IPLaddict',
    displayName: 'Priya Sharma',
    avatar: 'PS',
    bio: 'IPL is life. Every season, every match. CSK is love. Dhoni forever.',
    matchesLogged: 340,
    reviewsWritten: 67,
    hoursWatched: 510,
    favoriteFormat: 'T20',
    favoriteMatches: ['m005', 'm001', 'm006', 'm019'],
    badges: ['ipl_addict', 'centurion', 'wc_warrior'],
    teamsSupported: ['CSK', 'IND']
  },
  {
    id: 'u005',
    username: 'CricketNerd_HYD',
    displayName: 'Harshit Reddy',
    avatar: 'HR',
    bio: 'Analytics-driven cricket watcher. Loves a good bowling spell. SRH fan in pain.',
    matchesLogged: 156,
    reviewsWritten: 102,
    hoursWatched: 430,
    favoriteFormat: 'ODI',
    favoriteMatches: ['m015', 'm007', 'm017', 'm020'],
    badges: ['test_purist', 'centurion'],
    teamsSupported: ['SRH', 'IND']
  }
];

// Current user (simulating logged-in state)
const CURRENT_USER = USERS[0]; // Rohit_Fan47

// ============================================
// REVIEWS
// ============================================
const REVIEWS = [
  // 2019 WC Final
  { id: 'r001', userId: 'u002', matchId: 'm015', rating: 5, text: "The greatest cricket match ever played. The fact that this went to a Super Over and STILL couldn't separate the teams... Ben Stokes' innings was superhuman. I'll never forget that overthrow. Cricket at its absolute peak.", date: '2019-07-15', likes: 342 },
  { id: 'r002', userId: 'u003', matchId: 'm015', rating: 5, text: "I've watched cricket for 40 years. Nothing comes close. The drama, the tension, the injustice of the boundary countback rule. Both teams deserved to win. This is why we love this sport.", date: '2019-07-16', likes: 287 },
  { id: 'r003', userId: 'u005', matchId: 'm015', rating: 5, text: "Statistically the closest World Cup final in history. Tied match, tied Super Over, decided on a technicality. The probability of this happening was astronomically low. Peak cricket.", date: '2019-07-15', likes: 198 },
  
  // 2011 WC Final
  { id: 'r004', userId: 'u004', matchId: 'm016', rating: 5, text: "'Dhoni finishes off in style. India lift the World Cup after 28 years!' I was 12 years old. I cried. My dad cried. The whole neighborhood erupted. This match made me a cricket fan for life.", date: '2023-04-02', likes: 567 },
  { id: 'r005', userId: 'u001', matchId: 'm016', rating: 5, text: "Gambhir's 97 doesn't get enough credit. That innings was the backbone. And then Dhoni walking in ahead of Yuvraj and hitting that six... Wankhede under lights that night was magical.", date: '2022-11-10', likes: 423 },
  
  // Headingley 2019
  { id: 'r006', userId: 'u003', matchId: 'm017', rating: 5, text: "Ben Stokes at Headingley is the single greatest Test innings I've ever witnessed. England were 286-9 chasing 203. Last man Jack Leach watching from the other end. Stokes just decided he wouldn't lose. Unreal.", date: '2019-08-26', likes: 445 },
  { id: 'r007', userId: 'u002', matchId: 'm017', rating: 5, text: "I called in sick to work to watch Day 4. Worth it. When Stokes hit that boundary to bring up his hundred AND win the match... pure cinema. This is why Test cricket is the best format.", date: '2019-08-27', likes: 312 },
  
  // IND vs PAK T20 WC 2026
  { id: 'r008', userId: 'u001', matchId: 'm007', rating: 5, text: "India vs Pakistan never disappoints. SKY was absolutely phenomenal. The crowd at Ahmedabad was electric. Bumrah's death bowling was surgical. Another classic in the rivalry.", date: '2026-02-15', likes: 234 },
  { id: 'r009', userId: 'u005', matchId: 'm007', rating: 4.5, text: "Bumrah's economy in the death overs was 4.2. That's absurd in a T20 knockout. India's bowling attack is genuinely the best in the world right now across all formats.", date: '2026-02-16', likes: 167 },
  
  // CSK vs RCB IPL 2025
  { id: 'r010', userId: 'u004', matchId: 'm005', rating: 5, text: "CSK vs RCB is always box office. Dhoni coming in with 40 needed off 15 and almost pulling it off at 43 years old. And then Kohli chasing it down. This match had EVERYTHING.", date: '2025-05-03', likes: 389 },
  { id: 'r011', userId: 'u002', matchId: 'm005', rating: 4.5, text: "King Kohli. That's it. That's the review. Actually no — the way he paced that chase was textbook. Absorbed pressure, then exploded. Peak RCB energy.", date: '2025-05-03', likes: 256 },
  
  // CSK vs MI IPL 2025
  { id: 'r012', userId: 'u001', matchId: 'm001', rating: 4.5, text: "El Clásico of the IPL. Bumrah was incredible but Ruturaj timed his innings perfectly. The last over had me on the edge of my seat. CSK edges it but MI made them work for it.", date: '2025-04-13', likes: 198 },
  
  // T20 WC 2024 Final
  { id: 'r013', userId: 'u002', matchId: 'm019', rating: 5, text: "Kohli's last T20I innings being a World Cup Final winning knock is the stuff of dreams. The way South Africa choked from 30 needed off 30... Bumrah and Arshdeep were magnificent. Tears.", date: '2024-06-30', likes: 678 },
  { id: 'r014', userId: 'u004', matchId: 'm019', rating: 5, text: "I was at the Barbados fan park. When Suryakumar took that boundary catch, the whole island shook. India's 11-year ICC trophy drought ended in the most dramatic way possible.", date: '2024-07-01', likes: 543 },
  
  // IND vs PAK T20 WC 2024
  { id: 'r015', userId: 'u005', matchId: 'm020', rating: 4.5, text: "Low-scoring thriller on a tricky New York pitch. Bumrah was unplayable — 3/14 at 4.66 economy. The pitch was questionable but the contest was incredible. Pure Test match cricket in a T20.", date: '2024-06-10', likes: 234 },
  
  // Virat century
  { id: 'r016', userId: 'u002', matchId: 'm002', rating: 4.5, text: "113 off 52 balls at the Chinnaswamy. Vintage Kohli. Every shot was straight out of a coaching manual but hit with rage. KKR had no answer.", date: '2025-04-16', likes: 312 },
  
  // Ashes
  { id: 'r017', userId: 'u003', matchId: 'm011', rating: 4.5, text: "Smith at Edgbaston is always a treat. The man averages 140+ at this ground, it's absurd. Both teams fought hard but Australia's top order was just too strong in the 4th innings chase.", date: '2025-06-23', likes: 178 },
  { id: 'r018', userId: 'u003', matchId: 'm012', rating: 4, text: "Broad at Lord's. The man lives for the big stage. That spell in the second innings was vintage — seam movement, bounce, wickets. Root anchored the first innings beautifully too.", date: '2025-07-07', likes: 156 }
];

// ============================================
// DIARY ENTRIES (for current user)
// ============================================
const DIARY_ENTRIES = [
  { matchId: 'm009', dateWatched: '2026-02-27', howWatched: 'Live on TV', rating: 4.5, take: "What a way to win it! Bumrah was Player of the Tournament for a reason.", tags: ['Classic', 'Must-watch'] },
  { matchId: 'm008', dateWatched: '2026-02-22', howWatched: 'Live on TV', rating: 4.5, take: "Incredible semi-final. Travis Head is a big-game player.", tags: ['Thriller'] },
  { matchId: 'm007', dateWatched: '2026-02-15', howWatched: 'Live on TV', rating: 5, take: "IND vs PAK never disappoints. SKY was incredible!", tags: ['Thriller', 'Classic', 'Rivalry'] },
  { matchId: 'm010', dateWatched: '2026-02-20', howWatched: 'Highlights Only', rating: 3.5, take: "Solid game. Boult still has it.", tags: ['Thriller'] },
  { matchId: 'm006', dateWatched: '2025-05-08', howWatched: 'Live on TV', rating: 4.5, take: "PBKS actually chased this down! Rohit's 92 was in vain sadly.", tags: ['Upset', 'Thriller'] },
  { matchId: 'm005', dateWatched: '2025-05-02', howWatched: 'At Stadium', rating: 5, take: "Was at Chepauk for this. Electric atmosphere. Dhoni's cameo was vintage. Kohli chased it down though.", tags: ['Classic', 'Last-ball finish'] },
  { matchId: 'm001', dateWatched: '2025-04-12', howWatched: 'Live on TV', rating: 4.5, take: "Wankhede classic. MI vs CSK never gets old. Bumrah was sensational.", tags: ['Thriller'] },
  { matchId: 'm002', dateWatched: '2025-04-15', howWatched: 'Replay', rating: 4, take: "Kohli 113! Vintage innings.", tags: ['Century', 'Batting paradise'] },
  { matchId: 'm011', dateWatched: '2025-06-22', howWatched: 'Live on TV', rating: 4, take: "Smith loves Edgbaston. Australia's 4th innings chase was nervy but class.", tags: ['Classic', 'Ashes drama'] },
  { matchId: 'm012', dateWatched: '2025-07-06', howWatched: 'Live on TV', rating: 4, take: "Broad at Lord's. A farewell performance that'll live forever.", tags: ['Bowling masterclass'] },
  { matchId: 'm013', dateWatched: '2025-09-14', howWatched: 'Live on TV', rating: 3.5, take: "Gill's century was classy. India's bowling sealed it.", tags: ['Century'] },
  { matchId: 'm019', dateWatched: '2024-06-29', howWatched: 'Live on TV', rating: 5, take: "INDIA WIN THE WORLD CUP! Kohli's last T20I was a World Cup winning innings. Tears. Pure tears.", tags: ['Classic', 'Emotional', 'Must-watch'] },
  { matchId: 'm020', dateWatched: '2024-06-09', howWatched: 'Live on TV', rating: 4.5, take: "Low scoring but incredibly tense. Bumrah was the difference. That New York pitch was wild.", tags: ['Thriller', 'Rivalry'] },
  { matchId: 'm015', dateWatched: '2019-07-14', howWatched: 'Live on TV', rating: 5, take: "THE greatest ODI ever. Super Over. Boundary count. Madness.", tags: ['Greatest match ever', 'Must-watch'] },
  { matchId: 'm016', dateWatched: '2011-04-02', howWatched: 'Live on TV', rating: 5, take: "I was 10 years old. The night India won the World Cup. Dhoni's six is burned into my memory forever.", tags: ['Classic', 'Emotional'] },
  { matchId: 'm017', dateWatched: '2019-08-25', howWatched: 'Replay', rating: 5, take: "Stokes. Headingley. Nothing more to say.", tags: ['Classic', 'Must-watch'] },
  { matchId: 'm021', dateWatched: '2024-05-26', howWatched: 'Live on TV', rating: 3, take: "One-sided final but KKR were brilliant all season.", tags: ['One-sided'] },
  { matchId: 'm003', dateWatched: '2025-04-18', howWatched: 'Highlights Only', rating: 3, take: "Fraser-McGurk looked good. SRH's bowling needs work.", tags: [] }
];

// ============================================
// LISTS (Community-curated)
// ============================================
const LISTS = [
  {
    id: 'l001',
    title: 'Greatest IPL Finals',
    creator: 'u004',
    description: 'The most memorable IPL finals ever played — from the first season to the latest.',
    matchIds: ['m005', 'm001', 'm021'],
    likes: 2341
  },
  {
    id: 'l002',
    title: 'Best Ashes Tests of the 21st Century',
    creator: 'u003',
    description: 'The Ashes at its very best. Tests that defined eras and made legends.',
    matchIds: ['m017', 'm011', 'm012'],
    likes: 1876
  },
  {
    id: 'l003',
    title: 'T20 Thrillers That Went to the Last Ball',
    creator: 'u005',
    description: 'Heart-stopping T20s where the result was decided on the very last delivery.',
    matchIds: ['m001', 'm005', 'm006', 'm008'],
    likes: 3102
  },
  {
    id: 'l004',
    title: 'Best ODI World Cup Matches',
    creator: 'u002',
    description: 'World Cup matches that transcended sport and became cultural moments.',
    matchIds: ['m015', 'm016'],
    likes: 4567
  },
  {
    id: 'l005',
    title: 'Matches Where the Underdog Won',
    creator: 'u005',
    description: 'David vs Goliath moments in cricket. When the script was torn apart.',
    matchIds: ['m017', 'm006', 'm010'],
    likes: 1543
  },
  {
    id: 'l006',
    title: 'Bumrah Masterclasses',
    creator: 'u001',
    description: 'Every match where Jasprit Bumrah proved he\'s the greatest fast bowler of this generation.',
    matchIds: ['m001', 'm007', 'm009', 'm019', 'm020'],
    likes: 2890
  },
  {
    id: 'l007',
    title: 'India vs Pakistan — Every ICC Clash',
    creator: 'u004',
    description: 'The greatest rivalry in world cricket. Every ICC tournament clash between the archrivals.',
    matchIds: ['m007', 'm020'],
    likes: 5234
  },
  {
    id: 'l008',
    title: 'Virat Kohli\'s Greatest Innings',
    creator: 'u002',
    description: 'From the 2016 Mohali masterclass to the 2024 WC Final — King Kohli\'s finest hours.',
    matchIds: ['m002', 'm019', 'm005'],
    likes: 4012
  }
];

// ============================================
// ACTIVITY FEED
// ============================================
const ACTIVITY_FEED = [
  { userId: 'u002', action: 'logged', matchId: 'm009', rating: 4.5, time: '2 hours ago', review: null },
  { userId: 'u004', action: 'reviewed', matchId: 'm007', rating: 5, time: '3 hours ago', review: "IND vs PAK in a World Cup is always different gravy. SKY was immense!" },
  { userId: 'u003', action: 'logged', matchId: 'm008', rating: 4.5, time: '5 hours ago', review: null },
  { userId: 'u005', action: 'reviewed', matchId: 'm009', rating: 4.5, time: '6 hours ago', review: "Bumrah's spell in the final was the best bowling performance in a T20 WC final. Period." },
  { userId: 'u001', action: 'logged', matchId: 'm009', rating: 4.5, time: '8 hours ago', review: null },
  { userId: 'u004', action: 'reviewed', matchId: 'm005', rating: 5, time: '1 day ago', review: "CSK vs RCB is always box office. Dhoni's cameo was vintage. Kohli chased it down though." },
  { userId: 'u002', action: 'logged', matchId: 'm002', rating: 4.5, time: '1 day ago', review: null },
  { userId: 'u003', action: 'reviewed', matchId: 'm011', rating: 4.5, time: '2 days ago', review: "Smith at Edgbaston is always a treat. The man averages 140+ at this ground." },
  { userId: 'u005', action: 'logged', matchId: 'm001', rating: 4, time: '3 days ago', review: null },
  { userId: 'u001', action: 'reviewed', matchId: 'm019', rating: 5, time: '3 days ago', review: "Still can't believe India won. Kohli's last T20I. Perfect ending." },
  { userId: 'u004', action: 'created_list', listId: 'l007', time: '4 days ago', review: null },
  { userId: 'u002', action: 'reviewed', matchId: 'm017', rating: 5, time: '5 days ago', review: "Rewatched Headingley. Still gives me chills. Stokes is not human." }
];

// ============================================
// BADGES DEFINITIONS
// ============================================
const BADGES = {
  test_purist: { name: 'Test Purist', desc: 'Logged 10+ Test matches', icon: '🏛️', requirement: 10, format: 'Test' },
  ipl_addict: { name: 'IPL Addict', desc: 'Logged 30+ IPL matches', icon: '🏏', requirement: 30 },
  wc_warrior: { name: 'World Cup Warrior', desc: 'Logged all WC matches', icon: '🏆', requirement: 'all_wc' },
  centurion: { name: 'Centurion Watcher', desc: 'Logged 100+ matches', icon: '💯', requirement: 100 },
  night_owl: { name: 'Night Owl', desc: 'Logged a match watched after midnight', icon: '🦉', requirement: 'special' },
  globe_trotter: { name: 'Globe Trotter', desc: 'Logged matches in 5+ venues', icon: '🌍', requirement: 5 }
};

// ============================================
// WATCH TAGS
// ============================================
const WATCH_TAGS = [
  'Thriller', 'Upset', 'Classic', 'Boring', 'Last-ball finish',
  'Century', 'Hat-trick', 'Batting paradise', 'Bowling masterclass',
  'Chase masterclass', 'One-sided', 'Comeback', 'Must-watch',
  'Emotional', 'Rivalry', 'Debut special', 'Spin battle', 'Rain affected'
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a match by ID
 */
function getMatch(id) {
  return MATCHES.find(m => m.id === id);
}

/**
 * Get a user by ID
 */
function getUser(id) {
  return USERS.find(u => u.id === id);
}

/**
 * Get reviews for a match
 */
function getMatchReviews(matchId) {
  return REVIEWS.filter(r => r.matchId === matchId);
}

/**
 * Get team display info
 */
function getTeam(code) {
  return TEAMS[code] || { name: code, short: code, color: '#666' };
}

/**
 * Get tournament info
 */
function getTournament(id) {
  return TOURNAMENTS.find(t => t.id === id);
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Format date short
 */
function formatDateShort(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

/**
 * Get the month-year string for grouping
 */
function getMonthYear(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Sort matches by various criteria
 */
function sortMatches(matches, criteria) {
  const sorted = [...matches];
  switch (criteria) {
    case 'rating':
      return sorted.sort((a, b) => b.communityRating - a.communityRating);
    case 'logs':
      return sorted.sort((a, b) => b.totalLogs - a.totalLogs);
    case 'date':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return sorted;
  }
}

/**
 * Filter matches
 */
function filterMatches(matches, filters) {
  return matches.filter(m => {
    if (filters.format && filters.format !== 'All' && m.format !== filters.format) return false;
    if (filters.tournament && filters.tournament !== 'All' && m.tournament !== filters.tournament) return false;
    if (filters.team && filters.team !== 'All' && m.team1 !== filters.team && m.team2 !== filters.team) return false;
    if (filters.year && filters.year !== 'All' && !m.date.startsWith(filters.year)) return false;
    return true;
  });
}
