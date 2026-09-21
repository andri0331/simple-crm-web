import { NavLink } from "react-router";
import { LayoutDashboard, Users, LogOut, Package } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Sidebar.module.css";

// Temporary stand-in for AuthContext's user, replaced in Part 9
// const DUMMY_USER = {
//   name: "Daniel Goh",
//   email: "daniel@simplesystems.io",
//   role: "admin",
// };

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Returns the appropriate class name for a navigation link based on its active state.
 */
function navLinkClass({ isActive }) {
  return styles.navItem + (isActive ? " " + styles.navItemActive : "");
}

function Sidebar() {
  // const user = DUMMY_USER;
  const { user, logout } = useContext(AuthContext);

  if (import.meta.env.DEV) {
    console.log("API_BASE:", import.meta.env.VITE_API_BASE_URL);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}></div>
        <span className={styles.logoText}>Simple CRM</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Workspace</div>
        <NavLink to="/app" end className={navLinkClass}>
          <LayoutDashboard size={17} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/app/customers" className={navLinkClass}>
          <Users size={17} />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/app/products" className={navLinkClass}>
          <Package size={17} />
          <span>Products</span>
        </NavLink>
        {/* Do not use regular anchor tags for internal navigation */}
        {/* <a href="/app/customers" className={styles.navItem}>
          <Users size={17} />
          <span>Customers a</span>
        </a> */}
      </nav>

      <div className={styles.foot}>
        <div className={styles.footAvatar}>{initials(user.name)}</div>
        <div className={styles.footWho}>
          <div className={styles.footName}>{user.name}</div>
          <span
            className={`${styles.roleBadge} ${user.role === "admin" ? styles.roleBadgeAdmin : styles.roleBadgeUser}`}
          >
            {user.role}
          </span>
          <span
            className={`${styles.roleBadge} ${
              import.meta.env.DEV ? styles.roleBadgeUser : styles.roleBadgeAdmin
            }`}
          >
            {import.meta.env.MODE}
          </span>
        </div>
        <button className={styles.signOutBtn} onClick={logout} title="Sign out">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
