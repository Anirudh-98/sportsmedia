# SportsMedia.World

A grassroots sports media and journalism platform connecting student athletes, coaches, schools, and CSR sponsors across India.

## Getting Started

1. Set up your environment variables:
   Copy `.env.example` to `.env.local` and configure your database and Firebase credentials:
   ```bash
   cp .env.example .env.local
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Firebase Integration

This project uses Google Firebase for client services and storage:
- **Authentication & Security Rules**
- **Cloud Firestore / Realtime services**
- **Firebase Storage** for media uploads

### Firebase Environment Variables
All Firebase client keys should be set in `.env.local` (kept git-ignored):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

> **Note**: Real API keys must never be committed to public Git repositories.
