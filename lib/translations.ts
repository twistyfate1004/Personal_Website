export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      projects: "Projects",
      workExperience: "Work Experience",
      education: "Education",
      lives: "Lives",
    },
    // Home page
    home: {
      quickLinks: "Quick Links",
      skills: "Skills",
      interests: "Interests",
      timeline: "Timeline",
      personalInfo: "Personal Info",
      selfDescription: "About Me",
    },
    // Work Experience page
    workExperience: {
      title: "Work Experience",
      description: "My professional journey and career highlights",
      workDescription: "Work Description",
      noData: "No work experience added yet...",
      addData: "Add your experience in data/work-experience.json",
      current: "Current",
    },
    // Education page
    education: {
      title: "Education",
      description: "My academic background and qualifications",
      relevantCoursework: "Relevant Coursework",
      achievements: "Experiences",
      noData: "No education information added yet...",
      addData: "Add your education in data/education.json",
      current: "Current",
      gpa: "GPA",
    },
    // Lives page
    lives: {
      title: "Lives",
      description: "Daily life records",
      noData: "No life records yet...",
      addData: "Add records in data/lives.json",
    },
    // Projects page
    projects: {
      title: "Projects",
      description: "A showcase of my personal and professional projects",
      allProjects: "All Projects",
      featuredProjects: "Featured Projects",
      viewProject: "View Project",
      sourceCode: "Source Code",
      noData: "No projects added yet...",
    },
    // Common
    common: {
      company: "Company",
      position: "Position",
      location: "Location",
      date: "Date",
      institution: "Institution",
      degree: "Degree",
      major: "Major",
    },
  },
  zh: {
    // Navigation
    nav: {
      home: "首页",
      projects: "项目经历",
      workExperience: "工作经历",
      education: "教育背景",
      lives: "生活",
    },
    // Home page
    home: {
      quickLinks: "快速链接",
      skills: "技能",
      interests: "兴趣",
      timeline: "成长履历（这辈子有了）",
      personalInfo: "个人信息",
      selfDescription: "自我评价",
    },
    // Work Experience page
    workExperience: {
      title: "工作经历",
      description: "我的职业旅程和职业生涯亮点",
      workDescription: "工作描述",
      noData: "暂无工作经历...",
      addData: "在 data/work-experience.json 中添加经历",
      current: "当前",
    },
    // Education page
    education: {
      title: "教育背景",
      description: "我的学术背景和资质",
      relevantCoursework: "相关课程",
      achievements: "相关经历",
      noData: "暂无教育信息...",
      addData: "在 data/education.json 中添加信息",
      current: "当前",
      gpa: "绩点",
    },
    // Lives page
    lives: {
      title: "生活",
      description: "日常生活记录",
      noData: "暂无生活记录...",
      addData: "在 data/lives.json 中添加记录",
    },
    // Projects page
    projects: {
      title: "项目经历",
      description: "我的个人和专业项目展示",
      allProjects: "所有项目",
      featuredProjects: "精选项目",
      viewProject: "查看项目",
      sourceCode: "源代码",
      noData: "暂无项目...",
    },
    // Common
    common: {
      company: "公司",
      position: "职位",
      location: "地点",
      date: "日期",
      institution: "学校",
      degree: "学位",
      major: "专业",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.en;