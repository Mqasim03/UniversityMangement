import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    semester: "",
    phone: "",
    address: ""
  });

  // Load student data
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const studentToEdit = savedStudents.find(student => student.id === parseInt(id));
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = savedStudents.map(student => 
      student.id === parseInt(id) ? formData : student
    );
    
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    navigate('/students');
  };

  return (
    <div className="p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-800"
      >
        <FiArrowLeft /> Back to Students
      </button>

      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
        {/* Form fields same as AddStudent.jsx */}
        {/* ... */}

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiSave /> Update Student
          </button>
        </div>
      </form>
    </div>
  );
}