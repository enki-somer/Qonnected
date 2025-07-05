"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Clock,
  CreditCard,
  X,
  Menu,
  MoreVertical,
  RefreshCw,
} from "lucide-react";
import debounce from "lodash/debounce";

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  itemName: string;
  itemType: "certification" | "course";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  proofImage: string;
  updatedAt?: string;
  reviewedBy?: string;
  feedback?: string;
}

// Initial mock data
const mockPayments: Payment[] = [
  {
    id: "PAY-123",
    userId: "user-1",
    userName: "Ahmed Mohammed",
    userEmail: "ahmed@example.com",
    amount: 99,
    itemName: "Advanced Web Development",
    itemType: "certification",
    status: "pending" as const,
    createdAt: "2024-03-20T10:00:00Z",
    proofImage: "/path/to/proof.jpg",
  },
  {
    id: "PAY-124",
    userId: "user-2",
    userName: "Sara Ahmed",
    userEmail: "sara@example.com",
    amount: 149,
    itemName: "UI/UX Design Fundamentals",
    itemType: "course",
    status: "approved" as const,
    createdAt: "2024-03-19T15:30:00Z",
    proofImage: "/path/to/proof.jpg",
    reviewedBy: "Admin",
    feedback: "Payment verified",
  },
];

// Update the formatCurrency function to use English numerals
const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IQD",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Update the date formatting to use English
const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));
};

