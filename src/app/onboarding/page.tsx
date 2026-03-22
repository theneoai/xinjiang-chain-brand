'use client'

import { useState } from 'react'
import Link from 'next/link'
import professions from '@/data/professions.json'
import tools from '@/data/tools.json'
import docs from '@/data/docs.json'
import practices from '@/data/practices.json'

type Step = 'age' | 'profession' | 'result'

const AGE_GROUPS = [
  { id: 'teen', label: '青少年', range: '13–17岁', icon: '🎓', desc: '学生党' },
  { id: 'young', label: '青年', range: '18–35岁', icon: '💼', desc: '职场新人/创业者' },
  { id: 'middle', label: '中年', range: '36–55岁', icon: '🏠', desc: '职场骨干/管理者' },
  { id: 'senior', label: '老年', range: '55岁以上', icon: '🌸', desc: '退休/银发族' },
]

const PROFESSION_GROUPS = Array.from(new Set(professions.map((p) => p.group)))

// Simple rule-based recommendation logic
function getRecommendations(age: string, profId: string) {
  const recTools: typeof tools = []
  const recDocs: typeof docs = []
  const recPractices: typeof practices = []

  // Always recommend based on profession
  const prof = professions.find((p) => p.id === profId)

  if (profId === 'student' || profId === 'teacher' || profId === 'researcher') {
    recTools.push(...tools.filter((t) => ['deepseek', 'doubao', 'kimi'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('学生') || d.tags.includes('学习')))
    recPractices.push(...practices.filter((p) => p.tags.includes('学习')))
  } else if (profId === 'farmer') {
    recTools.push(...tools.filter((t) => ['deepseek', 'doubao', 'jimeng'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('农业')))
    recPractices.push(...practices.filter((p) => p.tags.includes('文案') || p.tags.includes('营销')))
  } else if (['software-engineer', 'ai-ml-engineer', 'data-analyst', 'cybersecurity'].includes(profId)) {
    recTools.push(...tools.filter((t) => ['cursor', 'chatgpt', 'claude', 'deepseek'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('职场')))
    recPractices.push(...practices.filter((p) => p.tags.includes('职场')))
  } else if (['entrepreneur', 'marketing', 'sales'].includes(profId)) {
    recTools.push(...tools.filter((t) => ['deepseek', 'doubao', 'jimeng', 'wps-ai'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('创业') || d.tags.includes('营销')))
    recPractices.push(...practices.filter((p) => p.tags.includes('营销') || p.tags.includes('文案')))
  } else if (['legal', 'finance', 'government'].includes(profId)) {
    recTools.push(...tools.filter((t) => ['kimi', 'deepseek', 'tongyi'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('合同') || d.tags.includes('办公')))
    recPractices.push(...practices.filter((p) => p.tags.includes('合同') || p.tags.includes('分析')))
  } else {
    recTools.push(...tools.filter((t) => ['deepseek', 'doubao', 'wps-ai'].includes(t.id)))
    recDocs.push(...docs.filter((d) => d.tags.includes('入门')))
    recPractices.push(...practices.slice(0, 2))
  }

  // Deduplicate and limit
  const uniqueTools = Array.from(new Map(recTools.map((t) => [t.id, t])).values()).slice(0, 4)
  const uniqueDocs = Array.from(new Map(recDocs.map((d) => [d.id, d])).values()).slice(0, 3)
  const uniquePractices = Array.from(new Map(recPractices.map((p) => [p.id, p])).values()).slice(0, 3)

  // Fallback
  if (uniqueTools.length < 2) uniqueTools.push(...tools.filter((t) => t.featured).slice(0, 3))
  if (uniqueDocs.length < 1) uniqueDocs.push(...docs.slice(0, 2))
  if (uniquePractices.length < 1) uniquePractices.push(...practices.slice(0, 2))

  return { tools: uniqueTools, docs: uniqueDocs, practices: uniquePractices, prof }
}

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('age')
  const [age, setAge] = useState('')
  const [profId, setProfId] = useState('')

  const handleAgeSelect = (id: string) => {
    setAge(id)
    setStep('profession')
  }

  const handleProfSelect = (id: string) => {
    setProfId(id)
    setStep('result')
  }

  const recs = step === 'result' ? getRecommendations(age, profId) : null
  const ageLabel = AGE_GROUPS.find((a) => a.id === age)?.label || ''

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(['age', 'profession', 'result'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? 'bg-blue-600 text-white' :
              ['age', 'profession', 'result'].indexOf(step) > i ? 'bg-green-500 text-white' :
              'bg-slate-200 text-slate-400'
            }`}>
              {['age', 'profession', 'result'].indexOf(step) > i ? '✓' : i + 1}
            </div>
            {i < 2 && <div className={`h-0.5 w-16 ${['age', 'profession', 'result'].indexOf(step) > i ? 'bg-green-400' : 'bg-slate-200'}`} />}
          </div>
        ))}
        <span className="text-sm text-slate-500 ml-2">
          {step === 'age' ? '选择年龄段' : step === 'profession' ? '选择职业' : '查看个性化推荐'}
        </span>
      </div>

      {/* Step 1: Age */}
      {step === 'age' && (
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">你的年龄段是？</h1>
          <p className="text-slate-500 mb-6">我们会根据你的情况推荐最合适的AI工具</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {AGE_GROUPS.map((a) => (
              <button
                key={a.id}
                onClick={() => handleAgeSelect(a.id)}
                className="card p-5 text-left hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <span className="text-4xl">{a.icon}</span>
                <h3 className="font-bold text-slate-900 mt-3 group-hover:text-blue-600">{a.label}</h3>
                <p className="text-sm text-slate-500">{a.range} · {a.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Profession */}
      {step === 'profession' && (
        <div>
          <button onClick={() => setStep('age')} className="text-sm text-slate-400 hover:text-slate-600 mb-4">
            ← 返回
          </button>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">你的职业是？</h1>
          <p className="text-slate-500 mb-6">已选择：{ageLabel} · 请选择最接近你的职业</p>
          {PROFESSION_GROUPS.map((group) => (
            <div key={group} className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 mb-2">{group}</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {professions.filter((p) => p.group === group).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProfSelect(p.id)}
                    className="card px-4 py-3 text-left flex items-center gap-3 hover:border-blue-400 hover:shadow-sm transition-all group"
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="font-medium text-slate-900 text-sm group-hover:text-blue-600">{p.name}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{p.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Results */}
      {step === 'result' && recs && (
        <div>
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white mb-8">
            <h1 className="text-2xl font-bold mb-1">
              {recs.prof?.icon} 你的个性化AI指南已就绪！
            </h1>
            <p className="text-blue-100">
              根据你的情况（{ageLabel} · {recs.prof?.name}），我们为你精选了以下内容
            </p>
          </div>

          {/* Recommended Tools */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">🔧 推荐先用这些AI工具</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {recs.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className={`card p-4 border ${tool.color} flex items-center gap-3`}
                >
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900">{tool.name}</div>
                    <div className="text-xs text-slate-500">{tool.shortDesc}</div>
                    <div className={`tag text-xs mt-1 inline-block ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                      tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {tool.pricing === 'free' ? '免费' : tool.pricing === 'freemium' ? '免费可用' : '付费'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recommended Practices */}
          {recs.practices.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">⚡ 从这些练习开始</h2>
              <div className="space-y-3">
                {recs.practices.map((p) => (
                  <Link
                    key={p.id}
                    href={`/practices/${p.id}`}
                    className="card p-4 flex items-center gap-4 hover:border-blue-300 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.coverBg} flex items-center justify-center text-2xl shrink-0`}>
                      {p.cover}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{p.title}</h3>
                      <p className="text-sm text-slate-500">⏱ {p.timeMinutes}分钟 · {p.category}</p>
                    </div>
                    <span className="ml-auto text-slate-300 group-hover:text-blue-400">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Articles */}
          {recs.docs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">📖 推荐阅读</h2>
              <div className="space-y-3">
                {recs.docs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/docs/${doc.slug}`}
                    className="card p-4 flex items-center gap-4 hover:border-blue-300 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.coverBg} flex items-center justify-center text-xl shrink-0`}>
                      {doc.cover}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{doc.title}</h3>
                      <p className="text-sm text-slate-500">📖 约{doc.readMinutes}分钟 · {doc.category}</p>
                    </div>
                    <span className="ml-auto text-slate-300 group-hover:text-blue-400">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => { setStep('age'); setAge(''); setProfId('') }}
              className="btn-secondary"
            >
              重新测试
            </button>
            <Link href="/tools" className="btn-primary">
              🔧 查看所有工具
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
