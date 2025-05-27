"use client";

import { useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { useRouter } from "next/navigation";
import {
  Users,
  CreditCard,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
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
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Check if user is logged in and is admin
    const currentUser = netlifyIdentity.currentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[#ffd700]";
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-[#ffd700]" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Users</h2>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {mockStats.totalUsers}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Total registered users
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Certifications
              </h2>
              <Award className="w-8 h-8 text-[#ffd700]" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {mockStats.totalCertifications}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Available certifications
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Pending Payments
              </h2>
              <CreditCard className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {mockStats.pendingPayments}
            </div>
            <div className="text-sm text-gray-500 mt-2">Awaiting approval</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push("/admin/users")}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                  Manage Users
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage user accounts
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>

          <button
            onClick={() => router.push("/admin/certifications")}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                  Manage Certifications
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Add and edit certifications
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>

          <button
            onClick={() => router.push("/admin/payments")}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
                  Manage Payments
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Review and approve payments
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockRecentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-6 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(activity.status)}
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.user}
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.certification} - {activity.amount}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {activity.timestamp}
                  </div>
                  <div
                    className={`text-sm font-medium ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
