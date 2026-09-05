import { NavLink, Route, Routes } from 'react-router-dom'
import { useAppData } from './lib/appData'
import { useTheme } from './lib/useTheme'
import { ScrollToTop } from './components/ScrollToTop'
import { cx } from './components/ui'
import Dashboard from './routes/Dashboard'
import NewSession from './routes/NewSession'
import SessionView from './routes/Session'
import ZenFocus from './routes/ZenFocus'
import Review from './routes/Review'
import History from './routes/History'
import SettingsView from './routes/Settings'

const NAV = [
  { to: '/', label: 'Today', end: true },
  { to: '/new', label: 'Write' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
]

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-dvh">
      <nav className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3 sm:px-6">
          <span className="mr-auto hidden font-display text-lg tracking-tight sm:block">Essay Trainer</span>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'relative rounded-lg px-2.5 py-1.5 text-sm transition-colors sm:px-3',
                  'after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:rounded-full',
                  'after:transition-transform after:duration-300 after:ease-[var(--ease-soft)]',
                  isActive
                    ? 'font-medium text-ink after:scale-x-100 after:bg-accent'
                    : 'text-ink-soft hover:text-ink after:scale-x-0 after:bg-transparent',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </div>
  )
}

export default function App() {
  const { data } = useAppData()
  useTheme(data.settings.theme)

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Zen mode deliberately escapes the chrome — it is the whole screen. */}
      <Route path="/zen/:sessionId" element={<ZenFocus />} />
      <Route
        path="*"
        element={
          <Chrome>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new" element={<NewSession />} />
              <Route path="/write/:sessionId" element={<SessionView />} />
              <Route path="/review/:sessionId" element={<Review />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </Chrome>
        }
      />
      </Routes>
    </>
  )
}
