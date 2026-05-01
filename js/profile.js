import { db } from "./firebase.js";
import {
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export async function getUserProfile(uid) {
  const snap = await get(ref(db, `users/${uid}`));
  return snap.exists() ? snap.val() : null;
}

export async function updateUserProfile(uid, data) {
  await update(ref(db, `users/${uid}`), data);
}

export async function getMultipleUsers(uids) {
  const results = {};
  for (const uid of uids) {
    const snap = await get(ref(db, `users/${uid}`));
    if (snap.exists()) results[uid] = snap.val();
  }
  return results;
}
