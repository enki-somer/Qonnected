"use client";

import { useState } from "react";
import { Play, Target, BookOpen } from "lucide-react";
import Link from "next/link";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";

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
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231a1f35'/%3E%3Cstop offset='100%25' stop-color='%2310131c'/%3E%3C/linearGradient%3E%3Cpattern id='code-pattern' x='0' y='0' width='250' height='250' patternUnits='userSpaceOnUse'%3E%3Ctext x='10' y='20' fill='%23ffffff15' font-family='monospace' font-size='12'%3E&lt;div class='container'&gt;%3C/text%3E%3Ctext x='20' y='40' fill='%23ffffff15' font-family='monospace' font-size='12'%3Efunction init() {%3C/text%3E%3Ctext x='30' y='60' fill='%23ffffff15' font-family='monospace' font-size='12'%3E const data = [];%3C/text%3E%3Ctext x='30' y='80' fill='%23ffffff15' font-family='monospace' font-size='12'%3E return data.map(item =&gt; {%3C/text%3E%3Ctext x='40' y='100' fill='%23ffffff15' font-family='monospace' font-size='12'%3E return process(item);%3C/text%3E%3Ctext x='30' y='120' fill='%23ffffff15' font-family='monospace' font-size='12'%3E });%3C/text%3E%3Ctext x='20' y='140' fill='%23ffffff15' font-family='monospace' font-size='12'%3E}%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23code-pattern)'/%3E%3Cpath d='M100,50 L60,100 L100,150' stroke='%234f8ff7' stroke-width='3' fill='none'/%3E%3Cpath d='M700,50 L740,100 L700,150' stroke='%234f8ff7' stroke-width='3' fill='none'/%3E%3Cpath d='M150,50 C200,75 300,25 350,75' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Cpath d='M450,75 C500,125 550,60 650,50' stroke='%233cba54' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='50' r='5' fill='%23f4b400'/%3E%3Ccircle cx='350' cy='75' r='5' fill='%23f4b400'/%3E%3Ccircle cx='450' cy='75' r='5' fill='%23f4b400'/%3E%3Ccircle cx='650' cy='50' r='5' fill='%23f4b400'/%3E%3Ctext x='200' y='150' fill='%23ffffff30' font-family='monospace' font-size='24'%3E&lt;/&gt;%3C/text%3E%3Ctext x='500' y='250' fill='%23ffffff30' font-family='monospace' font-size='24'%3E{...}%3C/text%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  تصميم: {
    gradient: "from-[#4c1d95] to-[#2e1065]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234c1d95'/%3E%3Cstop offset='100%25' stop-color='%232e1065'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect x='250' y='100' width='300' height='200' rx='8' fill='%23ffffff15' stroke='%23ffffff40' stroke-width='2'/%3E%3Crect x='270' y='120' width='260' height='40' rx='4' fill='%23ffffff20'/%3E%3Crect x='270' y='180' width='120' height='100' rx='4' fill='%23ffffff15'/%3E%3Crect x='410' y='180' width='120' height='100' rx='4' fill='%23ffffff15'/%3E%3Ccircle cx='300' cy='140' r='8' fill='%23d946ef'/%3E%3Ccircle cx='330' cy='140' r='8' fill='%23a855f7'/%3E%3Ccircle cx='360' cy='140' r='8' fill='%238b5cf6'/%3E%3Cpath d='M150,150 C200,100 250,200 300,150' stroke='%23d946ef' stroke-width='2' fill='none'/%3E%3Cpath d='M500,250 C550,200 600,300 650,250' stroke='%238b5cf6' stroke-width='2' fill='none'/%3E%3Crect x='150' y='200' width='60' height='60' rx='4' stroke='%23d946ef' stroke-width='2' fill='none'/%3E%3Ccircle cx='600' cy='150' r='30' stroke='%238b5cf6' stroke-width='2' fill='none'/%3E%3Cpath d='M180,300 L220,260 L260,300' stroke='%23a855f7' stroke-width='2' fill='none'/%3E%3Ctext x='550' y='350' font-family='monospace' font-size='12' fill='%23ffffff30'%3E%3Ctspan x='550' dy='0'%3E.design {%3C/tspan%3E%3Ctspan x='550' dy='20'%3E  layout: grid;%3C/tspan%3E%3Ctspan x='550' dy='20'%3E}%3C/tspan%3E%3C/text%3E%3Cpath d='M100,100 L140,100 L120,140 Z' fill='%23d946ef' opacity='0.5'/%3E%3Cpath d='M700,300 L740,300 L720,340 Z' fill='%238b5cf6' opacity='0.5'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  تسويق: {
    gradient: "from-[#065f46] to-[#064e3b]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23065f46'/%3E%3Cstop offset='100%25' stop-color='%23064e3b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Cpath d='M200,300 L300,150 L400,250 L500,100 L600,200' stroke='%2310b981' stroke-width='3' fill='none'/%3E%3Ccircle cx='300' cy='150' r='6' fill='%2334d399'/%3E%3Ccircle cx='400' cy='250' r='6' fill='%2334d399'/%3E%3Ccircle cx='500' cy='100' r='6' fill='%2334d399'/%3E%3Ccircle cx='600' cy='200' r='6' fill='%2334d399'/%3E%3Cpath d='M150,250 L650,250' stroke='%23ffffff20' stroke-width='1' stroke-dasharray='4,4'/%3E%3Cpath d='M150,200 L650,200' stroke='%23ffffff20' stroke-width='1' stroke-dasharray='4,4'/%3E%3Cpath d='M150,150 L650,150' stroke='%23ffffff20' stroke-width='1' stroke-dasharray='4,4'/%3E%3Ctext x='160' y='100' font-family='monospace' font-size='14' fill='%2334d399'%3E+125%25%3C/text%3E%3Ctext x='580' y='150' font-family='monospace' font-size='14' fill='%2334d399'%3E+82%25%3C/text%3E%3Crect x='250' y='50' width='300' height='40' rx='4' fill='%23ffffff10'/%3E%3Ctext x='270' y='75' font-family='sans-serif' font-size='14' fill='%23ffffff80'%3EConversion Rate%3C/text%3E%3Cg transform='translate(100, 320)'%3E%3Crect width='100' height='60' rx='4' fill='%23059669' opacity='0.8'/%3E%3Ctext x='50' y='35' font-family='sans-serif' font-size='12' fill='white' text-anchor='middle'%3ESocial%3C/text%3E%3C/g%3E%3Cg transform='translate(350, 320)'%3E%3Crect width='100' height='60' rx='4' fill='%2310b981' opacity='0.8'/%3E%3Ctext x='50' y='35' font-family='sans-serif' font-size='12' fill='white' text-anchor='middle'%3ESEO%3C/text%3E%3C/g%3E%3Cg transform='translate(600, 320)'%3E%3Crect width='100' height='60' rx='4' fill='%2334d399' opacity='0.8'/%3E%3Ctext x='50' y='35' font-family='sans-serif' font-size='12' fill='white' text-anchor='middle'%3EPPC%3C/text%3E%3C/g%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  لغات: {
    gradient: "from-[#854d0e] to-[#713f12]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23854d0e'/%3E%3Cstop offset='100%25' stop-color='%23713f12'/%3E%3C/linearGradient%3E%3ClinearGradient id='text-gradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23fbbf24'/%3E%3Cstop offset='100%25' stop-color='%23f59e0b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3C!-- Speech Bubbles --%3E%3Cpath d='M200,100 L350,100 Q370,100 370,120 L370,160 Q370,180 350,180 L240,180 L220,200 L220,180 L200,180 Q180,180 180,160 L180,120 Q180,100 200,100 Z' fill='%23fbbf2440' stroke='%23fbbf24' stroke-width='2'/%3E%3Cpath d='M450,220 L600,220 Q620,220 620,240 L620,280 Q620,300 600,300 L490,300 L470,320 L470,300 L450,300 Q430,300 430,280 L430,240 Q430,220 450,220 Z' fill='%23f59e0b40' stroke='%23f59e0b' stroke-width='2'/%3E%3C!-- English Text Elements --%3E%3Ctext x='275' y='150' font-family='serif' font-size='16' fill='%23fbbf24' text-anchor='middle'%3EBusiness%3C/text%3E%3Ctext x='525' y='270' font-family='serif' font-size='16' fill='%23f59e0b' text-anchor='middle'%3EEnglish%3C/text%3E%3C!-- Grammar Elements --%3E%3Crect x='150' y='250' width='120' height='40' rx='20' fill='none' stroke='%23fbbf24' stroke-width='2'/%3E%3Ctext x='210' y='275' font-family='monospace' font-size='12' fill='%23fbbf24' text-anchor='middle'%3EGrammar%3C/text%3E%3Crect x='340' y='80' width='120' height='40' rx='20' fill='none' stroke='%23f59e0b' stroke-width='2'/%3E%3Ctext x='400' y='105' font-family='monospace' font-size='12' fill='%23f59e0b' text-anchor='middle'%3EVocabulary%3C/text%3E%3Crect x='580' y='150' width='120' height='40' rx='20' fill='none' stroke='%23d97706' stroke-width='2'/%3E%3Ctext x='640' y='175' font-family='monospace' font-size='12' fill='%23d97706' text-anchor='middle'%3EPronunciation%3C/text%3E%3C!-- Connecting Lines --%3E%3Cpath d='M100,200 C150,150 200,250 250,200' stroke='%23fbbf24' stroke-width='2' fill='none' opacity='0.5'/%3E%3Cpath d='M550,200 C600,150 650,250 700,200' stroke='%23f59e0b' stroke-width='2' fill='none' opacity='0.5'/%3E%3C!-- Language Elements --%3E%3Ctext x='150' y='350' font-family='monospace' font-size='14' fill='%23fbbf24'%3E&lt;verb&gt;%3C/text%3E%3Ctext x='350' y='350' font-family='monospace' font-size='14' fill='%23f59e0b'%3E&lt;noun&gt;%3C/text%3E%3Ctext x='550' y='350' font-family='monospace' font-size='14' fill='%23d97706'%3E&lt;adjective&gt;%3C/text%3E%3C!-- Decorative Elements --%3E%3Ccircle cx='120' cy='120' r='15' fill='none' stroke='%23fbbf24' stroke-width='2'/%3E%3Ccircle cx='680' cy='280' r='15' fill='none' stroke='%23f59e0b' stroke-width='2'/%3E%3C!-- Book Icon --%3E%3Cpath d='M375,175 L425,175 L425,225 L375,225 Z M375,175 L425,175 C435,175 435,200 425,200 L375,200' fill='none' stroke='%23fbbf24' stroke-width='2'/%3E%3C!-- ABC Letters --%3E%3Ctext x='300' y='50' font-family='serif' font-size='24' fill='url(%23text-gradient)' text-anchor='middle'%3EA B C%3C/text%3E%3Ctext x='500' y='50' font-family='serif' font-size='24' fill='url(%23text-gradient)' text-anchor='middle'%3EX Y Z%3C/text%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  "تطوير تطبيقات الويب": {
    gradient: "from-[#0f2027] to-[#203a43]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f2027'/%3E%3Cstop offset='100%25' stop-color='%23203a43'/%3E%3C/linearGradient%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff08' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23grid)'/%3E%3Crect x='250' y='80' width='300' height='240' rx='8' fill='%231e293b' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='250' y='80' width='300' height='30' rx='8' fill='%23334155' stroke='%2364748b' stroke-width='1.5'/%3E%3Ccircle cx='270' cy='95' r='5' fill='%23ef4444'/%3E%3Ccircle cx='290' cy='95' r='5' fill='%23fbbf24'/%3E%3Ccircle cx='310' cy='95' r='5' fill='%2322c55e'/%3E%3Crect x='330' y='87' width='200' height='16' rx='4' fill='%23475569'/%3E%3Crect x='270' y='130' width='260' height='30' rx='3' fill='%23475569' opacity='0.6'/%3E%3Crect x='270' y='170' width='120' height='80' rx='3' fill='%23475569' opacity='0.4'/%3E%3Crect x='410' y='170' width='120' height='80' rx='3' fill='%23475569' opacity='0.4'/%3E%3Crect x='270' y='260' width='260' height='40' rx='3' fill='%23475569' opacity='0.3'/%3E%3Crect x='130' y='120' width='80' height='30' rx='4' fill='%230ea5e9' opacity='0.8'/%3E%3Ctext x='170' y='140' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EHTML%3C/text%3E%3Crect x='130' y='160' width='80' height='30' rx='4' fill='%238b5cf6' opacity='0.8'/%3E%3Ctext x='170' y='180' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3ECSS%3C/text%3E%3Crect x='130' y='200' width='80' height='30' rx='4' fill='%23eab308' opacity='0.8'/%3E%3Ctext x='170' y='220' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EJS%3C/text%3E%3Crect x='130' y='240' width='80' height='30' rx='4' fill='%2322c55e' opacity='0.8'/%3E%3Ctext x='170' y='260' font-family='monospace' font-size='14' fill='white' text-anchor='middle'%3EAPI%3C/text%3E%3Crect x='590' y='120' width='100' height='150' rx='4' fill='%231e293b' stroke='%2364748b' stroke-width='1'/%3E%3Ctext x='600' y='140' font-family='monospace' font-size='10' fill='%238b5cf6'%3E.nav {%3C/text%3E%3Ctext x='600' y='155' font-family='monospace' font-size='10' fill='%2322c55e'%3E  display: flex;%3C/text%3E%3Ctext x='600' y='170' font-family='monospace' font-size='10' fill='%2322c55e'%3E  padding: 1rem;%3C/text%3E%3Ctext x='600' y='185' font-family='monospace' font-size='10' fill='%238b5cf6'%3E}%3C/text%3E%3Ctext x='600' y='210' font-family='monospace' font-size='10' fill='%23eab308'%3Efunction() {%3C/text%3E%3Ctext x='600' y='225' font-family='monospace' font-size='10' fill='%23f97316'%3E  return data;%3C/text%3E%3Ctext x='600' y='240' font-family='monospace' font-size='10' fill='%23eab308'%3E}%3C/text%3E%3Cpath d='M210,135 L250,135' stroke='%230ea5e9' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,175 L270,175' stroke='%238b5cf6' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,215 L410,215' stroke='%23eab308' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M210,255 L270,280' stroke='%2322c55e' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M530,150 L590,150' stroke='%238b5cf6' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Cpath d='M530,215 L590,225' stroke='%23eab308' stroke-width='1.5' stroke-dasharray='4,2'/%3E%3Crect x='100' y='300' width='30' height='50' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='150' y='290' width='50' height='60' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Crect x='620' y='290' width='80' height='60' rx='3' fill='none' stroke='%2364748b' stroke-width='1.5'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%230ea5e9' opacity='0.5'/%3E%3Ccircle cx='150' cy='80' r='3' fill='%238b5cf6' opacity='0.5'/%3E%3Ccircle cx='700' cy='120' r='3' fill='%23eab308' opacity='0.5'/%3E%3Ccircle cx='650' cy='90' r='3' fill='%2322c55e' opacity='0.5'/%3E%3Ccircle cx='100' cy='350' r='3' fill='%230ea5e9' opacity='0.5'/%3E%3Ccircle cx='750' cy='330' r='3' fill='%238b5cf6' opacity='0.5'/%3E%3Ccircle cx='700' cy='350' r='3' fill='%23eab308' opacity='0.5'/%3E%3Ccircle cx='200' cy='340' r='3' fill='%2322c55e' opacity='0.5'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  "ذكاء اصطناعي": {
    gradient: "from-[#0f172a] to-[#1e1b4b]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%231e1b4b'/%3E%3C/linearGradient%3E%3Cpattern id='neural-dots' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='1.5' fill='%23ffffff20'/%3E%3C/pattern%3E%3ClinearGradient id='connection-gradient' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%236366f180'/%3E%3Cstop offset='100%25' stop-color='%23a855f780'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect width='800' height='400' fill='url(%23neural-dots)'/%3E%3Ccircle cx='150' cy='100' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='150' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='200' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='250' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='150' cy='300' r='8' fill='%236366f1' opacity='0.8'/%3E%3Ccircle cx='400' cy='120' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='180' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='240' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='400' cy='300' r='8' fill='%238b5cf6' opacity='0.8'/%3E%3Ccircle cx='650' cy='150' r='8' fill='%23a855f7' opacity='0.8'/%3E%3Ccircle cx='650' cy='250' r='8' fill='%23a855f7' opacity='0.8'/%3E%3Cline x1='150' y1='100' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='100' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='100' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='150' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='150' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='150' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='200' x2='400' y2='120' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='200' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='200' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='200' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='250' x2='400' y2='180' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='150' y1='250' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='250' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='150' y1='300' x2='400' y2='240' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='150' y1='300' x2='400' y2='300' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='120' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='120' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='400' y1='180' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='180' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='400' y1='240' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.3'/%3E%3Cline x1='400' y1='240' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Cline x1='400' y1='300' x2='650' y2='150' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.2'/%3E%3Cline x1='400' y1='300' x2='650' y2='250' stroke='url(%23connection-gradient)' stroke-width='1.5' opacity='0.5'/%3E%3Ctext x='100' y='50' font-family='monospace' font-size='8' fill='%23ffffff30'%3E10110010%3C/text%3E%3Ctext x='200' y='380' font-family='monospace' font-size='8' fill='%23ffffff30'%3E01101101%3C/text%3E%3Ctext x='500' y='60' font-family='monospace' font-size='8' fill='%23ffffff30'%3E11001010%3C/text%3E%3Ctext x='600' y='350' font-family='monospace' font-size='8' fill='%23ffffff30'%3E10010110%3C/text%3E%3Cpath d='M50,100 C100,80 120,150 180,130' stroke='%236366f140' stroke-width='1' fill='none'/%3E%3Cpath d='M620,150 C680,130 700,200 750,180' stroke='%23a855f740' stroke-width='1' fill='none'/%3E%3Cpath d='M400,40 Q500,80 600,40' stroke='%23ffffff10' stroke-width='1' fill='none'/%3E%3Cpath d='M200,350 Q300,310 400,350' stroke='%23ffffff10' stroke-width='1' fill='none'/%3E%3Ccircle cx='400' cy='200' r='200' fill='url(%23bg-gradient)' fill-opacity='0.2'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  تصوير: {
    gradient: "from-[#312e81] to-[#1e1b4b]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23312e81'/%3E%3Cstop offset='100%25' stop-color='%231e1b4b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Crect x='300' y='100' width='200' height='150' rx='15' fill='none' stroke='%236366f1' stroke-width='3'/%3E%3Ccircle cx='400' cy='175' r='50' fill='none' stroke='%234f46e5' stroke-width='3'/%3E%3Ccircle cx='400' cy='175' r='35' fill='none' stroke='%234338ca' stroke-width='2'/%3E%3Ccircle cx='400' cy='175' r='20' fill='none' stroke='%233730a3' stroke-width='2'/%3E%3Crect x='320' y='120' width='40' height='20' rx='5' fill='%236366f1'/%3E%3Cpath d='M200,250 L250,180 L300,220 L350,150 L400,200' stroke='%234f46e5' stroke-width='2' fill='none'/%3E%3Ctext x='360' y='280' font-family='monospace' font-size='12' fill='%236366f1'%3Ef/2.8 1/1000 ISO 100%3C/text%3E%3Ccircle cx='150' cy='150' r='30' fill='none' stroke='%234338ca' stroke-width='2'/%3E%3Cpath d='M135,150 L165,150 M150,135 L150,165' stroke='%234338ca' stroke-width='2'/%3E%3Ccircle cx='650' cy='150' r='30' fill='none' stroke='%234338ca' stroke-width='2'/%3E%3Cpath d='M635,150 L665,150 M650,135 L650,165' stroke='%234338ca' stroke-width='2'/%3E%3Cpath d='M100,100 L140,100 L120,140 Z' fill='%236366f1' opacity='0.5'/%3E%3Cpath d='M700,300 L740,300 L720,340 Z' fill='%234f46e5' opacity='0.5'/%3E%3Crect x='550' y='200' width='100' height='60' rx='5' fill='none' stroke='%234f46e5' stroke-width='2'/%3E%3Cpath d='M560,230 L580,210 L600,240 L620,200 L640,230' stroke='%236366f1' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
  "إدارة مشاريع": {
    gradient: "from-[#7f1d1d] to-[#450a0a]",
    pattern: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%237f1d1d'/%3E%3Cstop offset='100%25' stop-color='%23450a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23bg-gradient)'/%3E%3Cpath d='M100,200 L700,200' stroke='%23ffffff20' stroke-width='1' stroke-dasharray='4,4'/%3E%3Crect x='150' y='150' width='500' height='100' fill='%23ef4444' opacity='0.1' rx='8'/%3E%3Crect x='150' y='150' width='125' height='100' fill='%23ef4444' opacity='0.3' rx='8'/%3E%3Crect x='275' y='150' width='200' height='100' fill='%23dc2626' opacity='0.3' rx='8'/%3E%3Crect x='475' y='150' width='175' height='100' fill='%23b91c1c' opacity='0.3' rx='8'/%3E%3Ctext x='212' y='200' font-family='monospace' font-size='12' fill='white' text-anchor='middle'%3EPlanning%3C/text%3E%3Ctext x='375' y='200' font-family='monospace' font-size='12' fill='white' text-anchor='middle'%3EExecution%3C/text%3E%3Ctext x='562' y='200' font-family='monospace' font-size='12' fill='white' text-anchor='middle'%3EDelivery%3C/text%3E%3Ccircle cx='150' cy='280' r='30' fill='none' stroke='%23ef4444' stroke-width='2'/%3E%3Cpath d='M135,280 L165,280 M150,265 L150,295' stroke='%23ef4444' stroke-width='2'/%3E%3Ccircle cx='400' cy='280' r='30' fill='none' stroke='%23dc2626' stroke-width='2'/%3E%3Cpath d='M385,280 L415,280 M400,265 L400,295' stroke='%23dc2626' stroke-width='2'/%3E%3Ccircle cx='650' cy='280' r='30' fill='none' stroke='%23b91c1c' stroke-width='2'/%3E%3Cpath d='M635,280 L665,280 M650,265 L650,295' stroke='%23b91c1c' stroke-width='2'/%3E%3Cpath d='M180,280 L370,280' stroke='%23ef4444' stroke-width='2' stroke-dasharray='4,4'/%3E%3Cpath d='M430,280 L620,280' stroke='%23dc2626' stroke-width='2' stroke-dasharray='4,4'/%3E%3Ctext x='200' y='100' font-family='monospace' font-size='14' fill='%23ef4444'%3EProject Timeline%3C/text%3E%3Ctext x='500' y='100' font-family='monospace' font-size='14' fill='%23dc2626'%3EMilestones%3C/text%3E%3Cpath d='M150,150 L150,100' stroke='%23ef4444' stroke-width='1'/%3E%3Cpath d='M650,150 L650,100' stroke='%23b91c1c' stroke-width='1'/%3E%3C/svg%3E")`,
    bgPosition: "center",
  },
} as const;

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
  },
  {
    id: 5,
    title: "تطوير تطبيقات الويب",
    description: "بناء تطبيقات ويب حديثة باستخدام React و Next.js.",
    duration: "15 ساعة",
    level: "متقدم",
    lessons: 60,
    category: "تطوير تطبيقات الويب",
  },
  {
    id: 6,
    title: "الذكاء الاصطناعي للمبتدئين",
    description: "مقدمة في الذكاء الاصطناعي وتعلم الآلة باستخدام Python.",
    duration: "10 ساعات",
    level: "متوسط",
    lessons: 36,
    category: "ذكاء اصطناعي",
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
  },
  {
    id: 8,
    title: "إدارة المشاريع الاحترافية",
    description: "تعلم منهجيات إدارة المشاريع وأدوات التخطيط والتنفيذ.",
    duration: "8 ساعات",
    level: "متقدم",
    lessons: 30,
    category: "إدارة مشاريع",
  },
];

export default function FeaturedCourses() {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const displayedCourses = showAllCourses
    ? featuredCourses
    : featuredCourses.slice(0, 4);

  return (
    <section className="mt-8 sm:mt-12 lg:mt-16">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
          الدورات المميزة
        </h2>
        <Link
          href="/courses"
          className="text-accent hover:text-accent-hover transition-colors font-medium text-xs sm:text-sm"
        >
          عرض الكل
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {displayedCourses.map((course) => {
          const pattern = coursePatterns[course.category];
          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
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
                <div className="absolute bottom-2 left-2 z-20 bg-accent/20 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium text-accent">
                  {course.category}
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {course.title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-text-muted">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{course.lessons} درس</span>
                  </div>
                  <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-primary/50 rounded-full">
                    {course.level}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!showAllCourses && featuredCourses.length > 4 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllCourses(true)}
            className="bg-accent/10 hover:bg-accent/20 text-accent px-6 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center gap-2"
          >
            <span>عرض المزيد</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
