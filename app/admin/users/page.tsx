"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Shield,
  ShieldOff,
  Mail,
  User,
  UserX,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React from "react";

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  createdAt: string;
  lastLoginAt?: string;
  phone?: string;
  education?: string;
  city?: string;
  country?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "role" | "status";
    userId: string;
    action: string;
  } | null>(null);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (roleFilter !== "all") {
        queryParams.set("role", roleFilter);
      }
      if (statusFilter !== "all") {
        queryParams.set("status", statusFilter);
      }
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

  // Handle user actions
  const handleUserAction = async (
    userId: string,
    actionType: "role" | "status",
    action: string
  ) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/${actionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Refresh users list
      fetchUsers();
      setConfirmAction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

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
        <h1 className="text-2xl font-bold text-white">إدارة المستخدمين</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن طريق الاسم أو البريد الإلكتروني"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
          />
        </div>
        <div className="sm:w-48">
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-[#ffd700] appearance-none"
            >
              <option value="all">جميع الأدوار</option>
              <option value="user">مستخدم</option>
              <option value="admin">مدير</option>
            </select>
          </div>
        </div>
        <div className="sm:w-48">
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-[#ffd700] appearance-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="suspended">موقوف</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#ffffff0d] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ffffff1a]">
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  المستخدم
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الدور
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الحالة
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  تاريخ الانضمام
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  آخر تسجيل دخول
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id || `user-${index}`}
                  className="border-b border-[#ffffff1a] last:border-0"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="text-sm text-white">{user.fullName}</div>
                      <div className="text-sm text-[#8b95a5]">{user.email}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <>
                          <Shield className="w-3 h-3" />
                          مدير
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3" />
                          مستخدم
                        </>
                      )}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "active" ? "نشط" : "موقوف"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {new Date(user.createdAt).toLocaleDateString("ar-IQ")}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleDateString("ar-IQ")
                      : "لم يسجل دخول"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setConfirmAction({
                            type: "role",
                            userId: user._id,
                            action:
                              user.role === "admin"
                                ? "remove-admin"
                                : "make-admin",
                          })
                        }
                        className="p-2 text-[#8b95a5] hover:text-white transition-colors"
                        title={
                          user.role === "admin"
                            ? "إزالة صلاحيات المدير"
                            : "منح صلاحيات المدير"
                        }
                      >
                        {user.role === "admin" ? (
                          <ShieldOff className="w-5 h-5" />
                        ) : (
                          <Shield className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setConfirmAction({
                            type: "status",
                            userId: user._id,
                            action:
                              user.status === "active" ? "suspend" : "activate",
                          })
                        }
                        className="p-2 text-[#8b95a5] hover:text-white transition-colors"
                        title={
                          user.status === "active"
                            ? "إيقاف الحساب"
                            : "تنشيط الحساب"
                        }
                      >
                        {user.status === "active" ? (
                          <UserX className="w-5 h-5" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        className="p-2 text-[#8b95a5] hover:text-white transition-colors"
                        title="إرسال بريد إلكتروني"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium text-white">تأكيد الإجراء</h3>
              <p className="text-[#8b95a5]">
                {confirmAction.type === "role"
                  ? confirmAction.action === "make-admin"
                    ? "هل أنت متأكد من منح صلاحيات المدير لهذا المستخدم؟"
                    : "هل أنت متأكد من إزالة صلاحيات المدير من هذا المستخدم؟"
                  : confirmAction.action === "suspend"
                    ? "هل أنت متأكد من إيقاف هذا الحساب؟"
                    : "هل أنت متأكد من تنشيط هذا الحساب؟"}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() =>
                    handleUserAction(
                      confirmAction.userId,
                      confirmAction.type,
                      confirmAction.action
                    )
                  }
                  className="px-4 py-2 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors"
                >
                  تأكيد
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 bg-[#ffffff0d] text-white rounded-lg hover:bg-[#ffffff1a] transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
