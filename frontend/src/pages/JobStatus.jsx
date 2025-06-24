import React from "react";
import { JobData } from "../context/JobContext";
import { BadgeCheck } from "lucide-react";

const JobStatus = () => {
  const { jobs } = JobData();

  const statusJobs = jobs.filter((job) =>
    ["Applied", "Interview", "Offer", "Rejected"].includes(job.status)
  );

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_600px_at_50%_200px,#2c2cfc,#000)] text-white px-4 pt-20 pb-12">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-400">
        Job Status
      </h1>

      {statusJobs.length === 0 ? (
        <p className="text-center text-gray-300">
          You haven't applied to any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {statusJobs.map((job) => (
            <div
              key={job._id}
              className="relative border border-indigo-500 rounded-xl p-4 bg-[#0B1126] shadow-lg"
            >
              {job.status === "Offer" && (
                <BadgeCheck
                  size={20}
                  className="absolute top-3 right-3 text-green-500"
                />
              )}

              <h3 className="text-lg font-semibold text-indigo-400">
                {job.company}
              </h3>
              <p className="text-sm text-gray-400 mt-1">Role: {job.role}</p>
              <p className="text-sm text-gray-400">Status: {job.status}</p>

              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-300 underline block mt-2"
                >
                  View Application
                </a>
              )}

              {job.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Updated on: {" "}
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobStatus;