"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaSave, FaTimes } from "react-icons/fa";
import { createNewsletter } from "@/lib/newsletterApi";

const defaultForm = {
  title: "",
  slug: "",
  content: "",
  subject_line: "",
  author: "",
  category: "",
  tags: "",
  featured: false,
  status: "draft",
  scheduled_at: "",
};

export default function CreateNewsletterPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);

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
      await createNewsletter({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setIsLoading(false);
      router.push("/newsletters");
    } catch (err) {
      setIsLoading(false);
      alert("Failed to create newsletter.");
    }
  };

  const handleCancel = () => {
    router.push("/newsletters");
  };

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Newsletter</h1>
              <p className="text-gray-600">Add a new newsletter to the archive</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line *</label>
                <input type="text" name="subject_line" value={form.subject_line} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Subject line" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea name="content" value={form.content} onChange={handleChange} required rows={8} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Newsletter content" />
              </div>
              {/* Optional: Add image upload for newsletter (e.g., cover image or attachment) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
                <input type="url" name="image_url" value={form.image_url || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/image.jpg" />
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "unsigned_preset");
                    const res = await fetch("https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const data = await res.json();
                    setForm((f) => ({ ...f, image_url: data.secure_url }));
                  }
                }} className="mt-2" />
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="mt-2 h-24 rounded border" />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                  <input type="text" name="author" value={form.author} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Author name" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled At</label>
                  <input type="datetime-local" name="scheduled_at" value={form.scheduled_at} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
                    <option value="scheduled">Scheduled</option>
                    <option value="sent">Sent</option>
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
                  <span>{isLoading ? "Creating..." : "Create Newsletter"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 