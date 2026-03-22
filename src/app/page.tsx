import Link from 'next/link'
import tools from '@/data/tools.json'
import docs from '@/data/docs.json'
import practices from '@/data/practices.json'

const PROFESSIONS = [
  { icon: '🌾', label: '农民' },
  { icon: '👩‍🏫', label: '教师' },
  { icon: '👨‍💻', label: '程序员' },
  { icon: '💼', label: '创业者' },
  { icon: '🎒', label: '学生' },
  { icon: '⚕️', label: '医护' },
  { icon: '⚖️', label: '法律' },
  { icon: '🏭', label: '工厂' },
]

const STATS = [
  { num: '14+', label: '精选AI工具' },
  { num: '27+', label: '行业职业' },
  { num: '5+', label: '实战练习' },
  { num: '免费', label: '完全开放' },
]

export default function HomePage() {
  const featuredTools = tools.filter((t) => t.featured).slice(0, 4)
  const featuredDocs = docs.filter((d) => d.featured).slice(0, 3)
  const featuredPractices = practices.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <span>🤖</span>
            <span>面向普通人的AI学习平台</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            不懂技术，也能<br />
            <span className="text-cyan-300">用好AI工具</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            无论你是农民、教师、工人还是创业者，我们为你精选最实用的AI工具，
            配有手把手的使用教程，从零开始，30分钟上手。
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/onboarding" className="btn-primary text-base px-6 py-3">
              🎯 找适合我的AI工具
            </Link>
            <Link href="/tools" className="btn-secondary text-base px-6 py-3">
              浏览所有工具 →
            </Link>
          </div>

          {/* Profession tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {PROFESSIONS.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 text-sm text-blue-100"
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-blue-600">{s.num}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">🔧 推荐AI工具</h2>
            <p className="text-slate-500 mt-1">精选最适合普通人的AI工具，免费为主</p>
          </div>
          <Link href="/tools" className="text-blue-600 text-sm hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className={`card p-4 border ${tool.color}`}
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h3 className="font-bold text-slate-900">{tool.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{tool.nameCn}</p>
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">{tool.shortDesc}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className={`tag text-xs font-medium ${
                  tool.pricing === 'free'
                    ? 'bg-green-100 text-green-700'
                    : tool.pricing === 'freemium'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {tool.pricing === 'free' ? '完全免费' : tool.pricing === 'freemium' ? '免费可用' : '付费'}
                </span>
                {tool.origin === 'china' && (
                  <span className="tag bg-red-100 text-red-600 text-xs">🇨🇳 国产</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Practices */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">⚡ 实战练习</h2>
              <p className="text-slate-500 mt-1">边学边练，20分钟掌握一个AI使用场景</p>
            </div>
            <Link href="/practices" className="text-blue-600 text-sm hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredPractices.map((p) => (
              <Link
                key={p.id}
                href={`/practices/${p.id}`}
                className="card overflow-hidden group"
              >
                <div className={`bg-gradient-to-br ${p.coverBg} p-6 text-center`}>
                  <span className="text-5xl">{p.cover}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag bg-slate-100 text-slate-600 text-xs">{p.category}</span>
                    <span className="tag bg-blue-100 text-blue-600 text-xs">⏱ {p.timeMinutes}分钟</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{p.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Docs */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">📖 学习文章</h2>
            <p className="text-slate-500 mt-1">深度好文，带你真正理解如何用好AI</p>
          </div>
          <Link href="/docs" className="text-blue-600 text-sm hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featuredDocs.map((doc) => (
            <Link
              key={doc.id}
              href={`/docs/${doc.slug}`}
              className="card p-5 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.coverBg} flex items-center justify-center text-2xl mb-4`}>
                {doc.cover}
              </div>
              <span className="tag bg-slate-100 text-slate-600 text-xs">{doc.category}</span>
              <h3 className="font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{doc.summary}</p>
              <p className="text-xs text-slate-400 mt-3">📖 约{doc.readMinutes}分钟</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">还不知道从哪里开始？</h2>
          <p className="text-blue-100 mb-8">
            告诉我们你的职业和年龄，我们帮你找到最适合你的AI工具和学习路径。
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-lg"
          >
            🎯 立即开始个性化推荐
          </Link>
        </div>
      </section>
    </div>
  )
}
