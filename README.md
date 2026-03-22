# AI能力布道平台

> **使命**：让地球上每一个人都能理解、学会并用好AI，释放人类潜能。
>
> **目标**：成为全球最大的AI能力布道平台。

面向各行各业普通人的 AI 工具学习平台。精选实用 AI 工具，涵盖多个职业方向，帮助你从零上手 AI，提升工作效率。

---

## 当前功能

- **AI工具库** — 14 款精选工具（DeepSeek、Kimi、Claude、Midjourney、Cursor 等），免费为主
- **实战练习** — 5 个场景练习（写邮件、分析合同、做PPT大纲、写文案等）
- **学习文章** — 5 篇深度指南（提示词技巧、农民/上班族/学生/小企业主专题）
- **职业推荐** — 27 个职业的个性化 AI 工具推荐路径

## 规模目标（12个月）

| 指标 | 当前 | 6个月目标 | 12个月目标 |
|------|------|-----------|------------|
| AI工具收录 | 14款 | 200款 | 500款+ |
| 职业场景 | 27个 | 100个 | 200个+ |
| 实战练习 | 5个 | 50个 | 200个+ |
| 学习文章 | 5篇 | 100篇 | 500篇+ |
| 支持语言 | 中文 | 中/英 | 20种语言 |
| 月活用户 | 起步 | 10万 | 100万 |

## 技术栈

- **当前**：Next.js 14 (App Router，静态导出) + React 18 + TailwindCSS + TypeScript，部署于 GitHub Pages
- **规划升级**：Vercel（动态部署）+ Supabase（用户数据）+ Algolia（搜索）+ Clerk（账号体系）

## 快速开始

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 静态构建，输出到 out/
```

## 项目结构

```
src/
├── app/
│   ├── page.tsx        # 首页
│   ├── tools/          # AI工具库
│   ├── practices/      # 实战练习
│   ├── docs/           # 学习文章
│   └── onboarding/     # 职业推荐
├── components/Nav.tsx
└── data/               # tools.json / docs.json / practices.json / professions.json
```

## 战略规划

详见 [STRATEGY.md](./STRATEGY.md) — 包含：

- 全球竞品分析（Futurepedia、Coursera、fast.ai、OpenAI Academy等）
- 差异化定位：工具发现 + 实战学习 + 能力认证 + 社区共创
- 三阶段产品路线图（0-3月、3-12月、12-24月）
- 运营增长策略（SEO、社交裂变、KOL合作、社区自驱）
- 商业模式（C端会员 + B端企业版 + 平台生态）
- 技术架构升级路线图
- 未来90天行动计划

## 参与贡献

欢迎提交：
- 新的 AI 工具信息
- 行业实战案例
- 提示词模板
- 翻译和本地化

---

*面向普通人的AI学习平台 | 让每一个人都能用好AI*
