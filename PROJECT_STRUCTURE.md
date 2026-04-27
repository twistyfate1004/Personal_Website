# 项目结构总览

```
my_plat/
│
├── 📁 data/                          ⭐ 配置文件目录（重要！）
│   ├── config.json                   → 个人信息、社交链接
│   ├── skills-interests.json         → 技能和兴趣
│   ├── projects.json                 → 项目列表
│   ├── timeline.json                 → 时间线/经历
│   └── status.json                   → 当前状态
│
├── 📁 content/                       📝 内容文件
│   └── writing/                      → 博客文章目录
│       ├── 2024-12-25-welcome.mdx
│       └── 2024-12-26-why-nextjs.mdx
│
├── 📁 public/                        🖼️ 静态资源
│   ├── avatar.jpeg                   → 您的头像
│   └── *.svg                         → 图标文件
│
├── 📁 app/                           📄 页面文件
│   ├── page.tsx                      → Home 页面（首页）
│   ├── projects/
│   │   └── page.tsx                  → Projects 页面
│   ├── lives/
│   │   └── page.tsx                  → Lives 页面
│   ├── writing/
│   │   ├── page.tsx                  → Writing 列表页
│   │   └── [slug]/
│   │       └── page.tsx              → Writing 文章详情页
│   ├── about/
│   │   └── page.tsx                  → About 页面
│   ├── photos/
│   │   └── page.tsx                  → Photos 页面（占位）
│   ├── notes/
│   │   └── page.tsx                  → Notes 页面（占位）
│   ├── links/
│   │   └── page.tsx                  → Links 页面（占位）
│   ├── layout.tsx                    → 根布局
│   └── globals.css                   → 全局样式
│
├── 📁 components/                    🧩 组件文件
│   ├── home/                         → Home 页组件
│   │   ├── Hero.tsx                  → 姓名+头像+座右铭
│   │   ├── PersonalInfo.tsx          → 个人信息卡片
│   │   └── QuickLinks.tsx            → 快速链接
│   ├── layout/                       → 布局组件
│   │   ├── Header.tsx                → 导航栏
│   │   ├── Footer.tsx                → 页脚
│   │   └── Container.tsx             → 容器组件
│   ├── projects/                     → Projects 组件
│   │   └── ProjectCard.tsx           → 项目卡片
│   ├── writing/                      → Writing 组件
│   │   ├── MDXContent.tsx            → MDX 渲染器
│   │   └── TableOfContents.tsx        → 文章目录
│   └── ui/                           → 通用 UI 组件
│       └── ThemeToggle.tsx           → 主题切换
│
├── 📁 lib/                           🔧 工具函数
│   ├── data.ts                       → 数据读取函数
│   ├── mdx.ts                        → MDX 处理函数
│   └── utils.ts                      → 通用工具
│
├── 📄 CONFIG_GUIDE.md                → 详细配置指南
├── 📄 QUICK_REFERENCE.md             → 快速参考表
└── 📄 PROJECT_STRUCTURE.md           → 本文件
```

---

## 🎯 各部分说明

### 📍 `/data/` - 配置文件（最常用）

这是您**最常编辑**的目录，包含所有可配置内容：

| 文件 | 用途 | 修改频率 |
|-----|------|---------|
| `config.json` | 姓名、头像、社交链接、个人信息 | ⭐⭐ |
| `skills-interests.json` | 技能分类、兴趣爱好 | ⭐⭐⭐ |
| `projects.json` | 项目展示 | ⭐⭐⭐⭐⭐ |
| `timeline.json` | 工作/教育经历 | ⭐ |
| `status.json` | 当前状态 | ⭐⭐⭐⭐ |

---

### 📍 `/content/writing/` - 博客文章

存放所有博客文章，使用 **MDX** 格式：

```
2024-12-25-welcome.mdx       → 文章标题
2024-12-26-why-nextjs.mdx     → 另一篇文章
```

**文件名格式**: `YYYY-MM-DD-标题.mdx`

---

### 📍 `/public/` - 静态资源

存放图片、图标等静态文件：

