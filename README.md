# Premium Clarity - Onboarding Application

## 🎯 Features

- **Multi-step Onboarding Flow** - Personal Profile, Favorite Songs, Payment
  Information
- **State Persistence** - Redux state persisted to localStorage for seamless
  user experience
- **Form Validation** - Comprehensive validation using Formik + Yup
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion for polished transitions
- **Dark Theme** - Modern, professional dark UI design
- **TypeScript** - Full type safety throughout the application
- **Toast Notifications** - Real-time feedback for user actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd azodha-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update the credentials in `.env.local` (see Environment Variables section
   below)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_VALID_USERNAME=user123
NEXT_PUBLIC_VALID_PASSWORD=password123
```

**Note:** These credentials are for demo purposes only. In production, implement
proper authentication with a backend service.

## 📁 Project Structure

```
azodha-assignment/
├── src/
│   ├── components/
│   │   ├── onboarding/          # Onboarding step components
│   │   │   ├── PersonalProfile.tsx
│   │   │   ├── FavoriteSongs.tsx
│   │   │   ├── PaymentInformation.tsx
│   │   │   └── Success.tsx
│   │   ├── shared/               # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   └── StepIndicator/
│   │   └── OnboardingLayout.tsx
│   ├── config/                   # App configuration
│   │   └── toaster.config.tsx
│   ├── pages/                    # Next.js pages
│   │   ├── _app.tsx             # App wrapper with Redux Provider
│   │   ├── _document.tsx        # Custom document
│   │   ├── index.tsx            # Root redirect logic
│   │   ├── login.tsx            # Login page
│   │   ├── onboarding.tsx       # Onboarding flow
│   │   ├── home.tsx             # Main dashboard
│   │   ├── profile.tsx          # User profile management
│   │   ├── favorites.tsx        # Favorite songs management
│   │   └── payments.tsx         # Payment info management
│   ├── store/                    # Redux state management
│   │   ├── index.ts             # Store configuration
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       └── onboardingSlice.ts
│   ├── styles/                   # SCSS styles
│   │   ├── globals.scss
│   │   ├── _base.scss
│   │   ├── theme/               # Design tokens
│   │   │   ├── _colors.scss
│   │   │   ├── _typography.scss
│   │   │   ├── _spacing.scss
│   │   │   ├── _shadows.scss
│   │   │   └── _responsive.scss
│   │   └── module/              # Component-specific styles
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                    # Utility functions
│       ├── constants.ts
│       ├── localStorage.ts
│       └── toast.ts
├── public/                       # Static assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
└── package.json
```

## 🔄 User Flow

1. **Login** (`/login`)
   - Enter credentials (user123 / password123)
   - Redirects to onboarding if incomplete, home if completed

2. **Onboarding** (`/onboarding`)
   - **Step 1**: Personal Profile (name, age, email, photo)
   - **Step 2**: Favorite Songs (add/remove tracks)
   - **Step 3**: Payment Information (card details)
   - **Step 4**: Success screen with auto-redirect

3. **Dashboard** (`/home`)
   - Main landing page after onboarding
   - Access to profile, favorites, and payment management

4. **Profile Management** (`/profile`, `/favorites`, `/payments`)
   - Edit information from onboarding steps
   - Consistent layout with sidebar navigation

## 🛠️ Technologies

### Core

- **Next.js 16.1.4** - React framework with app routing
- **React 19.2.3** - UI library
- **TypeScript 5.0** - Type safety

### State Management

- **Redux Toolkit 2.11.2** - State management
- **React Redux 9.2.0** - React bindings for Redux

### Forms & Validation

- **Formik 2.4.9** - Form management
- **Yup 1.7.1** - Schema validation

### UI & Styling

- **SCSS/Sass 1.97.2** - Styling
- **Framer Motion 11.15.0** - Animations
- **Lucide React 0.562.0** - Icons
- **React Hot Toast 2.4.1** - Toast notifications

### Development

- **ESLint 9** - Code linting
- **Prettier 3.8.0** - Code formatting

**Built with ❤️ using Next.js and TypeScript**
