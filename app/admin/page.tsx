"use client";

import { useState } from "react";
import {
  Users,
  CreditCard,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// This would come from your API
const mockStats = {
  totalUsers: 120,
  totalCertifications: 15,
  pendingPayments: 8,
  approvedPayments: 45,
  rejectedPayments: 3,
};

// This would come from your API
const mockRecentActivity = [
  {
    id: 1,
    type: "payment",
    status: "pending",
    user: "Ahmed Mohammed",
    amount: "$99",
    certification: "Advanced Web Development",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "payment",
    status: "approved",
    user: "Sara Ahmed",
    amount: "$149",
    certification: "UI/UX Design Fundamentals",
    timestamp: "3 hours ago",
  },
  // Add more mock data as needed
];

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("today");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-[#ffd700]" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-[#ffffff0d] text-white border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
        >
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#ffffff0d] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">المستخدمين</h3>
            <Users className="w-6 h-6 text-[#ffd700]" />
          </div>
          <p className="text-3xl font-bold text-white">
            {mockStats.totalUsers}
          </p>
          <p className="text-sm text-[#8b95a5]">إجمالي المستخدمين المسجلين</p>
        </div>

        <div className="bg-[#ffffff0d] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">الشهادات</h3>
            <Award className="w-6 h-6 text-[#ffd700]" />
          </div>
          <p className="text-3xl font-bold text-white">
            {mockStats.totalCertifications}
          </p>
          <p className="text-sm text-[#8b95a5]">إجمالي الشهادات المتاحة</p>
        </div>

        <div className="bg-[#ffffff0d] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              المدفوعات المعلقة
            </h3>
            <CreditCard className="w-6 h-6 text-[#ffd700]" />
          </div>
          <p className="text-3xl font-bold text-white">
            {mockStats.pendingPayments}
          </p>
          <p className="text-sm text-[#8b95a5]">بانتظار الموافقة</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#ffffff0d] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">النشاط الأخير</h2>
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-[#ffffff0d] rounded-lg"
            >
              {getStatusIcon(activity.status)}
              <div className="flex-1">
                <p className="text-white font-medium">{activity.user}</p>
                <p className="text-sm text-[#8b95a5]">
                  {activity.certification} - {activity.amount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#8b95a5]">{activity.timestamp}</p>
                <p
                  className={`text-sm ${
                    activity.status === "approved"
                      ? "text-green-500"
                      : activity.status === "rejected"
                      ? "text-red-500"
                      : "text-[#ffd700]"
                  }`}
                >
                  {activity.status === "approved"
                    ? "تمت الموافقة"
                    : activity.status === "rejected"
                    ? "مرفوض"
                    : "قيد الانتظار"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
