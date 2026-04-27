# 快速修改参考表

## 我要修改... 👇

| 我想修改 | 打开文件 | 查找字段 |
|---------|---------|---------|
| **我的姓名** | `data/config.json` | `name` |
| **职业标签** | `data/config.json` | `tagline` |
| **座右铭** | `data/config.json` | `motto` |
| **个人简介** | `data/config.json` | `bio` |
| **头像** | `data/config.json` | `avatar` |
| **邮箱** | `data/config.json` | `personalInfo.email` |
| **手机号** | `data/config.json` | `personalInfo.phone` |
| **MBTI** | `data/config.json` | `personalInfo.mbti` |
| **星座** | `data/config.json` | `personalInfo.zodiac` |
| **年龄** | `data/config.json` | `personalInfo.age` |
| **家乡** | `data/config.json` | `personalInfo.hometown` |
| **现居地** | `data/config.json` | `personalInfo.baseLocation` |
| **社交链接** | `data/config.json` | `socials` 数组 |
| **技能列表** | `data/skills-interests.json` | `skills` 数组 |
| **兴趣爱好** | `data/skills-interests.json` | `interests` 数组 |
| **添加项目** | `data/projects.json` | 添加新对象到数组 |
| **修改项目** | `data/projects.json` | 找到对应 `id` 的项目 |
| **工作经历** | `data/timeline.json` | `type: "work"` 的条目 |
| **教育经历** | `data/timeline.json` | `type: "education"` 的条目 |
| **生活记录** | `data/lives.json` | `posts` 数组 |
| **当前状态** | `data/status.json` | `text` 和 `emoji` |
| **写博客** | `content/writing/*.mdx` | 创建新的 .mdx 文件 |

---

## 📂 数据文件位置速查

```
my_plat/
├── data/                           # 🔴 所有配置文件在这里
│   ├── config.json                 # 个人信息、社交链接
│   ├── skills-interests.json       # 技能、兴趣
│   ├── projects.json               # 项目列表
│   ├── timeline.json               # 时间线
│   ├── lives.json                  # 生活记录
│   └── status.json                 # 当前状态
│
├── content/                        # 📝 内容文件
│   └── writing/                    # 博客文章（.mdx 文件）
│
└── public/                         # 🖼️ 静态资源
    └── avatar.jpeg                 # 头像图片
```

---

## 🎯 常见修改场景

### 场景 1: 更新个人信息
**文件**: `data/config.json`

```json
{
  "name": "新名字",
  "tagline": "新标签",
  "personalInfo": {
    "email": "新邮箱",
    "phone": "新手机号"
  }
}
```

### 场景 2: 添加新项目
**文件**: `data/projects.json`

```json
[
  ...现有项目,
  {
    "id": "new-project",
    "title": "我的新项目",
    "description": "项目描述",
    "tech": ["React", "Node.js"],
    "links": {
      "github": "https://github.com/..."
    },
    "featured": true
  }
]
```

### 场景 3: 添加技能
**文件**: `data/skills-interests.json`

```json
{
  "skills": [
    ...现有分类,
    {
      "category": "新分类",
      "items": ["技能1", "技能2"]
    }
  ]
}
```

### 场景 4: 添加工作经历
**文件**: `data/timeline.json`

```json
[
  ...现有经历,
  {
    "year": "2024 - Present",
    "title": "新工作职位",
    "description": "工作内容",
    "type": "work"
  }
]
```

### 场景 5: 添加生活记录
**文件**: `data/lives.json`

```json
{
  "posts": [
    ...现有记录,
    {
      "id": "life-4",
      "date": "2024-01-06",
      "title": "新的一天",
      "content": "今天天气不错...",
      "mediaList": [
        {
          "url": "/photo1.jpg",
          "type": "image"
        },
        {
          "url": "/video1.mp4",
          "type": "video"
        }
      ]
    }
  ]
}
```

**提示**：
- `mediaList` 可包含多个图片/视频
- 媒体文件放在 `public/` 目录
- 不需要媒体时，`mediaList` 设为空数组 `[]`

---

## ⚡ 30秒快速修改

### 更换头像
1. 将新照片放到 `public/` 目录
2. 打开 `data/config.json`
3. 修改 `"avatar": "/新文件名.jpg"`

### 修改邮箱
1. 打开 `data/config.json`
2. 找到 `personalInfo.email`
3. 修改为新邮箱

### 添加技能
1. 打开 `data/skills-interests.json`
2. 在对应 `category` 的 `items` 数组中添加
3. 保存

### 发布新文章
1. 在 `content/writing/` 创建新文件 `2024-01-01-title.mdx`
2. 写入文章内容（MDX 格式）
3. 保存，刷新 Writing 页面

---

## 🔧 需要编辑代码的情况

以下修改需要编辑 React 组件文件：

| 修改内容 | 文件位置 |
|---------|---------|
| 导航栏菜单 | `components/layout/Header.tsx` |
| Quick Links | `components/home/QuickLinks.tsx` |
| 页面布局 | `app/*/page.tsx` |
| 样式颜色 | `app/globals.css` |

---

## 📱 修改后生效

所有配置文件修改后：
1. **保存文件**
2. **刷新浏览器**（Ctrl+F5 或 Cmd+Shift+R）
3. ✅ 完成

---

## 💾 备份建议

修改前建议备份：
```bash
# 备份 data 目录
cp -r data data.backup

# 恢复
cp -r data.backup/* data/
```

---

## 🚨 快速排错

### 修改后没变化？
- [ ] 确认文件已保存
- [ ] 强制刷新浏览器
- [ ] 检查 JSON 格式是否正确

### 页面报错？
- [ ] 检查 JSON 语法（逗号、引号）
- [ ] 打开浏览器控制台查看错误
- [ ] 使用 JSON 验证工具

### 图片不显示？
- [ ] 确认图片在 `public/` 目录
- [ ] 检查文件名大小写
- [ ] 确认路径以 `/` 开头

---

## 📚 需要详细说明？

查看完整配置指南：`CONFIG_GUIDE.md`