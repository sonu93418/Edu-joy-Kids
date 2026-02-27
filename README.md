# 🎓 EduJoy Kids — Where Learning Feels Like Play

A **production-ready** interactive educational platform for children from **Play Group to Class 5** (ages 3–12). Built with Next.js 14, Node.js, MongoDB, AI-powered tutoring, gamification, and Stripe payments.

---

## ✨ Features

| Feature | Details |
|---|---|
| 👤 **5 User Roles** | Student, Parent, Teacher, Admin, School Admin |
| 🎮 **Gamification** | XP, coins, badges, streaks, level-ups, confetti |
| 🤖 **AI Tutor** | GPT-3.5-powered chat, weakness analysis, hints |
| 💳 **Payments** | Stripe subscriptions (3 tiers + school enterprise) |
| 📚 **Curriculum** | Play Group → Class 5, 6 core subjects |
| 🔒 **Security** | JWT auth, rate limiting, CSP, child safety filters |
| 📱 **PWA** | Installable on mobile & desktop |
| 🎵 **Audio** | Sound effects and background music via Howler.js |

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom kids color palette)
- Framer Motion animations
- Zustand (auth, game, audio stores)
- @tanstack/react-query v5

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Redis (session caching)
- JWT (15min access + 7d refresh httpOnly cookies)

**Services**
- OpenAI API (gpt-3.5-turbo)
- Stripe (subscriptions + webhooks)
- Nodemailer (email verification)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional, for caching)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/edujoy-kids.git
cd edujoy-kids

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` for the frontend:

```bash
cp .env.example .env.local
```

Copy `server/.env.example` to `server/.env`:

```bash
cp server/.env.example server/.env
```

Fill in the required values (see **Environment Variables** section below).

### 3. Start Development Servers

```bash
# Terminal 1 — Next.js frontend (port 3000)
npm run dev

# Terminal 2 — Express backend (port 3001)
cd server && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

### Frontend (`.env.local`)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Express backend URL | `http://localhost:3001` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `http://localhost:3000` |

### Backend (`server/.env`)

| Variable | Description | Required |
|---|---|---|
| `PORT` | Express port | `3001` |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Access token secret (min 32 chars) | ✅ |
| `JWT_REFRESH_SECRET` | Refresh token secret (min 32 chars) | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | For AI tutor |
| `STRIPE_SECRET_KEY` | Stripe secret key | For payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | For webhooks |
| `EMAIL_HOST` | SMTP host | For email |
| `EMAIL_USER` | SMTP username | For email |
| `EMAIL_PASS` | SMTP password | For email |
| `REDIS_URL` | Redis connection URL | Optional |
| `NODE_ENV` | Environment | `development` |

---

## 👥 User Roles

### Creating Test Accounts

After starting the servers, register via the signup page at `/auth/signup`.

| Role | Access Path | Notes |
|---|---|---|
| Student | `/student` | Requires a parent account to link |
| Parent | `/parent` | Can create child (student) profiles |
| Teacher | `/teacher` | Can create lessons and classes |
| Admin | `/admin` | Platform-wide management |
| School Admin | `/school` | School-level management |

---

## 📁 Project Structure

```
edujoy-kids/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/           # Landing, pricing, auth pages
│   │   ├── student/            # Student dashboard & learning
│   │   ├── parent/             # Parent dashboard
│   │   ├── teacher/            # Teacher dashboard
│   │   ├── admin/              # Admin dashboard
│   │   └── school/             # School admin dashboard
│   ├── components/
│   │   ├── dashboard/          # Role-specific dashboard components
│   │   ├── gamification/       # XP, badges, confetti, modals
│   │   ├── landing/            # Landing page sections
│   │   ├── navigation/         # Header & footer
│   │   ├── providers/          # React context providers
│   │   └── ui/                 # Reusable UI components
│   ├── store/                  # Zustand stores (auth, game, audio)
│   ├── middleware.ts            # Next.js route protection
│   └── lib/                    # Utilities
├── server/
│   ├── controllers/            # Express route controllers
│   ├── middleware/             # Auth, validation, security
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API routes (auth, ai, payments)
│   ├── utils/                  # JWT, email, helpers
│   └── server.js               # Express app entry
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── animations/             # Lottie JSON files
│   └── sounds/                 # Audio files
├── vercel.json                 # Vercel deployment config
└── next.config.js              # Next.js configuration
```

---

## 🌐 Deployment

### Frontend — Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `vercel.json` → `rewrites.destination` with your API domain
5. Deploy

### Backend — Render / Railway / VPS

```bash
cd server
npm start  # or use PM2: pm2 start server.js --name edujoy-api
```

Set `NODE_ENV=production` and all required environment variables on your host.

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Whitelist your server IP
3. Copy the connection string to `MONGODB_URI`

### Stripe Webhooks

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Run: `stripe listen --forward-to localhost:3001/api/payments/webhook`
3. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`
4. In production, add your URL in the Stripe dashboard

---

## 🎨 Customization

### Colors (Tailwind)
Edit `tailwind.config.js` → `theme.extend.colors`:

```js
'edujoy-primary': '#6C3CE1',   // Main purple
'fun-pink':       '#FF6B9D',   // Accent pink
'fun-blue':       '#4FACFE',   // Sky blue
'fun-green':      '#00D4A4',   // Mint green
'fun-orange':     '#FF8C42',   // Warm orange
```

### Adding Subjects
Edit `src/app/student/learn/page.tsx` → `SUBJECTS` array.

### Adding Lottie Animations
Place `.json` files in `/public/animations/` and use `<LottiePlayer src="/animations/your-file.json" />`.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `cd server && npm run dev` | Start Express backend |
| `cd server && npm start` | Start backend in production |

---

## 🔒 Security

- All routes protected by JWT middleware + role checks
- Rate limiting on auth endpoints (5 req/15min)
- Content Security Policy headers
- Child-safe content filtering on AI responses
- bcryptjs password hashing (salt rounds: 12)
- Account lockout after 5 failed login attempts
- httpOnly cookies for refresh tokens

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [OpenAI](https://openai.com) for AI tutoring
- [Stripe](https://stripe.com) for payments
- [Lottie Files](https://lottiefiles.com) for animation resources

---

*Built with ❤️ for curious young minds everywhere.*
# Edu-joy-Kids
