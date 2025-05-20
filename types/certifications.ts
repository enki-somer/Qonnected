export interface ExamDetails {
  format: string;
  totalQuestions: number;
  passingScore: string;
  timeLimit: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  prerequisites: string[];
  learningOutcomes: string[];
  examDetails: ExamDetails;
  benefits: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  exams: Certification[];
} 