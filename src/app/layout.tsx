import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'AI工具使用指南 | 普通人的AI入门手册',
  description: '面向各行各业普通人的AI工具学习平台。从农民到教师，从学生到创业者，找到适合你的AI工具，轻松上手，提升效率。',
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
            <p className="text-sm">AI工具使用指南 · 让每个人都能用好AI</p>
            <p className="text-xs mt-2 text-slate-500">内容持续更新 · 版权所有</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