export default function PaymentsPage() {
  const router = useRouter();
  const { user, isAdmin, isAuthenticated, authReady, openAuthModal } =
    useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [localPayments, setLocalPayments] = useState<Payment[]>([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!authReady) return;

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
      return;
    }

    // Initialize data when auth is confirmed
    fetchPayments();
    setStatusFilter("pending");
  }, [authReady, isAuthenticated, isAdmin, router, openAuthModal]);

  // Update local payments when main payments state changes
  useEffect(() => {
    setLocalPayments(payments);
  }, [payments]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setIsSearching(true);
      const searchString = query.toLowerCase().trim();

      // If search is empty, restore all payments
      if (!searchString) {
        setLocalPayments(payments);
        setIsSearching(false);
        return;
      }

      const searchResults = payments.filter((payment) => {
        // Check each field that should be searchable
        const searchableFields = [
          payment.id, // Payment ID
          payment.userName, // User Name
          payment.userEmail, // User Email
          payment.itemName, // Certification Name
          formatCurrency(payment.amount).toString(), // Amount (formatted)
          payment.status, // Status
          formatDate(payment.createdAt), // Creation Date
        ];

        // Return true if any field matches the search query
        return searchableFields.some((field) =>
          field?.toLowerCase().includes(searchString)
        );
      });

      setLocalPayments(searchResults);
      setIsSearching(false);
    }, 300),
    [payments]
  );

  // Handle search input change with immediate feedback
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    const query = searchInputValue.trim();
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // Clear search with immediate reset
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchInputValue("");
    setLocalPayments(payments);
  };

  // Filter payments based on status and search
  const filteredPayments = useMemo(() => {
    let filtered = localPayments;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    return filtered;
  }, [localPayments, statusFilter]);

  // Get payments by status with memoization
  const pendingPayments = useMemo(
    () => payments.filter((p) => p.status === "pending"),
    [payments]
  );

  const approvedPayments = useMemo(
    () => payments.filter((p) => p.status === "approved"),
    [payments]
  );

  const rejectedPayments = useMemo(
    () => payments.filter((p) => p.status === "rejected"),
    [payments]
  );

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Remove status filter from query params to get all payments
      const queryParams = new URLSearchParams();
      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      console.log("Fetching all payments");

      const response = await fetch(
        `/api/admin/payments?${queryParams.toString()}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch payments");
      }

      setPayments(data.payments || mockPayments); // Use mock data if no payments returned
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch payments"
      );
      // Use mock data if fetch fails
      setPayments(mockPayments);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    paymentId: string,
    action: "approve" | "reject"
  ) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Sending payment action request:", {
        paymentId,
        action,
        feedback,
        url: `/api/admin/payments/${paymentId}/action`,
      });

      const response = await fetch(`/api/admin/payments/${paymentId}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, feedback }),
      });

      const data = await response.json();
      console.log("Payment action response:", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        throw new Error(data.error || "Failed to update payment status");
      }

      // Update the payments state
      setPayments((prevPayments) =>
        prevPayments.map((p) => (p.id === paymentId ? data.payment : p))
      );

      // Reset UI state
      setFeedback("");
      setSelectedPayment(null);
      setError(null);

      console.log(`Payment ${action}ed successfully`);
    } catch (error) {
      console.error("Error updating payment status:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update payment status"
      );
    } finally {
      setLoading(false);
    }
  };

  // Add refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPayments();
    setIsRefreshing(false);
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

  if (!authReady || loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
            <button
              onClick={fetchPayments}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] ">
      {/* Fixed Header */}
      <div className="sticky top-0 z-30 bg-[#2a2a2a] border-b border-[#3a3a3a] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2 rounded-lg hover:bg-[#3a3a3a]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-white text-lg font-medium ml-2">
                Payment Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="text-white p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-64 bg-[#2a2a2a] shadow-xl">
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Pending Status Card */}
          <button
            onClick={() => setStatusFilter("pending")}
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg transition-colors ${
              statusFilter === "pending" ? "ring-2 ring-[#ffd700]" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8b95a5] text-xs sm:text-sm">
                  قيد الانتظار
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#ffd700] mt-1">
                  {pendingPayments.length}
                </h3>
              </div>
              <div className="bg-[#ffffff0d] p-2 sm:p-3 rounded-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd700]" />
              </div>
            </div>
          </button>

          {/* Approved Status Card */}
          <button
            onClick={() => setStatusFilter("approved")}
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg transition-colors ${
              statusFilter === "approved" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8b95a5] text-xs sm:text-sm">
                  تمت الموافقة
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-500 mt-1">
                  {approvedPayments.length}
                </h3>
              </div>
              <div className="bg-[#ffffff0d] p-2 sm:p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
            </div>
          </button>

          {/* Rejected Status Card */}
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg transition-colors ${
              statusFilter === "rejected" ? "ring-2 ring-red-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8b95a5] text-xs sm:text-sm">مرفوض</p>
                <h3 className="text-xl sm:text-2xl font-bold text-red-500 mt-1">
                  {rejectedPayments.length}
                </h3>
              </div>
              <div className="bg-[#ffffff0d] p-2 sm:p-3 rounded-lg">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
            </div>
          </button>

          {/* Total Payments Card */}
          <button
            onClick={() => setStatusFilter("all")}
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg transition-colors ${
              statusFilter === "all" ? "ring-2 ring-white" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#8b95a5] text-xs sm:text-sm">
                  إجمالي المدفوعات
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {payments.length}
                </h3>
              </div>
              <div className="bg-[#ffffff0d] p-2 sm:p-3 rounded-lg">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd700]" />
              </div>
            </div>
          </button>
        </div>

        {/* Search Bar - Show for all statuses */}
        <div className="bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b95a5] w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن طريق الاسم، البريد الإلكتروني، أو رقم الطلب"
                value={searchInputValue}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                className="w-full bg-[#3a3a3a] text-white border-0 rounded-xl pr-10 pl-4 py-3 focus:ring-2 focus:ring-[#ffd700] placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleSearchClick}
                disabled={isSearching}
                className="flex-1 sm:flex-none bg-[#ffd700] text-black px-4 sm:px-6 py-2 rounded-xl hover:bg-[#ffed4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Search</span>
                  </>
                )}
              </button>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="flex-1 sm:flex-none bg-[#3a3a3a] text-white px-4 py-2 rounded-xl hover:bg-[#4a4a4a] transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </div>
          {searchQuery && (
            <div className="mt-3 text-[#8b95a5] text-sm">
              Search results for: "{searchQuery}"
            </div>
          )}
        </div>

        {/* Payment Cards - Show filtered payments */}
        <div className="grid gap-4">
          {filteredPayments
            .sort((a, b) => {
              // Sort by status (pending first, then approved, then rejected)
              const statusOrder = { pending: 0, approved: 1, rejected: 2 };
              if (statusFilter !== "all") {
                // If filtering by status, no need to sort
                return 0;
              }
              return (
                statusOrder[a.status as keyof typeof statusOrder] -
                statusOrder[b.status as keyof typeof statusOrder]
              );
            })
            .map((payment) => (
              <div
                key={payment.id}
                className="bg-[#3a3a3a] rounded-xl p-4 space-y-3"
              >
                {/* Payment Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span
                        className={`font-medium ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status === "pending" && "قيد الانتظار"}
                        {payment.status === "approved" && "تمت الموافقة"}
                        {payment.status === "rejected" && "مرفوض"}
                      </span>
                    </div>
                    <p className="text-[#8b95a5] text-xs sm:text-sm">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium text-sm">
                      {payment.id}
                    </p>
                    <p className="text-[#ffd700] font-bold">
                      {formatCurrency(payment.amount)}
                    </p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-[#8b95a5] text-xs sm:text-sm">
                      معلومات المستخدم
                    </p>
                    <div>
                      <p className="text-white font-medium">
                        {payment.userName}
                      </p>
                      <p className="text-[#8b95a5] text-xs sm:text-sm">
                        {payment.userEmail}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#8b95a5] text-xs sm:text-sm">
                      {payment.itemType === "certification"
                        ? "الشهادة"
                        : "الدورة"}
                    </p>
                    <p className="text-white font-medium">{payment.itemName}</p>
                  </div>
                </div>

                {/* Actions - Different based on status */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#4a4a4a]">
                  {payment.status === "pending" ? (
                    <button
                      onClick={() => setSelectedPayment(payment.id)}
                      className="bg-[#ffd700] text-black px-4 py-2 rounded-lg text-sm hover:bg-[#ffed4a] transition-colors flex items-center gap-2"
                    >
                      <span className="hidden sm:inline">مراجعة الطلب</span>
                      <MoreVertical className="w-5 h-5 sm:hidden" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedPayment(payment.id)}
                      className="bg-[#ffffff0d] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#ffffff15] transition-colors"
                    >
                      عرض التفاصيل
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Modals */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
            <div className="bg-[#2a2a2a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#2a2a2a] border-b border-[#4a4a4a] p-4 sm:p-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">
                  {payments.find((p) => p.id === selectedPayment)?.status ===
                  "pending"
                    ? "مراجعة الطلب"
                    : "تفاصيل الطلب"}
                </h3>
                <button
                  onClick={() => {
                    setSelectedPayment(null);
                    setFeedback("");
                    setError(null);
                  }}
                  className="text-[#8b95a5] hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {error && (
                  <div className="bg-red-100/10 border border-red-400 text-red-400 px-4 py-3 rounded-lg">
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 bg-[#3a3a3a] p-4 rounded-xl">
                  <div>
                    <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                      رقم الطلب
                    </p>
                    <p className="text-white font-medium">
                      {payments.find((p) => p.id === selectedPayment)?.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8b95a5] text-xs sm:text-sm mb-1">
                      المبلغ
                    </p>
                    <p className="text-[#ffd700] font-bold">
                      {formatCurrency(
                        payments.find((p) => p.id === selectedPayment)?.amount
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[#8b95a5] text-xs sm:text-sm mb-2">
                    إثبات الدفع
                  </p>
                  <div className="bg-[#3a3a3a] rounded-xl overflow-hidden">
                    <Image
                      src={
                        payments.find((p) => p.id === selectedPayment)
                          ?.proofImage || ""
                      }
                      alt="Payment proof"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {payments.find((p) => p.id === selectedPayment)?.status ===
                "pending" ? (
                  <>
                    <div>
                      <label className="block text-[#8b95a5] text-xs sm:text-sm mb-2">
                        الملاحظات (مطلوب)
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-4 py-3 bg-[#3a3a3a] text-white border-0 rounded-xl focus:ring-2 focus:ring-[#ffd700] placeholder-gray-400 resize-none"
                        rows={3}
                        placeholder="أدخل ملاحظاتك حول الطلب..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleStatusChange(selectedPayment, "reject")
                        }
                        disabled={!feedback || loading}
                        className="flex-1 bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                            جاري المعالجة...
                          </span>
                        ) : (
                          "رفض الطلب"
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(selectedPayment, "approve")
                        }
                        disabled={!feedback || loading}
                        className="flex-1 bg-[#ffd700] text-black px-4 py-3 rounded-xl hover:bg-[#ffed4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></span>
                            جاري المعالجة...
                          </span>
                        ) : (
                          "قبول الطلب"
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-[#3a3a3a] p-4 rounded-xl">
                    <p className="text-[#8b95a5] text-xs sm:text-sm mb-2">
                      الملاحظات
                    </p>
                    <p className="text-white">
                      {payments.find((p) => p.id === selectedPayment)?.feedback}
                    </p>
                    <p className="text-[#8b95a5] text-xs mt-2">
                      تمت المراجعة بواسطة:{" "}
                      {
                        payments.find((p) => p.id === selectedPayment)
                          ?.reviewedBy
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
