"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://facebook.com/qonnected",
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/qonnected",
      color: "#1DA1F2",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/qonnected",
      color: "#E4405F",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com/company/qonnected",
      color: "#0A66C2",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://youtube.com/qonnected",
      color: "#FF0000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-accent mb-4">تواصل معنا</h1>
          <p className="text-text-muted text-lg">
            نحن هنا لمساعدتك. يمكنك التواصل معنا عبر النموذج أدناه أو من خلال
            وسائل التواصل الاجتماعي
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary-light hover:bg-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ color: social.color }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-primary-light rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-text mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-primary border border-primary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-text"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-text mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-primary border border-primary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-text"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-text mb-2">
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-primary border border-primary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-text"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text mb-2">
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-primary border border-primary-dark focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-text"
                required
              />
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                className="bg-accent text-primary px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                إرسال الرسالة
              </motion.button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-primary-light p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-accent mb-2">العنوان</h3>
            <p className="text-text-muted">
              شارع الملك فهد، برج المملكة
              <br />
              الرياض، المملكة العربية السعودية
            </p>
          </div>
          <div className="bg-primary-light p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-accent mb-2">
              معلومات الاتصال
            </h3>
            <p className="text-text-muted">
              هاتف: +966 11 234 5678
              <br />
              البريد الإلكتروني: info@qonnected.com
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
