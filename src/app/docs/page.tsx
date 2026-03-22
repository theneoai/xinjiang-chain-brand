import Link from 'next/link'
import docs from '@/data/docs.json'

const CATEGORIES = ['全部', '方法论', '案例', '工作流', '工具指南']

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="section-title mb-2">📖 学习文章</h1>
        <p className="text-slate-500">深度解读AI使用方法，案例丰富，适合各职业人群阅读</p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <span key={cat} className="px-4 py-1.5 rounded-full border border-slate-200 text-sm text-slate-600 bg-white cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors">
            {cat}
          </span>
        ))}
      </div>

      {/* Featured */}
      {docs.filter((d) => d.featured).length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">⭐ 精选推荐</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {docs.filter((d) => d.featured).map((doc) => (
              <Link key={doc.id} href={`/docs/${doc.slug}`} className="card p-5 group flex gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${doc.coverBg} flex items-center justify-center text-2xl shrink-0`}>
                  {doc.cover}
                </div>
                <div>
                  <span className="tag bg-slate-100 text-slate-600 text-xs">{doc.category}</span>
                  <h3 className="font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{doc.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2">📖 约{doc.readMinutes}分钟 · {doc.difficulty === 'beginner' ? '入门' : doc.difficulty === 'intermediate' ? '进阶' : '高级'}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All articles */}
      <section>
        <h2 className="text-lg font-semibold text-slate-700 mb-4">所有文章</h2>
        <div className="space-y-4">
          {docs.map((doc) => (
            <Link key={doc.id} href={`/docs/${doc.slug}`} className="card p-5 group flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.coverBg} flex items-center justify-center text-xl shrink-0`}>
                {doc.cover}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                  {doc.featured && <span className="tag bg-amber-100 text-amber-700 text-xs">⭐ 推荐</span>}
                </div>
                <p className="text-sm text-slate-500 mt-0.5 truncate">{doc.summary}</p>
              </div>
              <div className="shrink-0 text-right text-xs text-slate-400">
                <div>{doc.category}</div>
                <div className="mt-1">{doc.readMinutes}分钟</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
