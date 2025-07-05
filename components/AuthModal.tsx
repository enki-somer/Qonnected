"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  GraduationCap,
  MapPin,
  Globe,
  AlertCircle,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { login, signup } = useAuth();

  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    education: "",
    city: "",
    country: "",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSignup(initialMode === "signup");
      setFormData({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        education: "",
        city: "",
        country: "",
      });
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("البريد الإلكتروني وكلمة المرور مطلوبان");
      return false;
    }

    if (isSignup && !formData.fullName) {
      setError("الاسم الكامل مطلوب");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("صيغة البريد الإلكتروني غير صحيحة");
      return false;
    }

    // Password validation for signup
    if (isSignup && formData.password.length < 8) {
      setError("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignup) {
        const result = await signup({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone || undefined,
          education: formData.education || undefined,
          city: formData.city || undefined,
          country: formData.country || undefined,
        });

        if (result.success) {
          setSuccess("تم إنشاء الحساب بنجاح!");
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setError(result.error || "فشل في إنشاء الحساب");
        }
      } else {
        const result = await login(formData.email, formData.password);

        if (result.success) {
          setSuccess("تم تسجيل الدخول بنجاح!");
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setError(result.error || "فشل في تسجيل الدخول");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError(null);
    setSuccess(null);
    setFormData({
      email: "",
      password: "",
      fullName: "",
      phone: "",
      education: "",
      city: "",
      country: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto">
        <div className="bg-primary-light/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/Qlogo.png"
                  alt="QonnectED Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex items-center flex-row-reverse">
                <span className="text-lg font-bold text-accent">Q</span>
                <span className="text-lg font-bold text-text">onnect</span>
                <span className="text-lg font-bold text-accent">ED</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSignup ? "إنشاء حساب جديد" : "تسجيل الدخول"}
              </h2>
              <p className="text-slate-400 text-sm">
                {isSignup
                  ? "أنشئ حسابك للوصول إلى جميع الميزات"
                  : "أدخل بياناتك للوصول إلى حسابك"}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-400 text-sm">{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (signup only) */}
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                      placeholder="أدخل اسمك الكامل"
                      required={isSignup}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pr-10 pl-10 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                    placeholder={
                      isSignup ? "اختر كلمة مرور قوية" : "أدخل كلمة المرور"
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isSignup && (
                  <p className="text-xs text-slate-500 mt-1">
                    يجب أن تحتوي على 8 أحرف على الأقل
                  </p>
                )}
              </div>

              {/* Additional fields for signup */}
              {isSignup && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                        placeholder="رقم الهاتف"
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      التعليم
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors appearance-none text-sm"
                      >
                        <option value="">اختر</option>
                        <option value="high-school">ثانوية</option>
                        <option value="diploma">دبلوم</option>
                        <option value="bachelor">بكالوريوس</option>
                        <option value="master">ماجستير</option>
                        <option value="phd">دكتوراه</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      المدينة
                    </label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                        placeholder="مدينتك"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      البلد
                    </label>
                    <div className="relative">
                      <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-3 py-2.5 bg-primary-dark/50 border border-white/10 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors appearance-none text-sm"
                      >
                        <option value="">اختر</option>
                        <option value="iraq">العراق</option>
                        <option value="saudi">السعودية</option>
                        <option value="uae">الإمارات</option>
                        <option value="kuwait">الكويت</option>
                        <option value="qatar">قطر</option>
                        <option value="bahrain">البحرين</option>
                        <option value="oman">عمان</option>
                        <option value="jordan">الأردن</option>
                        <option value="lebanon">لبنان</option>
                        <option value="syria">سوريا</option>
                        <option value="egypt">مصر</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {isSignup ? "إنشاء الحساب..." : "تسجيل الدخول..."}
                    </span>
                  </>
                ) : (
                  <span>{isSignup ? "إنشاء الحساب" : "تسجيل الدخول"}</span>
                )}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                {isSignup ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-accent hover:text-accent-light font-medium transition-colors"
                >
                  {isSignup ? "تسجيل الدخول" : "إنشاء حساب جديد"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
