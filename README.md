# 🏏 CricBoxd — The Letterboxd for Cricket

> **Every match tells a story. Log yours.**

CricBoxd is a social diary platform for cricket fans. Log matches you've watched, rate them, write reviews, build your cricket identity, and discover the greatest games ever played. Think Letterboxd — but for the gentleman's game.

**No one has built this. Until now.**

While there are dozens of cricket apps for live scores (Cricbuzz, ESPNCricinfo) and scoring your own matches (CricHeroes), there is **zero** dedicated platform for the billions of cricket **spectators** who want to track, rate, and discuss the matches they watch. CricBoxd fills that gap.

---

## ✨ Features

### 🏟️ Match Discovery
- Browse matches across IPL, ICC tournaments, Ashes, bilateral series, and more
- Filter by **format** (Test / ODI / T20), **tournament**, **team**
- Sort by community rating, most logged, or date
- Each match shows teams, scores, result, venue, format badge, community rating, and log count

### 📓 Match Diary
- Log every match you watch — live at the stadium, on TV, replay, or highlights
- Rate matches using an interactive **cricket stump rating system** (1-5 stumps)
- Write your "take" — anything from a quick reaction to a full essay
- Tag matches: *Thriller*, *Upset*, *Classic*, *Last-ball finish*, *Century*, *Hat-trick*
- View your diary chronologically with format filters

### 📊 Personal Stats
- Matches logged, hours watched, average rating
- Format breakdown (Test/ODI/T20) with donut chart
- Top teams watched
- Monthly tracking

