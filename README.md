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
- 📱 Mobile experience optimization (planned)

## Mobile Experience Strategy 📱

### Current Mobile Implementation Analysis

**Strengths:**

- ✅ Responsive grid system with Tailwind breakpoints
- ✅ Mobile sidebar with overlay pattern
- ✅ Fixed mobile menu button
- ✅ Arabic RTL support maintained
- ✅ Touch-friendly interactions

**Areas for Improvement:**

- ❌ Same layout structure scaled down
- ❌ Complex certification flow not optimized for mobile
- ❌ No mobile-specific navigation patterns
- ❌ Limited use of mobile-native UX patterns

### Recommended Approach: Hybrid Mobile-First Strategy

#### 1. Architecture Strategy

**Adaptive Component System (Recommended)**

```
components/
├── mobile/
│   ├── MobileHeroSection.tsx
│   ├── MobileCertificationFlow.tsx
│   ├── MobileNavigation.tsx
│   └── MobileUserPathway.tsx
├── desktop/
│   ├── DesktopHeroSection.tsx
│   └── DesktopCertificationFlow.tsx
└── shared/
    ├── CertificationCard.tsx
    └── PaymentFlow.tsx
```

#### 2. Mobile UX Patterns to Implement

**A. Navigation Redesign**

- **Bottom Tab Navigation** (replacing sidebar)
- **Floating Action Button** for primary actions
- **Swipe gestures** for navigation
- **Pull-to-refresh** functionality

**B. Content Presentation**

- **Card-based layouts** optimized for touch
- **Vertical scrolling** instead of horizontal layouts
- **Collapsible sections** for information density
- **Progressive disclosure** for complex forms

**C. Touch-First Interactions**

- **Swipe-to-dismiss** modals
- **Haptic feedback** for interactions
- **Touch targets** minimum 44px
- **Gesture-based shortcuts**

#### 3. Implementation Strategy

**Phase 1: Detection & Routing**

```typescript
// hooks/useDeviceType.ts
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
};
```

**Phase 2: Mobile-First Components**

```typescript
// components/adaptive/AdaptiveHeroSection.tsx
export default function AdaptiveHeroSection() {
  const deviceType = useDeviceType();

  if (deviceType === 'mobile') {
    return <MobileHeroSection />;
  }

  return <DesktopHeroSection />;
}
```

**Phase 3: Mobile Navigation System**

```typescript
// components/mobile/MobileBottomNav.tsx
const MobileBottomNav = () => {
  const tabs = [
    { id: 'home', icon: HomeIcon, label: 'الرئيسية', href: '/' },
    { id: 'certs', icon: AwardIcon, label: 'الاختبارات', href: '/certifications' },
    { id: 'profile', icon: UserIcon, label: 'الملف الشخصي', href: '/profile' },
    { id: 'settings', icon: CogIcon, label: 'الإعدادات', href: '/settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-primary-light/20 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(tab => (
          <MobileNavItem key={tab.id} {...tab} />
        ))}
      </div>
    </nav>
  );
};
```

#### 4. Mobile-Specific Features

**A. Certification Flow Optimization**

- **Step-by-step wizard** instead of complex forms
- **Swipe navigation** between steps
- **Progress indicators** always visible
- **One-handed operation** support

**B. Content Optimization**

- **Lazy loading** for images and components
- **Infinite scroll** for certification lists
- **Search filters** in slide-out panels
- **Quick actions** with floating buttons

**C. Performance Enhancements**

- **Reduced bundle size** for mobile
- **Optimized images** with WebP support
- **Preloading** critical resources
- **Service worker** for offline functionality

#### 5. Mobile UX Enhancements

**A. Certification Discovery**

- Horizontal scrolling category cards
- Swipe-to-explore certifications
- Quick preview with bottom sheet
- Bookmark functionality

**B. User Pathway Experience**

- Full-screen pathway selector
- Animated transitions between steps
- Voice-over support for accessibility
- Quick pathway switching

**C. Payment Flow**

- One-page checkout
- Camera integration for proof upload
- Payment method shortcuts
- Real-time validation

#### 6. Development Methodology

**A. Mobile-First Development**

```bash
# Development workflow
1. Design mobile component
2. Test on actual devices
3. Enhance for tablet
4. Optimize for desktop
5. Cross-device testing
```

**B. Testing Strategy**

- iPhone SE (small screen)
- iPhone 12 Pro (standard)
- iPad (tablet)
- Android various sizes
- Desktop breakpoints

**C. Performance Monitoring**

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Touch response time < 100ms
- Bundle size < 200KB initial

#### 7. Implementation Timeline

**Week 1: Foundation**

- Set up device detection
- Create mobile component structure
- Implement mobile navigation
- Test basic responsive behavior

**Week 2: Core Features**

- Mobile hero section
- Certification flow optimization
- User pathway mobile experience
- Payment flow enhancement

**Week 3: Polish & Performance**

- Animations and transitions
- Performance optimization
- Cross-device testing
- Accessibility improvements

**Week 4: Advanced Features**

- Progressive Web App features
- Offline functionality
- Push notifications
- Analytics integration

#### 8. Visual Design Considerations

**A. Mobile-Specific Design Elements**

- **Thumb-friendly navigation zones**
- **Larger touch targets** (minimum 44px)
- **Reduced cognitive load** with simpler layouts
- **Arabic typography** optimized for small screens

**B. Animation Strategy**

- **Micro-interactions** for feedback
- **Page transitions** for continuity
- **Loading states** for better UX
- **Gesture animations** for intuitiveness

### Benefits of This Approach

1. **🎯 Targeted UX**: Each device gets optimized experience
2. **🔧 Maintainable**: Clean separation of concerns
3. **⚡ Performance**: Load only what's needed
4. **🧪 Testable**: Easier to test device-specific features
5. **🔄 Scalable**: Easy to add new device types

### Mobile Features Roadmap

- 📱 **Phase 1**: Mobile navigation system
- 🎨 **Phase 2**: Mobile-optimized certification flow
- ⚡ **Phase 3**: Performance optimization
- 🚀 **Phase 4**: Progressive Web App features

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
