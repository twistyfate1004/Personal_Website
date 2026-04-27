# 项目配置文件指南

本文档详细说明项目中所有可配置的内容及其修改位置。

## 📁 配置文件概览

所有配置文件位于 `data/` 目录下：

```
data/
├── config.json              # 网站基本配置（个人信息、社交链接）
├── skills-interests.json    # 技能和兴趣
├── projects.json            # 项目列表
├── timeline.json            # 时间线（工作/教育经历）
├── lives.json               # 生活记录（Lives页面）
└── status.json              # 当前状态（Now板块）
```

---

## 1️⃣ 网站基本配置 - `data/config.json`

### 📝 可配置内容

```json
{
  "name": "Jiang Boyuan",           // 您的姓名
  "tagline": "Developer, Student",   // 职业标签/标语
  "bio": "个人简介...",               // 自我介绍
  "motto": "座右铭",                 // 个人座右铭（可选）
  "avatar": "/avatar.jpeg",          // 头像图片路径
  "socials": [                       // 社交媒体链接
    {
      "name": "GitHub",
      "url": "https://github.com/username",
      "icon": "github"
    }
  ]
}
```

### 📍 显示位置
- **Home 页面**：姓名、标语、座右铭、头像
- **导航栏**：Logo（显示 "Home"）
- **About 页面**：个人简介

### 🔧 修改示例
```json
{
  "name": "张三",
  "tagline": "全栈工程师 | 摄影师",
  "motto": "Stay hungry, stay foolish.",
  "avatar": "/my-photo.jpg"
}
```

---

## 2️⃣ 个人详细信息 - `data/config.json` 中的 `personalInfo` 字段

### 📝 可配置内容

```json
{
  "personalInfo": {
    "email": "your@email.com",        // 邮箱
    "phone": "+86 138xxxx xxxx",       // 手机号
    "mbti": "INFJ",                   // MBTI 类型
    "zodiac": "天秤座",                // 星座
    "age": 23,                        // 年龄
    "hometown": "北京/成都",           // 户籍/家乡
    "baseLocation": "北京/福冈"        // 当前所在地
  }
}
```

### 📍 显示位置
- **Home 页面** → Personal Info 板块（卡片形式）

### 💡 提示
- 所有字段都是可选的，删除某个字段后该卡片会自动隐藏
- 邮箱和手机号支持点击跳转（mailto: 和 tel:）

---

## 3️⃣ 技能和兴趣 - `data/skills-interests.json`

### 📝 可配置内容

```json
{
  "skills": [
    {
      "category": "Frontend",         // 技能分类名称
      "items": [                      // 该分类下的技能列表
        "React",
        "Next.js",
        "TypeScript"
      ]
    },
    {
      "category": "Backend",
      "items": ["Node.js", "Python", "PostgreSQL"]
    },
    {
      "category": "Tools",
      "items": ["Git", "Docker", "AWS"]
    }
  ],
  "interests": [                      // 兴趣爱好列表
    "Swimming",
    "Photography",
    "Reading",
    "Hiking",
    "Coffee"
  ]
}
```

### 📍 显示位置
- **Home 页面** → Skills 板块（Frontend, Backend, Tools）
- **Home 页面** → Interests 板块

### 🔧 修改建议
- 可以自由添加/删除技能分类
- 每个分类下的技能数量不限
- 兴趣列表以标签形式展示

---

## 4️⃣ 项目列表 - `data/projects.json`

### 📝 可配置内容

```json
[
  {
    "id": "project-1",               // 项目唯一标识
    "title": "项目名称",
    "description": "项目描述...",
    "tech": [                        // 技术栈标签
      "React",
      "Node.js",
      "MongoDB"
    ],
    "links": {
      "github": "https://github.com/...",    // GitHub 链接（可选）
      "demo": "https://demo.example.com"     // 在线演示链接（可选）
    },
    "featured": true                 // 是否为精选项目（true/false）
  }
]
```

