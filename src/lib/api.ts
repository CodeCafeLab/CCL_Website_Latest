import axios from "axios";

// Since we are using Next.js rewrites as a proxy, 
// all API calls can be made to the relative path '/api'.
const apiBaseUrl = "/api";

console.log('🔗 Using Next.js proxy for API calls. Base URL:', apiBaseUrl);

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 second timeout
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const getProducts = () => apiClient.get("/products");
export const getProduct = (id: string) => apiClient.get(`/products/${id}`);

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface Career {
  id?: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  experience_level: "entry" | "mid" | "senior" | "lead";
  salary_min?: number;
  salary_max?: number;
  department: string;
  tags?: string[];
  status: "active" | "inactive" | "draft";
  featured: boolean;
  views: number;
  applications_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface JobApplication {
  id?: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  experience_years?: number;
  current_company?: string;
  current_position?: string;
  expected_salary?: number;
  notice_period?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  notes?: string;
  job_title?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  position: string;
  department?: string;
  bio?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: string[];
  experience_years?: number;
  education?: string;
  certifications?: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}
