# 配置指南

这个公开仓库版本已经将所有示例内容匿名化。你可以在以下目录中替换占位文本：

- `data/`：站点配置、项目、经历、兴趣、生活记录
- `content/writing/`：文章内容
- `app/page.tsx`：封面页固定文案

## 推荐做法

1. 只填写愿意公开的信息。
2. 真实邮箱、手机号、学校、公司、住址不要直接提交到公开仓库。
3. 如果只是演示模板，可以继续保留 `Sample`、`示例`、`X` 这类占位文本。

## 常改文件

- `data/config.json`
- `data/config-zh.json`
- `data/projects.json`
- `data/projects-zh.json`
- `data/work-experience.json`
- `data/education.json`
- `content/writing/*.mdx`

## 本地运行

```bash
npm install
npm run dev
```
