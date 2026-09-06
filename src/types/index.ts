export interface Project {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  meta?: string;
  description: string;
  stack: string[];
  metrics?: string;
  category: string;
  featured?: boolean;
  challenges?: string[];
  results?: { metric: string; value: string }[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  // Enriched fields from Flutter portfolio
  role?: string;
  teamSize?: string;
  timeline?: string;
  businessDomain?: string;
  projectType?: string;
  platforms?: string[];
  downloads?: string;
  projectAttributes?: string[];
  architecture?: string;
  problem?: string;
  solution?: string;
  businessImpact?: string;
  features?: string[];
  // Cinematic Showcase extensions
  coverImage?: string;
  shortDescription?: string;
  gallery?: string[];
  title?: string;
  shortTitle?: string;
  floating?: {
    size: 'mini' | 'small' | 'medium' | 'large' | 'wide' | 'portrait';
    depth: 'far' | 'middle' | 'mid' | 'front';
    x?: string;
    y?: string;
    laneTop?: string;
    direction?: 1 | -1;
    duration?: number;
    initialProgress?: number;
    floatAmp?: number;
    tilt?: number;
  };
}

export interface MoreProject {
  name: string;
  detail: string;
}

export interface Experience {
  year: string;
  company: string;
  role: string;
  domain: string;
  duration: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
  color: string;
  metrics?: { label: string; value: string }[];
  responsibilities?: string[];
  achievements?: string[];
}

export interface SkillNode {
  label: string;
  x: number;
  y: number;
  size: number;
  depth: number;
  category: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface EngineeringExpertise {
  title: string;
  tagline: string;
  technologies: string[];
  proofBadge: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  stat: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  accentColor: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
  stat: string;
}

export interface HardwareSkill {
  label: string;
  icon: string;
  category: string;
}
