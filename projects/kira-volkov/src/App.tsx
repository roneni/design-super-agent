interface Project {
  name: string;
  tag: string;
  desc: string;
}

const projects: Project[] = [
  {
    name: "vex",
    tag: "[RUST]",
    desc: "A self-hosting compiler for a statically-typed systems language. Bootstraps in under 3 seconds.",
  },
  {
    name: "rawlink",
    tag: "[C]",
    desc: "Minimal linker targeting ELF and Mach-O. No dependencies. 4,200 lines.",
  },
  {
    name: "wasm-forge",
    tag: "[WASM]",
    desc: "WebAssembly code generator with custom IR. Beats Emscripten on binary size by 40%.",
  },
  {
    name: "stackprobe",
    tag: "[RUST]",
    desc: "Runtime stack analysis tool. Catches overflow before it happens. Used in production at three companies.",
  },
  {
    name: "bitgrid",
    tag: "[C]",
    desc: "Spatial data structure for collision detection. O(1) lookup. Header-only library.",
  },
];

function Hero() {
  return (
    <section className="hero">
      <span className="hero__label">Systems Programmer</span>
      <h1 className="hero__name">Kira Volkov</h1>
      <p className="hero__tagline">I build compilers. I break things. I fix them.</p>
    </section>
  );
}

function Work() {
  return (
    <section className="work">
      <hr className="section-divider" />
      <p className="section-label">Work</p>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.name} className="project">
            <div className="project__header">
              <span className="project__name">{project.name}</span>
              <span className="project__tag">{project.tag}</span>
            </div>
            <p className="project__desc">{project.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact">
      <hr className="section-divider" />
      <p className="section-label">Contact</p>
      <a href="mailto:kira@volkov.systems" className="contact__email">
        kira@volkov.systems
      </a>
      <p className="contact__note">No LinkedIn. No Twitter. Just email.</p>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Work />
      <Contact />
    </main>
  );
}
