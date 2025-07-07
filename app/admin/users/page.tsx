"use client";

import { useState, useEffect } from "react";
import {
  Search,
  User,
  CheckCircle,
  Calendar,
  Clock,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Download,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  education?: string | null;
  city?: string | null;
  country?: string | null;
  createdAt: string;
  lastLoginAt?: string | null;
  emailVerified: boolean;
  profileComplete: boolean;
  paymentStats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    totalSpend: number;
  };
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const pageSize = 10;

  // Fetch users with pagination
  const fetchUsers = async (page: number = 1, search: string = "") => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.set("page", page.toString());
      queryParams.set("limit", pageSize.toString());
      if (search) {
        queryParams.set("search", search);
      }

      const response = await fetch(`/api/admin/users?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers(1, searchQuery);
    setCurrentPage(1);
  }, []);

  // Trigger search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers(1, searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUsers(page, searchQuery);
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IQD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#ffd700]" />
          <span className="text-white">جاري تحميل بيانات المستخدمين...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة المستخدمين</h1>
          <p className="text-[#8b95a5] mt-1">
            عرض بيانات المستخدمين وإحصائيات المدفوعات
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-[#8b95a5]">
            إجمالي المستخدمين:{" "}
            <span className="text-[#ffd700] font-medium">
              {pagination?.totalUsers || 0}
            </span>
          </div>

          {/* Export Link */}
          <Link
            href="/admin/users/export"
            className="flex items-center gap-2 px-4 py-2 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            تصدير البيانات
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
        <input
          type="text"
          placeholder="البحث عن طريق الاسم أو البريد الإلكتروني"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#ffffff0d] text-white border border-[#ffffff1a] rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
        />
      </div>

      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id || `user-${index}`}
            className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff1a]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-white text-lg">
                    {user.fullName}
                  </h3>
                  {user.emailVerified && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                  {user.profileComplete && (
                    <User className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <p className="text-[#8b95a5] text-sm">{user.email}</p>
                {user.phone && (
                  <p className="text-[#8b95a5] text-xs mt-1">📱 {user.phone}</p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {(user.education || user.city || user.country) && (
              <div className="mb-4 p-3 bg-[#ffffff08] rounded-lg">
                <p className="text-xs text-[#8b95a5] mb-2">معلومات إضافية</p>
                <div className="space-y-1 text-xs">
                  {user.education && (
                    <p className="text-[#8b95a5]">🎓 {user.education}</p>
                  )}
                  {user.city && (
                    <p className="text-[#8b95a5]">🏙️ {user.city}</p>
                  )}
                  {user.country && (
                    <p className="text-[#8b95a5]">🌍 {user.country}</p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Statistics */}
            <div className="mb-4 p-3 bg-[#ffd700]/10 rounded-lg border border-[#ffd700]/20">
              <p className="text-xs text-[#ffd700] mb-2 font-medium">
                إحصائيات المدفوعات
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#8b95a5]" />
                  <span className="text-white">
                    إجمالي: {user.paymentStats.total}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ffd700]" />
                  <span className="text-[#ffd700]">
                    معلق: {user.paymentStats.pending}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">
                    مقبول: {user.paymentStats.approved}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <span className="text-red-400">
                    مرفوض: {user.paymentStats.rejected}
                  </span>
                </div>
              </div>
              {/* Total Spend */}
              <div className="mt-3 pt-3 border-t border-[#ffd700]/20">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-medium">
                    إجمالي المبلغ المدفوع:{" "}
                    {formatCurrency(user.paymentStats.totalSpend)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2 text-[#8b95a5]">
                <Calendar className="w-4 h-4" />
                <span>
                  انضم في:{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#8b95a5]">
                <Clock className="w-4 h-4" />
                <span>
                  آخر دخول:{" "}
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString("en-US")
                    : "لم يسجل دخول"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-[#ffffff0d] backdrop-blur-sm rounded-xl overflow-hidden border border-[#ffffff1a]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ffffff1a]">
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  المستخدم
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  معلومات الاتصال
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الموقع والتعليم
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  إحصائيات المدفوعات
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  إجمالي المبلغ المدفوع
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  تاريخ الانضمام
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id || `user-${index}`}
                  className="border-b border-[#ffffff1a] last:border-0 hover:bg-[#ffffff08] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {user.fullName}
                        </span>
                        {user.emailVerified && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {user.profileComplete && (
                          <User className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="text-sm text-[#8b95a5]">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {user.phone ? (
                        <div className="text-[#8b95a5]">📱 {user.phone}</div>
                      ) : (
                        <div className="text-[#8b95a5]">لا يوجد رقم هاتف</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-1">
                      {user.education && (
                        <div className="text-[#8b95a5]">
                          🎓 {user.education}
                        </div>
                      )}
                      {user.city && user.country ? (
                        <div className="text-[#8b95a5]">
                          📍 {user.city}, {user.country}
                        </div>
                      ) : user.city ? (
                        <div className="text-[#8b95a5]">📍 {user.city}</div>
                      ) : user.country ? (
                        <div className="text-[#8b95a5]">📍 {user.country}</div>
                      ) : (
                        <div className="text-[#8b95a5]">غير محدد</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#8b95a5]" />
                        <span className="text-white text-sm font-medium">
                          إجمالي: {user.paymentStats.total}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#ffd700]" />
                          <span className="text-[#ffd700]">
                            {user.paymentStats.pending}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">
                            {user.paymentStats.approved}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-red-400" />
                          <span className="text-red-400">
                            {user.paymentStats.rejected}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-sm">
                        {formatCurrency(user.paymentStats.totalSpend)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm space-y-1">
                      <div className="text-white">
                        انضم:{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-US")}
                      </div>
                      <div className="text-[#8b95a5]">
                        آخر دخول:{" "}
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleDateString(
                              "en-US"
                            )
                          : "لم يسجل دخول"}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#8b95a5]">
            عرض {(currentPage - 1) * pageSize + 1} إلى{" "}
            {Math.min(currentPage * pageSize, pagination.totalUsers)} من{" "}
            {pagination.totalUsers} مستخدم
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrev || loading}
              className="p-2 text-[#8b95a5] hover:text-white hover:bg-[#ffffff0d] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNumber =
                    Math.max(
                      1,
                      Math.min(pagination.totalPages - 4, currentPage - 2)
                    ) + i;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={loading}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        pageNumber === currentPage
                          ? "bg-[#ffd700] text-black font-medium"
                          : "text-[#8b95a5] hover:text-white hover:bg-[#ffffff0d]"
                      } disabled:opacity-50`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNext || loading}
              className="p-2 text-[#8b95a5] hover:text-white hover:bg-[#ffffff0d] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Loading overlay for pagination */}
      {loading && users.length > 0 && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] rounded-lg p-4 flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#ffd700]" />
            <span className="text-white">جاري التحميل...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-[#8b95a5] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">لا توجد نتائج</h3>
          <p className="text-[#8b95a5]">
            لم يتم العثور على مستخدمين مطابقين للبحث
          </p>
        </div>
      )}
    </div>
  );
}
