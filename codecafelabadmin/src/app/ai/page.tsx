"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/lib/axios";
import Image from "next/image";
import AdminLayout from "@/components/AdminLayout";
import image from "./../../../public/file.svg";

interface AiTool {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  link?: string;
  tags?: string | string[];
}

export default function AiToolsGridPage() {
  const [aiTools, setAiTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filtered, setFiltered] = useState<AiTool[]>([]);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    // TEMP: Hardcoded data for testing
    setAiTools([
      {
        id: 1,
        title: "Test AI Tool",
        description: "This is a test tool.",
        category: "Productivity",
        image_url: image,
        link: "https://example.com",
        tags: ["test", "ai"],
      },
    ]);
    setLoading(false);
  }, []);

  // Get unique categories for dropdown
  const categories = React.useMemo(() => {
    const cats = aiTools.map((t) => t.category).filter(Boolean);
    return ["all", ...Array.from(new Set(cats))];
  }, [aiTools]);

  // Filter logic
  useEffect(() => {
    let data = aiTools;
    if (category !== "all") {
      data = data.filter((tool) => tool.category === category);
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      data = data.filter((tool) => {
        const inTitle = tool.title.toLowerCase().includes(s);
        let tagsArr: string[] = [];
        if (Array.isArray(tool.tags)) tagsArr = tool.tags;
        else if (typeof tool.tags === "string")
          tagsArr = tool.tags.split(",").map((t) => t.trim());
        const inTags = tagsArr.some((tag) => tag.toLowerCase().includes(s));
        return inTitle || inTags;
      });
    }
    setFiltered(data);
  }, [aiTools, search, category]);

  const handleCardClick = async (id: number, link?: string) => {
    try {
      await apiClient.patch(`/ai/${id}/view`);
    } catch {
      // Optionally handle error
    }
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  // 2. Wrap everything in AdminLayout and refine the design
  return (
    <AdminLayout adminName="John Doe">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-sm">
            AI Tools Gallery
          </h1>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-10 bg-white/80 rounded-xl shadow p-4 border border-gray-200">
            <input
              type="text"
              placeholder="Search by title or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filtered.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group"
                  onClick={() => handleCardClick(tool.id, tool.link)}
                >
                  {tool.image_url && (
                    <div className="relative w-full h-40 bg-gray-100">
                      <Image
                        src={tool.image_url}
                        alt={tool.title}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        style={{
                          borderTopLeftRadius: "1rem",
                          borderTopRightRadius: "1rem",
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center mb-2">
                      {tool.category && (
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                          {tool.category}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-gray-700 text-sm flex-1 mb-4 line-clamp-3">
                      {tool.description}
                    </p>
                    {tool.tags && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(Array.isArray(tool.tags)
                          ? tool.tags
                          : tool.tags?.split(",") || []
                        ).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {tool.link && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(tool.id, tool.link);
                        }}
                        className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow"
                      >
                        Visit Tool
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-20">
                  No AI tools found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
