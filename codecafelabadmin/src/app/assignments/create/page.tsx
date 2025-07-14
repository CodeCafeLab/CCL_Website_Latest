"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaSave, FaTimes } from "react-icons/fa";
import { createAssignment } from "@/lib/assignmentApi";
import { slugify } from "@/lib/slugify";

const defaultForm = {
  title: "",
  slug: "",
  description: "",
  requirements: "",
  difficulty: "beginner",
  category: "",
  tags: "",
  estimated_time: "",
  file_url: "",
  solution_url: "",
  featured: false,
  status: "draft",
};

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(form.title) }));
    }
  }, [form.title]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createAssignment({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setIsLoading(false);
      router.push("/assignments");
    } catch (err) {
      setIsLoading(false);
      alert("Failed to create assignment.");
    }
  };
  

  const handleCancel = () => {
    router.push("/assignments");
  };

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Assignment</h1>
              <p className="text-gray-600">Add a new assignment or challenge</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input type="text" name="slug" value={form.slug} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="auto-generated-slug" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Brief description" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Assignment requirements" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Category" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input type="text" name="tags" value={form.tags} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="tag1, tag2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                  <input type="text" name="estimated_time" value={form.estimated_time} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 1 hour" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File URL</label>
                  <input type="url" name="file_url" value={form.file_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/assignment.pdf" />
                  <input type="file" accept=".pdf,.doc,.docx,.zip,.rar,.txt,.md,.js,.py,.java,.cpp,.c,.csv,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("upload_preset", "unsigned_preset");
                      const res = await fetch("https://api.cloudinary.com/v1_1/dubvzmk7g/auto/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      setForm((f) => ({ ...f, file_url: data.secure_url }));
                    }
                  }} className="mt-2" />
                  {form.file_url && (
                    <a href={form.file_url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 mt-1 underline">View Uploaded File</a>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Solution URL</label>
                  <input type="url" name="solution_url" value={form.solution_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/solution.pdf" />
                  <input type="file" accept=".pdf,.doc,.docx,.zip,.rar,.txt,.md,.js,.py,.java,.cpp,.c,.csv,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("upload_preset", "unsigned_preset");
                      const res = await fetch("https://api.cloudinary.com/v1_1/dubvzmk7g/auto/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      setForm((f) => ({ ...f, solution_url: data.secure_url }));
                    }
                  }} className="mt-2" />
                  {form.solution_url && (
                    <a href={form.solution_url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 mt-1 underline">View Uploaded Solution</a>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select id="status" name="status" value={form.status} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-6">
                <button type="button" onClick={handleCancel} className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  <FaTimes />
                  <span>Cancel</span>
                </button>
                <button type="submit" disabled={isLoading} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  <FaSave />
                  <span>{isLoading ? "Creating..." : "Create Assignment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 