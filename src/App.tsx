import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import { ArrowDown } from "lucide-react";

function App() {
  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      <Header />

      {/* Main Scroll Container */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {/* Section 1: Hero */}
        <Section id="home" className="bg-black">
          <div className="flex flex-col items-start space-y-8 max-w-4xl">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              AI PRODUCT
              <br />
              MANAGER
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
              Bridging the gap between human needs and artificial intelligence.
              Crafting intuitive experiences for the next generation of
              technology.
            </p>

            <div className="pt-12 animate-bounce">
              <ArrowDown className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </Section>

        {/* Section 2: About */}
        <Section id="about" className="bg-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                About Me
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold leading-tight">
                Strategist. <br />
                Innovator. <br />
                Builder.
              </h3>
            </div>
            <div className="text-lg md:text-xl text-gray-300 font-light space-y-6 leading-relaxed">
              <p>
                With a background in product management and a deep passion for
                AI, I specialize in translating complex technical capabilities
                into meaningful user value.
              </p>
              <p>
                My approach combines data-driven insights with human-centric
                design principles to build products that are not just smart, but
                helpful.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 3: Projects */}
        <Section id="projects" className="bg-black">
          <div className="w-full">
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-12">
              Selected Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group relative border border-white/10 p-8 h-96 hover:bg-white/5 transition-colors duration-300 cursor-pointer flex flex-col justify-end"
                >
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs border border-white/30 px-2 py-1 rounded-full">
                      AI / ML
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">
                    Project Name {item}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Brief description of the project and the role played in its
                    development.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 4: Contact */}
        <Section id="contact" className="bg-zinc-900">
          <div className="flex flex-col items-center text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-400 max-w-xl">
              Always open to discussing new opportunities, AI trends, or just to
              say hello.
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-block border border-white px-12 py-4 text-lg hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest"
            >
              Get in Touch
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default App;
