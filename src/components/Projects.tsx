import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Белая классика",
    category: "Минимализм",
    location: "Москва, Рублёвка",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/5f059405-1b40-45f5-a1e3-da245c8c7e93/files/a9cefd0c-24d9-4cc3-9450-bcb4a80288ad.jpg",
  },
  {
    id: 2,
    title: "Чёрный бархат",
    category: "Современный стиль",
    location: "Москва, Хамовники",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/5f059405-1b40-45f5-a1e3-da245c8c7e93/files/dded388c-77cf-44d1-a5f9-7070a278a08f.jpg",
  },
  {
    id: 3,
    title: "Скандинавский лофт",
    category: "Скандинавский стиль",
    location: "Санкт-Петербург",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/5f059405-1b40-45f5-a1e3-da245c8c7e93/files/6ae41063-115f-413b-a312-6bd9222cc2a8.jpg",
  },
  {
    id: 4,
    title: "Зелёный оазис",
    category: "Открытая планировка",
    location: "Москва, Сити",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/5f059405-1b40-45f5-a1e3-da245c8c7e93/files/516f3836-c5c7-4b75-8fb6-2ca5e8c9c508.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Избранные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наши кухни</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}