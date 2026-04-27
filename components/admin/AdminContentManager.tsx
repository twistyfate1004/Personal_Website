"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  FileText,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdminLanguage = "en" | "zh";
type AdminResource =
  | "config"
  | "projects"
  | "work-experience"
  | "education"
  | "timeline"
  | "skills-interests"
  | "lives"
  | "status";
type ResourceMode = "object" | "array" | "nested-array";
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {
  readonly __jsonArrayBrand?: unique symbol;
}

interface ResourceConfig {
  key: AdminResource;
  label: string;
  description: string;
  mode: ResourceMode;
  nestedKey?: string;
  titleKeys?: string[];
  template: JsonValue;
  localized: boolean;
}

const resources: ResourceConfig[] = [
  {
    key: "config",
    label: "个人信息",
    description: "姓名、头像、简介、联系方式、社交链接等主页基础信息。",
    mode: "object",
    localized: true,
    template: {
      name: "",
      tagline: "",
      bio: "",
      motto: "",
      avatar: "/avatar.jpg",
      personalInfo: {
        email: "",
        phone: "",
        mbti: "",
        zodiac: "",
        age: 0,
        hometown: "",
        baseLocation: "",
      },
      selfDescription: "",
      socials: [],
    },
  },
  {
    key: "projects",
    label: "项目经历",
    description: "展示在项目页面里的项目卡片。",
    mode: "array",
    localized: true,
    titleKeys: ["title", "id"],
    template: {
      id: "new-project",
      title: "新项目",
      description: ["项目描述"],
      tech: [],
      links: {
        github: "",
        demo: "",
      },
      featured: false,
    },
  },
  {
    key: "work-experience",
    label: "工作经历",
    description: "公司、岗位、时间、地点和工作描述。",
    mode: "array",
    localized: true,
    titleKeys: ["company", "position", "id"],
    template: {
      id: "new-work",
      company: "公司名称",
      position: "职位名称",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: ["工作内容"],
    },
  },
  {
    key: "education",
    label: "教育背景",
    description: "学校、学位、专业、课程和相关经历。",
    mode: "array",
    localized: true,
    titleKeys: ["institution", "degree", "id"],
    template: {
      id: "new-education",
      institution: "学校名称",
      degree: "学位",
      major: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      gpa: "",
      coursework: [],
      achievements: [],
    },
  },
  {
    key: "timeline",
    label: "成长履历",
    description: "首页时间线条目。",
    mode: "array",
    localized: true,
    titleKeys: ["title", "year"],
    template: {
      year: "",
      title: "新的履历",
      description: "",
      type: "other",
    },
  },
  {
    key: "skills-interests",
    label: "技能兴趣",
    description: "首页技能分组和兴趣标签。",
    mode: "object",
    localized: true,
    template: {
      skills: [
        {
          category: "技能分类",
          items: [],
        },
      ],
      interests: [],
    },
  },
  {
    key: "lives",
    label: "生活记录",
    description: "生活页面里的动态、图片和视频记录。",
    mode: "nested-array",
    nestedKey: "posts",
    localized: true,
    titleKeys: ["title", "date", "id"],
    template: {
      id: "new-life-post",
      date: new Date().toISOString().slice(0, 10),
      title: "新的生活记录",
      content: "",
      mediaList: [],
    },
  },
  {
    key: "status",
    label: "当前状态",
    description: "保留给 Now/状态模块使用的短文本。",
    mode: "object",
    localized: false,
    template: {
      text: "",
      emoji: "",
    },
  },
];

const fieldLabels: Record<string, string> = {
  name: "姓名",
  tagline: "一句话介绍",
  bio: "个人简介",
  motto: "座右铭",
  avatar: "头像路径",
  personalInfo: "基础信息",
  email: "邮箱",
  phone: "电话",
  mbti: "MBTI",
  zodiac: "星座",
  age: "年龄",
  hometown: "家乡",
  baseLocation: "常驻地",
  selfDescription: "自我评价",
  socials: "社交链接",
  icon: "图标",
  url: "链接",
  id: "唯一标识",
  title: "标题",
  description: "描述",
  tech: "技术栈",
  links: "相关链接",
  github: "GitHub",
  demo: "演示链接",
  featured: "精选展示",
  company: "公司",
  position: "职位",
  startDate: "开始时间",
  endDate: "结束时间",
  current: "当前仍在进行",
  location: "地点",
  institution: "学校",
  degree: "学位",
  major: "专业",
  gpa: "绩点",
  coursework: "相关课程",
  achievements: "相关经历",
  year: "年份",
  type: "类型",
  skills: "技能分组",
  category: "分类",
  items: "条目",
  interests: "兴趣",
  date: "日期",
  content: "正文",
  mediaList: "媒体列表",
  text: "文本",
  emoji: "表情",
  isHeading: "作为小标题",
};

