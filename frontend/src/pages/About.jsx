import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  const images = ["/photo13.jpeg", "/photo14.jpeg", "/photo15.jpeg"];
  const [current, setCurrent] = useState(0);

  // Auto image slider every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate("/jobs");
  };

  return (
    <div className="w-full bg-[#0B1126] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 sm:px-10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_center,#2c2cfc,transparent)] opacity-20 pointer-events-none" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow">
          About Class2Career
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Empowering students to discover their true potential and step into the
          careers they dream of — with real skills, real projects, and real
          opportunities.
        </p>
      </section>

      {/* Carousel Section */}
      <section className="py-20 px-6 sm:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden shadow-xl transition-all duration-700">
            <img
              src={images[current]}
              alt={`Curious minds ${current + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-blue-500 inline-block text-transparent bg-clip-text">
              Built for Curious Minds
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're a designer, developer, marketer, or creator —{" "}
              <span className="text-indigo-400 font-medium">Class2Career</span> is your
              launchpad. Dive into real-world projects, learn from mentors, and
              shape a career fueled by curiosity and passion.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 sm:px-10">
        <h2 className="text-3xl font-semibold text-center mb-12">
          🔍 How Class2Career Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Create Your Profile",
              desc: "Sign up, highlight your skills, and showcase your passion.",
              icon: "https://img.icons8.com/color/96/resume.png",
            },
            {
              title: "Find Opportunities",
              desc: "Explore internships, freelance roles, and starter jobs.",
              icon: "https://img.icons8.com/color/96/job.png",
            },
            {
              title: "Get Hired",
              desc: "Apply, interview, and grow through real-world experience.",
              icon: "https://img.icons8.com/color/96/checked--v1.png",
            },
          ].map(({ title, desc, icon }, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <img src={icon} alt={title} className="mx-auto mb-4 w-16 h-16" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Join Thousands of Ambitious Students
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Take your first step towards a successful career. Sign up now and
          explore personalized opportunities tailored just for you.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-full text-white font-medium hover:brightness-110 transition-all"
        >
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default About;
