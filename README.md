# InFarm - Website Edukasi Pertanian

Proyek ini bertujuan untuk membuat website infarm.com yang fokus pada edukasi pertanian, khususnya untuk masyarakat dengan lahan terbatas (seperti pekarangan rumah). Website ini akan menjadi platform informasi yang mudah diakses untuk membantu komunitas mencapai tujuan Sustainable Development Goals (SDGs) poin 1 dan 2, yaitu Tanpa Kemiskinan dan Tanpa Kelaparan.

## 🏗️ Struktur Project

```
Website Infarm/
├── infarm-frontend/          # Frontend React + Vite + TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vercel.json          # Vercel deployment config
│   └── vite.config.js
├── config/                   # Backend database config
├── controllers/              # Backend API controllers
├── middleware/               # Backend middleware
├── models/                   # Database models
├── routes/                   # API routes
├── server.js                 # Backend Express server
└── package.json              # Backend dependencies
```

## 🚀 Deployment

### Frontend (Vercel)
- **Folder**: `infarm-frontend/`
- **Framework**: Vite + React + TypeScript
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend (Separate deployment)
- **File**: `server.js`
- **Framework**: Express.js + MySQL
- **Deploy to**: Railway, Render, atau Heroku

## 🔧 Setup Development

### Frontend
```bash
cd infarm-frontend
npm install
npm run dev
```

### Backend
```bash
npm install
npm run dev
```

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=infarm
PORT=5000
```

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Lucide React

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Multer (File Upload)

## 📄 License

ISC