function isObject(value: JsonValue | undefined): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cloneValue<T extends JsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function makeUniqueId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

function ensureUniqueId(item: JsonValue, resource: AdminResource) {
  if (!isObject(item) || !("id" in item)) {
    return item;
  }

  return {
    ...item,
    id: makeUniqueId(resource),
  };
}

function getFieldLabel(key: string) {
  return fieldLabels[key] ?? key;
}

function shouldUseTextarea(key: string, value: JsonValue) {
  return (
    typeof value === "string" &&
    (value.length > 80 ||
      ["bio", "description", "content", "selfDescription", "text"].includes(key))
  );
}

function getItemTitle(item: JsonValue, config: ResourceConfig, index: number) {
  if (!isObject(item)) {
    return `条目 ${index + 1}`;
  }

  const key = config.titleKeys?.find((titleKey) => {
    const value = item[titleKey];
    return typeof value === "string" && value.trim().length > 0;
  });

  return key ? String(item[key]) : `条目 ${index + 1}`;
}

function getEditableArray(data: JsonValue | null, config: ResourceConfig) {
  if (config.mode === "array") {
    return Array.isArray(data) ? data : [];
  }

  if (config.mode === "nested-array" && config.nestedKey && isObject(data ?? null)) {
    const value = (data as JsonObject)[config.nestedKey];
    return Array.isArray(value) ? value : [];
  }

  return [];
}

function replaceEditableArray(data: JsonValue | null, config: ResourceConfig, items: JsonValue[]) {
  if (config.mode === "array") {
    return items;
  }

  if (config.mode === "nested-array" && config.nestedKey) {
    const base = isObject(data ?? null) ? data as JsonObject : {};
    return {
      ...base,
      [config.nestedKey]: items,
    };
  }

  return data ?? {};
}

function getObjectKeys(value: JsonObject, template?: JsonValue) {
  const templateKeys = isObject(template) ? Object.keys(template) : [];
  return Array.from(new Set([...templateKeys, ...Object.keys(value)]));
}

function getArrayTemplate(key: string, currentValue?: JsonValue): JsonValue {
  if (Array.isArray(currentValue) && currentValue.length > 0) {
    return cloneValue(currentValue[0]);
  }

  if (key === "socials") {
    return { name: "", url: "", icon: "" };
  }

  if (key === "skills") {
    return { category: "技能分类", items: [] };
  }

  if (key === "mediaList") {
    return { url: "", type: "image" };
  }

  return "";
}

function getNestedTemplate(template: JsonValue | undefined, key: string, value: JsonValue) {
  if (isObject(template)) {
    return template[key];
  }

  if (Array.isArray(template) && template.length > 0) {
    return template[0];
  }

  return Array.isArray(value) ? getArrayTemplate(key, value) : undefined;
}

interface FieldEditorProps {
  label: string;
  fieldKey: string;
  value: JsonValue;
  template?: JsonValue;
  onChange: (value: JsonValue) => void;
}

