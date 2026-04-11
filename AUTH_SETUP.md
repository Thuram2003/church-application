# Authentication System Documentation

## Overview

The Gracely Frontend application features a complete authentication system with a modern, responsive UI design. The authentication pages are based on the design from the `instanvi-auth-frontend` project, adapted to match the Gracely brand identity with purple color scheme.

---

## Architecture

### File Structure

```
gracely-frontend/
├── app/
│   ├── (auth)/                          # Auth route group (no sidebar)
│   │   ├── layout.tsx                   # Auth-specific layout with split-screen design
│   │   ├── login/
│   │   │   └── page.tsx                 # Login page route
│   │   ├── register/
│   │   │   └── page.tsx                 # Registration page route
│   │   └── forgot-password/
│   │       └── page.tsx                 # Password recovery page route
│   ├── layout.tsx                       # Root layout (handles sidebar logic)
│   └── page.tsx                         # Root redirect page
│
├── components/
│   └── auth/
│       ├── index.ts                     # Barrel export file
│       ├── login-form.tsx               # Login form component
│       ├── register-form.tsx            # Registration form component
│       └── forgot-password-form.tsx     # Password recovery form component
│
└── AUTH_SETUP.md                        # This documentation file
```

---

## How It Works

### 1. Route Groups with Parentheses

The `(auth)` folder uses Next.js route groups (parentheses notation) which:
- Creates routes without adding the folder name to the URL path
- Allows for layout-specific organization
- Example: `app/(auth)/login/page.tsx` → `/login` (not `/auth/login`)

**Why use route groups?**
- Organize related pages together
- Apply specific layouts to groups of pages
- Keep URLs clean and user-friendly

### 2. Layout Hierarchy

#### Root Layout (`app/layout.tsx`)
- Controls the entire application structure
- Conditionally renders sidebar based on pathname
- Pages WITHOUT sidebar:
  - `/` (root redirect)
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/onboarding`
- All other pages get the sidebar

```typescript
const isAuthPage = pathname?.startsWith("/login") || 
                   pathname?.startsWith("/register") || 
                   pathname?.startsWith("/forgot-password") ||
                   pathname === "/";
```

#### Auth Layout (`app/(auth)/layout.tsx`)
- Applies only to pages inside the `(auth)` folder
- Creates split-screen design:
  - Left: Form content (50% width on desktop)
  - Right: Branded section with quote and gradient (50% width on desktop)
- Fully responsive (stacks on mobile)
- Uses framer-motion for smooth animations

### 3. Component Structure

#### Login Form (`components/auth/login-form.tsx`)
**Features:**
- Email and password fields with validation
- Password visibility toggle (Eye/EyeSlash icons)
- Remember me checkbox
- Links to register and forgot password pages
- Form validation using Zod schema
- Loading states during submission

**Form Schema:**
```typescript
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});
```

#### Register Form (`components/auth/register-form.tsx`)
**Features:**
- First name and last name fields (grid layout)
- Country selection dropdown
- Email and password fields with validation
- Password visibility toggle
- Terms of service and email updates checkboxes
- Form validation using Zod schema
- Compact spacing for better fit

**Form Schema:**
```typescript
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeEmails: z.boolean(),
  agreeTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});
