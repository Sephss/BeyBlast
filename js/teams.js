import { db } from "./firebase.js";
import {
  ref, push, set, get, update, remove, query, orderByChild
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { genId } from "./helpers.js";

// Create team
export async function createTeam(uid, data) {
  const teamId = genId("team");
  const teamRef = ref(db, `teams/${teamId}`);
  const team = {
    teamId,
    name: data.name,
    description: data.description || "",
    image: data.image || "",
    createdBy: uid,
    createdAt: Date.now()
  };
  await set(teamRef, team);
  // Add creator as member
  await set(ref(db, `teamMembers/${teamId}/${uid}`), { uid, joinedAt: Date.now(), role: "creator" });
  return teamId;
}

// Get all teams
export async function getAllTeams() {
  const snap = await get(ref(db, "teams"));
  if (!snap.exists()) return [];
  return Object.values(snap.val());
}

// Get team by id
export async function getTeam(teamId) {
  const snap = await get(ref(db, `teams/${teamId}`));
  return snap.exists() ? snap.val() : null;
}

// Update team
export async function updateTeam(teamId, data) {
  await update(ref(db, `teams/${teamId}`), data);
}

// Delete team
export async function deleteTeam(teamId) {
  await remove(ref(db, `teams/${teamId}`));
  await remove(ref(db, `teamMembers/${teamId}`));
}

// Join team
export async function joinTeam(teamId, uid) {
  const memberRef = ref(db, `teamMembers/${teamId}/${uid}`);
  const snap = await get(memberRef);
  if (snap.exists()) throw new Error("You have already joined this team.");
  await set(memberRef, { uid, joinedAt: Date.now(), role: "member" });
}

// Leave team
export async function leaveTeam(teamId, uid) {
  await remove(ref(db, `teamMembers/${teamId}/${uid}`));
}

// Get team members
export async function getTeamMembers(teamId) {
  const snap = await get(ref(db, `teamMembers/${teamId}`));
  if (!snap.exists()) return [];
  return Object.values(snap.val());
}

// Check membership
export async function isMember(teamId, uid) {
  const snap = await get(ref(db, `teamMembers/${teamId}/${uid}`));
  return snap.exists();
}

// Get teams a user has joined
export async function getUserTeams(uid) {
  const allTeamsSnap = await get(ref(db, "teams"));
  if (!allTeamsSnap.exists()) return [];
  const teams = Object.values(allTeamsSnap.val());
  const results = [];
  for (const team of teams) {
    const snap = await get(ref(db, `teamMembers/${team.teamId}/${uid}`));
    if (snap.exists()) results.push(team);
  }
  return results;
}

// Get teams created by user
export async function getTeamsCreatedBy(uid) {
  const snap = await get(ref(db, "teams"));
  if (!snap.exists()) return [];
  return Object.values(snap.val()).filter(t => t.createdBy === uid);
}

// Get events for a team
export async function getTeamEvents(teamId) {
  const snap = await get(ref(db, "events"));
  if (!snap.exists()) return [];
  return Object.values(snap.val()).filter(e => e.teamId === teamId);
}
