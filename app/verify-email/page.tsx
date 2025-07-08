"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setError("رمز التحقق غير موجود");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 3000);
        } else {
          setStatus("error");
          setError(data.error || "فشل في تأكيد البريد الإلكتروني");
        }
      } catch (error) {
        setStatus("error");
        setError("حدث خطأ أثناء تأكيد البريد الإلكتروني");
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary p-4">
      <div className="bg-primary-light/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative w-16 h-16 mb-6">
            <Image
              src="/Qlogo.png"
              alt="QonnectED Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-4">
            تأكيد البريد الإلكتروني
          </h1>

          {/* Status Content */}
          {status === "verifying" && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-4"></div>
              <p className="text-slate-300">
                جاري التحقق من بريدك الإلكتروني...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-full p-3 mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-green-400 mb-2">
                تم تأكيد بريدك الإلكتروني بنجاح!
              </p>
              <p className="text-slate-400 text-sm">
                سيتم تحويلك إلى صفحة تسجيل الدخول...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center">
              <div className="bg-red-500/10 border border-red-500/20 rounded-full p-3 mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2 bg-accent hover:bg-accent-light text-black font-medium rounded-lg transition-colors"
              >
                العودة لتسجيل الدخول
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-primary-dark">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
            <h2 className="text-xl text-white">جاري التحميل...</h2>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