function FieldEditor({ label, fieldKey, value, template, onChange }: FieldEditorProps) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-md border border-border p-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm font-medium">{label}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="mb-2 block text-sm font-medium">{label}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
        />
      </label>
    );
  }

  if (typeof value === "string" || value === null) {
    const stringValue = typeof value === "string" ? value : "";

    if (fieldKey === "type") {
      const options = stringValue === "image" || stringValue === "video"
        ? ["image", "video"]
        : ["work", "education", "other"];

      return (
        <label className="block">
          <span className="mb-2 block text-sm font-medium">{label}</span>
          <select
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }

    return (
      <label className="block">
        <span className="mb-2 block text-sm font-medium">{label}</span>
        {shouldUseTextarea(fieldKey, stringValue) ? (
          <textarea
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed outline-none focus:border-accent"
          />
        ) : (
          <input
            type={fieldKey === "url" || fieldKey === "avatar" || fieldKey === "github" || fieldKey === "demo" ? "url" : "text"}
            value={stringValue}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const arrayValue = value as JsonValue[];
    const itemTemplate = getArrayTemplate(fieldKey, arrayValue);

    function addItem(nextItem: JsonValue = cloneValue(itemTemplate)) {
      onChange([...arrayValue, nextItem]);
    }

    function updateItem(index: number, nextItem: JsonValue) {
      onChange(arrayValue.map((item, itemIndex) => itemIndex === index ? nextItem : item));
    }

    function moveItem(index: number, direction: -1 | 1) {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= arrayValue.length) return;

      const nextValue = [...arrayValue];
      [nextValue[index], nextValue[targetIndex]] = [nextValue[targetIndex], nextValue[index]];
      onChange(nextValue);
    }

    return (
      <div className="rounded-md border border-border p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold">{label}</h3>
            <p className="text-xs text-muted-foreground">{arrayValue.length} 条</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(fieldKey === "description" || fieldKey === "achievements") && (
              <button
                type="button"
                onClick={() => addItem({ isHeading: true, title: "小标题" })}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-muted"
              >
                <Plus className="h-3.5 w-3.5" />
                小标题
              </button>
            )}
            <button
              type="button"
              onClick={() => addItem()}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs hover:bg-muted"
            >
              <Plus className="h-3.5 w-3.5" />
              新增
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {arrayValue.map((item, index) => (
            <div key={index} className="rounded-md bg-muted/40 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {label} {index + 1}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    className="rounded-md p-1 hover:bg-background"
                    disabled={index === 0}
                    aria-label="上移"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    className="rounded-md p-1 hover:bg-background"
                    disabled={index === arrayValue.length - 1}
                    aria-label="下移"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(arrayValue.filter((_, itemIndex) => itemIndex !== index))}
                    className="rounded-md p-1 text-red-600 hover:bg-red-500/10"
                    aria-label="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <FieldEditor
                label=""
                fieldKey={fieldKey}
                value={item}
                template={itemTemplate}
                onChange={(nextItem) => updateItem(index, nextItem)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isObject(value)) {
    const keys = getObjectKeys(value, template);

    return (
      <div className={cn("space-y-4", label && "rounded-md border border-border p-3")}>
        {label && <h3 className="text-sm font-semibold">{label}</h3>}
        <div className="grid gap-4 md:grid-cols-2">
          {keys.map((key) => (
            <div
              key={key}
              className={cn(
                ["bio", "description", "content", "selfDescription", "socials", "skills", "achievements", "mediaList", "personalInfo", "links"].includes(key) && "md:col-span-2"
              )}
            >
              <FieldEditor
                label={getFieldLabel(key)}
                fieldKey={key}
                value={value[key] ?? cloneValue(getNestedTemplate(template, key, value[key]) ?? "")}
                template={getNestedTemplate(template, key, value[key])}
                onChange={(nextValue) => onChange({ ...value, [key]: nextValue })}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function AdminContentManager() {
  const router = useRouter();
  const [activeResource, setActiveResource] = useState<AdminResource>("config");
  const [language, setLanguage] = useState<AdminLanguage>("zh");
  const [data, setData] = useState<JsonValue | null>(null);
  const [filename, setFilename] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const activeConfig = useMemo(
    () => resources.find((resource) => resource.key === activeResource) ?? resources[0],
    [activeResource]
  );
  const items = useMemo(() => getEditableArray(data, activeConfig), [activeConfig, data]);
  const isListResource = activeConfig.mode !== "object";
  const visibleLanguage = activeConfig.localized;
  const editingValue = isListResource
    ? items[selectedIndex] ?? cloneValue(activeConfig.template)
    : data ?? cloneValue(activeConfig.template);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setIsLoading(true);
      setError("");
      setMessage("");

      try {
        const response = await fetch(
          `/api/admin/data?resource=${activeConfig.key}&lang=${language}`,
          { cache: "no-store" }
        );

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("读取失败");
        }

        const payload = await response.json() as { data: JsonValue; filename: string };

        if (ignore) return;

        setData(payload.data);
        setFilename(payload.filename);
        setSelectedIndex(0);
      } catch {
        if (!ignore) {
          setError("读取数据失败，请检查对应数据文件。");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [activeConfig, language, reloadKey, router]);

  function updateEditingValue(nextValue: JsonValue) {
    if (!isListResource) {
      setData(nextValue);
      return;
    }

    const nextItems = [...items];
    nextItems[selectedIndex] = nextValue;
    setData(replaceEditableArray(data, activeConfig, nextItems));
  }

  function addItem() {
    const nextItem = ensureUniqueId(cloneValue(activeConfig.template), activeConfig.key);
    const nextItems = [...items, nextItem];

    setData(replaceEditableArray(data, activeConfig, nextItems));
    setSelectedIndex(nextItems.length - 1);
    setMessage("已新增一条内容，保存后生效。");
    setError("");
  }

  function duplicateItem() {
    const current = items[selectedIndex] ?? activeConfig.template;
    const nextItem = ensureUniqueId(cloneValue(current), activeConfig.key);
    const nextItems = [
      ...items.slice(0, selectedIndex + 1),
      nextItem,
      ...items.slice(selectedIndex + 1),
    ];

    setData(replaceEditableArray(data, activeConfig, nextItems));
    setSelectedIndex(selectedIndex + 1);
    setMessage("已复制当前内容，保存后生效。");
    setError("");
  }

  function deleteItem() {
    if (items.length === 0) return;

    const nextItems = items.filter((_, index) => index !== selectedIndex);
    const nextIndex = Math.max(0, selectedIndex - 1);

    setData(replaceEditableArray(data, activeConfig, nextItems));
    setSelectedIndex(nextIndex);
    setMessage("已删除当前内容，保存后生效。");
    setError("");
  }

  async function saveData() {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/data?resource=${activeConfig.key}&lang=${language}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data ?? cloneValue(activeConfig.template) }),
        }
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("保存失败");
      }

      const payload = await response.json() as { data: JsonValue; filename: string };
      setData(payload.data);
      setFilename(payload.filename);
      setMessage("保存成功，刷新前台页面即可看到最新内容。");
    } catch {
      setError("保存失败，请稍后重试。");
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">内容管理</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            在这里维护个人主页内容，不需要修改代码或手写 JSON。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setLanguage("zh")}
            className={cn(
              "h-9 rounded-md border px-3 text-sm transition-colors",
              language === "zh"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:bg-muted"
            )}
          >
            中文
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={cn(
              "h-9 rounded-md border px-3 text-sm transition-colors",
              language === "en"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border hover:bg-muted",
              !visibleLanguage && "opacity-40"
            )}
            disabled={!visibleLanguage}
          >
            English
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            退出
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border border-border">
          <nav className="p-2">
            {resources.map((resource) => (
              <button
                key={resource.key}
                type="button"
                onClick={() => setActiveResource(resource.key)}
                className={cn(
                  "flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  activeResource === resource.key
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                )}
              >
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{resource.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{activeConfig.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activeConfig.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  当前文件：{filename || "加载中..."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setReloadKey((value) => value + 1)}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-muted"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4" />
                  刷新
                </button>
                <button
                  type="button"
                  onClick={saveData}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground hover:opacity-90"
                  disabled={isSaving || isLoading}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  保存
                </button>
              </div>
            </div>

            {(message || error) && (
              <div
                className={cn(
                  "mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                  error
                    ? "bg-red-500/10 text-red-600 dark:text-red-300"
                    : "bg-accent/10 text-accent"
                )}
              >
                {!error && <Check className="h-4 w-4" />}
                {error || message}
              </div>
            )}
          </div>

          <div className={cn("grid gap-4", isListResource && "xl:grid-cols-[260px_1fr]")}>
            {isListResource && (
              <aside className="rounded-lg border border-border">
                <div className="flex items-center justify-between border-b border-border p-3">
                  <span className="text-sm font-medium">内容列表</span>
                  <span className="text-xs text-muted-foreground">{items.length} 条</span>
                </div>
                <div className="max-h-[560px] overflow-y-auto p-2">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedIndex(index);
                          setError("");
                          setMessage("");
                        }}
                        className={cn(
                          "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                          selectedIndex === index
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <span className="block truncate">
                          {getItemTitle(item, activeConfig, index)}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-6 text-sm text-muted-foreground">
                      暂无内容。
                    </p>
                  )}
                </div>
              </aside>
            )}

            <div className="rounded-lg border border-border">
              {isListResource && (
                <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                    新增
                  </button>
                  <button
                    type="button"
                    onClick={duplicateItem}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-muted"
                    disabled={items.length === 0}
                  >
                    <Copy className="h-4 w-4" />
                    复制
                  </button>
                  <button
                    type="button"
                    onClick={deleteItem}
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-red-600 hover:bg-red-500/10"
                    disabled={items.length === 0}
                  >
                    <Trash2 className="h-4 w-4" />
                    删除
                  </button>
                </div>
              )}

              <div className="p-4">
                {isLoading ? (
                  <div className="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    加载中...
                  </div>
                ) : (
                  <FieldEditor
                    label=""
                    fieldKey={activeConfig.key}
                    value={editingValue}
                    template={activeConfig.template}
                    onChange={updateEditingValue}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
