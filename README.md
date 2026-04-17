# 🏛️ Movementz Frontend

A modern church management system built with Next.js 14, Better Auth, and TanStack Query.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your backend URL

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## ✨ Features

### Authentication
- ✅ Email/Password registration and login
- ✅ Cookie-based session management
- ✅ Password reset flow
- ✅ Email verification
- ✅ Session management (list, revoke)
- ✅ Protected routes with middleware

### Onboarding
- ✅ 3-step wizard (Church Info → Branch Info → Goals)
- ✅ Form validation with Zod
- ✅ Progress indicator
- ✅ Data persistence across steps

### User Interface
- ✅ Responsive sidebar navigation
- ✅ User dropdown menu (Profile, Logout, Switch Church)
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

### Church Management
- ✅ Church settings
- ✅ Branch management (UI ready)
- 🚧 People management (coming soon)
- 🚧 Finance management (coming soon)
- 🚧 Calendar & events (coming soon)

---

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Better Auth](https://better-auth.com)
- **State Management**: [TanStack Query](https://tanstack.com/query)

### UI
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### HTTP & Data
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 📁 Project Structure

```
Movementz-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, register)
│   ├── (people)/                 # People management
│   ├── (finances)/               # Finance management
│   ├── (calendar)/               # Calendar & events
│   ├── onboarding/               # Onboarding wizard
│   ├── home/                     # Dashboard
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── auth/                     # Auth components
│   ├── onboarding/               # Onboarding steps
│   ├── providers/                # React Context providers
│   ├── ui/                       # Reusable UI components
│   ├── app-sidebar.tsx           # Main sidebar
│   └── app-sidebar-user-menu.tsx # User dropdown
│
├── lib/
│   ├── api-client.ts             # Axios instances
│   └── services/                 # API services
│       ├── auth.service.ts       # Auth API
│       └── onboarding.service.ts # Onboarding API
│
├── hooks/
│   ├── use-auth.ts               # Auth hooks
│   └── use-onboarding.ts         # Onboarding hooks
│
├── types/
│   ├── auth.ts                   # Auth types
│   └── onboarding.ts             # Onboarding types
│
└── middleware.ts                 # Route protection
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running at `http://192.168.100.56:5550`

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Movementz-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create `.env.local`:

```env
# Better Auth Backend
NEXT_PUBLIC_AUTH_URL=https://movement-backend.onrender.com/api/auth
NEXT_PUBLIC_API_URL=https://movement-backend.onrender.com/api

# Your Next.js app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

```

4. **Run development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

### For Developers

- **[DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)** - Start here! Quick onboarding guide
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete implementation details
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design decisions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference

### Status & Integration

- **[API_INTEGRATION_COMPLETE.md](./API_INTEGRATION_COMPLETE.md)** - Integration status and checklist

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

### Code Style

- Use TypeScript (no `any` types)
- Follow existing patterns
- Use functional components
- Keep components small and focused
- Use "use client" for client components

### Adding a New Feature

1. **Create types** in `types/`
2. **Create service** in `lib/services/`
3. **Create hook** in `hooks/`
4. **Create component** in `components/`
5. **Add to navigation** in `components/app-sidebar.tsx`
6. **Update middleware** if route needs protection

See [DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md) for detailed examples.

---

## 🏗️ Architecture

### Data Flow

```
Component → Hook → Service → API Client → Backend
```

### Key Concepts

1. **Separation of Concerns**
   - Components: UI only
   - Hooks: React state
   - Services: API calls
   - Types: Type safety

2. **Cookie-Based Auth**
   - No manual token management
   - Automatic cookie handling
   - Secure and HTTP-only

3. **React Query**
   - Automatic caching
   - Background refetching
   - Optimistic updates

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete details.

---

## 🚢 Deployment

### Environment Variables

Set these in your production environment:

```env
NEXT_PUBLIC_AUTH_URL=https://your-backend.com/api/auth
NEXT_PUBLIC_API_URL=https://your-backend.com/api
NEXT_PUBLIC_APP_URL=https://your-frontend.com
AUTH_SECRET=strong_random_secret_for_production
```

### Build

```bash
npm run build
```

### Deploy

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run start
```

### Checklist

- [ ] Environment variables configured
- [ ] CORS enabled on backend
- [ ] HTTPS enabled (required for secure cookies)
- [ ] Cookie domain configured
- [ ] Error tracking setup
- [ ] Analytics configured

---

## 🧪 Testing

### Manual Testing

```bash
# Auth Flow
1. Go to /register
2. Create account
3. Complete onboarding
4. Login
5. Logout

# Protected Routes
1. Try accessing /home without auth → Should redirect to /login
2. Login → Should access /home
```

### Automated Testing (Coming Soon)

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright

---

## 🐛 Troubleshooting

### Common Issues

**Session not persisting**
- Check `withCredentials: true` in api-client
- Check backend sends `Set-Cookie` header
- Check cookie in DevTools > Application > Cookies

**CORS errors**
- Check backend allows `http://localhost:3000`
- Check backend allows credentials
- Check backend allows required methods

**401 Unauthorized**
- Check user is logged in
- Check session cookie exists
- Check middleware configuration

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for more troubleshooting.

---

## 🤝 Contributing

### Getting Started

1. Read [DEVELOPER_ONBOARDING.md](./DEVELOPER_ONBOARDING.md)
2. Check existing issues
3. Create a feature branch
4. Make your changes
5. Submit a pull request

### Code Review

- All PRs require review
- Follow existing code style
- Add tests for new features
- Update documentation

---

## 📝 License

[Your License Here]

---

## 👥 Team

- **Frontend**: [Your Team]
- **Backend**: [Backend Team]
- **Design**: [Design Team]

---

## 🔗 Links

- **Backend API**: http://192.168.100.56:5550
- **API Docs**: http://192.168.100.56:5550/docs
- **Better Auth Docs**: https://better-auth.com

---

## 📞 Support

For questions or issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue
4. Contact the team

---

## 🎯 Roadmap

### Current (v1.0)
- ✅ Authentication system
- ✅ Onboarding flow
- ✅ Basic UI/UX
- ✅ Route protection

### Next (v1.1)
- 🚧 Email verification flow
- 🚧 User profile page
- 🚧 Branch management API integration
- 🚧 Session management UI

### Future (v2.0)
- 📋 People management
- 💰 Finance management
- 📅 Calendar & events
- 📊 Reports & analytics
- 📱 Mobile app

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Better Auth](https://better-auth.com)
- [TanStack Query](https://tanstack.com/query)
- [shadcn/ui](https://ui.shadcn.com/)
- [Phosphor Icons](https://phosphoricons.com/)

---

**Built with ❤️ by the Movementz Team**

**Last Updated**: April 12, 2026
**Version**: 1.0.0
