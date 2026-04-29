import fs from "fs";
import path from "path";

// Define types for your data structures
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  email?: string;
  phone?: string;
  mbti?: string;
  zodiac?: string;
  age?: number;
  hometown?: string;
  baseLocation?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  bio: string;
  avatar?: string;
  motto?: string;
  selfDescription?: string;
  personalInfo?: PersonalInfo;
  socials: SocialLink[];
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export type RichTextItem = string | { isHeading: boolean; title: string };
export type ProjectDescription = string | RichTextItem[];

export interface Project {
  id: string;
  title: string;
  description: ProjectDescription;
  tech: string[];
  links: ProjectLinks;
  featured: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  type: "work" | "education" | "other";
}

export interface Status {
  text: string;
  emoji?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SkillsAndInterests {
  skills: SkillCategory[];
  interests: string[];
}

export interface MediaItem {
  url: string;
  type: "image" | "video";
}

export interface LifePost {
  id: string;
  date: string;
  title: string;
  content: string;
  mediaList?: MediaItem[];
}

export interface LivesData {
  posts: LifePost[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  location: string;
  description: RichTextItem[];
  skills?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major?: string;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  location: string;
  gpa?: string;
  coursework?: string[];
  achievements?: RichTextItem[];
}

type ContentLanguage = "en" | "zh";

const dataDirectory = path.join(process.cwd(), "data");
const localizedResources = new Set([
  "config",
  "projects",
  "work-experience",
  "education",
  "timeline",
  "skills-interests",
  "lives",
]);

function normalizeLanguage(language: string): ContentLanguage {
  return language === "zh" ? "zh" : "en";
}

function getDataFilename(resource: string, language: ContentLanguage) {
  const suffix = localizedResources.has(resource) && language === "zh" ? "-zh" : "";
  return `${resource}${suffix}.json`;
}

function readDataFile<T>(resource: string, language: string = "en"): T {
  const filename = getDataFilename(resource, normalizeLanguage(language));
  const filePath = path.join(dataDirectory, filename);
  const contents = fs.readFileSync(filePath, "utf8");

  return JSON.parse(contents) as T;
}

export function getConfig(language: string = "en"): SiteConfig {
  return readDataFile<SiteConfig>("config", language);
}

/**
 * Get all projects
 */
export function getProjects(language: string = "en"): Project[] {
  return readDataFile<Project[]>("projects", language);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(language: string = "en"): Project[] {
  return getProjects(language).filter((project) => project.featured);
}

/**
 * Get project by ID
 */
export function getProjectById(id: string, language: string = "en"): Project | undefined {
  return getProjects(language).find((project) => project.id === id);
}

/**
 * Get timeline
 */
export function getTimeline(language: string = "en"): TimelineItem[] {
  return readDataFile<TimelineItem[]>("timeline", language);
}

/**
 * Get current status
 */
export function getStatus(): Status {
  return readDataFile<Status>("status");
}

/**
 * Get skills and interests
 */
export function getSkillsAndInterests(language: string = "en"): SkillsAndInterests {
  return readDataFile<SkillsAndInterests>("skills-interests", language);
}

/**
 * Get lives data
 */
export function getLives(language: string = "en"): LivesData {
  return readDataFile<LivesData>("lives", language);
}

/**
 * Get work experiences
 */
export function getWorkExperiences(language: string = "en"): WorkExperience[] {
  return readDataFile<WorkExperience[]>("work-experience", language);
}

/**
 * Get education background
 */
export function getEducation(language: string = "en"): Education[] {
  return readDataFile<Education[]>("education", language);
}
