import { useState, useEffect } from "react";
import { studentColumns } from "../data/students";
import Table from "../components/Table";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load students from localStorage on component mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudentData(savedStudents);
  }, []);

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const updatedStudents = studentData.filter(student => student.id !== id);
    setStudentData(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const columns = [
    ...studentColumns,
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/edit-student/${row.id}`)} 
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
        <h1 className="text-2xl font-bold">Student Management</h1>
        <button 
          onClick={() => navigate('/add-student')}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center gap-2"
        >
          <FiPlus /> Add Student
        </button>
      </div>

      <div className="mb-6 flex items-center bg-white p-3 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Table 
        data={filteredStudents} 
        columns={columns} 
        emptyMessage="No students found. Add a new student to get started."
      />
    </div>
  );
}