import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Format the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+9647871100101?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
  };

  // Animation variants
  const buttonVariants: Variants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const chatVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-500 group"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
        {/* Smooth Glowing Effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-50 blur-sm animate-glow"></span>

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/75 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          تواصل معنا
        </span>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 left-6 z-50 w-[320px] bg-primary-dark rounded-2xl shadow-lg border border-primary-light/10"
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 bg-accent rounded-t-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <FaWhatsapp className="w-6 h-6 text-primary" />
                <span className="font-medium text-primary">
                  واتساب QonnectED
                </span>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes className="w-5 h-5 text-primary" />
              </motion.button>
            </motion.div>

            {/* Chat Area */}
            <div className="p-4 h-[280px] bg-primary/5">
              {/* Welcome Message */}
              <motion.div
                className="bg-accent/10 p-3 rounded-lg mb-4 text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm">هلو! شلون نكدر نساعدك</p>
              </motion.div>

              {/* Message Input */}
              <motion.form
                onSubmit={handleSubmit}
                className="absolute bottom-4 left-4 right-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full pl-12 pr-4 py-3 bg-primary rounded-lg border border-primary-light/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-right"
                  />
                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    <motion.button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-2 rounded-full hover:bg-accent/10 disabled:hover:bg-transparent text-accent hover:text-accent disabled:text-text-muted disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IoSend className="w-5 h-5 transform -scale-x-100" />
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes glow {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
