import { logout, getCurrentUser } from "./auth.js";
import { getUserProfile } from "./profile.js";
import { avatarFallback } from "./ui.js";

export async function renderNav(activePage = "") {
  const nav = document.getElementById("main-nav");
  if (!nav) return;

  const user = getCurrentUser();
  if (!user) return;
  let photoURL = avatarFallback("?");
  if (user) {
    const profile = await getUserProfile(user.uid).catch(() => null);
    photoURL =
      profile && profile.photo
        ? profile.photo
        : user.photoURL || avatarFallback(profile?.name || "?");
  }

  nav.innerHTML = `
    <a class="nav__brand" href="index.html">BEY<span>BLAST</span></a>
    <button class="nav__hamburger" id="nav-ham" aria-label="Menu">☰</button>
    <ul class="nav__links" id="nav-links">
      <li><a class="nav__link${activePage === "dashboard" ? " nav__link--active" : ""}" data-page="dashboard" href="index.html">⬡ Dashboard</a></li>
      <li><a class="nav__link${activePage === "events" ? " nav__link--active" : ""}" data-page="events" href="events.html">◈ Events</a></li>
      <li><a class="nav__link${activePage === "teams" ? " nav__link--active" : ""}" data-page="teams" href="teams.html">⬢ Teams</a></li>
      <li><a class="nav__link${activePage === "profile" ? " nav__link--active" : ""}" data-page="profile" href="profile.html">◉ Profile</a></li>
      <li><a class="nav__link" href="#" id="nav-logout">✦ Logout</a></li>
      <li><img src="${photoURL}" class="nav__avatar" alt="avatar" onerror="this.src='${avatarFallback("?")}'" /></li>
    </ul>
  `;

  document.getElementById("nav-ham").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("nav__links--open");
  });
  document.getElementById("nav-logout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
