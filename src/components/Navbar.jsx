import { FiMenu, FiBell, FiUser } from "react-icons/fi";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        <FiMenu className="text-2xl" />
      </button>
      <div className="flex items-center gap-4">
        <button className="relative">
          <FiBell className="text-xl" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
            <FiUser />
          </div>
          <span className="hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}