```

#### Forgot Password Form (`components/auth/forgot-password-form.tsx`)
**Features:**
- Email field for password recovery
- Success state after submission
- Links to login and register pages
- Form validation using Zod schema

---

## Design System

### Color Scheme
- Primary: `primary` / `primary-dark` (Gracely brand color)
- Text: `black` with opacity variants (`black/80`, `black/60`, `black/40`)
- Background: `white`
- Borders: `black/10`
- Focus rings: `primary`

### Typography
- Headings: `text-3xl` (48px equivalent)
- Body text: `text-base` or `text-sm`
- Labels: `text-sm`
- Font family: Inter (via `--font-inter` CSS variable)

### Spacing (Compact Design)
- Main container: `space-y-6` (24px)
- Form fields: `space-y-5` (20px)
- Field internal: `space-y-1.5` (6px)
- Input height: `h-11` (44px)
- Button height: `h-11` (44px)

### Icons
- Library: `@phosphor-icons/react`
- Email icon: `EnvelopeSimple`
- Password visibility: `Eye` / `EyeSlash`
- Sizes: 18px-20px

---

## Routes

### `/login`
- **Purpose:** User authentication
- **Layout:** Auth layout with split-screen
- **Component:** `LoginForm`
- **Features:** Email/password login, remember me, password recovery link

### `/register`
- **Purpose:** New user registration
- **Layout:** Auth layout with split-screen
- **Component:** `RegisterForm`
- **Features:** Full registration form with country selection and terms agreement

### `/forgot-password`
- **Purpose:** Password recovery
- **Layout:** Auth layout with split-screen
- **Component:** `ForgotPasswordForm`
- **Features:** Email submission for password reset instructions

### `/` (Root)
- **Purpose:** Entry point redirect
- **Behavior:** Redirects to `/login` (TODO: check authentication status)
- **Layout:** No sidebar

---

## Dependencies

### Core Dependencies
- `react-hook-form` (v7.72.1) - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration with react-hook-form
- `framer-motion` - Animations for auth layout
- `@phosphor-icons/react` (v2.1.10) - Icon library
- `next` (v16.2.2) - Next.js framework

### UI Components (Radix UI)
- `@radix-ui/react-checkbox` - Checkbox component
- `@radix-ui/react-label` - Label component
- `@radix-ui/react-select` - Select dropdown component

---

## Implementation Details

### Form Validation
All forms use Zod schemas for validation:
1. Schema defines field requirements
2. `zodResolver` integrates with react-hook-form
3. Validation runs on submit and field blur
4. Error messages display below fields

### State Management
- Local component state using `useState`
- Form state managed by `react-hook-form`
- Loading states for async operations
- Success/error states for user feedback

### Responsive Design
- Mobile-first approach
- Split-screen layout on desktop (lg breakpoint)
- Full-width form on mobile
- Branded section hidden on mobile

### Animations
- Fade-in animation on page load (`animate-in fade-in duration-500`)
- Smooth transitions on hover states
- Framer-motion for auth layout quote section

---

## Where Components Come From

### Original Source
The authentication UI design is based on `instanvi-auth-frontend`:
- Location: `C:\Users\Thuram Jr\Instanvi Projects\instanvi-auth-frontend`
- Original files:
  - `components/auth/login-form.tsx`
  - `components/auth/register-form.tsx`
  - `components/auth/forgot-password-form.tsx`
  - `app/(auth)/layout.tsx`

### Adaptations Made
1. **Color Scheme:** Changed from primary color to primary/700
2. **Icons:** Kept @phosphor-icons/react (already in project)
3. **Spacing:** Made more compact (reduced from space-y-8 to space-y-6)
4. **Input Heights:** Reduced from h-12 to h-11
5. **Text Sizes:** Made labels and helper text smaller
6. **Branding:** Updated quotes and text for church management context
7. **Background:** Changed from image to gradient background

---

## TODO / Future Enhancements

### Authentication Logic
- [ ] Implement actual API integration for login
- [ ] Implement actual API integration for registration
- [ ] Implement actual password reset flow
- [ ] Add session management (NextAuth.js or similar)
- [ ] Add protected route middleware
- [ ] Implement email verification flow

### UI Enhancements
- [ ] Add social login options (Google, Facebook)
- [ ] Add password strength indicator
- [ ] Add toast notifications for success/error messages
- [ ] Add loading skeletons
- [ ] Add form field animations
- [ ] Add "Show password" tooltip

### Security
- [ ] Implement CSRF protection
- [ ] Add rate limiting for login attempts
- [ ] Add reCAPTCHA for bot protection
- [ ] Implement secure password reset tokens
- [ ] Add two-factor authentication (2FA)

### Accessibility
- [ ] Add ARIA labels for screen readers
- [ ] Ensure keyboard navigation works properly
- [ ] Add focus indicators
- [ ] Test with screen readers
- [ ] Add skip links

---

## Usage Examples

### Navigating to Auth Pages
```typescript
import { useRouter } from "next/navigation";

const router = useRouter();

// Go to login
router.push("/login");

// Go to register
router.push("/register");

// Go to forgot password
router.push("/forgot-password");
```

### Using Auth Components Directly
```typescript
import { LoginForm, RegisterForm, ForgotPasswordForm } from "@/components/auth";

// Use in any page or component
<LoginForm />
<RegisterForm />
<ForgotPasswordForm />
```

### Checking Current Route
```typescript
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isAuthPage = pathname?.startsWith("/login") || 
                   pathname?.startsWith("/register") || 
                   pathname?.startsWith("/forgot-password");
```

---

## Troubleshooting

### Sidebar Showing on Auth Pages
- Check `app/layout.tsx` - ensure auth routes are in the `isAuthPage` condition
- Verify route group parentheses: `(auth)` not `auth`

### Form Validation Not Working
- Ensure Zod schema is properly defined
- Check `zodResolver` is imported from `@hookform/resolvers/zod`
- Verify form field names match schema keys

### Icons Not Displaying
- Ensure `@phosphor-icons/react` is installed
- Check import statements use correct icon names
- Verify icon size prop is provided

### Layout Not Responsive
- Check Tailwind breakpoints (lg:, md:, sm:)
- Verify `hidden lg:flex` classes on branded section
- Test at different viewport sizes

---

## Support

For questions or issues with the authentication system:
1. Check this documentation first
2. Review the original `instanvi-auth-frontend` implementation
3. Check Next.js documentation for route groups and layouts
4. Review react-hook-form and Zod documentation for form issues

---

**Last Updated:** April 9, 2026
**Version:** 1.0.0
**Maintained by:** Gracely Development Team
