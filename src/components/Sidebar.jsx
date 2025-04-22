import { NavLink } from "react-router-dom";
import { 
  FiHome, FiUsers, FiBook, FiUser, FiSettings, 
  FiUserPlus, FiChevronLeft, FiChevronRight 
} from "react-icons/fi";

export default function Sidebar({ isOpen, toggle }) {
  const navItems = [
    { path: "/", name: "Dashboard", icon: <FiHome /> },
    { path: "/students", name: "Students", icon: <FiUsers /> },
    { path: "/add-student", name: "Add Student", icon: <FiUserPlus /> },
    { path: "/courses", name: "Courses", icon: <FiBook /> },
    { path: "/faculty", name: "Faculty", icon: <FiUser /> },
    { path: "/add-faculty", name: "Add Faculty", icon: <FiUserPlus /> },
    { path: "/settings", name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className={`h-screen bg-white shadow-sm fixed z-10 transition-all duration-300 ${isOpen ? "w-52" : "w-18"}`}>
      {/* Sidebar Header */}
      <div className="p-4 flex justify-between items-center border-b">
        {isOpen ? (
          <h1 className="text-primary font-bold text-2xl">UniManage</h1>
        ) : (
          <h1 className="text-primary font-bold text-xl">UM</h1>
        )}
        <button 
          onClick={toggle}
          className="text-gray-500 hover:text-gray-700"
        >
          {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center p-4 mx-2 rounded-lg transition-colors group
              ${isActive ? "bg-gray-400 text-white" : "hover:bg-gray-100"}`
            }
            title={!isOpen ? item.name : ""} // Show tooltip when collapsed
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}