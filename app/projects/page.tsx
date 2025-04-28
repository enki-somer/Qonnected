"use client";

import {
  CodeBracketIcon,
  StarIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "تطبيق إدارة المهام",
    description:
      "تطبيق ويب لإدارة المهام والمشاريع باستخدام React.js و Node.js.",
    tech: ["React", "Node.js", "MongoDB"],
    difficulty: "متوسط",
    stars: 24,
    category: "تطبيقات الويب",
  },
  {
    id: 2,
    title: "منصة تعليمية",
    description: "منصة تعليمية متكاملة باستخدام Next.js و TypeScript.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    difficulty: "متقدم",
    stars: 42,
    category: "تطبيقات الويب",
  },
  {
    id: 3,
    title: "تطبيق الطقس",
    description: "تطبيق لعرض حالة الطقس باستخدام Vue.js وAPI الطقس.",
    tech: ["Vue.js", "API", "CSS"],
    difficulty: "مبتدئ",
    stars: 18,
    category: "تطبيقات الويب",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FolderIcon className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold">المشاريع العملية</h1>
        </div>
        <p className="text-text-muted text-xl">
          تعلم من خلال بناء مشاريع حقيقية وتطبيق ما تعلمته
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="group bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="mb-4">
                <span className="inline-block text-sm bg-accent/10 text-accent px-3 py-1 rounded-full mb-3">
                  {project.category}
                </span>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-accent">
                    <StarIcon className="w-5 h-5" />
                    <span>{project.stars}</span>
                  </div>
                </div>
                <p className="text-text-muted">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-primary/50 text-text-muted px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm bg-primary/50 text-text-muted px-3 py-1 rounded-full">
                  {project.difficulty}
                </span>
                <div className="flex items-center gap-2 text-text-muted group-hover:text-accent transition-colors">
                  <CodeBracketIcon className="w-5 h-5" />
                  <span>عرض الكود</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
