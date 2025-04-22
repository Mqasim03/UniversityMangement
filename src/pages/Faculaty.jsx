import { useState, useEffect } from "react";
import { facultyColumns } from "../data/faculty";
import Table from "../components/Table";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Faculty() {
  const navigate = useNavigate();
  const [facultyData, setFacultyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load faculty from localStorage on component mount
  useEffect(() => {
    const savedFaculty = JSON.parse(localStorage.getItem('faculty')) || [];
    setFacultyData(savedFaculty);
  }, []);

  const filteredFaculty = facultyData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const updatedFaculty = facultyData.filter(member => member.id !== id);
    setFacultyData(updatedFaculty);
    localStorage.setItem('faculty', JSON.stringify(updatedFaculty));
  };

  const columns = [
    ...facultyColumns,
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/edit-faculty/${row.id}`)} 
            className="text-blue-500 hover:text-blue-700"
          >
            <FiEdit />
          </button>
          <button 
            onClick={() => handleDelete(row.id)} 
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <button 
          onClick={() => navigate('/add-faculty')}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center gap-2"
        >
          <FiPlus /> Add Faculty
        </button>
      </div>

      <div className="mb-6 flex items-center bg-white p-3 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search faculty..."
          className="w-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Table 
        data={filteredFaculty} 
        columns={columns} 
        emptyMessage="No faculty members found. Add a new faculty member to get started."
      />
    </div>
  );
}