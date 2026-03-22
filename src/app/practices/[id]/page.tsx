import Link from 'next/link'
import { notFound } from 'next/navigation'
import practices from '@/data/practices.json'

export function generateStaticParams() {
  return practices.map((p) => ({ id: p.id }))
}

const DIFFICULTY_MAP = {
  beginner: { label: '入门级', color: 'bg-green-100 text-green-700' },
  intermediate: { label: '进阶级', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: '高级', color: 'bg-red-100 text-red-700' },
}

export default function PracticeDetailPage({ params }: { params: { id: string } }) {
  const practice = practices.find((p) => p.id === params.id)
  if (!practice) notFound()

  const diff = DIFFICULTY_MAP[practice.difficulty as keyof typeof DIFFICULTY_MAP]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/practices" className="text-sm text-slate-500 hover:text-blue-600 mb-6 inline-flex items-center gap-1">
        ← 返回实战练习
      </Link>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${practice.coverBg} rounded-2xl p-8 text-white mb-6`}>
        <div className="text-5xl mb-3">{practice.cover}</div>
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="bg-white/20 rounded-full px-3 py-0.5 text-sm">{practice.category}</span>
          <span className="bg-white/20 rounded-full px-3 py-0.5 text-sm">⏱ {practice.timeMinutes}分钟完成</span>
          <span className="bg-white/20 rounded-full px-3 py-0.5 text-sm">{practice.workflow.length}个步骤</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{practice.title}</h1>
        <p className="text-white/80 mt-2">{practice.subtitle}</p>
      </div>

      {/* Context */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 md:col-span-3">
          <h2 className="font-bold text-slate-900 mb-2">📋 练习背景</h2>
          <p className="text-slate-600 text-sm">{practice.background}</p>
        </div>
        <div className="card p-4 md:col-span-2">
          <h2 className="font-bold text-slate-900 mb-2">🎯 你的目标</h2>
          <p className="text-slate-600 text-sm">{practice.objective}</p>
        </div>
        <div className="card p-4">
          <h2 className="font-bold text-slate-900 mb-2">📊 难度</h2>
          <span className={`tag text-sm ${diff.color}`}>{diff.label}</span>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">📌 操作步骤</h2>
        <div className="space-y-4">
          {practice.workflow.map((step) => (
            <div key={step.step} className="card p-5 border-l-4 border-blue-400">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <span className="text-xs text-slate-400">预计{step.timeMin}分钟</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm ml-10">{step.description}</p>
              <div className="ml-10 mt-2 text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
                <span className="font-medium text-slate-600">操作：</span>{step.action}
              </div>
              {step.prompt && (
                <div className="mt-3 prompt-box ml-10">
                  <div className="text-slate-400 text-xs mb-2">💬 提示词（可直接复制）</div>
                  <pre className="whitespace-pre-wrap text-green-300 text-sm">{step.prompt}</pre>
                </div>
              )}
              {step.output && (
                <div className="ml-10 mt-2 bg-green-50 border border-green-100 rounded-lg p-3 text-sm text-green-800">
                  <span className="font-medium">预期结果：</span>{step.output}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Templates */}
      {practice.promptTemplates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📝 提示词模板库</h2>
          <div className="space-y-4">
            {practice.promptTemplates.map((tmpl, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900">{tmpl.label}</h3>
                  <span className="text-xs text-slate-400">{tmpl.description}</span>
                </div>
                <div className="prompt-box">
                  <pre className="whitespace-pre-wrap text-green-300 text-sm">{tmpl.prompt}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist */}
      <div className="card p-5 mb-8">
        <h2 className="font-bold text-slate-900 mb-3">✅ 完成检查清单</h2>
        <ul className="space-y-2">
          {practice.checklist.map((item, i) => (
            <li key={i} className="text-sm text-slate-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* Expected Outcome */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8">
        <h2 className="font-bold text-green-900 mb-2">🎉 练习完成后你能获得</h2>
        <p className="text-green-800 text-sm">{practice.expectedOutcome}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {practice.skillsLearned.map((skill) => (
            <span key={skill} className="tag bg-green-100 text-green-700 text-xs">{skill}</span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {practice.tags.map((tag) => (
          <span key={tag} className="tag bg-slate-100 text-slate-600 text-sm">{tag}</span>
        ))}
      </div>

      {/* Next */}
      <div className="flex justify-between">
        <Link href="/practices" className="btn-secondary">
          ← 更多练习
        </Link>
        <Link href="/tools" className="btn-primary">
          🔧 探索更多AI工具
        </Link>
      </div>
    </div>
  )
}
