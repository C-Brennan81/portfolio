import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const glitchKeyframes = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.6, 1],
      scale: [1, 1.02, 0.98, 1],
      rotate: [0, 0.5, -0.5, 0],
      transition: { duration: 1.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // ✨ Cursor effect
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);
    const move = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
    };
  }, []);

  // 🖼️ Travel images
  const travelImages = Array.from({ length: 19 }, (_, i) => `/images/Travel-${i + 1}.jpg`);

      return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#1e0f0a] via-[#2c1a12] to-[#0d0503] text-amber-100 font-serif">
          <Particles
            className="absolute inset-0 z-0"
            init={particlesInit}
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              particles: {
                number: { value: 40 },
                color: { value: "#ffaa33" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 2 },
                move: { enable: true, speed: 0.5, direction: "none", outMode: "out" }
              },
              interactivity: { events: { resize: true } },
              detectRetina: true
            }}
          />
    
          <header className="relative z-10 bg-[#1a0c07] shadow sticky top-0 z-50 border-b border-amber-600">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
              <motion.div
                className="flex items-center gap-3"
                variants={glitchKeyframes}
                initial="hidden"
                animate="visible"
              >
                <img src="/images/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                <h1 className="text-3xl font-serif text-amber-300">Craig Brennan</h1>
              </motion.div>
              <nav>
                <ul className="flex gap-6 text-lg font-medium">
                  <li><a href="#about" className="hover:text-amber-500 transition">About</a></li>
                  <li><a href="#projects" className="hover:text-amber-500 transition">Projects</a></li>
                  <li><a href="#contact" className="hover:text-amber-500 transition">Contact</a></li>
                </ul>
              </nav>
            </div>
          </header>
    
          <motion.section className="text-center py-24 relative z-10" variants={fadeIn} initial="hidden" animate="show">
            <motion.h2 className="text-5xl font-serif mb-4" whileHover={{ scale: 1.05 }}>You hit a brick wall enough, eventually it will fall.</motion.h2>
            <motion.p className="text-xl text-amber-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Weaving stories through fire, ink, and syntax.</motion.p>
          </motion.section>
    
          <motion.section id="about" className="py-20 border-t border-amber-600 relative z-10" variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl font-serif mb-6">About Me</h3>
              <p className="text-lg text-amber-200 leading-relaxed">A software developer turned author, I breathe life into ideas through narrative code. I specialize in crafting immersive, meaningful interfaces with a passion for elegant design and impactful experiences.</p>
            </div>
          </motion.section>
    
          <motion.section id="projects" className="py-20 bg-[#160c06] border-t border-amber-600 relative z-10" variants={slideRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="max-w-5xl mx-auto">
              <h3 className="text-4xl font-serif text-center mb-10">Things i've cooked up</h3>
              <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
                <motion.div className="bg-[#22110a] p-6 rounded-xl border border-amber-500 shadow-md hover:shadow-lg transition" whileHover={{ scale: 1.03 }}>
                  <h4 className="text-2xl font-serif mb-2 text-amber-400">Project One</h4>
                  <p className="text-amber-200 mb-2">Placeholder until I upload a project.</p>
                  <a href="#" className="text-amber-500 hover:underline">View Project</a>
                </motion.div>
                <motion.div className="bg-[#22110a] p-6 rounded-xl border border-amber-500 shadow-md hover:shadow-lg transition" whileHover={{ scale: 1.03 }}>
                  <h4 className="text-2xl font-serif mb-2 text-amber-400">Project Two</h4>
                  <p className="text-amber-200 mb-2">Placeholder until I Upload a project.</p>
                  <a href="#" className="text-amber-500 hover:underline">View Project</a>
                </motion.div>
              </div>
            </div>
          </motion.section>
    
          <motion.section id="writing" className="py-24 border-t border-amber-600 bg-gradient-to-br from-[#1e0d08] via-[#2a120d] to-[#180b06] relative z-10 overflow-hidden" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,153,51,0.08)_0%,transparent_70%)] animate-fade opacity-10"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h3 className="text-5xl font-serif mb-6 tracking-wider text-amber-300 animate-fade-in">Current Work in Progress</h3>
              <p className="text-xl text-amber-300 italic mb-6">Dark Fantasy Heist Novel – Title Pending</p>
              <p className="text-amber-200 text-lg leading-relaxed max-w-3xl mx-auto">
                <span className="block mb-4 animate-slide-up">The rules are simple: trust no one, stay ahead, and don’t get caught.</span>
                <span className="block mb-4 animate-slide-up delay-100">When everything falls apart, Veld and what's left of his crew are forced to navigate a world that doesn’t offer second chances.</span>
                <span className="block mb-4 animate-slide-up delay-200">Survival means stealing what you need, outthinking everyone else, and staying one step ahead of the next knife in the dark.</span>
                <span className="block mb-4 animate-slide-up delay-300">But the deeper they go, the higher the stakes climb—and some things you can’t outrun.</span>
                <span className="block mb-4 animate-slide-up delay-400">The blood is beginning to rise, and everyone’s at risk of drowning.</span>
                <span className="block mb-4 animate-slide-up delay-500">To save themselves, they’ll have to do what they do best—take what isn’t theirs, no matter who it belongs to.</span>
                <span className="block animate-slide-up delay-600">Even if it means stealing from the crown. There's no nobility in survival. Only what's necessary.</span>
              </p>
            </div>
          </motion.section>
    
          <motion.section id="techstack" className="py-24 border-t border-amber-600 bg-gradient-to-br from-[#1c0a06] via-[#2e130b] to-[#1b0d07] relative z-10 overflow-hidden" variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none animate-pulse bg-[radial-gradient(circle,rgba(255,153,51,0.2)_0%,transparent_70%)]"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h3 className="text-5xl font-serif mb-8 tracking-wide text-amber-300 animate-fade-in">My Tech Stack</h3>
              <div className="flex flex-wrap justify-center gap-4 text-amber-200 text-lg">
                {["React","Tailwind CSS","C++","JavaScript","Framer Motion","Vite","Node.js","Git","Creative Writing","Worldbuilding"].map((item, i) => (
                  <motion.span
                    key={i}
                    className="bg-[#2e170d] px-5 py-2 rounded-full border border-amber-500 hover:bg-amber-700 hover:text-white transition-all duration-300 shadow-md"
                    whileHover={{ scale: 1.1, rotate: [-2, 0, 2, 0] }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.section>
    
           {/* Photography Section */}
          <motion.section id="photography" className="py-24 border-t border-amber-600 bg-[#150b07] relative z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="max-w-5xl mx-auto text-center px-6">
              <h3 className="text-4xl font-serif mb-4 text-amber-300">Wanderer’s Lens</h3>
              <p className="mb-8 text-amber-200">A glimpse into the places I’ve wandered. Here’s a peek through my lens.</p>
              <div className="overflow-hidden w-full relative group">
                <motion.div
                  className="flex gap-6 w-max animate-scroll-photos group-hover:[animation-play-state:paused]"
                  initial={{ x: 0 }}
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 90, ease: "linear", repeat: Infinity }}
                >
                  {travelImages.concat(travelImages).map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Travel ${idx + 1}`}
                      className="rounded-xl shadow-lg w-64 h-40 object-cover flex-shrink-0 hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>
    
          {/* Contact Section */}
          <motion.section id="contact" className="py-24 border-t border-amber-600 bg-gradient-to-br from-[#140a05] via-[#1b0d07] to-[#0e0503] relative z-10 overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,204,102,0.05)_0%,transparent_80%)] animate-pulse opacity-10"></div>
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h3 className="text-5xl font-serif mb-6 tracking-wider text-amber-300">Get in Touch</h3>
              <p className="text-lg text-amber-200 mb-8">Interested in working together or just want to connect?</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <motion.a
                  href="/cv/Craig_Brennan_CV.pdf"
                  download
                  className="inline-block text-amber-100 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-400 px-8 py-4 rounded-full shadow-lg text-lg tracking-wide font-bold transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                >
                  Download My CV
                </motion.a>
                <motion.a
                  href="mailto:craigbrennan81@gmail.com"
                  className="inline-block text-amber-100 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-400 px-8 py-4 rounded-full shadow-lg text-lg tracking-wide font-bold transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                >
                  Send Me an Email
                </motion.a>
              </div>
            </div>
          </motion.section>
    
          <footer className="bg-[#120705] text-amber-100 text-center py-6 text-sm border-t border-amber-700">
            &copy; 2025 Craig Brennan | Crafted with a crafting tool of some description.
          </footer>
        </div>
      );
};
export default Home;
