import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  abandonSession as abandonSessionAction,
  finishSession as finishSessionAction,
  startSession as startSessionAction,
  toggleBookmark as toggleBookmarkAction,
  type FinishArgs,
  type StartArgs,
} from './actions'
import { LocalStore } from './storage/local'
import type { AppData, Session, Settings } from './types'

const store = new LocalStore()

interface AppDataValue {
  data: AppData
  startSession: (args: StartArgs) => Session
  finishSession: (sessionId: string, args: FinishArgs) => void
  abandonSession: (sessionId: string) => void
  toggleBookmark: (promptId: string) => void
  updateSettings: (patch: Partial<Settings>) => void
  replaceAll: (data: AppData) => void
}

const AppDataContext = createContext<AppDataValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => store.load())

  const commit = useCallback((next: AppData) => {
    store.save(next)
    setData(next)
    return next
  }, [])

  const value = useMemo<AppDataValue>(
    () => ({
      data,
      startSession: (args) => {
        const result = startSessionAction(store.load(), args)
        commit(result.data)
        return result.session
      },
      finishSession: (sessionId, args) =>
        void commit(finishSessionAction(store.load(), sessionId, args)),
      abandonSession: (sessionId) => void commit(abandonSessionAction(store.load(), sessionId)),
      toggleBookmark: (promptId) => void commit(toggleBookmarkAction(store.load(), promptId)),
      updateSettings: (patch) => {
        const current = store.load()
        commit({ ...current, settings: { ...current.settings, ...patch } })
      },
      replaceAll: (next) => void commit(next),
    }),
    [data, commit],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData(): AppDataValue {
  const value = useContext(AppDataContext)
  if (!value) throw new Error('useAppData must be used inside AppDataProvider')
  return value
}
