import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1126] text-white">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 flex flex-col md:flex-row items-start justify-between gap-10">
        
        {/* Branding + Tagline */}
        <div>
          <h1 className="text-2xl font-bold">Class2Career</h1>
          <p className="mt-4 text-sm text-white/70 max-w-sm">
            Turning your classroom dreams into career wins. One application at a time.
          </p>

          {/* Social CTA */}
          <div className="mt-6">
            <p className="text-sm font-medium text-white mb-3">Follow our journey</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/anksindia" className="text-white/70 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="https://x.com/AnkitSdotcom/" className="text-white/70 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ankit-suyal-b37789344" className="text-white/70 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Line */}
     <p className="py-4 text-center text-xs text-white/50 border-t border-white/10">
  © {new Date().getFullYear()} Class2Career. All rights reserved.
</p>

    </footer>
  );
};

export default Footer;
