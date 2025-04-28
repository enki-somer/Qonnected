"use client";

import { UserGroupIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const teams = [
  {
    id: 1,
    name: "مطوري الواجهة الأمامية",
    description: "مجموعة لمناقشة وتعلم تقنيات تطوير الواجهة الأمامية.",
    members: 156,
    discussions: 42,
    topics: ["React", "Vue", "Angular"],
  },
  {
    id: 2,
    name: "مطوري Node.js",
    description: "مجموعة متخصصة في تطوير تطبيقات Node.js والخدمات الخلفية.",
    members: 234,
    discussions: 68,
    topics: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: 3,
    name: "مصممي واجهات المستخدم",
    description: "مجموعة لمناقشة تصميم واجهات المستخدم وتجربة المستخدم.",
    members: 189,
    discussions: 55,
    topics: ["UI", "UX", "Figma"],
  },
];

export default function TeamsPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">المجموعات التعليمية</h1>
        <p className="text-text-muted text-xl">
          انضم إلى مجموعات المطورين وشارك في النقاشات وتبادل الخبرات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-primary-dark rounded-xl p-6 hover:ring-2 hover:ring-accent transition-all cursor-pointer"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
              <p className="text-text-muted">{team.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {team.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-sm bg-primary/50 text-text-muted px-3 py-1 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-text-muted text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4" />
                  <span>{team.members} عضو</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftIcon className="w-4 h-4" />
                  <span>{team.discussions} نقاش</span>
                </div>
              </div>
              <button className="text-accent hover:text-accent-hover transition-colors">
                انضمام
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
