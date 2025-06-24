import React, { useState, useEffect } from "react";
import { Plus, Search, Trash } from "lucide-react";
import { JobData } from "../context/JobContext.jsx";
import { availableRoles } from "../constants/jobRole.js";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Jobs = () => {
  const { jobs, updateJobStatus, deleteJob } = JobData();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  useEffect(() => {
    const newSearch = searchParams.get("search") || "";
    setSearchTerm(newSearch);
  }, [searchParams]);

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleAppliedJob = (id) => {
    const job = jobs.find((j) => j._id === id);
    const currentStatus = job?.status;

    if (!job) return;

    if (["Applied", "Interview", "Offer"].includes(currentStatus)) {
      toast.error(`You can't apply for a job with status ${currentStatus}`);
      return;
    }

    if (confirm("Are you sure you want to apply for this job?")) {
      updateJobStatus(id, "Applied");
      setAppliedJobIds((prev) => [...prev, id]);
    }
  };

  const handleDeleteJob = (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
      toast.success("Job deleted successfully.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const jobRoleLower = job.role?.toLowerCase() || "";
    const matchesSearch = jobRoleLower.includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRoles.length === 0 ||
      selectedRoles.map((r) => r.toLowerCase()).includes(jobRoleLower);

    return matchesSearch && matchesRole;
  });

  const rolesToShow = showAllRoles ? availableRoles : availableRoles.slice(0, 3);

  const statusCount = jobs.reduce((acc, job) => {
    const status = job.status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full min-h-screen bg-[#0B1126] text-white p-6 md:p-10">
      <h1 className="text-2xl mt-20 font-bold mb-8 text-center text-white drop-shadow">
        Explore Opportunities
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
          <div
            key={status}
            className={`p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 text-white shadow transition`}
          >
            <p className="text-sm font-medium text-gray-300">{status}</p>
            <p className="text-xl font-bold text-indigo-400">{statusCount[status] || 0}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center border border-white/10 bg-white/5 backdrop-blur px-4 gap-2 rounded-full w-full md:max-w-md">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full bg-transparent h-11 outline-none text-sm text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 px-4 py-2 rounded-full text-sm text-white hover:brightness-110 transition"
          >
            Search
          </button>
        </div>

        <Link
          to="/add-job"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 rounded-full text-sm text-white flex items-center justify-center gap-2 hover:brightness-110 transition"
        >
          <Plus size={18} /> Add Job
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          <h2 className="font-semibold text-white mb-4">Filter by Role</h2>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            {rolesToShow.map((role) => (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="accent-indigo-500"
                />
                {role}
              </label>
            ))}
            {availableRoles.length > 3 && (
              <button
                onClick={() => setShowAllRoles(!showAllRoles)}
                className="text-indigo-400 text-xs mt-2 hover:underline"
              >
                {showAllRoles ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <h2 className="text-white text-lg font-semibold mb-4">
            Results ({filteredJobs.length})
          </h2>

          {filteredJobs.length === 0 ? (
            <p className="text-gray-400">No jobs found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const isApplied =
                  job.status === "Applied" || appliedJobIds.includes(job._id);
                return (
                  <div
                    key={job._id}
                    onClick={() => handleAppliedJob(job._id)}
                    className="relative p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-white shadow hover:shadow-md transition group cursor-pointer"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(job._id);
                      }}
                      className="absolute -top-3 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash size={18} />
                    </button>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-indigo-400">
                        {job.company}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${
                          job.status === "Applied"
                            ? "text-yellow-300 border-yellow-400 bg-yellow-500/10"
                            : job.status === "Interview"
                            ? "text-blue-300 border-blue-400 bg-blue-500/10"
                            : job.status === "Offer"
                            ? "text-green-300 border-green-400 bg-green-500/10"
                            : "text-red-300 border-red-400 bg-red-500/10"
                        }`}
                      >
                        {isApplied ? "Applied" : job.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mt-2">Role: {job.role}</p>

                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-300 underline mt-2 block"
                      >
                        View Application
                      </a>
                    )}

                    {job.createdAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Updated: {new Date(job.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;