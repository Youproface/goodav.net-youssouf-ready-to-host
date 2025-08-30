# goodav.net-youssouf-ready-to-host

A modern React application for GoodAV - Professional Audio Visual Production Services.

## 🚀 Deployment Options

This project is configured for deployment on multiple platforms:

### Option 1: Netlify (Recommended)
1. **Connect Repository**: Go to [Netlify](https://netlify.com) and connect your GitHub repository
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
3. **Environment Variables** (if needed):
   - Add any required environment variables in Netlify dashboard
4. **Domain**: Configure `goodav.net` as custom domain

### Option 2: Vercel
1. **Connect Repository**: Go to [Vercel](https://vercel.com) and connect your GitHub repository
2. **Auto-deployment**: Vercel will automatically detect your configuration
3. **Domain**: Add `goodav.net` as custom domain

### Option 3: GitHub Pages
1. **Enable Pages**: Go to repository Settings → Pages
2. **Source**: Select "GitHub Actions" as source
3. **Domain**: Configure custom domain `goodav.net`
4. **Note**: May require additional SPA routing configuration

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── forms/          # Form components (BookingModal, etc.)
│   ├── ui/             # UI components (shadcn/ui)
│   └── services/       # Service detail components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
└── data/               # Static data files
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and preview (local deployment test)

## 🔧 Configuration

- **Netlify**: `netlify.toml`
- **Vercel**: `vercel.json`
- **GitHub Actions**: `.github/workflows/`
- **Tailwind**: `tailwind.config.ts`
- **TypeScript**: `tsconfig.json`

## 🌐 Domain

The application is configured for `https://goodav.net/` domain.
