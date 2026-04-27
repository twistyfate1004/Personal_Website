import { AdminLanguage, readStoredData } from "@/lib/content-store";

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

function normalizeLanguage(language: string) {
  return (language === "zh" ? "zh" : "en") as AdminLanguage;
}

export function getConfig(language: string = "en"): SiteConfig {
  return readStoredData("config", normalizeLanguage(language)) as SiteConfig;
}

/**
 * Get all projects
 */
export function getProjects(language: string = "en"): Project[] {
  return readStoredData("projects", normalizeLanguage(language)) as Project[];
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
  return readStoredData("timeline", normalizeLanguage(language)) as TimelineItem[];
}

/**
 * Get current status
 */
export function getStatus(): Status {
  return readStoredData("status", "en") as Status;
}

/**
 * Get skills and interests
 */
export function getSkillsAndInterests(language: string = "en"): SkillsAndInterests {
  return readStoredData(
    "skills-interests",
    normalizeLanguage(language)
  ) as SkillsAndInterests;
}

/**
 * Get lives data
 */
export function getLives(language: string = "en"): LivesData {
  return readStoredData("lives", normalizeLanguage(language)) as LivesData;
}

/**
 * Get work experiences
 */
export function getWorkExperiences(language: string = "en"): WorkExperience[] {
  return readStoredData(
    "work-experience",
    normalizeLanguage(language)
  ) as WorkExperience[];
}

/**
 * Get education background
 */
export function getEducation(language: string = "en"): Education[] {
  return readStoredData("education", normalizeLanguage(language)) as Education[];
}
