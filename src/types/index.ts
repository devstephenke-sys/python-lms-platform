export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  topics: Topic[];
  project?: Project;
}

export interface Topic {
  id: string;
  title: string;
  explanation: string;
  keyConcepts: string;
  realWorld: string;
  code: string;
  order: number;
  completed?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  path: string;
  language: string;
  codePreview: string;
  features: string[];
}

export interface Quiz {
  id: string;
  topicId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  completedTopics: string[];
  completedProjects: string[];
  quizScores: Record<string, number>;
  currentModule: string;
}
