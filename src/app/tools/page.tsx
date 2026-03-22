import Link from 'next/link'
import tools from '@/data/tools.json'
import categories from '@/data/categories.json'

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="section-title mb-2">🔧 AI工具库</h1>
        <p className="text-slate-500">精选 {tools.length} 款适合普通人的AI工具，免费为主，无需技术背景</p>
      </div>

      {/* By Category */}
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.id)
        if (catTools.length === 0) return null
        return (
          <section key={cat.id} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className={`card p-5 border ${tool.color} group`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.featured && (
                          <span className="tag bg-amber-100 text-amber-700 text-xs">⭐ 推荐</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{tool.nameCn}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-2">{tool.shortDesc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`tag text-xs ${
                      tool.pricing === 'free'
                        ? 'bg-green-100 text-green-700'
                        : tool.pricing === 'freemium'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {tool.pricing === 'free' ? '✅ 完全免费' : tool.pricing === 'freemium' ? '🆓 免费可用' : '💳 付费'}
                    </span>
                    <span className={`tag text-xs ${
                      tool.origin === 'china'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tool.origin === 'china' ? '🇨🇳 国产' : '🌐 国际'}
                    </span>
                    <span className={`tag text-xs ${
                      tool.difficulty === 'beginner'
                        ? 'bg-green-50 text-green-600'
                        : tool.difficulty === 'intermediate'
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {tool.difficulty === 'beginner' ? '👶 入门' : tool.difficulty === 'intermediate' ? '🎯 进阶' : '🚀 高级'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