### 👤 Profile & Identity
- **Four Favorite Matches** displayed prominently (like Letterboxd's four favorite films)
- Teams you support
- **Badges**: *Test Purist* (10+ Tests), *IPL Addict* (30+ IPL matches), *World Cup Warrior*, *Centurion Watcher* (100+ matches)
- Your reviews and diary entries

### 📋 Community Lists
- Curated collections: "Greatest IPL Finals", "Best Ashes Tests", "T20 Thrillers That Went to the Last Ball"
- Player-focused lists: "Bumrah Masterclasses", "Virat Kohli's Greatest Innings"
- Event-focused: "India vs Pakistan — Every ICC Clash", "Best ODI World Cup Matches"

### 🔍 Search
- Search across matches, teams, series, and users
- Autocomplete suggestions

### 🛡️ Spoiler Shield
A prominent toggle that **blurs all match results and scores** across the entire app. Perfect for fans in different time zones watching replays. Hover or click to reveal individual results.

### 🏏 Cricket-Themed Design
- **Stump rating system** instead of generic stars — animated cricket stumps
- **Pitch report** tags showing what kind of viewing experience a match was
- Cricket micro-details: stump dividers, seam-pattern borders, format badges
- Dark, premium aesthetic inspired by Letterboxd meets Wisden Almanack

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5 / CSS3 / JavaScript (ES6+) |
| Routing | Hash-based SPA (`#home`, `#matches`, `#diary`, `#profile`, `#lists`) |
| Charts | Chart.js (CDN) |
| Fonts | Playfair Display + Source Sans 3 (Google Fonts) |
| State | In-memory JavaScript (no localStorage dependency) |
| Deployment | Static files — deploy anywhere |

### Why Vanilla JS?
This is a deliberate architectural choice for the MVP. Zero build tools, zero dependencies, instant load times, and complete control over every pixel. The codebase is modular and well-commented, ready to be ported to React/Next.js when the time comes.

---

## 📁 Project Structure

```
cricboxd/
├── index.html      # Main HTML shell, modals, navigation
├── style.css       # 2,200+ lines — full design system with CSS variables
├── data.js         # 790+ lines — matches, users, reviews, lists, activity feed
├── app.js          # 1,400+ lines — router, components, interactions
└── README.md
```

**Total: ~4,600 lines of production code**

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/JithendraNara/cricboxd.git
cd cricboxd

# Open in browser (no build step needed)
open index.html
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 📈 The Market Opportunity

### Why Cricket?
- **2.5 billion+** cricket fans worldwide (ICC estimates)
- **India alone** has 1 billion+ fans — largest single-sport audience in any country
- Strong diaspora communities in US, UK, Australia, UAE, Canada watching remotely
- The T20 franchise explosion (IPL, BBL, SA20, MLC, The Hundred) means fans watch more matches than ever

### The Gap
| What Exists | What's Missing |
|-------------|---------------|
| Live score apps (Cricbuzz, ESPNCricinfo) | No personal match diary |
| Player scoring apps (CricHeroes — 40M users) | Built for players, not spectators |
| General sports rating (RateGame) | Cricket not yet supported |
| Football-specific (Futez, Goalboxd) | No cricket equivalent |

### Comparable: Letterboxd
- Founded 2011 in New Zealand (CricBoxd: founded 2026)
- 26 million users by 2026
- Valued at $50-60M after Tiny acquisition
- Proved the "social diary" model creates intense engagement
- Cricket has a **larger** potential audience than global film

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- [x] Match discovery with filters and sorting
- [x] Interactive stump rating system
- [x] Match logging with watch method, rating, tags
- [x] Personal diary with stats
- [x] User profiles with favorites and badges
- [x] Community lists
- [x] Spoiler shield
- [x] Search
- [x] Responsive design

### Phase 2: Backend & Auth
- [ ] Node.js / Python backend (FastAPI or Express)
- [ ] PostgreSQL database
- [ ] User authentication (Google, Apple OAuth)
- [ ] Real user accounts and persistent data

### Phase 3: Live Data
- [ ] CricSheet integration (free ball-by-ball data)
- [ ] ESPNCricinfo / Cricbuzz data pipeline
- [ ] Auto-populated match database
- [ ] Live match notifications

### Phase 4: Social
- [ ] Follow system with activity feed
- [ ] Comments on reviews
- [ ] Like/react to takes
- [ ] Share to Twitter/X, WhatsApp

### Phase 5: Scale
- [ ] React Native mobile app (iOS + Android)
- [ ] "Where to Watch" streaming availability (JioCinema, Willow, ESPN+)
- [ ] Player-of-the-Match community voting
- [ ] Series tracking (follow an entire IPL season)
- [ ] Innings-level ratings
- [ ] AI-powered match recommendations
- [ ] API for third-party integrations

---

## 🎨 Design Philosophy

CricBoxd's aesthetic is **dark, premium, and editorial** — deliberately avoiding the loud, sporty ESPN/Star Sports look. The design draws from:

- **Letterboxd** — Dark social diary UI, community-first design
- **Wisden Cricketers' Almanack** — Classic cricket heritage, editorial authority
- **Premium cricket culture** — Amber/gold accents evoking willow and leather

### Color System
```css
--bg-primary: #0d1117      /* Deep navy-charcoal */
--bg-card: #161b22         /* Elevated surface */
--accent-gold: #f5a623     /* Primary accent — amber/gold */
--accent-warm: #d4a843     /* Secondary accent — warm gold */
--text-primary: #e6edf3    /* Primary text */
--text-secondary: #8b949e  /* Secondary text */
```

### Typography
- **Playfair Display** — Headings (editorial, classic serif)
- **Source Sans 3** — Body text (clean, readable sans-serif)

---

## 🤝 Contributing

This project is in its early stages and contributions are welcome. Here's how you can help:

1. **Cricket Data** — Help expand the match database with accurate historical data
2. **UI/UX** — Suggest improvements to the interface
3. **Backend** — Help build the Node.js/Python API
4. **Mobile** — React Native or Flutter app development
5. **Cricket APIs** — Integration with CricSheet, ESPNCricinfo data

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 💡 Inspiration

CricBoxd is inspired by [Letterboxd](https://letterboxd.com), the social network for film lovers. We believe cricket fans deserve the same beautiful, community-driven experience for tracking and discussing the matches they watch.

*"Cricket is the only game where you can spend five days watching and it can still end in a draw — and it's the most beautiful thing you've ever seen."*

---

**Built with 🏏 by [@JithendraNara](https://github.com/JithendraNara)**
