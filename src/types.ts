export interface TechItem {
  id: string;
  name: string;
  category: 'backend' | 'database' | 'frontend' | 'tools';
  categoryLabel: string;
  summary: string;
  description: string;
  highlights: string[];
  icon: string;
  badge: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  techs: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  architectureDetails: string[];
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  englishName: string;
  color: string;
  folders: string[];
  responsibilities: string[];
  description: string;
  sampleCode: string;
  sampleFilename: string;
}

export interface ContactFormData {
  name: string;
  contact: string;
  serviceType: string;
  message: string;
}
