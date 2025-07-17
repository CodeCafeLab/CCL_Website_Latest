"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaSave, FaTimes } from "react-icons/fa";
import { uploadImageToCloudinary } from "@/lib/cloudinaryUpload";

export default function CreateAiPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", coverImage: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImageToCloudinary(file);
        setForm({ ...form, coverImage: url }); // or image_url, etc.
      } catch (err) {
        console.log(err)
        alert("Image upload failed.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create AI item");
      router.push("/ai");
    } catch (err) {
        console.log(err)
      alert("Failed to create AI item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <h1 className="text-2xl font-bold mb-6">Add New AI Item</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter AI tool name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Describe the AI tool"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => router.push("/ai")}
                className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FaSave />
                <span>{isLoading ? "Saving..." : "Save"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
} 