### 📍 显示位置
- **Projects 页面**：所有项目列表（卡片形式）
- **Home 页** → Quick Links：Projects 链接

### 💡 提示
- `featured: true` 的项目会优先显示
- `links` 字段可选，没有链接的项目不显示按钮
- 支持无限添加项目

---

## 5️⃣ 时间线/经历 - `data/timeline.json`

### 📝 可配置内容

```json
[
  {
    "year": "2023 - Present",        // 时间段
    "title": "高级软件工程师",        // 职位/角色名称
    "description": "工作内容描述...",  // 详细描述
    "type": "work"                   // 类型: work | education | other
  },
  {
    "year": "2019 - 2023",
    "title": "计算机科学学士",
    "description": "大学描述...",
    "type": "education"
  }
]
```

### 📍 显示位置
- **Home 页面** → Timeline 板块

### 📋 类型说明
- `work`：工作经历（图标：💼）
- `education`：教育经历（图标：🎓）
- `other`：其他经历（图标：📍）

### 💡 提示
- 按数组顺序显示（建议倒序排列，最新的在前）
- 可自由添加/删除经历条目

---

## 6️⃣ 当前状态 - `data/status.json`

### 📝 可配置内容

```json
{
  "text": "Building side projects and exploring AI/ML.",  // 状态文本
  "emoji": "🚀"                                           // 表情符号（可选）
}
```

### 📍 显示位置
- **Home 页面** → Now 板块（目前已隐藏）

### 💡 提示
- 这个板块目前未在页面显示
- 如需显示，在 `app/page.tsx` 中添加 `<Status />` 组件

---

## 7️⃣ 写作/Blog - `content/writing/` 目录

### 📝 文章文件格式

文章使用 **MDX** 格式，文件名格式：`YYYY-MM-DD-标题.mdx`

```markdown
---
title: 文章标题
date: 2024-01-01
summary: 文章摘要
readingTime: 5  # 阅读时间（分钟）
---

# 文章内容开始

这里是文章正文，支持 Markdown 语法。
```

### 📍 显示位置
- **Writing 页面**：文章列表
- **文章详情页**：`/writing/[slug]`

### 💡 提示
- 文章按日期倒序排列
- 支持代码块、图片等 Markdown 功能
- 自动生成目录（TOC）

---

## 8️⃣ 生活记录 - `data/lives.json`

### 📝 可配置内容

```json
{
  "posts": [
    {
      "id": "life-1",               // 记录唯一标识
      "date": "2024-01-05",        // 日期
      "title": "新的一天",          // 记录标题
      "content": "今天天气不错...",  // 记录内容
      "mediaList": [                // 媒体文件列表（可选）
        {
          "url": "/photo1.jpg",     // 图片/视频路径
          "type": "image"           // 类型：image 或 video
        },
        {
          "url": "/video1.mp4",
          "type": "video"
        }
      ]
    },
    {
      "id": "life-2",
      "date": "2024-01-04",
      "title": "咖啡时光",
      "content": "发现了一家很棒的咖啡馆...",
      "mediaList": []               // 无媒体时设为空数组
    }
  ]
}
```

### 📍 显示位置
- **Lives 页面**：按时间顺序展示生活记录

### 🔧 修改建议
- 每条记录支持添加多个图片和视频
- 媒体文件会以正方形缩略图网格显示
- 点击缩略图可查看完整图片/视频
- 日期格式建议：`YYYY-MM-DD`

### 💡 提示
- `mediaList` 可包含多个媒体文件
- 媒体文件存放在 `public/` 目录
- 不需要媒体时，`mediaList` 设为空数组 `[]`
- 图片和视频可以混合添加
- 缩略图会在一行中显示多个（移动端2列，平板3列，桌面4列）

---

## 9️⃣ 其他页面（占位页面）

以下页面内容目前硬编码，可手动编辑：