```
avatar.jpeg          → 您的头像
*.svg               → 各种图标
```

**引用方式**: `/avatar.jpeg`（注意以 `/` 开头）

---

### 📍 `/app/` - 页面文件

定义各个页面的内容和布局：

| 页面 | 文件 | 用途 |
|-----|------|-----|
| Home | `page.tsx` | 首页 |
| Projects | `projects/page.tsx` | 项目展示 |
| Lives | `lives/page.tsx` | 生活记录 |
| Writing | `writing/page.tsx` | 文章列表 |
| Writing 详情 | `writing/[slug]/page.tsx` | 文章内容 |
| Photos | `photos/page.tsx` | 摄影作品（占位） |
| Notes | `notes/page.tsx` | 笔记（占位） |
| Links | `links/page.tsx` | 友链（占位） |

---

### 📍 `/components/` - 组件文件

可复用的 UI 组件，**一般不需要修改**：

| 组件目录 | 用途 |
|---------|-----|
| `home/` | Home 页专属组件 |
| `layout/` | 布局组件（导航栏、页脚） |
| `projects/` | Projects 页专属组件 |
| `writing/` | Writing 页专属组件 |
| `ui/` | 通用 UI 组件 |

---

## 🔐 文件修改权限

### ✅ 推荐修改（安全）
- `/data/` 下的所有 JSON 文件
- `/content/writing/` 下的文章文件
- `/public/` 下的图片资源

### ⚠️ 谨慎修改（需要了解代码）
- `/app/` 下的页面文件
- `/components/` 下的组件文件
- `/lib/` 下的工具函数

### 🚫 不要修改
- `package.json` - 依赖配置
- `tsconfig.json` - TypeScript 配置
- `next.config.ts` - Next.js 配置
- `tailwind.config.js` - Tailwind 配置

---

## 📊 文件依赖关系

```
config.json
    ↓
├── Home 页面 (读取个人信息)
├── About 页面 (读取简介)
└── Hero 组件 (读取姓名、座右铭)

projects.json
    ↓
└── Projects 页面 (读取项目列表)

skills-interests.json
    ↓
└── Home 页面 (读取技能和兴趣)

timeline.json
    ↓
└── Home 页面 (读取时间线)
```

---

## 🎨 样式文件位置

| 样式类型 | 文件位置 | 说明 |
|---------|---------|-----|
| 全局样式 | `app/globals.css` | CSS 变量、主题颜色 |
| Tailwind 配置 | `tailwind.config.js` | Tailwind 配置 |
| 组件样式 | 各组件文件 | Tailwind 类名 |

---

## 🔍 快速定位

### 我想修改...

**个人信息**
- 👉 `data/config.json`

**技能/兴趣**
- 👉 `data/skills-interests.json`

**项目**
- 👉 `data/projects.json`

**经历**
- 👉 `data/timeline.json`

**头像**
- 👉 `public/avatar.jpeg`
- 👉 `data/config.json` 中的 `avatar` 字段

**博客文章**
- 👉 `content/writing/` 目录

**导航栏**
- 👉 `components/layout/Header.tsx` ⚠️

**页面标题**
- 👉 `app/*/page.tsx` ⚠️

---

## 💡 工作流程建议

### 日常内容更新
1. 打开对应的 JSON 文件
2. 修改内容
3. 保存
4. 刷新浏览器

### 添加新项目
1. 打开 `data/projects.json`
2. 复制现有项目对象
3. 修改内容
4. 粘贴到数组中
5. 保存
6. 刷新 Projects 页面

### 发布文章
1. 打开 `content/writing/`
2. 创建新文件 `YYYY-MM-DD-title.mdx`
3. 编辑内容
4. 保存
5. 刷新 Writing 页面

---

## 📞 需要帮助？

1. **快速参考** → 查看 `QUICK_REFERENCE.md`
2. **详细说明** → 查看 `CONFIG_GUIDE.md`
3. **常见问题** → 查看 `CONFIG_GUIDE.md` 末尾的 FAQ 部分

---

祝您使用愉快！🎉
