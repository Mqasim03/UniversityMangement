import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import DataCard from "../components/DataCard";
import Table from "../components/Table";

// Real data for dashboard
const stats = [
  { title: "Total Students", value: "1,856", change: "+12%", icon: "👨‍🎓", trend: "up" },
  { title: "Active Courses", value: "48", change: "+5%", icon: "📚", trend: "up" },
  { title: "Faculty Members", value: "124", change: "+3%", icon: "👩‍🏫", trend: "up" },
  { title: "Revenue", value: "$326,589", change: "+18%", icon: "💰", trend: "up" }
];

const recentStudents = [
  { id: 1, name: "Alex Johnson", email: "alex@uni.edu", department: "Computer Science", enrollmentDate: "2023-09-15" },
  { id: 2, name: "Maria Garcia", email: "maria@uni.edu", department: "Engineering", enrollmentDate: "2023-09-10" },
  { id: 3, name: "James Wilson", email: "james@uni.edu", department: "Business", enrollmentDate: "2023-09-05" },
  { id: 4, name: "Sarah Lee", email: "sarah@uni.edu", department: "Arts", enrollmentDate: "2023-08-28" }
];

const studentColumns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "department", header: "Department" },
  { key: "enrollmentDate", header: "Enrollment Date" }
];

export default function Dashboard() {
  const enrollmentChartRef = useRef(null);
  const departmentChartRef = useRef(null);
  const enrollmentChartInstance = useRef(null);
  const departmentChartInstance = useRef(null);

  useEffect(() => {
    // Initialize or update charts
    if (enrollmentChartRef.current) {
      // Destroy previous chart instance if it exists
      if (enrollmentChartInstance.current) {
        enrollmentChartInstance.current.destroy();
      }

      const enrollmentCtx = enrollmentChartRef.current.getContext("2d");
      enrollmentChartInstance.current = new Chart(enrollmentCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          datasets: [{
            label: "New Students",
            data: [120, 190, 170, 220, 180, 160, 210, 195, 230],
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    if (departmentChartRef.current) {
      // Destroy previous chart instance if it exists
      if (departmentChartInstance.current) {
        departmentChartInstance.current.destroy();
      }

      const departmentCtx = departmentChartRef.current.getContext("2d");
      departmentChartInstance.current = new Chart(departmentCtx, {
        type: "doughnut",
        data: {
          labels: ["Computer Science", "Engineering", "Business", "Arts", "Science"],
          datasets: [{
            data: [650, 420, 380, 220, 186],
            backgroundColor: [
              "#4F46E5",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6"
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (enrollmentChartInstance.current) {
        enrollmentChartInstance.current.destroy();
        enrollmentChartInstance.current = null;
      }
      if (departmentChartInstance.current) {
        departmentChartInstance.current.destroy();
        departmentChartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <DataCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Student Enrollment Trend</h2>
          <canvas ref={enrollmentChartRef} height="300"></canvas>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
          <canvas ref={departmentChartRef} height="300"></canvas>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recently Enrolled Students</h2>
        <Table data={recentStudents} columns={studentColumns} />
      </div>
    </div>
  );
}