### Photos 页面 - `app/photos/page.tsx`
- 标题："Photos"
- 描述：摄影作品展示

### Notes 页面 - `app/notes/page.tsx`
- 标题："Notes"
- 描述：笔记和想法

### Links 页面 - `app/links/page.tsx`
- 标题："Links"
- 描述：推荐资源和友链

---

## 🎨 快速修改指南

### 修改个人信息
1. 打开 `data/config.json`
2. 修改 `personalInfo` 字段
3. 保存，刷新页面

### 添加新项目
1. 打开 `data/projects.json`
2. 添加新的项目对象
3. 设置 `id`, `title`, `description`, `tech` 等字段
4. 保存，刷新 Projects 页面

### 更新技能
1. 打开 `data/skills-interests.json`
2. 修改 `skills` 数组
3. 可添加新分类或修改现有分类下的技能
4. 保存，刷新 Home 页面

### 添加时间线经历
1. 打开 `data/timeline.json`
2. 添加新的经历对象
3. 设置 `year`, `title`, `description`, `type`
4. 保存，刷新 Home 页面

---

## 📸 图片资源

### 图片存放位置
所有图片放在 `public/` 目录下：

```
public/
├── avatar.jpeg          // 个人头像
├── file.svg            // 其他图标/图片
└── ...
```

### 引用图片
```json
{
  "avatar": "/avatar.jpeg"  // 注意：路径以 / 开头
}
```

---

## 🔗 社交链接配置

### 支持的社交平台
在 `data/config.json` 的 `socials` 数组中配置：

```json
{
  "name": "GitHub",        // 显示名称
  "url": "https://github.com/username",  // 链接地址
  "icon": "github"         // 图标名称（lucide-react）
}
```

### 常用图标名称
- `github`
- `twitter`
- `linkedin`
- `mail`
- `instagram`
- `youtube`
- 等（来自 lucide-react 图标库）

---

## ⚙️ 高级配置

### 修改导航栏
文件位置：`components/layout/Header.tsx`

```typescript
const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Lives", href: "/lives" },
];
```

### 修改 Quick Links
文件位置：`components/home/QuickLinks.tsx`

```typescript
const quickLinks: QuickLink[] = [
  {
    href: "/projects",
    title: "Projects",
    description: "See what I've been working on",
  },
  // 添加更多链接...
];
```

---

## 📊 数据文件总览

| 文件 | 用途 | 显示页面 | 修改频率 |
|------|------|----------|----------|
| `config.json` | 个人信息、社交链接 | Home, About | 低 |
| `skills-interests.json` | 技能和兴趣 | Home | 中 |
| `projects.json` | 项目列表 | Projects | 高 |
| `timeline.json` | 工作教育经历 | Home | 低 |
| `lives.json` | 生活记录 | Lives | 高 |
| `status.json` | 当前状态 | Home（隐藏） | 高 |

---

## 💡 最佳实践

1. **定期备份**：修改配置文件前先备份
2. **JSON 格式**：确保 JSON 格式正确（注意逗号、引号）
3. **图片优化**：图片使用前先压缩优化
4. **链接测试**：添加链接后测试是否可访问
5. **响应式检查**：修改后在不同设备上预览

---

## 🆘 常见问题

### Q: 修改配置后页面没更新？
A: 刷新浏览器（Ctrl+F5 / Cmd+Shift+R）

### Q: JSON 格式错误怎么办？
A: 检查：
- 所有字符串用双引号
- 对象/数组最后不要逗号
- 使用 JSON 验证工具

### Q: 如何添加新的技能分类？
A: 在 `skills-interests.json` 的 `skills` 数组中添加新对象

### Q: 项目链接不显示？
A: 检查 `links` 字段是否存在，以及 URL 是否正确

---

## 📞 需要帮助？

如遇到问题，检查：
1. 文件路径是否正确
2. JSON 格式是否正确
3. 浏览器控制台是否有错误

祝您使用愉快！🎉