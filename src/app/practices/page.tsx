import Link from 'next/link'
import practices from '@/data/practices.json'

const DIFFICULTY_MAP = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-700' },
  intermediate: { label: '进阶', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: '高级', color: 'bg-red-100 text-red-700' },
}

export default function PracticesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="section-title mb-2">⚡ 实战练习</h1>
        <p className="text-slate-500">边学边做，每个练习都包含完整步骤和可直接使用的提示词模板</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {practices.map((p) => {
          const diff = DIFFICULTY_MAP[p.difficulty as keyof typeof DIFFICULTY_MAP]
          return (
            <Link
              key={p.id}
              href={`/practices/${p.id}`}
              className="card group overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${p.coverBg} p-6 flex items-center gap-4`}>
                <span className="text-5xl">{p.cover}</span>
                <div className="text-white">
                  <h2 className="font-bold text-lg leading-snug">{p.title}</h2>
                  <p className="text-white/80 text-sm mt-1">{p.subtitle}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-600 text-sm line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className="tag bg-slate-100 text-slate-600 text-xs">{p.category}</span>
                  <span className={`tag text-xs ${diff.color}`}>{diff.label}</span>
                  <span className="tag bg-blue-100 text-blue-700 text-xs">⏱ {p.timeMinutes}分钟</span>
                  <span className="tag bg-purple-100 text-purple-700 text-xs">
                    {p.workflow.length}个步骤
                  </span>
                </div>
                <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-800 font-medium">
                  开始练习 →
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Tip */}
      <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
        <p className="text-slate-600 text-sm">
          💡 每个练习都提供了可以直接复制使用的提示词模板，无需任何AI基础，照着步骤做就行。
        </p>
        <Link href="/docs" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
          如果想系统学习，可以先看学习文章 →
        </Link>
      </div>
    </div>
  )
}
