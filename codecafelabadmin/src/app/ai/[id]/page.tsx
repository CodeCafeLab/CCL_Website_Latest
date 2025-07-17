// src/app/ai/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { FaArrowLeft } from "react-icons/fa";

interface AiItem {
  id: string;
  title: string;
  description: string;
  // Add other fields as needed
}

export default function AiDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [aiItem, setAiItem] = useState<AiItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/ai/${id}`)
        .then((res) => res.json())
        .then((data) => setAiItem(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading AI item...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!aiItem) {
    return (
      <AdminLayout adminName="John Doe">
        <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Item Not Found</h2>
            <p className="text-gray-600 mb-6">
              The AI item you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <button
              onClick={() => router.push("/ai")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to AI List
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout adminName="John Doe">
      <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push("/ai")}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to AI List</span>
          </button>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{aiItem.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{aiItem.description}</p>
            {/* Add more fields here as needed */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
