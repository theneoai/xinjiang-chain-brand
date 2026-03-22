# AI工具使用指南

> 面向各行各业普通人的 AI 工具学习平台

## 项目简介

精选最实用的 AI 工具，配有手把手教程，帮助农民、教师、工人、创业者等各类普通人从零上手 AI，提升工作和生活效率。

## 技术栈

- **框架：** Next.js 14 (App Router，静态导出)
- **UI：** React 18 + TailwindCSS
- **语言：** TypeScript
- **部署：** GitHub Pages

## 快速开始

```bash
npm install
npm run dev      # 开发模式 http://localhost:3000
npm run build    # 静态构建，输出到 out/
```

## 项目结构

```
src/
├── app/           # Next.js 页面
│   ├── page.tsx   # 首页
│   ├── tools/     # AI工具库
│   ├── practices/ # 实战练习
│   ├── docs/      # 学习文章
│   └── onboarding/# 职业推荐
├── components/    # 公共组件
└── data/          # JSON 数据文件
```

## 功能模块

- **AI工具库** — 精选 14+ 款适合普通人的 AI 工具
- **实战练习** — 边学边练，20 分钟掌握一个 AI 使用场景
- **学习文章** — 深度好文，带你真正理解如何用好 AI
- **职业推荐** — 根据职业和年龄个性化推荐工具和学习路径
