"use client";

import { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Loader2,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts";
import React from "react";

interface DashboardData {
  overview: {
    totalUsers: number;
    totalPayments: number;
    totalRevenue: number;
    averageOrderValue: number;
    approvedPayments: number;
    pendingPayments: number;
    rejectedPayments: number;
    conversionRate: number;
    approvalRate: number;
  };
  growth: {
    weeklyGrowth: number;
    monthlyGrowth: number;
    revenueGrowth: number;
    userGrowth: number;
    usersLast7Days: number;
    usersLast30Days: number;
    revenueLast7Days: number;
    revenueLast30Days: number;
  };
  charts: {
    revenueTrend: Array<{ date: string; revenue: number; payments: number }>;
    paymentStatus: Array<{ name: string; value: number; color: string }>;
    weeklyComparison: Array<{
      week: string;
      revenue: number;
      payments: number;
    }>;
    monthlyTrend: Array<{
      month: string;
      revenue: number;
      payments: number;
      users: number;
    }>;
  };
  topPerformers: {
    topUsers: Array<{
      userId: string;
      userName: string;
      totalSpent: number;
      paymentCount: number;
    }>;
  };
  recentActivity: {
    recentPayments: Array<{
      id: string;
      userName: string;
      amount: number;
      status: string;
      createdAt: string;
      itemName: string;
    }>;
    recentUsers: Array<{
      id: string;
      fullName: string;
      email: string;
      createdAt: string;
    }>;
  };
  timeframe: string;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState("month");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(
        `/api/admin/dashboard?timeframe=${timeframe}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load and timeframe changes
  useEffect(() => {
    fetchDashboardData();
  }, [timeframe]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchDashboardData(true);
      },
      5 * 60 * 1000
    ); // 5 minutes

    return () => clearInterval(interval);
  }, [timeframe]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IQD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  // Get growth color
  const getGrowthColor = (value: number) => {
    return value >= 0 ? "text-green-400" : "text-red-400";
  };

  // Get growth icon
  const getGrowthIcon = (value: number) => {
    return value >= 0 ? TrendingUp : TrendingDown;
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#ffd700]" />
          <span className="text-white text-lg">جاري تحميل لوحة التحكم...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-lg">
        <p className="text-lg">خطأ في تحميل البيانات: {error}</p>
        <button
          onClick={() => fetchDashboardData()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-[#8b95a5] mt-1">تحليلات شاملة ومتقدمة للأعمال</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Timeframe Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-[#ffffff0d] text-white border border-[#ffffff1a] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffd700] focus:border-transparent hover:bg-[#ffffff15] hover:border-[#ffffff2a] transition-all duration-200 cursor-pointer"
          >
            <option
              value="week"
              className="bg-[#1a1f2e] text-white hover:bg-[#2a2f3e]"
            >
              هذا الأسبوع
            </option>
            <option
              value="month"
              className="bg-[#1a1f2e] text-white hover:bg-[#2a2f3e]"
            >
              هذا الشهر
            </option>
            <option
              value="year"
              className="bg-[#1a1f2e] text-white hover:bg-[#2a2f3e]"
            >
              هذا العام
            </option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#ffd700] text-black rounded-lg hover:bg-[#e6c200] transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            تحديث
          </button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-[#8b95a5]">
        آخر تحديث: {new Date(data.lastUpdated).toLocaleString("ar-IQ")}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-green-400">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(data.overview.totalRevenue)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {React.createElement(getGrowthIcon(data.growth.revenueGrowth), {
              className: `w-4 h-4 ${getGrowthColor(data.growth.revenueGrowth)}`,
            })}
            <span
              className={`text-sm ${getGrowthColor(data.growth.revenueGrowth)}`}
            >
              {formatPercentage(data.growth.revenueGrowth)} من الأسبوع الماضي
            </span>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-400">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-white">
                {data.overview.totalUsers.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {React.createElement(getGrowthIcon(data.growth.userGrowth), {
              className: `w-4 h-4 ${getGrowthColor(data.growth.userGrowth)}`,
            })}
            <span
              className={`text-sm ${getGrowthColor(data.growth.userGrowth)}`}
            >
              {formatPercentage(data.growth.userGrowth)} من الأسبوع الماضي
            </span>
          </div>
        </div>

        {/* Total Payments */}
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <CreditCard className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-400">إجمالي المدفوعات</p>
              <p className="text-2xl font-bold text-white">
                {data.overview.totalPayments.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {React.createElement(getGrowthIcon(data.growth.weeklyGrowth), {
              className: `w-4 h-4 ${getGrowthColor(data.growth.weeklyGrowth)}`,
            })}
            <span
              className={`text-sm ${getGrowthColor(data.growth.weeklyGrowth)}`}
            >
              {formatPercentage(data.growth.weeklyGrowth)} من الأسبوع الماضي
            </span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-gradient-to-br from-[#ffd700]/20 to-[#e6c200]/20 backdrop-blur-sm rounded-xl p-6 border border-[#ffd700]/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#ffd700]/20 rounded-lg">
              <Target className="w-8 h-8 text-[#ffd700]" />
            </div>
            <div className="text-right">
              <p className="text-sm text-[#ffd700]">متوسط قيمة الطلب</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(data.overview.averageOrderValue)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#ffd700]" />
            <span className="text-sm text-[#ffd700]">
              معدل التحويل: {data.overview.conversionRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">
              اتجاه الإيرادات (آخر 30 يوم)
            </h3>
            <BarChart3 className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.charts.revenueTrend}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
              <XAxis dataKey="date" stroke="#8b95a5" fontSize={12} />
              <YAxis stroke="#8b95a5" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f2e",
                  border: "1px solid #ffffff1a",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
                labelFormatter={(label) => `التاريخ: ${label}`}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? formatCurrency(value) : value,
                  name === "revenue" ? "الإيرادات" : "المدفوعات",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">
              توزيع حالة المدفوعات
            </h3>
            <PieChart className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={data.charts.paymentStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) =>
                  `${props.name} ${(props.percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.charts.paymentStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2980b9",
                  border: "1px solid #ffffff1a",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Comparison and Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Comparison */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">مقارنة أسبوعية</h3>
            <Activity className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.charts.weeklyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
              <XAxis dataKey="week" stroke="#8b95a5" fontSize={12} />
              <YAxis stroke="#8b95a5" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f2e",
                  border: "1px solid #ffffff1a",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? formatCurrency(value) : value,
                  name === "revenue" ? "الإيرادات" : "المدفوعات",
                ]}
              />
              <Bar dataKey="revenue" fill="#ffd700" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">
              الاتجاه الشهري (آخر 12 شهر)
            </h3>
            <Calendar className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.charts.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
              <XAxis dataKey="month" stroke="#8b95a5" fontSize={12} />
              <YAxis stroke="#8b95a5" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f2e",
                  border: "1px solid #ffffff1a",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
                formatter={(value: number, name: string) => [
                  name === "revenue" ? formatCurrency(value) : value,
                  name === "revenue"
                    ? "الإيرادات"
                    : name === "payments"
                      ? "المدفوعات"
                      : "المستخدمين الجدد",
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8B5CF6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Approval Rate */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-[#8b95a5]">معدل الموافقة</p>
              <p className="text-2xl font-bold text-white">
                {data.overview.approvalRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">مقبول</span>
              <span className="text-white">
                {data.overview.approvedPayments}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-400">مرفوض</span>
              <span className="text-white">
                {data.overview.rejectedPayments}
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-[#8b95a5]">معدل التحويل</p>
              <p className="text-2xl font-bold text-white">
                {data.overview.conversionRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">دفعوا</span>
              <span className="text-white">
                {data.overview.approvedPayments}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#8b95a5]">إجمالي المستخدمين</span>
              <span className="text-white">{data.overview.totalUsers}</span>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-[#8b95a5]">المدفوعات المعلقة</p>
              <p className="text-2xl font-bold text-white">
                {data.overview.pendingPayments}
              </p>
            </div>
          </div>
          <p className="text-sm text-yellow-400">تحتاج إلى مراجعة</p>
        </div>
      </div>

      {/* Recent Activity and Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">آخر المدفوعات</h3>
            <Clock className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <div className="space-y-4">
            {data.recentActivity.recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-[#ffffff08] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      payment.status === "approved"
                        ? "bg-green-400"
                        : payment.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {payment.userName}
                    </p>
                    <p className="text-xs text-[#8b95a5]">{payment.itemName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-[#8b95a5]">
                    {new Date(payment.createdAt).toLocaleDateString("ar-IQ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users */}
        <div className="bg-[#ffffff0d] backdrop-blur-sm rounded-xl p-6 border border-[#ffffff1a]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">أفضل العملاء</h3>
            <Users className="w-5 h-5 text-[#8b95a5]" />
          </div>
          <div className="space-y-4">
            {data.topPerformers.topUsers.slice(0, 5).map((user, index) => (
              <div
                key={user.userId}
                className="flex items-center justify-between p-3 bg-[#ffffff08] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ffd700] text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.userName}
                    </p>
                    <p className="text-xs text-[#8b95a5]">
                      {user.paymentCount} مدفوعة
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-400">
                    {formatCurrency(user.totalSpent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
