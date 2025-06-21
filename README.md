# QonnectED - منصة تعليمية عربية للمطورين 🎓

<div dir="rtl">

## نظرة عامة 🌟

QonnectED هي منصة تعليمية عربية متخصصة للمطورين، تهدف إلى تقديم محتوى تعليمي عالي الجودة باللغة العربية. المنصة مصممة لتكون سهلة الاستخدام وتوفر تجربة تعلم سلسة ومتكاملة.

## المميزات الرئيسية ✨

- **واجهة مستخدم عربية**: تصميم كامل يدعم اللغة العربية (RTL)
- **نظام مصادقة متكامل**: تسجيل دخول وإدارة حسابات المستخدمين
- **مسارات تعليمية متخصصة**: مسارات مخصصة لكل تخصص مع توصيات للدورات والشهادات
- **لوحة إعدادات شاملة**: تخصيص كامل لتجربة المستخدم
- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **نظام إشعارات**: لمتابعة التحديثات والأنشطة
- **دعم متعدد اللغات**: العربية والإنجليزية

</div>

## Technical Stack 🛠

### Frontend

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Netlify Identity for Authentication
- Heroicons & React Icons

### Deployment

- Netlify
- Edge Functions Support

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/qonnected.git
cd qonnected
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
qonnected/
├── app/                    # Next.js 13 app directory
│   ├── certifications/    # Certifications pages
│   ├── courses/          # Courses pages
│   ├── settings/         # User settings
│   └── teams/           # Teams/groups pages
├── components/           # Reusable components
│   ├── UserPathwaySection/  # Educational pathways component
│   ├── CourseCard/         # Course display components
│   └── CertificationCard/  # Certification display components
├── context/             # React context (Auth, Theme)
├── public/             # Static assets
└── styles/            # Global styles
```

## Authentication 🔐

The platform uses Netlify Identity for authentication, providing:

- Email/Password authentication
- Social login (configurable)
- JWT token management
- User metadata management

## User Settings ⚙️

The settings page includes:

- Profile management
- Notification preferences
- Language & region settings
- Privacy & security options
- Billing & subscription (placeholder)

## Development Guidelines 📝

### Code Style

- Use TypeScript for type safety
- Follow Next.js best practices
- Use Tailwind CSS for styling
- Maintain RTL support
- Keep components modular and reusable

### Git Workflow

1. Create feature branches from `main`
2. Use meaningful commit messages
3. Submit PRs for review
4. Maintain clean git history

## Environment Variables 🔧

```env
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_USE_NETLIFY_EDGE=true
```

## Deployment 🌐

The project is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Set up environment variables
4. Enable Netlify Identity

## Educational Pathways 🎯

The platform offers specialized educational pathways for different majors:

### Available Majors

- علوم الحاسوب (Computer Science)
- تكنولوجيا المعلومات (Information Technology)
- تحليل البيانات (Data Analysis)
- الإدارة (Management)
- الهندسة المدنية (Civil Engineering)
- الهندسة المعمارية (Architecture)
- الهندسة الميكانيكية (Mechanical Engineering)
- المحاسبة (Accounting)
- اللغات (Languages)

### Features

- **مسارات مخصصة**: كل تخصص له مسار تعليمي مخصص
- **توصيات الدورات**: دورات موصى بها لكل تخصص
- **شهادات معتمدة**: شهادات احترافية مرتبطة بكل مسار
- **واجهة سهلة**: تصفح سلس للدورات والشهادات
- **محتوى عربي**: شرح تفصيلي باللغة العربية لكل مسار

## Current Status 📊

- ✅ Authentication system
- ✅ User profile management
- ✅ Settings page
- ✅ Responsive sidebar
- ✅ RTL support
- ✅ Educational pathways
- ✅ Course categories
- ✅ Certification paths
- 🟡 Course management (in progress)
- 🟡 Payment integration (planned)
- 🟡 Team features (planned)

<div dir="rtl">

## المساهمة 🤝

نرحب بمساهماتكم في تطوير المنصة. يرجى اتباع إرشادات المساهمة في الملف `CONTRIBUTING.md`.

## الترخيص 📄

هذا المشروع مرخص تحت رخصة MIT. انظر ملف `LICENSE` للمزيد من التفاصيل.

## الدعم 💬

للمساعدة والاستفسارات، يمكنكم:

- فتح issue في GitHub
- التواصل عبر البريد الإلكتروني: support@qonnected.com
- زيارة موقعنا: [www.qonnected.com](https://www.qonnected.com)

</div>

---

<div align="center">
  <p>Built with ❤️ for the Arab developer community</p>
</div>
