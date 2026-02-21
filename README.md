# Yourbazzar

Monorepo for **Yourbazzar** with:
- `client` (customer React app)
- `adminpannel` (admin React app)
- `backend` (Node/Express API)

## Local development

### Client app
```bash
cd client
npm install
npm start
```

### Admin panel
```bash
cd adminpannel
npm install
npm start
```

### Backend
```bash
cd backend
npm install
node server.js
```

## Build

### Client production build
```bash
cd client
npm run build
```

The client build command generates CRA output in `build/` and also copies it to `dist/` for deployment compatibility.

## Deployment notes

### Netlify
This repo includes `netlify.toml` configured to:
- run build from `client`
- publish `dist`
- apply SPA redirect rules and security headers

### Vercel
This repo includes `vercel.json` configured to:
- install client dependencies with `cd client && npm ci`
- build with `cd client && npm run build`
- serve output from `client/dist`
- apply SPA rewrites and security headers
