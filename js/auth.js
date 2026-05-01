import { auth, db } from "./firebase.js";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { showToast } from "./ui.js";

setPersistence(auth, browserLocalPersistence).catch(console.error);

export function onAuthReady(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

async function saveUserToDb(user) {
  try {
    if (!user?.uid) throw new Error("No UID found");

    const userRef = ref(db, `users/${user.uid}`);

    const snap = await get(userRef);

    const data = {
      uid: user.uid,
      name: user.displayName || user.email?.split("@")[0] || "Blader",
      email: user.email || "",
      photo: user.photoURL || "https://i.imgur.com/placeholder.png",
      role: "user",
      updatedAt: Date.now(),
    };

    if (!snap.exists()) {
      data.createdAt = Date.now();
    }

    console.log("🔥 Writing user:", data);

    await set(userRef, data);

    console.log("✅ User saved successfully");
  } catch (err) {
    console.error("❌ saveUserToDb ERROR:", err.code, err.message, err);
    throw err;
  }
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await saveUserToDb(result.user);
    return result.user;
  } catch (err) {
    showToast(err.message, "error");
    throw err;
  }
}

export async function loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await saveUserToDb(result.user);
    return result.user;
  } catch (err) {
    showToast(err.message, "error");
    throw err;
  }
}

export async function logout() {
  await signOut(auth);
  window.location.href = "login.html";
}

export function requireAuth(redirectTo = "login.html") {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = redirectTo;
      } else {
        resolve(user);
      }
    });
  });
}
