import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Sidebar from "./components/Sidebar";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculaty";
import Settings from "./pages/Settings";
import AddStudent from "./pages/AddStudent";
import AddFaculty from "./pages/AddFaculty";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar - fixed width */}
        <Sidebar 
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content - dynamic width */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-54" : "ml-20"}`}>
        <Navbar />
          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/add-faculty" element={<AddFaculty />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}