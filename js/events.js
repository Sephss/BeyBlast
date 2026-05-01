import { db } from "./firebase.js";
import {
  ref, set, get, update, remove
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { genId } from "./helpers.js";

// Create event
export async function createEvent(uid, data) {
  const eventId = genId("evt");
  const eventRef = ref(db, `events/${eventId}`);
  const event = {
    eventId,
    title: data.title,
    description: data.description || "",
    date: data.date,
    time: data.time || "",
    location: data.location || "",
    maxParticipants: parseInt(data.maxParticipants) || 0,
    teamId: data.teamId || "",
    createdBy: uid,
    createdAt: Date.now()
  };
  await set(eventRef, event);
  // Auto-join creator
  await set(ref(db, `eventParticipants/${eventId}/${uid}`), { uid, joinedAt: Date.now() });
  return eventId;
}

// Get all events
export async function getAllEvents() {
  const snap = await get(ref(db, "events"));
  if (!snap.exists()) return [];
  return Object.values(snap.val()).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get event by id
export async function getEvent(eventId) {
  const snap = await get(ref(db, `events/${eventId}`));
  return snap.exists() ? snap.val() : null;
}

// Update event
export async function updateEvent(eventId, data) {
  await update(ref(db, `events/${eventId}`), data);
}

// Delete event
export async function deleteEvent(eventId) {
  await remove(ref(db, `events/${eventId}`));
  await remove(ref(db, `eventParticipants/${eventId}`));
}

// Join event
export async function joinEvent(eventId, uid) {
  const partRef = ref(db, `eventParticipants/${eventId}/${uid}`);
  const snap = await get(partRef);
  if (snap.exists()) throw new Error("You have already joined this event.");

  // Check max participants
  const event = await getEvent(eventId);
  if (event.maxParticipants > 0) {
    const allParts = await getEventParticipants(eventId);
    if (allParts.length >= event.maxParticipants) {
      throw new Error("This event has reached max participants.");
    }
  }
  await set(partRef, { uid, joinedAt: Date.now() });
}

// Leave event
export async function leaveEvent(eventId, uid) {
  await remove(ref(db, `eventParticipants/${eventId}/${uid}`));
}

// Get participants
export async function getEventParticipants(eventId) {
  const snap = await get(ref(db, `eventParticipants/${eventId}`));
  if (!snap.exists()) return [];
  return Object.values(snap.val());
}

// Check participation
export async function isParticipant(eventId, uid) {
  const snap = await get(ref(db, `eventParticipants/${eventId}/${uid}`));
  return snap.exists();
}

// Get events a user joined
export async function getUserEvents(uid) {
  const allSnap = await get(ref(db, "events"));
  if (!allSnap.exists()) return [];
  const events = Object.values(allSnap.val());
  const results = [];
  for (const ev of events) {
    const snap = await get(ref(db, `eventParticipants/${ev.eventId}/${uid}`));
    if (snap.exists()) results.push(ev);
  }
  return results.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get events created by user
export async function getEventsCreatedBy(uid) {
  const snap = await get(ref(db, "events"));
  if (!snap.exists()) return [];
  return Object.values(snap.val()).filter(e => e.createdBy === uid);
}

// Get upcoming events
export async function getUpcomingEvents(limit = 5) {
  const all = await getAllEvents();
  const now = new Date().toISOString().split("T")[0];
  return all.filter(e => e.date >= now).slice(0, limit);
}
