import { useState } from "react";
import { courses, courseColumns } from "../data/courses";
import Table from "../components/Table";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

export default function Courses() {
  const [courseData, setCourseData] = useState(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courseData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setCourseData(courseData.filter(course => course.id !== id));
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCourse = {
      id: currentCourse?.id || Date.now(),
      code: formData.get("code"),
      title: formData.get("title"),
      credits: parseInt(formData.get("credits")),
      department: formData.get("department"),
      instructor: formData.get("instructor"),
      enrolled: currentCourse?.enrolled || 0
    };

    if (currentCourse) {
      setCourseData(courseData.map(c => c.id === currentCourse.id ? newCourse : c));
    } else {
      setCourseData([...courseData, newCourse]);
    }
    setIsModalOpen(false);
  };

  const columns = [
    ...courseColumns,
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEdit(row)} 
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
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button 
          onClick={() => {
            setCurrentCourse(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center gap-2"
        >
          <FiPlus /> Add Course
        </button>
      </div>

      <div className="mb-6 flex items-center bg-white p-3 rounded-lg shadow-sm">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Table data={filteredCourses} columns={columns} />

      {/* Course Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentCourse ? "Edit Course" : "Add New Course"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Course Code
                  </label>
                  <input
                    name="code"
                    type="text"
                    defaultValue={currentCourse?.code || ""}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Credits
                  </label>
                  <input
                    name="credits"
                    type="number"
                    defaultValue={currentCourse?.credits || ""}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Course Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={currentCourse?.title || ""}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    defaultValue={currentCourse?.department || ""}
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
                    Instructor
                  </label>
                  <input
                    name="instructor"
                    type="text"
                    defaultValue={currentCourse?.instructor || ""}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2  rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {currentCourse ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}