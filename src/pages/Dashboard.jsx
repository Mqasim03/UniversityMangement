import { stats } from "../data/stats";
import DataCard from "../components/DataCard";
import ChartComponent from "../components/ChartComponent";

const enrollmentData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Students",
      data: [65, 59, 80, 81, 56, 72],
      backgroundColor: "#4F46E5",
    }
  ]
};

const departmentDistribution = {
  labels: ["Computer Science", "Engineering", "Business", "Arts", "Science"],
  datasets: [
    {
      label: "Students",
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        "#4F46E5",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6"
      ]
    }
  ]
};

export default function Dashboard() {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Student Enrollment</h2>
          <ChartComponent 
            type="bar" 
            data={enrollmentData} 
            options={{ responsive: true }}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Department Distribution</h2>
          <ChartComponent 
            type="doughnut" 
            data={departmentDistribution} 
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
}