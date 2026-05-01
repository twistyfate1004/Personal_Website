# Growing Margins Template

`Growing Margins Template` 是一个基于 `Next.js App Router` 构建的个人主页 / 作品集模板项目。当前公开版本已经移除了原始私人文案、私人 logo 与真实照片资源，仓库内保留的是可直接二次修改的示意内容。

这个项目适合用来搭建：

- 个人主页
- 学生作品集
- 求职展示站
- 轻量博客 / 生活记录站

## Features

- 封面页 + 归档页结构，适合做个人品牌入口
- 暗色主题默认开启，支持主题切换
- 中英双语数据结构
- 基于 JSON 的内容管理，适合不想接 CMS 的场景
- 基于 MDX 的写作模块
- 项目、教育、工作、时间线、生活记录等常见个人站模块
- 已替换为公开可用的示意图片与通用 logo

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `MDX`
- `next-themes`

## Project Structure

```text
.
├── app/                      # 页面与 API 路由
├── components/               # UI 与业务组件
├── content/writing/          # MDX 文章
├── data/                     # 站点内容数据（JSON）
├── public/                   # 静态资源与占位图片
├── README.md
└── REQUIREMENTS.md
```

核心内容入口：

- `app/page.tsx`：封面页
- `app/home/page.tsx`：归档首页
- `app/projects/page.tsx`：项目页
- `app/work-experience/page.tsx`：工作经历页
- `app/education/page.tsx`：教育背景页
- `app/lives/page.tsx`：生活记录页
- `app/writing/page.tsx`：文章列表页
- `app/writing/[slug]/page.tsx`：文章详情页

## Local Development

### Requirements

- `Node.js >= 20.9.0`
- `npm`

### Install

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

## Content Customization

这个项目的大部分内容都不需要改 React 代码，直接修改数据文件即可。

### 1. 基础信息

编辑：

- `data/config.json`
- `data/config-zh.json`

可修改内容包括：

- 姓名
- 标语
- 简介
- 联系方式
- 社交链接
- 自我介绍
- 开场文案

### 2. 项目经历

编辑：

- `data/projects.json`
- `data/projects-zh.json`

### 3. 工作与教育经历

编辑：

- `data/work-experience.json`
- `data/work-experience-zh.json`
- `data/education.json`
- `data/education-zh.json`
- `data/timeline.json`
- `data/timeline-zh.json`

### 4. 生活记录

编辑：

- `data/lives.json`
- `data/lives-zh.json`

### 5. 博客文章

在 `content/writing/` 下新增或修改 `.mdx` 文件即可。

文件名示例：

```text
2026-05-01-my-post.mdx
```

## Theming And Branding

如果你想替换视觉识别，可以重点查看这些文件：

- `components/ui/BrandMark.tsx`：站点 logo
- `app/globals.css`：全局颜色与主题样式
- `app/page.tsx`：封面页结构与视觉入口
- `public/placeholders/`：当前使用的示意图片

## Privacy Note

这个公开版本已经做了以下处理：

- 文案已替换为示意文本
- 私人 logo 已替换为通用标识
- 真实照片已替换为占位图

如果你要基于此项目重新公开发布，仍然建议再次检查：

- `data/` 中是否有真实邮箱、手机号、学校、公司
- `content/` 中是否有个人经历细节
- `public/` 中是否有未替换的真实素材
- Git 历史中是否仍保留敏感文件

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Roadmap Ideas

- 恢复真正可切换的中英双语
- 增加项目详情页
- 增加文章标签与分类
- 增加 SEO 元数据配置面板
- 增加内容管理后台或 CMS 接入

## Documentation

- [REQUIREMENTS.md](/Users/tristan_byron/MyaiLearning/my_plat_test/Growing-Margins-test/REQUIREMENTS.md)

## License

如果你准备开源，建议补充你自己的许可证文件，例如 `MIT`。

## Tips

如果你打算使用我的项目，请务必标注引用，创作不易，还请配合，感谢！
