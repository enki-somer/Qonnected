"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Download,
} from "lucide-react";

interface Payment {
  id: string;
  user: {
    name: string;
    email: string;
  };
  certification: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  proofImage: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Fetch payments
  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (statusFilter !== "all") {
        queryParams.set("status", statusFilter);
      }
      if (searchQuery) {
        queryParams.set("search", searchQuery);
      }

      const response = await fetch(`/api/admin/payments?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await response.json();
      setPayments(data.payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment action (approve/reject)
  const handleAction = async (
    paymentId: string,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to process payment action");
      }

      // Refresh payments list
      fetchPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Filter payments based on search query
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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
        <h1 className="text-2xl font-bold text-white">إدارة المدفوعات</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
          <input
            type="text"
            placeholder="البحث عن طريق الاسم، البريد الإلكتروني، أو رقم الطلب"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#ffffff0d] text-white border-0 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-[#ffd700]"
          />
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
              <option value="pending">قيد الانتظار</option>
              <option value="approved">تمت الموافقة</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#ffffff0d] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ffffff1a]">
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  رقم الطلب
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  المستخدم
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الشهادة
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  المبلغ
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الحالة
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  التاريخ
                </th>
                <th className="text-right text-sm font-medium text-[#8b95a5] px-6 py-4">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#ffffff1a] last:border-0"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {payment.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="text-sm text-white">
                        {payment.user.name}
                      </div>
                      <div className="text-sm text-[#8b95a5]">
                        {payment.user.email}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {payment.certification}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {payment.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status === "approved"
                        ? "تمت الموافقة"
                        : payment.status === "rejected"
                        ? "مرفوض"
                        : "قيد الانتظار"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {new Date(payment.date).toLocaleDateString("ar-IQ")}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPayment(payment.id)}
                        className="p-2 text-[#8b95a5] hover:text-white transition-colors"
                        title="عرض الإيصال"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {payment.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAction(payment.id, "approve")}
                            className="p-2 text-green-500 hover:text-green-400 transition-colors"
                            title="موافقة"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleAction(payment.id, "reject")}
                            className="p-2 text-red-500 hover:text-red-400 transition-colors"
                            title="رفض"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-2 text-[#8b95a5] hover:text-white transition-colors"
                        title="تحميل الإيصال"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Proof Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">إيصال الدفع</h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-[#8b95a5] hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={
                  payments.find((p) => p.id === selectedPayment)?.proofImage ||
                  ""
                }
                alt="Payment proof"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
