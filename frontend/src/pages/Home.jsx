import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Code,
  PenTool,
  BarChart2,
  MonitorSmartphone,
  ShieldCheck,
  Cloud,
  Gamepad2,
  FileText,
  Megaphone,
  Bitcoin,
  Bug
} from "lucide-react";
import Footer from "../components/Footer";

const categories = [
  { icon: <Code size={36} className="text-indigo-500" />, title: "Web Development", desc: "Frontend & backend dev roles" },
  { icon: <MonitorSmartphone size={36} className="text-green-500" />, title: "App Development", desc: "iOS & Android app roles" },
  { icon: <BarChart2 size={36} className="text-yellow-500" />, title: "Data Science", desc: "ML, AI & analytics jobs" },
  { icon: <PenTool size={36} className="text-pink-500" />, title: "UI/UX Design", desc: "Craft delightful user experiences" },
  { icon: <ShieldCheck size={36} className="text-red-500" />, title: "Cybersecurity", desc: "Protect systems and data" },
  { icon: <Cloud size={36} className="text-blue-400" />, title: "DevOps & Cloud", desc: "Infra, CI/CD, & automation" },
  { icon: <Gamepad2 size={36} className="text-purple-500" />, title: "Game Dev", desc: "Create immersive games" },
  { icon: <FileText size={36} className="text-amber-500" />, title: "Content Writing", desc: "Engaging content creation" },
  { icon: <Megaphone size={36} className="text-rose-400" />, title: "Digital Marketing", desc: "SEO, ads & campaigns" },
  { icon: <Bitcoin size={36} className="text-orange-500" />, title: "Blockchain", desc: "Build decentralized apps" },
  { icon: <Bug size={36} className="text-lime-500" />, title: "QA & Testing", desc: "Manual & automated testing" },
];

const collageImages = Array.from({ length: 12 }, (_, i) => `/photo${i + 1}.jpeg`);


const collageQuotes = [
  "Build a professional network",
  "Gain real-world experience early",
  "Shape your career path with clarity",
  "Learn from mentors",
  "Contribute to real-world projects",
  "Work on what matters",
  "Make your resume shine",
  "Grow in a supportive team",
  "Challenge yourself",
  "Get job-ready skills",
  "Boost your confidence",
  "Get hired with ease"
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [visibleImages, setVisibleImages] = useState(collageImages.map((_, i) => i));
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelectorAll(".count").forEach((el) => {
      let end = +el.dataset.end;
      let current = 0;
      let increment = Math.ceil(end / 100);

      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          el.textContent = `${end}+`;
          clearInterval(counter);
        } else {
          el.textContent = `${current}+`;
        }
      }, 20);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const next = [...prev];
        const randomIndex = Math.floor(Math.random() * collageImages.length);
        next[Math.floor(Math.random() * 6)] = randomIndex;
        return [...next];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/jobs?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full">
      {/* Shared Section Wrapper */}
      <div className="w-full bg-[#0B1126] text-white overflow-hidden">
        {/* Search Hero Section */}
        <div className="relative w-full min-h-[70vh] py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_200px,#2c2cfc,transparent)] opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-10 gap-6">
            <h2 className="text-3xl mt-20 sm:text-4xl md:text-5xl font-bold drop-shadow-md">
              Discover Jobs Made for You
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl">
              Find internships, part-time roles, and early career opportunities tailored for students and freshers.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-center w-full max-w-2xl gap-3 sm:gap-0 mt-4"
            >
              <div className="flex items-center border pl-4 gap-2 bg-white border-gray-300 h-[46px] rounded-full w-full shadow-sm">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-full outline-none text-sm text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 w-full sm:w-28 h-11 rounded-full text-sm text-white mt-2 sm:mt-0 sm:ml-3 shadow-lg hover:brightness-110 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Category Section */}
        <div className="relative w-full py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_100px,#2c2cfc,transparent)] opacity-20 pointer-events-none"></div>

          <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-center mb-12 text-white">
            <span className="relative inline-block">
              {/* Gradient underline with shine */}
              <span className="relative inline-block px-4 py-1">
                <span className="relative z-10">Find Your Fit in the Tech World</span>

                {/* Gradient underline */}
                <span className="absolute bottom-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
                  {/* Shine effect inside border */}
                  <span className="absolute left-[-30%] top-0 h-full w-[30%] bg-white/50 blur-sm opacity-80 animate-glow-shine rounded-full"></span>
                </span>
              </span>
            </span>
          </h2>






          <div className="relative z-10 w-[200%] animate-scroll flex gap-6 px-6">
            {[...categories, ...categories].map((cat, i) => (
              <div
                key={i}
                className="min-w-[240px] max-w-[240px] p-6 rounded-2xl bg-black/5 backdrop-blur-sm text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/10 hover:shadow-[0_6px_30px_rgba(0,0,0,0.4)] hover:scale-[1.03] transition-all duration-300 ease-in-out flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-md shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-400">{cat.desc}</p>
              </div>

            ))}
          </div>
        </div>
      </div>
      

       {/* Student Workers Section with Count + Image Collage */}
      <div className="w-full py-20 bg-[#0B1126] text-white px-4 sm:px-6 md:px-10">
        <h2 className="text-3xl text-center mb-10 sm:text-4xl font-bold">Why Students Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Countups 2x2 Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[{ label: "Students Placed", end: 400 }, { label: "Live Openings", end: 150 }, { label: "Partner Companies", end: 90 }, { label: "Years of Impact", end: 5 }].map(({ label, end }, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-indigo-500 count" data-end={end}>0</p>
                <p className="text-sm text-gray-300 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Right: Flipping Image Collage */}
          <div className="grid grid-cols-3 gap-4">
            {visibleImages.slice(0, 6).map((index, i) => (
              <div key={i} className="relative group overflow-hidden rounded-xl h-32 sm:h-40 shadow-md">
                <img
                  src={collageImages[index]}
                  alt={`img-${index}`}
                  className="absolute inset-0 w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <p className="text-sm sm:text-base text-white font-medium text-center px-2">
                    {collageQuotes[index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     {/* Subscribe Section */}
      <div className="w-full py-16 bg-[#0B1126] text-white px-4 sm:px-6 md:px-10">
        <div className="text-center mb-6">
          <h1 className="md:text-4xl text-2xl font-semibold mb-2">Stay Updated on Your Job Hunt</h1>
          <p className="md:text-lg text-gray-400 max-w-xl mx-auto">
            Get alerts on new job opportunities, tips, and industry insights delivered to your inbox
          </p>
        </div>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <input
            className="bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-gray-400 px-4 py-3 w-full rounded-md sm:rounded-r-none focus:outline-none"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-md sm:rounded-l-none text-white font-medium hover:brightness-110 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
