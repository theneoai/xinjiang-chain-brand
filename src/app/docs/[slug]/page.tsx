import Link from 'next/link'
import { notFound } from 'next/navigation'
import docs from '@/data/docs.json'

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }))
}

export default function DocDetailPage({ params }: { params: { slug: string } }) {
  const doc = docs.find((d) => d.slug === params.slug)
  if (!doc) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/docs" className="text-sm text-slate-500 hover:text-blue-600 mb-6 inline-flex items-center gap-1">
        ← 返回文章列表
      </Link>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${doc.coverBg} rounded-2xl p-8 text-white mb-8 text-center`}>
        <div className="text-5xl mb-3">{doc.cover}</div>
        <div className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm mb-3">{doc.category}</div>
        <h1 className="text-2xl md:text-3xl font-bold">{doc.title}</h1>
        <p className="text-white/80 mt-2">{doc.subtitle}</p>
        <p className="text-white/60 text-sm mt-3">📖 约{doc.readMinutes}分钟读完</p>
      </div>

      {/* Key takeaways */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
        <h2 className="font-bold text-amber-900 mb-3">✨ 核心收获</h2>
        <ul className="space-y-2">
          {doc.keyTakeaways.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-amber-800 text-sm">
              <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <p className="text-slate-600 leading-relaxed mb-8 text-lg">{doc.summary}</p>

      {/* Sections */}
      <div className="space-y-10 prose-custom">
        {doc.sections.map((section, i) => (
          <div key={i}>
            <h2>{section.heading}</h2>
            <div className="whitespace-pre-line text-slate-600 leading-relaxed">
              {section.body.split('\n\n').map((para, j) => {
                if (para.startsWith('**') || para.includes('\n**')) {
                  return (
                    <div key={j} className="mb-4 space-y-2">
                      {para.split('\n').map((line, k) => {
                        const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        return (
                          <p
                            key={k}
                            className="text-slate-600"
                            dangerouslySetInnerHTML={{ __html: bold }}
                          />
                        )
                      })}
                    </div>
                  )
                }
                const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                return (
                  <p key={j} className="mb-4 text-slate-600" dangerouslySetInnerHTML={{ __html: formatted }} />
                )
              })}
            </div>

            {section.promptExample && (
              <div className="prompt-box my-4">
                <div className="text-slate-400 text-xs mb-2">💬 提示词示例</div>
                <pre className="whitespace-pre-wrap text-green-300 text-sm">{section.promptExample}</pre>
              </div>
            )}

            {section.tips && section.tips.length > 0 && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <p className="text-xs font-semibold text-blue-600 mb-2">💡 小提示</p>
                <ul className="space-y-1.5">
                  {section.tips.map((tip, k) => (
                    <li key={k} className="text-sm text-blue-800">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
        {doc.tags.map((tag) => (
          <span key={tag} className="tag bg-slate-100 text-slate-600 text-sm">{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 bg-blue-600 text-white rounded-2xl p-6 text-center">
        <h3 className="font-bold text-lg mb-2">学完理论，来实战练习吧</h3>
        <p className="text-blue-100 text-sm mb-4">每个练习场景都有手把手的步骤和提示词模板</p>
        <Link
          href="/practices"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
        >
          ⚡ 去实战练习
        </Link>
      </div>
    </div>
  )
}
