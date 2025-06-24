import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobData } from "../context/JobContext";

const AddJobForm = () => {
  const { addJob, btnLoading } = JobData();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addJob(jobData);
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_600px_at_50%_200px,#2c2cfc,#000)] flex items-start pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-[#0B1126] p-8 rounded-2xl shadow-xl border border-indigo-600 text-white">
        <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Add a New Job Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-300">Company</label>
            <input
              type="text"
              name="company"
              placeholder="e.g., Microsoft"
              value={jobData.company}
              onChange={handleChange}
              className="w-full border border-indigo-500 bg-transparent rounded-xl px-4 py-2 text-sm outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-300">Role</label>
            <input
              type="text"
              name="role"
              placeholder="e.g., SDE Intern"
              value={jobData.role}
              onChange={handleChange}
              className="w-full border border-indigo-500 bg-transparent rounded-xl px-4 py-2 text-sm outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-300">Status</label>
            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
              className="w-full border border-indigo-500 bg-[#1c1f3a] rounded-xl px-4 py-2 text-sm outline-none text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option className="bg-[#1c1f3a] text-white" value="Applied">Applied</option>
              <option className="bg-[#1c1f3a] text-white" value="Interview">Interview</option>
              <option className="bg-[#1c1f3a] text-white" value="Offer">Offer</option>
              <option className="bg-[#1c1f3a] text-white" value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-300">Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={jobData.appliedDate}
              onChange={handleChange}
              className="w-full border border-indigo-500 bg-transparent rounded-xl px-4 py-2 text-sm outline-none text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-indigo-300">Application Link</label>
            <input
              type="url"
              name="link"
              placeholder="https://careers.microsoft.com"
              value={jobData.link}
              onChange={handleChange}
              className="w-full border border-indigo-500 bg-transparent rounded-xl px-4 py-2 text-sm outline-none text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 rounded-xl hover:brightness-110 transition-all"
          >
            {btnLoading ? "Adding..." : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
