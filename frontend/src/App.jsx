// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App



import { useState } from 'react'
import {
  ArrowRight,
  Search,
  Menu,
  X,
  Landmark,
  Compass,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Layers3,
  Clock3,
  Globe2,
  ChevronRight,
} from 'lucide-react'
import './App.css'

const artifacts = [
  {
    id: 1,
    title: 'The Ancient Terracotta Vessel',
    period: '2500 BCE · Indus Valley',
    category: 'Pottery',
    image:
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    title: 'The Bronze Age Sculpture',
    period: '2000 BCE · Ancient India',
    category: 'Sculpture',
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    title: 'Manuscripts of Another Era',
    period: '12th Century · India',
    category: 'Manuscripts',
    image:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    title: 'The Art of Ancient Sculpture',
    period: '8th Century · South Asia',
    category: 'Sculpture',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85',
  },
]

const heritageSites = [
  {
    name: 'The Ancient Stone Temple',
    location: 'India · Historic Architecture',
    image:
      'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1100&q=85',
  },
  {
    name: 'A Palace of Timeless Stories',
    location: 'India · Royal Heritage',
    image:
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1100&q=85',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArtifact, setSelectedArtifact] = useState(null)
  const [artifactsData, setArtifactsData] = useState(artifacts)
  const [sitesData, setSitesData] = useState(heritageSites)
  const [apiStatus, setApiStatus] = useState('sample')

  const categories = ['All', 'Pottery', 'Sculpture', 'Manuscripts']

  const filteredArtifacts = artifactsData.filter((artifact) => {
    const matchesSearch =
      `${artifact.title} ${artifact.period} ${artifact.category}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || artifact.category === activeCategory

    return matchesSearch && matchesCategory
  })

  async function loadMuseumData() {
    try {
      const [artifactResponse, siteResponse] = await Promise.all([
        fetch('/api/artifacts'),
        fetch('/api/heritage-sites'),
      ])

      if (!artifactResponse.ok || !siteResponse.ok) {
        throw new Error('API request failed')
      }

      const artifactResult = await artifactResponse.json()
      const siteResult = await siteResponse.json()

      const artifactList = Array.isArray(artifactResult)
        ? artifactResult
        : artifactResult.data || artifactResult.artifacts || []

      const siteList = Array.isArray(siteResult)
        ? siteResult
        : siteResult.data || siteResult.heritageSites || []

      setArtifactsData(
        artifactList.length
          ? artifactList.map((item) => ({
              ...item,
              id: item._id || item.id,
              title: item.title || 'Untitled Artifact',
              period: [item.period, item.origin].filter(Boolean).join(' · '),
              category: item.category || 'Other',
              image:
                item.imageUrl ||
                'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85',
            }))
          : [],
      )

      setSitesData(
        siteList.map((item) => ({
          ...item,
          name: item.name || 'Untitled Heritage Site',
          location: [item.location, item.state].filter(Boolean).join(', '),
          image:
            item.imageUrl ||
            'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1100&q=85',
        })),
      )

      setApiStatus('connected')
    } catch {
      setApiStatus('sample')
    }
  }

  function openArtifacts() {
    document.getElementById('artifacts')?.scrollIntoView({
      behavior: 'smooth',
    })
    setMenuOpen(false)
  }

  function openSites() {
    document.getElementById('heritage')?.scrollIntoView({
      behavior: 'smooth',
    })
    setMenuOpen(false)
  }

  return (
    <div className="museum">
      <div className="announcement">
        <span>DISCOVER THE STORIES THAT SHAPED OUR WORLD</span>
        <ArrowRight size={14} />
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Aeternum home">
          <span className="brand-symbol">
            <Landmark size={25} strokeWidth={1.4} />
          </span>
          <span>
            <strong>AETERNUM</strong>
            <small>MUSEUM & HERITAGE</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#artifacts" onClick={() => setMenuOpen(false)}>
            Collections
          </a>
          <a href="#heritage" onClick={() => setMenuOpen(false)}>
            Heritage Sites
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            Our Mission
          </a>
        </nav>

        <button className="nav-cta" onClick={openArtifacts}>
          Explore Collection <ArrowUpRight size={16} />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=2200&q=90"
            alt="Artwork in a museum gallery"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="eyebrow light-eyebrow">
              <span /> PRESERVING THE PAST, INSPIRING THE FUTURE
            </div>
            <h1>
              Every artifact
              <br />
              holds a <em>story.</em>
            </h1>
            <p>
              Journey through centuries of human creativity, culture, and
              heritage. Discover the treasures that connect us to our past.
            </p>
            <div className="hero-actions">
              <button className="button-gold" onClick={openArtifacts}>
                Explore the Collection <ArrowRight size={17} />
              </button>
              <button className="button-outline" onClick={openSites}>
                Discover Heritage <Compass size={17} />
              </button>
            </div>
          </div>

          <div className="hero-bottom">
            <span>AN OPEN WINDOW INTO HISTORY</span>
            <span>EST. FOR THE CURIOUS&nbsp; · &nbsp;2026</span>
          </div>

          <div className="hero-index">
            <span>01</span>
            <span />
            <span>03</span>
          </div>
        </section>

        <section className="intro-strip" id="about">
          <div className="intro-label">
            <span className="eyebrow">OUR PURPOSE</span>
            <h2>History, kept alive.</h2>
          </div>
          <p>
            We bring the world's cultural treasures closer to you, preserving
            the stories, artistry, and traditions that define our shared
            human experience.
          </p>
          <a href="#heritage" className="text-link">
            Our mission <ArrowUpRight size={16} />
          </a>
        </section>

        <section className="collection-section section-pad" id="artifacts">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A WINDOW INTO THE PAST</span>
              <h2>
                Explore the <em>collection.</em>
              </h2>
              <p className="section-description">
                Objects of wonder. Stories of civilizations. A legacy worth
                discovering.
              </p>
            </div>
            <button className="outline-button" onClick={loadMuseumData}>
              <Layers3 size={16} />
              {apiStatus === 'connected' ? 'Refresh collection' : 'Load museum records'}
            </button>
          </div>

          <div className="collection-toolbar">
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? 'category-chip active'
                      : 'category-chip'
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search artifacts..."
                aria-label="Search artifacts"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="clear-search"
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          <div className="collection-grid">
            {filteredArtifacts.map((artifact, index) => (
              <article className="artifact-card" key={artifact.id}>
                <button
                  className="artifact-image-button"
                  onClick={() => setSelectedArtifact(artifact)}
                  aria-label={`View ${artifact.title}`}
                >
                  <img
                    src={artifact.image}
                    alt={artifact.title}
                    loading="lazy"
                  />
                  <span className="artifact-number">
                    0{index + 1}
                  </span>
                  <span className="artifact-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <div className="artifact-meta">
                  <span>{artifact.category}</span>
                  <span>
                    <Clock3 size={12} /> {artifact.period}
                  </span>
                </div>
                <button
                  className="artifact-title"
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  {artifact.title}
                </button>
                <button
                  className="discover-link"
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  Discover artifact <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>

          {filteredArtifacts.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <h3>No artifacts found</h3>
              <p>Try a different search or choose another category.</p>
              <button
                className="outline-button"
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All')
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="collection-footer">
            <span>
              {filteredArtifacts.length.toString().padStart(2, '0')} OBJECTS
              DISCOVERED
            </span>
            <button className="text-link" onClick={loadMuseumData}>
              {apiStatus === 'connected' ? 'Refresh records' : 'Explore database'}
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className="heritage-section" id="heritage">
          <div className="heritage-intro">
            <div>
              <span className="eyebrow light-eyebrow">
                BEYOND THE OBJECTS
              </span>
              <h2>
                Places that
                <br />
                <em>remember.</em>
              </h2>
            </div>
            <p>
              Step into the places where history unfolded. From ancient
              architecture to enduring cultural landmarks, explore the
              spaces that keep our heritage alive.
            </p>
          </div>

          <div className="heritage-grid">
            {sitesData.map((site, index) => (
              <article className="heritage-card" key={site._id || site.name}>
                <img src={site.image} alt={site.name} loading="lazy" />
                <div className="heritage-card-shade" />
                <div className="heritage-number">0{index + 1}</div>
                <div className="heritage-card-content">
                  <span>
                    <MapPin size={13} /> {site.location}
                  </span>
                  <h3>{site.name}</h3>
                  <button
                    className="heritage-discover"
                    onClick={() => {
                      setSelectedArtifact({
                        ...site,
                        title: site.name,
                        period: site.location,
                        category: 'Heritage Site',
                        image: site.image,
                      })
                    }}
                  >
                    Discover this place <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {sitesData.length === 0 && (
            <p className="no-sites">
              No heritage sites have been added to the database yet.
            </p>
          )}
        </section>

        <section className="visit-strip">
          <div className="visit-icon">
            <CalendarDays size={25} strokeWidth={1.4} />
          </div>
          <div>
            <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
            <h2>Curiosity is the beginning of discovery.</h2>
          </div>
          <button className="button-gold" onClick={openArtifacts}>
            Begin exploring <ArrowRight size={16} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-symbol">
            <Landmark size={24} strokeWidth={1.4} />
          </span>
          <span>
            <strong>AETERNUM</strong>
            <small>MUSEUM & HERITAGE</small>
          </span>
        </a>
        <p>Preserving yesterday. Inspiring tomorrow.</p>
        <span className="footer-copy">© 2026 AETERNUM · DIGITAL HERITAGE</span>
        <a className="back-top" href="#home" aria-label="Back to top">
          <ChevronRight size={18} />
        </a>
      </footer>

      {selectedArtifact && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedArtifact(null)}
        >
          <section
            className="artifact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedArtifact(null)}
              aria-label="Close details"
            >
              <X size={21} />
            </button>
            <img
              className="modal-image"
              src={selectedArtifact.image}
              alt={selectedArtifact.title}
            />
            <div className="modal-content">
              <span className="eyebrow">{selectedArtifact.category}</span>
              <h2 id="modal-title">{selectedArtifact.title}</h2>
              <p className="modal-period">{selectedArtifact.period}</p>
              <p>
                {selectedArtifact.description ||
                  'Explore this part of our cultural heritage. More historical details can be added to the museum records through the management system.'}
              </p>
              {selectedArtifact.origin && (
                <p>
                  <strong>Origin:</strong> {selectedArtifact.origin}
                </p>
              )}
              {selectedArtifact.material && (
                <p>
                  <strong>Material:</strong> {selectedArtifact.material}
                </p>
              )}
              <button
                className="button-gold"
                onClick={() => setSelectedArtifact(null)}
              >
                Return to collection <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App