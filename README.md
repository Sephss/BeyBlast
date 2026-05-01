# BeyBlast — Community Event & Team Platform

A Beyblade-inspired community platform built with Vanilla HTML/CSS/JS + Firebase.

## Setup

### 1. Firebase Configuration
Edit `js/firebase.js` and replace the placeholder config with your real Firebase project config:

```js
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Enable Firebase Services
In your Firebase Console:
- **Authentication**: Enable Google and Facebook providers
- **Realtime Database**: Create a database, start in test mode then apply rules

### 3. Apply Firebase Security Rules
Copy the contents of `firebase-rules.json` into your Firebase Realtime Database Rules tab.

### 4. Enable Auth Providers
- **Google**: Enabled by default with Firebase Auth
- **Facebook**: Requires a Facebook App ID and Secret in Firebase Console → Auth → Sign-in method → Facebook

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```
Or drag-and-drop the folder into vercel.com dashboard.

## File Structure
```
beyblast/
├── index.html          # Dashboard
├── login.html          # Login page
├── profile.html        # User profile
├── events.html         # Events listing
├── event-details.html  # Single event view
├── teams.html          # Teams listing
├── team-details.html   # Single team view
├── css/
│   └── style.css       # All styles
├── js/
│   ├── firebase.js     # Firebase init (edit this)
│   ├── auth.js         # Auth: Google, Facebook, logout
│   ├── ui.js           # Toast, modal, loading, helpers
│   ├── helpers.js      # Utilities
│   ├── events.js       # Event CRUD
│   ├── teams.js        # Team CRUD
│   ├── profile.js      # Profile CRUD
│   └── nav.js          # Navigation component
├── firebase-rules.json # Copy to Firebase DB rules
└── vercel.json         # Vercel deployment config
```

## Features
- Google & Facebook authentication
- Create, edit, delete teams and events (creator only)
- Join / leave teams and events (duplicate prevention)
- Search and filter teams and events
- User profile with edit support
- Dashboard with stats, upcoming events, joined teams
- Mobile-first responsive design
- Dark futuristic Beyblade-inspired UI
