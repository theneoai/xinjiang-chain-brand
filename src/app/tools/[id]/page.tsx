import Link from 'next/link'
import { notFound } from 'next/navigation'
import tools from '@/data/tools.json'
import categories from '@/data/categories.json'

export function generateStaticParams() {
  return tools.map((t) => ({ id: t.id }))
}

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = tools.find((t) => t.id === params.id)
  if (!tool) notFound()

  const category = categories.find((c) => c.id === tool.category)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/tools" className="text-sm text-slate-500 hover:text-blue-600 mb-6 inline-flex items-center gap-1">
        ← 返回工具库
      </Link>

      {/* Header card */}
      <div className={`card border ${tool.color} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{tool.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{tool.name}</h1>
            <p className="text-slate-500 text-sm">{tool.nameCn} · {tool.nameEn}</p>
            {category && (
              <span className="tag bg-slate-100 text-slate-600 text-xs mt-2 inline-block">
                {category.icon} {category.name}
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-slate-700 leading-relaxed">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`tag text-sm ${
            tool.pricing === 'free'
              ? 'bg-green-100 text-green-700'
              : tool.pricing === 'freemium'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {tool.pricing === 'free' ? '✅ 完全免费' : tool.pricing === 'freemium' ? '🆓 免费可用' : '💳 付费工具'}
          </span>
          <span className={`tag text-sm ${
            tool.origin === 'china' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {tool.origin === 'china' ? '🇨🇳 国产（无需翻墙）' : '🌐 国际产品'}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-2">{tool.pricingDetail}</p>

        <div className="mt-5">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            🚀 立即使用 {tool.name}
          </a>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card p-6 mb-5">
        <h2 className="font-bold text-slate-900 mb-3">✅ 适合用来做什么？</h2>
        <ul className="space-y-2">
          {tool.useCases.map((u) => (
            <li key={u} className="flex items-center gap-2 text-slate-700">
              <span className="text-green-500">•</span>
              {u}
            </li>
          ))}
        </ul>
      </div>

      {/* Difficulty & Tags */}
      <div className="card p-6 mb-5">
        <h2 className="font-bold text-slate-900 mb-3">📊 工具信息</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">上手难度</span>
            <div className="mt-1 font-medium">
              {tool.difficulty === 'beginner' && '👶 零基础可用'}
              {tool.difficulty === 'intermediate' && '🎯 需要一点学习'}
              {tool.difficulty === 'advanced' && '🚀 有技术基础'}
            </div>
          </div>
          <div>
            <span className="text-slate-500">产品类型</span>
            <div className="mt-1 font-medium">
              {tool.origin === 'china' ? '🇨🇳 国内产品，无需翻墙' : '🌐 国外产品，可能需要翻墙'}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span key={tag} className="tag bg-slate-100 text-slate-600 text-xs">{tag}</span>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h2 className="font-bold text-blue-900 mb-2">💡 新手使用建议</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>1. 先注册免费账号，体验核心功能</li>
          <li>2. 不需要懂技术，直接用中文和AI对话</li>
          <li>3. 如果回答不理想，换个方式描述你的需求</li>
          <li>4. 查看我们的「实战练习」学习具体使用场景</li>
        </ul>
        <div className="mt-4">
          <Link href="/practices" className="text-blue-600 text-sm hover:underline">
            → 查看相关实战练习
          </Link>
        </div>
      </div>
    </div>
  )
}
