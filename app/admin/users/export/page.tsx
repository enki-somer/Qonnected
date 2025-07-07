"use client";

import { useState, useEffect } from "react";
import {
  Download,
  FileSpreadsheet,
  Loader2,
  ArrowLeft,
  Search,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import * as XLSX from "xlsx";
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

export default function UsersExportPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Fetch all users for export
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.set("export", "true");
      if (searchQuery) {
        queryParams.set("search", searchQuery);
      }

      const response = await fetch(`/api/admin/users?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAllUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Initial load
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery.trim()) return true;

    const searchTerm = searchQuery.toLowerCase();
    const matchesName =
      user.fullName?.toLowerCase().includes(searchTerm) || false;
    const matchesEmail =
      user.email?.toLowerCase().includes(searchTerm) || false;

    return matchesName || matchesEmail;
  });

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IQD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Export to CSV function
  const exportToCSV = async () => {
    try {
      setExporting(true);
      setExportProgress(0);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Prepare data for CSV
      const csvData = filteredUsers.map((user, index) => ({
        رقم: index + 1,
        "الاسم الكامل": user.fullName || "",
        "البريد الإلكتروني": user.email || "",
        "رقم الهاتف": user.phone || "غير محدد",
        التعليم: user.education || "غير محدد",
        المدينة: user.city || "غير محدد",
        الدولة: user.country || "غير محدد",
        "تاريخ الانضمام": user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US")
          : "غير محدد",

        "إجمالي المدفوعات": user.paymentStats.total,
        "المدفوعات المعلقة": user.paymentStats.pending,
        "المدفوعات المقبولة": user.paymentStats.approved,
        "المدفوعات المرفوضة": user.paymentStats.rejected,
        "إجمالي المبلغ المدفوع (دينار عراقي)": user.paymentStats.totalSpend,
      }));

      // Convert to CSV
      const headers = Object.keys(csvData[0] || {});
      const csvContent = [
        headers.join(","),
        ...csvData.map((row) =>
          headers
            .map((header) => {
              const value = row[header as keyof typeof row];
              // Escape commas and quotes in CSV
              return typeof value === "string" &&
                (value.includes(",") || value.includes('"'))
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            })
            .join(",")
        ),
      ].join("\n");

      // Add BOM for proper Arabic display in Excel
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      clearInterval(progressInterval);
      setExportProgress(100);

      // Download file
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `users_data_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      setError("فشل في تصدير البيانات إلى CSV");
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  // Export to Excel function
  const exportToExcel = async () => {
    try {
      setExporting(true);
      setExportProgress(0);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Prepare data for Excel
      const excelData = filteredUsers.map((user, index) => ({
        رقم: index + 1,
        "الاسم الكامل": user.fullName || "",
        "البريد الإلكتروني": user.email || "",
        "رقم الهاتف": user.phone || "غير محدد",
        التعليم: user.education || "غير محدد",
        المدينة: user.city || "غير محدد",
        الدولة: user.country || "غير محدد",
        "تاريخ الانضمام": user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US")
          : "غير محدد",

        "إجمالي المدفوعات": user.paymentStats.total,
        "المدفوعات المعلقة": user.paymentStats.pending,
        "المدفوعات المقبولة": user.paymentStats.approved,
        "المدفوعات المرفوضة": user.paymentStats.rejected,
        "إجمالي المبلغ المدفوع (دينار عراقي)": user.paymentStats.totalSpend,
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Set column widths for better formatting
      const columnWidths = [
        { wch: 8 }, // رقم
        { wch: 25 }, // الاسم الكامل
        { wch: 30 }, // البريد الإلكتروني
        { wch: 15 }, // رقم الهاتف
        { wch: 20 }, // التعليم
        { wch: 15 }, // المدينة
        { wch: 15 }, // الدولة
        { wch: 15 }, // تاريخ الانضمام

        { wch: 12 }, // إجمالي المدفوعات
        { wch: 12 }, // المدفوعات المعلقة
        { wch: 12 }, // المدفوعات المقبولة
        { wch: 12 }, // المدفوعات المرفوضة
        { wch: 20 }, // إجمالي المبلغ المدفوع
      ];
      worksheet["!cols"] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "بيانات المستخدمين");

      clearInterval(progressInterval);
      setExportProgress(100);

      // Generate Excel file and download
      const fileName = `users_data_${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      setError("فشل في تصدير البيانات إلى Excel");
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  // Calculate summary statistics
  const totalSpend = filteredUsers.reduce(
    (sum, user) => sum + user.paymentStats.totalSpend,
    0
  );
  const totalPayments = filteredUsers.reduce(
    (sum, user) => sum + user.paymentStats.total,
    0
  );
  const approvedPayments = filteredUsers.reduce(
    (sum, user) => sum + user.paymentStats.approved,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/users"
            className="p-2 text-[#8b95a5] hover:text-white hover:bg-[#ffffff0d] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">
              تصدير بيانات المستخدمين
            </h1>
            <p className="text-[#8b95a5] mt-1">
              تصدير جميع بيانات المستخدمين مع إحصائيات المدفوعات المفصلة
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
        <input
          type="text"
          placeholder="البحث عن طريق الاسم أو البريد الإلكتروني لتصفية البيانات"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#ffffff0d] text-white border border-[#ffffff1a] rounded-lg pr-10 pl-4 py-3 focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
        />
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff1a]">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-[#ffd700]" />
            <div>
              <p className="text-sm text-[#8b95a5]">إجمالي المستخدمين</p>
              <p className="text-xl font-bold text-white">
                {filteredUsers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff1a]">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-[#8b95a5]">إجمالي الإيرادات</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(totalSpend)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff1a]">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-[#8b95a5]">إجمالي المدفوعات</p>
              <p className="text-xl font-bold text-white">{totalPayments}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff1a]">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-[#8b95a5]">المدفوعات المقبولة</p>
              <p className="text-xl font-bold text-white">{approvedPayments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              تصدير البيانات
            </h3>
            <p className="text-[#8b95a5] text-sm">
              اختر تنسيق التصدير المناسب. سيتم تضمين جميع البيانات بما في ذلك
              المعلومات الشخصية وإحصائيات المدفوعات والمبلغ الإجمالي المدفوع.
            </p>
          </div>

          {/* Export Progress */}
          {exporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8b95a5]">جاري التصدير...</span>
                <span className="text-[#ffd700]">{exportProgress}%</span>
              </div>
              <div className="w-full bg-[#ffffff1a] rounded-full h-2">
                <div
                  className="bg-[#ffd700] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Export Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={exportToCSV}
              disabled={exporting || loading || filteredUsers.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {exporting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              تصدير CSV ({filteredUsers.length} مستخدم)
            </button>

            <button
              onClick={exportToExcel}
              disabled={exporting || loading || filteredUsers.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {exporting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-5 h-5" />
              )}
              تصدير Excel ({filteredUsers.length} مستخدم)
            </button>
          </div>

          {/* Export Info */}
          <div className="bg-[#ffffff08] rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">
              البيانات المضمنة في التصدير:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#8b95a5]">
              <div>• المعلومات الشخصية (الاسم، البريد الإلكتروني، الهاتف)</div>
              <div>• معلومات التعليم والموقع</div>
              <div>• تواريخ الانضمام وآخر دخول</div>
              <div>• حالة التحقق من البريد الإلكتروني</div>
              <div>• إحصائيات المدفوعات (العدد حسب الحالة)</div>
              <div>
                •{" "}
                <strong>إجمالي المبلغ المدفوع (المدفوعات المقبولة فقط)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#ffd700]" />
            <span className="text-white">جاري تحميل بيانات المستخدمين...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-[#8b95a5] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            لا توجد بيانات للتصدير
          </h3>
          <p className="text-[#8b95a5]">
            لم يتم العثور على مستخدمين مطابقين للبحث
          </p>
        </div>
      )}
    </div>
  );
}
