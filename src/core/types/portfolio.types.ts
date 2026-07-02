export interface ProjectSummary {
  id: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  technologies: readonly string[];
}
