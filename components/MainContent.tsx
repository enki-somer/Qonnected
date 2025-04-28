"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Sparkles,
  Users,
  BookOpen,
  Code2,
  Trophy,
  Rocket,
  Brain,
  Target,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "تعلم تفاعلي",
    description: "تفاعل مباشر مع الكود أثناء التعلم",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "مشاريع عملية",
    description: "بناء مشاريع حقيقية خطوة بخطوة",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "تعلم سريع",
    description: "دروس مركزة تحقق أهدافك بسرعة",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "مسار واضح",
    description: "خطة تعليمية مدروسة لتطوير مهاراتك",
    icon: Target,
    gradient: "from-green-500 to-emerald-500",
  },
];

interface CoursePattern {
  gradient: string;
  pattern: string;
  aspectRatio?: string;
  bgPosition?: string;
}

interface CoursePatterns {
  [key: string]: CoursePattern;
}

const coursePatterns: CoursePatterns = {
  برمجة: {
    gradient: "from-[#1a1f35] to-[#10131c]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231a1f35'/%3E%3Cstop offset='100%25' stop-color='%2310131c'/%3E%3C/linearGradient%3E%3Cpattern id='code-pattern' x='0' y='0' width='250' height='250' patternUnits='userSpaceOnUse'%3E%3Ctext x='10' y='20' fill='%23ffffff15' font-family='monospace' font-size='12'%3E%26lt%3Bdiv class=%22container%22%26gt%3B%3C/text%3E%3Ctext x='20' y='40' fill='%23ffffff15' font-family='monospace' font-size='12'%3Efunction init() %7B%3C/text%3E%3Ctext x='30' y='60' fill='%23ffffff15' font-family='monospace' font-size='12'%3E const data = %5B%5D%3B%3C/text%3E%3Ctext x='30' y='80' fill='%23ffffff15' font-family='monospace' font-size='12'%3E return data.map(item %3D%3E %7B%3C/text%3E%3Ctext x='40' y='100' fill='%23ffffff15' font-family='monospace' font-size='12'%3E return process(item)%3B%3C/text%3E%3Ctext x='30' y='120' fill='%23ffffff15' font-family='monospace' font-size='12'%3E %7D)%3B%3C/text%3E%3Ctext x='20' y='140' fill='%23ffffff15' font-family='monospace' font-size='12'%3E%7D%3C/text%3E%3Ctext x='10' y='160' fill='%23ffffff15' font-family='monospace' font-size='12'%3Efor (let i %3D 0%3B i %26lt%3B 10%3B i%2B%2B) %7B%3C/text%3E%3Ctext x='20' y='180' fill='%23ffffff15' font-family='monospace' font-size='12'%3Econsole.log(%60Count: %24%7Bi%7D%60)%3B%3C/text%3E%3Ctext x='10' y='200' fill='%23ffffff15' font-family='monospace' font-size='12'%3E%7D%3C/text%3E%3Ctext x='10' y='220' fill='%23ffffff15' font-family='monospace' font-size='12'%3E%26lt%3B/div%26gt%3B%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23code-pattern)'/%3E%3Cpath d='M100,50 L60,100 L100,150' stroke='%234f8ff7' stroke-width='3' fill='none'/%3E%3Cpath d='M700,50 L740,100 L700,150' stroke='%234f8ff7' stroke-width='3' fill='none'/%3E%3Cpath d='M150,50 C200,75 300,25 350,75' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Cpath d='M450,75 C500,125 550,60 650,50' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Cpath d='M150,350 C250,300 350,375 450,325' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Cpath d='M550,325 C600,300 650,350 700,300' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='50' r='5' fill='%23f4b400'/%3E%3Ccircle cx='350' cy='75' r='5' fill='%23f4b400'/%3E%3Ccircle cx='450' cy='75' r='5' fill='%23f4b400'/%3E%3Ccircle cx='650' cy='50' r='5' fill='%23f4b400'/%3E%3Ccircle cx='150' cy='350' r='5' fill='%23f4b400'/%3E%3Ccircle cx='450' cy='325' r='5' fill='%23f4b400'/%3E%3Ccircle cx='550' cy='325' r='5' fill='%23f4b400'/%3E%3Ccircle cx='700' cy='300' r='5' fill='%23f4b400'/%3E%3Ctext x='200' y='150' fill='%23ffffff30' font-family='monospace' font-size='24'%3E%26lt%3B/%26gt%3B%3C/text%3E%3Ctext x='500' y='250' fill='%23ffffff30' font-family='monospace' font-size='24'%3E%7B...%7D%3C/text%3E%3Ctext x='300' y='300' fill='%23ffffff30' font-family='monospace' font-size='24'%3E()%3C/text%3E%3Ctext x='600' y='150' fill='%23ffffff30' font-family='monospace' font-size='24'%3Eif()%3C/text%3E%3Ccircle cx='400' cy='200' r='180' fill='url(%23bg-gradient)' fill-opacity='0.3'/%3E%3C/svg%3E")`,
    aspectRatio: "2/1",
    bgPosition: "center",
  },
  "تطوير تطبيقات الويب": {
    gradient: "from-[#0f2027] to-[#203a43]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f2027'/%3E%3Cstop offset='100%25' stop-color='%23203a43'/%3E%3C/linearGradient%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff08' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23grid)'/%3E%3Crect x='250' y='80' width='300' height='240' rx='8' fill='%231e293b' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='250' y='80' width='300' height='30' rx='8' fill='%23334155' stroke='%2364748b' stroke-width='1.5'/%3E%3Ccircle cx='270' cy='95' r='5' fill='%23ef4444'/%3E%3Ccircle cx='290' cy='95' r='5' fill='%23fbbf24'/%3E%3Ccircle cx='310' cy='95' r='5' fill='%2322c55e'/%3E%3Crect x='330' y='87' width='200' height='16' rx='4' fill='%23475569'/%3E%3Crect x='270' y='130' width='260' height='30' rx='3' fill='%23475569' opacity='0.6'/%3E%3Crect x='270' y='170' width='120' height='80' rx='3' fill='%23475569' opacity='0.4'/%3E%3Crect x='410' y='170' width='120' height='80' rx='3' fill='%23475569' opacity='0.4'/%3E%3Crect x='270' y='260' width='260' height='40' rx='3' fill='%23475569' opacity='0.3'/%3E%3Crect x='130' y='120' width='80' height='30' rx='4' fill='%230ea5e9' opacity='0.8'/%3E%3Ctext x='170' y='140' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EHTML%3C/text%3E%3Crect x='130' y='160' width='80' height='30' rx='4' fill='%238b5cf6' opacity='0.8'/%3E%3Ctext x='170' y='180' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3ECSS%3C/text%3E%3Crect x='130' y='200' width='80' height='30' rx='4' fill='%23eab308' opacity='0.8'/%3E%3Ctext x='170' y='220' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EJS%3C/text%3E%3Crect x='130' y='240' width='80' height='30' rx='4' fill='%2322c55e' opacity='0.8'/%3E%3Ctext x='170' y='260' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EAPI%3C/text%3E%3Crect x='590' y='120' width='100' height='150' rx='4' fill='%231e293b' stroke='%2364748b' stroke-width='1'/%3E%3Ctext x='600' y='140' font-family='monospace' font-size='10' fill='%238b5cf6'%3E.nav {%3C/text%3E%3Ctext x='600' y='155' font-family='monospace' font-size='10' fill='%2322c55e'%3E  display: flex;%3C/text%3E%3Ctext x='600' y='170' font-family='monospace' font-size='10' fill='%2322c55e'%3E  padding: 1rem;%3C/text%3E%3Ctext x='600' y='185' font-family='monospace' font-size='10' fill='%238b5cf6'%3E}%3C/text%3E%3Ctext x='600' y='210' font-family='monospace' font-size='10' fill='%23eab308'%3Efunction() {%3C/text%3E%3Ctext x='600' y='225' font-family='monospace' font-size='10' fill='%23f97316'%3E  return data;%3C/text%3E%3Ctext x='600' y='240' font-family='monospace' font-size='10' fill='%23eab308'%3E}%3C/text%3E%3Cpath d='M210,135 L250,135' stroke='%230ea5e9' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,175 L270,175' stroke='%238b5cf6' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,215 L410,215' stroke='%23eab308' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,255 L270,280' stroke='%2322c55e' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M530,150 L590,150' stroke='%238b5cf6' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M530,215 L590,225' stroke='%23eab308' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Crect x='100' y='300' width='30' height='50' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='150' y='290' width='50' height='60' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='620' y='290' width='80' height='60' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%230ea5e9' opacity='0.5'/%3E%3Ccircle cx='150' cy='80' r='3' fill='%238b5cf6' opacity='0.5'/%3E%3Ccircle cx='700' cy='120' r='3' fill='%23eab308' opacity='0.5'/%3E%3Ccircle cx='650' cy='90' r='3' fill='%2322c55e' opacity='0.5'/%3E%3Ccircle cx='100' cy='350' r='3' fill='%230ea5e9' opacity='0.5'/%3E%3Ccircle cx='750' cy='330' r='3' fill='%238b5cf6' opacity='0.5'/%3E%3Ccircle cx='700' cy='350' r='3' fill='%23eab308' opacity='0.5'/%3E%3Ccircle cx='200' cy='340' r='3' fill='%2322c55e' opacity='0.5'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  تصميم: {
    gradient: "from-[#2b2d42] to-[#1a1b2e]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232b2d42'/%3E%3Cstop offset='100%25' stop-color='%231a1b2e'/%3E%3C/linearGradient%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff08' stroke-width='1'/%3E%3C/pattern%3E%3Cg id='wireframe-button'%3E%3Crect width='80' height='30' rx='4' fill='none' stroke='%238d99ae' stroke-width='1.5'/%3E%3Cline x1='20' y1='15' x2='60' y2='15' stroke='%238d99ae' stroke-width='1.5'/%3E%3C/g%3E%3Cg id='color-swatch'%3E%3Crect width='20' height='20' rx='3'/%3E%3C/g%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23grid)'/%3E%3Crect x='50' y='80' width='200' height='260' rx='10' fill='none' stroke='%23ffffff40' stroke-width='1.5'/%3E%3Crect x='70' y='100' width='160' height='15' rx='2' fill='%23ffffff20'/%3E%3Ccircle cx='80' cy='140' r='20' fill='none' stroke='%23ffffff40' stroke-width='1.5'/%3E%3Crect x='110' y='130' width='100' height='10' rx='2' fill='%23ffffff20'/%3E%3Crect x='110' y='150' width='80' height='10' rx='2' fill='%23ffffff20'/%3E%3Crect x='70' y='180' width='160' height='60' rx='2' fill='%23ffffff10'/%3E%3Cuse href='%23wireframe-button' x='70' y='260'/%3E%3Cuse href='%23wireframe-button' x='160' y='260'/%3E%3Cline x1='70' y1='300' x2='230' y2='300' stroke='%23ffffff40' stroke-width='1'/%3E%3Ccircle cx='90' cy='320' r='8' fill='none' stroke='%23ffffff40' stroke-width='1.5'/%3E%3Ccircle cx='120' cy='320' r='8' fill='none' stroke='%23ffffff40' stroke-width='1.5'/%3E%3Ccircle cx='150' cy='320' r='8' fill='%23ffffff40'/%3E%3Crect x='550' y='80' width='200' height='260' rx='10' fill='none' stroke='%23ffffff40' stroke-width='1.5'/%3E%3Crect x='570' y='100' width='160' height='40' rx='5' fill='%23ff595e20' stroke='%23ff595e' stroke-width='1.5'/%3E%3Crect x='570' y='160' width='70' height='70' rx='5' fill='%231982c420' stroke='%231982c4' stroke-width='1.5'/%3E%3Crect x='660' y='160' width='70' height='70' rx='5' fill='%238ac92620' stroke='%238ac926' stroke-width='1.5'/%3E%3Crect x='570' y='250' width='160' height='40' rx='20' fill='%23ffca3a20' stroke='%23ffca3a' stroke-width='1.5'/%3E%3Ctext x='630' y='275' font-family='Arial, sans-serif' font-size='16' fill='%23ffca3a' text-anchor='middle'%3EBUTTON%3C/text%3E%3Cuse href='%23color-swatch' x='300' y='80' fill='%23ff595e'/%3E%3Cuse href='%23color-swatch' x='330' y='80' fill='%23ffca3a'/%3E%3Cuse href='%23color-swatch' x='360' y='80' fill='%238ac926'/%3E%3Cuse href='%23color-swatch' x='390' y='80' fill='%231982c4'/%3E%3Cuse href='%23color-swatch' x='420' y='80' fill='%236a4c93'/%3E%3Ctext x='300' y='140' font-family='Arial, sans-serif' font-size='16' fill='%23ffffff60'%3EAa Bb Cc%3C/text%3E%3Ctext x='300' y='170' font-family='Arial, sans-serif' font-size='12' fill='%23ffffff40'%3EHeading 1%3C/text%3E%3Ctext x='300' y='190' font-family='Arial, sans-serif' font-size='10' fill='%23ffffff40'%3EHeading 2%3C/text%3E%3Ctext x='300' y='210' font-family='Arial, sans-serif' font-size='8' fill='%23ffffff40'%3EBody Text%3C/text%3E%3Ccircle cx='320' cy='250' r='15' fill='%23ffffff20' stroke='%23ffffff' stroke-width='1'/%3E%3Ccircle cx='400' cy='250' r='15' fill='%23ffffff20' stroke='%23ffffff' stroke-width='1'/%3E%3Ccircle cx='480' cy='250' r='15' fill='%23ffffff20' stroke='%23ffffff' stroke-width='1'/%3E%3Cpath d='M335,250 L385,250' stroke='%23ffffff' stroke-width='1' stroke-dasharray='5,3'/%3E%3Cpath d='M415,250 L465,250' stroke='%23ffffff' stroke-width='1' stroke-dasharray='5,3'/%3E%3Cpath d='M380,300 C380,280 420,280 420,300' stroke='%23ffffff' stroke-width='1.5' fill='none'/%3E%3Cpath d='M380,315 C380,335 420,335 420,315' stroke='%23ffffff' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='450' cy='330' r='20' fill='none' stroke='%23ff595e' stroke-width='2'/%3E%3Ccircle cx='450' cy='330' r='10' fill='none' stroke='%23ffca3a' stroke-width='2'/%3E%3Cpath d='M0,0 Q400,100 800,0' stroke='%23ffffff06' stroke-width='2' fill='none'/%3E%3Cpath d='M0,400 Q400,300 800,400' stroke='%23ffffff06' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  تسويق: {
    gradient: "from-green-500/20 to-emerald-500/20",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310B981' fill-opacity='0.1'%3E%3Cpath d='M10 40h80v2H10zm0 10h80v2H10zm0 10h80v2H10z'/%3E%3Cpath d='M20 20l5 40h10l5-30h10l5 20h10l5-30h10l5 40' fill='none' stroke='%2310B981' stroke-width='1'/%3E%3Ccircle cx='25' cy='60' r='3'/%3E%3Ccircle cx='40' cy='30' r='3'/%3E%3Ccircle cx='55' cy='50' r='3'/%3E%3Ccircle cx='70' cy='20' r='3'/%3E%3Ccircle cx='85' cy='60' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  لغات: {
    gradient: "from-yellow-500/20 to-orange-500/20",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F59E0B' fill-opacity='0.1'%3E%3Cpath d='M20 20h60v60H20z' fill='none' stroke='%23F59E0B' stroke-width='0.5'/%3E%3Cpath d='M30 40h40M30 50h40M30 60h40' stroke='%23F59E0B' stroke-width='0.5' fill='none'/%3E%3Ctext x='35' y='35' font-family='Arial' font-size='8' fill='%23F59E0B'%3EA%3C/text%3E%3Ctext x='45' y='45' font-family='Arial' font-size='8' fill='%23F59E0B'%3Eأ%3C/text%3E%3Ctext x='55' y='55' font-family='Arial' font-size='8' fill='%23F59E0B'%3E漢%3C/text%3E%3Ccircle cx='25' cy='40' r='2'/%3E%3Ccircle cx='25' cy='50' r='2'/%3E%3Ccircle cx='25' cy='60' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  "إدارة أعمال": {
    gradient: "from-red-500/20 to-orange-500/20",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23EF4444' fill-opacity='0.1'%3E%3Cpath d='M50 20v60M20 50h60' stroke='%23EF4444' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23EF4444' stroke-width='0.5'/%3E%3Cpath d='M30 30l40 40M30 70l40-40' stroke='%23EF4444' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='20' r='5'/%3E%3Ccircle cx='80' cy='50' r='5'/%3E%3Ccircle cx='50' cy='80' r='5'/%3E%3Ccircle cx='20' cy='50' r='5'/%3E%3Cpath d='M35 35h30v30H35z' fill='none' stroke='%23EF4444' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  تصوير: {
    gradient: "from-indigo-500/20 to-purple-500/20",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366F1' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3Cpath d='M30 30h40v40H30z' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3Cpath d='M45 25v50M55 25v50M25 45h50M25 55h50' stroke='%236366F1' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='5'/%3E%3Ccircle cx='50' cy='50' r='25' fill='none' stroke='%236366F1' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  "ذكاء اصطناعي": {
    gradient: "from-[#0f172a] to-[#1e1b4b]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%231e1b4b'/%3E%3C/linearGradient%3E%3Cpattern id='neural-dots' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='1.5' fill='%23ffffff20'/%3E%3C/pattern%3E%3ClinearGradient id='connection-gradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%236366f180'/%3E%3Cstop offset='100%25' stop-color='%23a855f780'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23neural-dots)'/%3E%3Ccircle cx='150' cy='100' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='150' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='200' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='250' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='300' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='400' cy='120' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='180' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='240' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='300' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='650' cy='150' r='8' fill='%23a855f7' opacity='0.8'/%3E%3Ccircle cx='650' cy='250' r='8' fill='%23a855f7' opacity='0.8'/%3E%3Cline x1='150' y1='100' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='100' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='100' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='150' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='150' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='150' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='200' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='200' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='200' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='200' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='250' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='250' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='250' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='300' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='300' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='120' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='120' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='400' y1='180' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='180' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='400' y1='240' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='400' y1='240' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='300' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='400' y1='300' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Ctext x='100' y='50' font-family='monospace' font-size='8' fill='%23ffffff30'%3E10110010%3C/text%3E%3Ctext x='200' y='380' font-family='monospace' font-size='8' fill='%23ffffff30'%3E01101101%3C/text%3E%3Ctext x='500' y='60' font-family='monospace' font-size='8' fill='%23ffffff30'%3E11001010%3C/text%3E%3Ctext x='600' y='350' font-family='monospace' font-size='8' fill='%23ffffff30'%3E10010110%3C/text%3E%3Cpath d='M50,100 C100,80 120,150 180,130' stroke='%236366f140' stroke-width='1' fill='none'/%3E%3Cpath d='M620,150 C680,130 700,200 750,180' stroke='%23a855f740' stroke-width='1' fill='none'/%3E%3Cpath d='M400,40 Q500,80 600,40' stroke='%23ffffff10' stroke-width='1' fill='none'/%3E%3Cpath d='M200,350 Q300,310 400,350' stroke='%23ffffff10' stroke-width='1' fill='none'/%3E%3Ccircle cx='400' cy='200' r='200' fill='url(%23bg-gradient)' fill-opacity='0.2'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
};

const featuredCourses = [
  {
    id: 1,
    title: "أساسيات البرمجة بلغة Python",
    description:
      "تعلم أساسيات البرمجة باستخدام Python، اللغة الأكثر شعبية للمبتدئين.",
    duration: "6 ساعات",
    level: "مبتدئ",
    lessons: 24,
    category: "برمجة",
    image: "/courses/python-basics.jpg",
  },
  {
    id: 2,
    title: "تصميم واجهات المستخدم UI/UX",
    description:
      "تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم باستخدام Figma.",
    duration: "8 ساعات",
    level: "متوسط",
    lessons: 32,
    category: "تصميم",
    image: "/courses/ui-ux-design.jpg",
  },
  {
    id: 3,
    title: "التسويق الرقمي الشامل",
    description:
      "دورة شاملة في التسويق الرقمي تغطي وسائل التواصل الاجتماعي وتحسين محركات البحث.",
    duration: "10 ساعات",
    level: "مبتدئ",
    lessons: 40,
    category: "تسويق",
    image: "/courses/digital-marketing.jpg",
  },
  {
    id: 4,
    title: "اللغة الإنجليزية للأعمال",
    description:
      "تعلم المهارات اللغوية الأساسية للتواصل في بيئة العمل الدولية.",
    duration: "12 ساعة",
    level: "متوسط",
    lessons: 48,
    category: "لغات",
    image: "/courses/business-english.jpg",
  },
  {
    id: 5,
    title: "إدارة المشاريع الاحترافية",
    description: "تعلم منهجيات إدارة المشاريع وأدوات التخطيط والتنفيذ.",
    duration: "8 ساعات",
    level: "متقدم",
    lessons: 30,
    category: "إدارة أعمال",
    image: "/courses/project-management.jpg",
  },
  {
    id: 6,
    title: "تطوير تطبيقات الويب",
    description: "بناء تطبيقات ويب حديثة باستخدام React و Next.js.",
    duration: "15 ساعة",
    level: "متقدم",
    lessons: 60,
    category: "تطوير تطبيقات الويب",
    image: "/courses/web-development.jpg",
  },
  {
    id: 7,
    title: "التصوير الاحترافي",
    description:
      "تعلم أساسيات التصوير الفوتوغرافي والتعديل باستخدام Adobe Lightroom.",
    duration: "6 ساعات",
    level: "مبتدئ",
    lessons: 24,
    category: "تصوير",
    image: "/courses/photography.jpg",
  },
  {
    id: 8,
    title: "الذكاء الاصطناعي للمبتدئين",
    description: "مقدمة في الذكاء الاصطناعي وتعلم الآلة باستخدام Python.",
    duration: "10 ساعات",
    level: "متوسط",
    lessons: 36,
    category: "ذكاء اصطناعي",
    image: "/courses/ai-basics.jpg",
  },
];

export default function MainContent() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((current) => (current + 1) % features.length);
    }, 3000); // Change feature every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-primary p-6 sm:p-8 md:p-12">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-accent mb-6 bg-accent/10 px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              منصة التعلم الأولى للمطورين العرب
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            تعلم البرمجة بأسلوب
            <span className="text-accent block mt-2"> تفاعلي وممتع</span>
          </h1>

          {/* Description */}
          <p className="text-text-muted text-base sm:text-lg md:text-xl max-w-2xl mb-8">
            منصة تعليمية تجمع بين مشاهدة الفيديو والبرمجة في مكان واحد، مع
            مشاريع عملية ومجتمع نشط
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-primary px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <Play className="w-5 h-5" />
              ابدأ التعلم مجاناً
            </button>
            <button className="w-full sm:w-auto bg-primary-dark hover:bg-primary/80 text-text px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-white/10">
              استكشف الدورات
            </button>
          </div>

          {/* Features Section */}
          <div className="bg-primary-dark/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            {/* Mobile Carousel - Only visible below sm breakpoint */}
            <div className="block sm:hidden">
              <div className="relative h-[200px]">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 transform
                      ${
                        index === activeFeatureIndex
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-full"
                      }`}
                  >
                    <div className="group relative overflow-hidden rounded-xl bg-primary/20 p-6 backdrop-blur-sm h-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}
                      />
                      <div className="relative">
                        <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                          <feature.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-base font-semibold mb-1 text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeatureIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${
                        index === activeFeatureIndex
                          ? "bg-accent w-4"
                          : "bg-accent/30"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop/Tablet Grid - Visible from sm breakpoint and up */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-primary/20 p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold mb-1 text-white group-hover:text-accent transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-muted group-hover:text-text transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements - Adjusted for better mobile display */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-accent/20 rounded-full blur-3xl opacity-60 sm:opacity-100" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-primary-dark rounded-full blur-3xl opacity-60 sm:opacity-100" />
      </div>

      {/* Featured Courses Section */}
      <section className="mt-12 sm:mt-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold">الدورات المميزة</h2>
          <button className="text-accent hover:text-accent-hover transition-colors font-medium text-sm sm:text-base">
            عرض الكل
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredCourses.map((course) => {
            const pattern = coursePatterns[course.category];
            return (
              <div
                key={course.id}
                className="group bg-primary-dark rounded-xl overflow-hidden hover:ring-2 hover:ring-accent transition-all cursor-pointer"
              >
                <div
                  className="aspect-video relative overflow-hidden bg-gradient-to-br"
                  style={{
                    backgroundImage: pattern.pattern,
                    backgroundSize: "cover",
                    backgroundPosition: pattern.bgPosition || "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-2 left-2 z-20 bg-accent/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-accent">
                    {course.category}
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} درس</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
