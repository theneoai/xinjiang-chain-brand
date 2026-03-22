import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: '新疆连锁品牌 | AI工具使用指南',
  description: '新疆连锁品牌创业项目配套AI工具学习平台。面向创业者、零售从业者及各行各业普通人，精选最实用的AI工具，助力新疆特色连锁品牌发展。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm">新疆连锁品牌 · AI工具使用指南 · 让每个人都能用好AI</p>
            <p className="text-xs mt-2 text-slate-500">内容持续更新 · 版权所有</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
