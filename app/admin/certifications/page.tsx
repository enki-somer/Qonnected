"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Upload,
  Award,
  CheckCircle,
} from "lucide-react";

interface Certification {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  enrolledCount: number;
  completionCount: number;
  status: "active" | "draft";
  createdAt: string;
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertification, setSelectedCertification] = useState<
    string | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "draft",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch certifications
  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/certifications");
      if (!response.ok) {
        throw new Error("Failed to fetch certifications");
      }

      const data = await response.json();
      setCertifications(data.certifications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const url =
        isEditing && selectedCertification
          ? `/api/admin/certifications/${selectedCertification}`
          : "/api/admin/certifications";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to save certification");
      }

      // Reset form and refresh list
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "draft",
        image: null,
      });
      setPreviewUrl(null);
      setIsEditing(false);
      setSelectedCertification(null);
      fetchCertifications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleEdit = (certification: Certification) => {
    setFormData({
      name: certification.name,
      description: certification.description,
      price: certification.price,
      status: certification.status,
      image: null,
    });
    setPreviewUrl(certification.image);
    setSelectedCertification(certification.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الشهادة؟")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/certifications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete certification");
      }

      fetchCertifications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Filter certifications based on search query
  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#ffd700]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">إدارة الشهادات</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setSelectedCertification(null);
            setFormData({
              name: "",
              description: "",
              price: "",
              status: "draft",
              image: null,
            });
            setPreviewUrl(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors"
        >
          <Plus className="w-5 h-5" />
          إضافة شهادة جديدة
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
        <input
          type="text"
          placeholder="البحث في الشهادات"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
        />
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((certification) => (
          <div
            key={certification.id}
            className="bg-[#ffffff0d] rounded-xl overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={certification.image}
                alt={certification.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {certification.name}
                  </h3>
                  <p className="text-sm text-[#8b95a5] mt-1">
                    {certification.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    certification.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {certification.status === "active" ? "نشط" : "مسودة"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#8b95a5]">
                <span>{certification.price}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {certification.enrolledCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {certification.completionCount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[#ffffff1a]">
                <button
                  onClick={() => handleEdit(certification)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffff0d] text-white rounded-lg hover:bg-[#ffffff1a] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(certification.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffff0d] text-red-500 rounded-lg hover:bg-[#ffffff1a] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isEditing || selectedCertification === null) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">
                {isEditing ? "تعديل الشهادة" : "إضافة شهادة جديدة"}
              </h3>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedCertification(null);
                }}
                className="text-[#8b95a5] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  اسم الشهادة
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700] h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  السعر
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  الحالة
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "active" | "draft",
                    }))
                  }
                  className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
                >
                  <option value="draft">مسودة</option>
                  <option value="active">نشط</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  الصورة
                </label>
                <div className="relative">
                  {previewUrl ? (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setFormData((prev) => ({ ...prev, image: null }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      className="h-48 border-2 border-dashed border-[#8b95a5] rounded-lg flex items-center justify-center cursor-pointer hover:border-[#ffd700] transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-[#8b95a5] mx-auto mb-2" />
                        <p className="text-sm text-[#8b95a5]">
                          اضغط هنا لتحميل صورة
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedCertification(null);
                  }}
                  className="px-4 py-2 bg-[#ffffff0d] text-white rounded-lg hover:bg-[#ffffff1a] transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors"
                >
                  {isEditing ? "حفظ التغييرات" : "إضافة الشهادة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
