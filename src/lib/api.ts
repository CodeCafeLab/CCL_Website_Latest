import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally: clear token and force logout
      localStorage.removeItem("authToken");
      // Optionally: redirect to login or show a message
      window.location.href = "/login"; // or use router.push in Next.js
    }
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
