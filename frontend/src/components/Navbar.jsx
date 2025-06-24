import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaClipboardList } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
        ${shrink ? "w-[55vw] py-1 bg-black/20 backdrop-blur-lg border border-black/20 shadow-md" : "w-[80vw] py-4 bg-transparent"}
        px-6 md:px-10 rounded-full`}
    >
      <div className="flex justify-between items-center">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
  <img
    src="/Class2Career.png"
    alt="Class2Career"
    className="h-8 w-auto object-contain"
  />
  {!shrink && (
    <span className="hidden sm:inline-block text-white text-xl font-bold">
      Class2Career
    </span>
  )}
</Link>


        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "All Jobs", path: "/jobs" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition hover:text-white/70 ${
                  location.pathname === item.path
                    ? "font-bold underline underline-offset-4"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Job Status Button */}
        <Link
          to="/job-status"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all"
        >
          <FaClipboardList size={16} />
          {!shrink && <span className="hidden sm:inline">Job Status</span>}
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="md:hidden text-white active:scale-90 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full mt-4 left-0 w-full bg-white/10 backdrop-blur-md rounded-xl p-6 md:hidden">
          <ul className="flex flex-col gap-4 text-white">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/jobs" onClick={() => setMenuOpen(false)}>All Jobs</Link></li>
            <li>
              <Link to="/job-status" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <FaClipboardList size={16} />
                <span>Job Status</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
