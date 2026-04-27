# 快速开始指南

## 项目已创建完成！

你的个人主页项目已经搭建完成。所有核心功能都已实现，可以立即开始使用。

## 立即开始

```bash
# 启动开发服务器
npm run dev

# 在浏览器打开
open http://localhost:3000
```

## 接下来你需要做的

### 1. 修改个人信息

编辑 `data/config.json`，将示例内容替换成你的信息：

```json
{
  "name": "你的名字",              // 修改这里
  "tagline": "你的标语",           // 修改这里
  "bio": "你的详细介绍...",        // 修改这里
  "socials": [...]                 // 修改社交链接
}
```

### 2. 修改项目列表

编辑 `data/projects.json`，添加你的真实项目。

### 3. 修改时间线

编辑 `data/timeline.json`，添加你的真实经历。

### 4. 修改当前状态

编辑 `data/status.json`，更新你的"现在"状态。

### 5. 写第一篇文章

创建 `content/writing/2024-12-27-your-post.mdx`：

```mdx
---
title: "你的文章标题"
date: "2024-12-27"
summary: "文章简介"
---

# 标题

你的内容...
```

## 目录结构速览

```
你主要改的：
├── data/              # 所有配置文件
│   ├── config.json           # 个人信息
│   ├── projects.json         # 项目列表
│   ├── timeline.json         # 经历时间线
│   └── status.json           # 当前状态
│
└── content/           # 内容文件
    └── writing/             # 博客文章（.mdx）

你一般不改的：
├── app/               # 页面代码
├── components/        # 组件代码
└── lib/              # 工具函数
```

## 维护流程

**添加文章** → 创建 `content/writing/日期-标题.mdx`
**添加项目** → 编辑 `data/projects.json`
**改信息** → 编辑 `data/config.json`
**部署** → 推送到 GitHub，Vercel 自动部署

## 设计特点

- ✅ 移动端优先（手机上也很好看）
- ✅ 深色模式支持（自动切换）
- ✅ 超快速度（静态生成）
- ✅ SEO 友好（搜索引擎容易找到）
- ✅ 易维护（内容与代码分离）

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

完成！Vercel 会给你一个 `https://your-project.vercel.app` 的域名。

## 需要帮助？

查看 `README.md` 获取详细文档。

---

祝使用愉快！🚀
