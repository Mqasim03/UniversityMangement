import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";

export default function AddFaculty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    office: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing faculty from localStorage
    const existingFaculty = JSON.parse(localStorage.getItem('faculty')) || [];
    
    // Create new faculty with ID
    const newFaculty = {
      id: Date.now(),
      ...formData
    };
    
    // Save to localStorage
    localStorage.setItem('faculty', JSON.stringify([...existingFaculty, newFaculty]));
    
    // Redirect to faculty page
    navigate('/faculty');
  };

  return (
    <div className="p-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary mb-6"
      >
        <FiArrowLeft /> Back to Faculty
      </button>

      <h1 className="text-2xl font-bold mb-6">Add New Faculty Member</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department*
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Position*
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select Position</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Adjunct">Adjunct</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Office Location*
          </label>
          <input
            type="text"
            name="office"
            value={formData.office}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiSave /> Save Faculty Member
        </button>
      </form>
    </div>
  );
}