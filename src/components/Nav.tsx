'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'AI工具库', href: '/tools', icon: '🔧' },
  { label: '最佳实践', href: '/practices', icon: '⚡' },
  { label: '学习文章', href: '/docs', icon: '📖' },
  { label: '职业指南', href: '/onboarding', icon: '🎯' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <span className="text-2xl">🤖</span>
          <span className="hidden sm:inline">AI使用指南</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Link
          href="/onboarding"
          className="btn-primary text-sm py-2 px-4 hidden md:inline-flex"
        >
          🎯 找适合我的AI
        </Link>
      </div>
    </header>
  )
}
