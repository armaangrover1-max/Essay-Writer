export type Lane = 'application' | 'argument' | 'creative'
export type Tier = 'sharpener' | 'standard' | 'full'
export type Vehicle = 'plane' | 'bus'
export type Mark = 'solid' | 'shaky' | 'missing'
export type SessionStatus = 'in-progress' | 'completed' | 'abandoned'
export type ThemePref = 'light' | 'dark' | 'system'

export const LANES: readonly Lane[] = ['application', 'argument', 'creative']
export const TIERS: readonly Tier[] = ['sharpener', 'standard', 'full']

export const LANE_LABEL: Record<Lane, string> = {
  application: 'Application',
  argument: 'Argument',
  creative: 'Creative',
}

export const TIER_LABEL: Record<Tier, string> = {
  sharpener: 'Sharpener',
  standard: 'Standard',
  full: 'Full essay',
}

export const TIER_MINUTES: Record<Tier, number> = {
  sharpener: 20,
  standard: 45,
  full: 90,
}

export interface PromptDepth {
  /** The strongest version of the position you probably argued against. */
  steelman: string
  /** Two to four real, findable sources. */
  goFurther: string[]
  /** The mistake this prompt reliably provokes. */
  trap: string
}

export interface Prompt {
  id: string
  lane: Lane
  tier: Tier
  title: string
  /** The framing: the position, the tension, the stakes. Shown up front. */
  seed: string
  /** The instruction itself. */
  task: string
  themes: string[]
  recommendedMinutes: number
  /** Withheld until the session is finished. */
  depth: PromptDepth
}

export interface Session {
  id: string
  promptId: string
  lane: Lane
  startedAt: string
  completedAt: string | null
  plannedMinutes: number
  elapsedSeconds: number
  vehicle: Vehicle
  marks: Record<string, Mark>
  photoId: string | null
  status: SessionStatus
}

export interface Settings {
  theme: ThemePref
  vehicle: Vehicle
  ambientSound: boolean
  weeklyGoal: number
  /** A WeatherPref from components/zen/weather; 'surprise' rolls per session. */
  weather: string
}

export interface AppData {
  version: 1
  sessions: Session[]
  /** Only prompts actually written. Passed-over prompts stay in the pool. */
  writtenPromptIds: string[]
  bookmarkedPromptIds: string[]
  settings: Settings
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  vehicle: 'plane',
  ambientSound: false,
  weeklyGoal: 3,
  weather: 'surprise',
}

export const EMPTY_DATA: AppData = {
  version: 1,
  sessions: [],
  writtenPromptIds: [],
  bookmarkedPromptIds: [],
  settings: DEFAULT_SETTINGS,
}
