// ─── AI Tool ───────────────────────────────────────────────────────────────
export interface AITool {
  id: string
  name: string
  nameCn: string
  nameEn: string
  category: string
  description: string
  shortDesc: string
  pricing: 'free' | 'freemium' | 'paid'
  pricingDetail: string
  origin: 'china' | 'international'
  website: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  useCases: string[]
  tags: string[]
  featured: boolean
  icon?: string
  color?: string
}

// ─── Best Practice Document ─────────────────────────────────────────────────
export interface DocArticle {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string          // 方法论 | 工作流 | 案例 | 工具指南
  tags: string[]
  readMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  cover: string             // emoji cover
  coverBg: string           // tailwind bg gradient class
  summary: string
  keyTakeaways: string[]
  sections: DocSection[]
  author: string
  publishedAt: string
  featured: boolean
}

export interface DocSection {
  heading: string
  body: string              // markdown-like rich text (parsed in component)
  tips?: string[]
  promptExample?: string
}

// ─── Voice Blog / Podcast ───────────────────────────────────────────────────
export interface PodcastEpisode {
  id: string
  title: string
  subtitle: string
  description: string
  host: string
  guests?: string[]
  durationMin: number
  tags: string[]
  cover: string             // emoji
  coverBg: string
  audioUrl?: string         // placeholder or real
  transcript?: string[]     // paragraph array for text version
  publishedAt: string
  featured: boolean
  highlights: string[]      // key points in the episode
}

// ─── Tutorial Video ─────────────────────────────────────────────────────────
export interface TutorialVideo {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  tags: string[]
  durationMin: number
  cover: string             // emoji
  coverBg: string
  videoUrl?: string         // YouTube/Bilibili embed URL
  platform: 'bilibili' | 'youtube' | 'other'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites: string[]
  steps: string[]           // what you'll learn
  publishedAt: string
  featured: boolean
  views?: number
}

// ─── Practice / Training Scenario ───────────────────────────────────────────
export interface PracticeScenario {
  id: string
  title: string
  subtitle: string
  category: string          // 写作 | 分析 | 策划 | 沟通 | 学习 | 运营
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  cover: string
  coverBg: string
  timeMinutes: number       // estimated completion time
  description: string       // the scenario context
  background: string        // the "without AI" situation
  objective: string         // what you need to accomplish
  workflow: WorkflowStep[]  // AI-powered workflow
  promptTemplates: PromptTemplate[]
  checklist: string[]
  expectedOutcome: string
  skillsLearned: string[]
}

export interface WorkflowStep {
  step: number
  title: string
  description: string
  action: string            // what the user does
  prompt?: string           // example prompt if applicable
  output?: string           // example output description
  timeMin: number
}

export interface PromptTemplate {
  label: string
  prompt: string
  description: string
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

// ─── Profession ──────────────────────────────────────────────────────────────
export interface Profession {
  id: string
  name: string
  icon: string
  description: string
}

// ─── User Profile ────────────────────────────────────────────────────────────
export type AgeGroup = 'teen' | 'young' | 'middle' | 'senior'

export interface UserProfile {
  ageGroup: AgeGroup
  profession: string
  interests: string[]
  completedAt: string
}

export const AGE_GROUPS: Record<AgeGroup, { label: string; range: string; icon: string }> = {
  teen:   { label: '青少年', range: '13-17岁', icon: '🎓' },
  young:  { label: '青年',   range: '18-35岁', icon: '💼' },
  middle: { label: '中年',   range: '36-55岁', icon: '🏠' },
  senior: { label: '老年',   range: '55岁以上', icon: '🌸' },
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  icon: string
  description: string
  color: string
}
