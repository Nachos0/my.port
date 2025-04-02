"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  User,
  Code,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Space background with stars and shooting stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: 0.5 + Math.random() * 0.5,
        speed: Math.random() * 0.05,
      })
    }

    const shootingStars: { x: number; y: number; length: number; speed: number; opacity: number; active: boolean }[] = []
    for (let i = 0; i < 5; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: (Math.random() * canvas.height) / 2,
        length: 80 + Math.random() * 70,
        speed: 10 + Math.random() * 10,
        opacity: 0,
        active: false,
      })
    }

    let animationFrameId: number
    let lastShootingStarTime = 0

    const animate = (time: number) => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      if (time - lastShootingStarTime > 3000 + Math.random() * 3000) {
        const inactiveStar = shootingStars.find((star) => !star.active)
        if (inactiveStar) {
          inactiveStar.active = true
          inactiveStar.opacity = 1
          inactiveStar.x = Math.random() * canvas.width
          inactiveStar.y = Math.random() * (canvas.height / 3)
        }
        lastShootingStarTime = time
      }

      shootingStars.forEach((star) => {
        if (!star.active) return

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x + star.length, star.y + star.length)
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        star.x += star.speed
        star.y += star.speed
        star.opacity -= 0.01

        if (star.opacity <= 0) {
          star.active = false
          star.x = Math.random() * canvas.width
          star.y = Math.random() * (canvas.height / 3)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const featuredProjects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A responsive portfolio website built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "React", "Tailwind"],
      image: "/placeholder.svg?height=100&width=200&text=Portfolio",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with payment integration.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=100&width=200&text=E-commerce",
    },
    {
      id: 3,
      title: "Weather App",
      description: "Real-time weather forecasting application with location services.",
      tags: ["JavaScript", "API", "CSS"],
      image: "/placeholder.svg?height=100&width=200&text=Weather",
    },
  ]

  const primaryColor = "hsl(240deg 88.05% 74.88%)"
  const activeTabStyle = { backgroundColor: "hsl(240deg 88.05% 74.88%)", color: "white" }

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 bg-black z-0" />

      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-white/10 bg-black/50 backdrop-blur-sm z-10">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl text-white">Mustafa J.</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-white hover:text-white/80 hover:bg-white/10">
            <Link href="https://github.com/Nachos0" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:text-white/80 hover:bg-white/10">
            <Link href="https://www.linkedin.com/in/mustafa-joad-14230820a" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:text-white/80 hover:bg-white/10">
            <Link href="mailto:mustafa.jawad27.10@gmail.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="container h-full max-w-6xl px-4 py-4 sm:py-6 mx-auto">
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="hidden sm:flex justify-center mb-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md bg-black/50 backdrop-blur-sm">
                <TabsTrigger
                  value="about"
                  className="flex items-center gap-2 text-white"
                  style={{ backgroundColor: activeTab === "about" ? primaryColor : "transparent" }}
                >
                  <User className="h-4 w-4" />
                  <span>About</span>
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="flex items-center gap-2 text-white"
                  style={{ backgroundColor: activeTab === "projects" ? primaryColor : "transparent" }}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Projects</span>
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex items-center gap-2 text-white"
                  style={{ backgroundColor: activeTab === "skills" ? primaryColor : "transparent" }}
                >
                  <Code className="h-4 w-4" />
                  <span>Skills</span>
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="flex items-center gap-2 text-white"
                  style={{ backgroundColor: activeTab === "contact" ? primaryColor : "transparent" }}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto pb-20 sm:pb-0">
              {/* About Tab */}
              <TabsContent value="about" className="mt-0 relative z-10">
                <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-4">
                  <div className="space-y-4 text-white">
                    <h1 className="text-3xl font-bold tracking-tighter text-white">
                      Hello, I'm <span style={{ color: primaryColor }}>Mustafa J.</span>
                    </h1>
                    <h2 className="text-xl text-white">Web Developer & Designer</h2>
                    <p className="text-gray-300">
                      I'm a web developer with a passion for creating beautiful, functional websites. I specialize in
                      front-end development and have experience with various technologies including React, Next.js,
                      and Tailwind CSS.
                    </p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button asChild style={{ backgroundColor: primaryColor }}>
                        <Link href="#" onClick={() => setActiveTab("contact")}>
                          Contact Me
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                      >
                        <Link href="/resume.pdf">
                          <FileText className="h-4 w-4 mr-2" />
                          Resume
                        </Link>
                      </Button>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-xl font-semibold mb-6 text-white">Featured Projects</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center">
                        {featuredProjects.map((project) => (
                          <Card
                            key={project.id}
                            className="overflow-hidden bg-black/50 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors w-full max-w-[300px]"
                          >
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full"
                                width={200}
                                height={100}
                              />
                            </div>
                            <CardContent className="p-3">
                              <h4 className="text-base font-medium text-white">{project.title}</h4>
                              <p className="text-xs text-gray-300 line-clamp-2 mt-1">{project.description}</p>
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {project.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-white/10 text-gray-200 text-[10px] px-1.5"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full mt-2 h-7 text-xs text-white/90 hover:text-white hover:bg-white/10"
                                asChild
                              >
                                <Link href="#" onClick={() => setActiveTab("projects")}>
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View Details
                                </Link>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-0 relative z-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                  {[1, 2, 3, 4, 5, 6].map((project) => (
                    <Card
                      key={project}
                      className="overflow-hidden bg-black/50 backdrop-blur-sm border-white/10 w-full max-w-[350px]"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=150&width=300&text=Project+${project}`}
                          alt={`Project ${project}`}
                          className="object-cover w-full"
                          width={300}
                          height={150}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white">Project {project}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2">
                          A brief description of project {project} and the technologies used.
                        </p>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          <Badge variant="secondary" className="bg-white/10 text-gray-200">
                            React
                          </Badge>
                          <Badge variant="secondary" className="bg-white/10 text-gray-200">
                            Next.js
                          </Badge>
                          <Badge variant="secondary" className="bg-white/10 text-gray-200">
                            Tailwind
                          </Badge>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            style={{ backgroundColor: primaryColor }}
                            className="w-full"
                            asChild
                          >
                            <Link href="#">View</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full bg-transparent text-white border-white/20 hover:bg-white/10"
                            asChild
                          >
                            <Link href="#">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="mt-0 p-4 relative z-10 px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">My Expertise</h2>
                    <p className="text-gray-300">
                      These are the technologies and tools I work with regularly.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-white">Frontend Development</h3>
                      <div className="grid gap-4">
                        {[
                          { name: "HTML & CSS", level: 95 },
                          { name: "JavaScript", level: 90 },
                          { name: "React", level: 85 },
                          { name: "Next.js", level: 80 },
                          { name: "Tailwind CSS", level: 90 },
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium text-white">{skill.name}</span>
                              <span className="text-gray-300">{skill.level}%</span>
                            </div>
                            <Progress
                              value={skill.level}
                              className="h-2"
                              style={{ "--progress-background": primaryColor } as React.CSSProperties}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 text-white">Backend & Tools</h3>
                      <div className="grid gap-4">
                        {[
                          { name: "Node.js", level: 85 },
                          { name: "TypeScript", level: 80 },
                          { name: "Git", level: 90 },
                          { name: "REST APIs", level: 85 },
                          { name: "GraphQL", level: 75 },
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium text-white">{skill.name}</span>
                              <span className="text-gray-300">{skill.level}%</span>
                            </div>
                            <Progress
                              value={skill.level}
                              className="h-2"
                              style={{ "--progress-background": primaryColor } as React.CSSProperties}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 text-white">Other Skills</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "UI/UX Design",
                          "Responsive Design",
                          "Performance Optimization",
                          "SEO",
                          "Accessibility",
                          "Testing",
                        ].map((skill) => (
                          <div key={skill} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: primaryColor }} />
                            <span className="text-sm text-white">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="mt-0 relative z-10">
                <div className="flex flex-col items-center justify-center max-w-md mx-auto px-4">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">Get In Touch</h2>
                    <p className="text-gray-300">
                      Feel free to reach out if you're looking for a developer, have questions, or want to connect.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 w-full">
                    <Card className="bg-black/50 backdrop-blur-sm border-white/10">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Mail className="h-5 w-5" style={{ color: primaryColor }} />
                        <div>
                          <h3 className="font-medium text-white">Email</h3>
                          <p className="text-sm text-gray-300">mustafa.jawad27.10gmail.com</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/10" asChild>
                          <Link href="mailto:mustafa.jawad27.10@gmail.com">Send</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/50 backdrop-blur-sm border-white/10">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Github className="h-5 w-5" style={{ color: primaryColor }} />
                        <div>
                          <h3 className="font-medium text-white">GitHub</h3>
                          <p className="text-sm text-gray-300">github.com/Nachos0</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/10" asChild>
                          <Link href="https://github.com/Nachos0" target="_blank" rel="noopener noreferrer">
                            View
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/50 backdrop-blur-sm border-white/10">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Linkedin className="h-5 w-5" style={{ color: primaryColor }} />
                        <div>
                          <h3 className="font-medium text-white">LinkedIn</h3>
                          <p className="text-sm text-gray-300">linkedin.com/in/mustafa-joad-14230820a</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-white hover:bg-white/10" asChild>
                          <Link
                            href="https://www.linkedin.com/in/mustafa-joad-14230820a"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Connect
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/50 backdrop-blur-sm z-10">
              <TabsList className="grid grid-cols-4 w-full rounded-none h-16 bg-transparent">
                <TabsTrigger
                  value="about"
                  className="flex flex-col items-center justify-center rounded-none text-white"
                  style={{ backgroundColor: activeTab === "about" ? primaryColor : "transparent" }}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs mt-1">About</span>
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="flex flex-col items-center justify-center rounded-none text-white"
                  style={{ backgroundColor: activeTab === "projects" ? primaryColor : "transparent" }}
                >
                  <Briefcase className="h-5 w-5" />
                  <span className="text-xs mt-1">Projects</span>
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="flex flex-col items-center justify-center rounded-none text-white"
                  style={{ backgroundColor: activeTab === "skills" ? primaryColor : "transparent" }}
                >
                  <Code className="h-5 w-5" />
                  <span className="text-xs mt-1">Skills</span>
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="flex flex-col items-center justify-center rounded-none text-white"
                  style={{ backgroundColor: activeTab === "contact" ? primaryColor : "transparent" }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs mt-1">Contact</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </main>

      <footer className="py-3 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 text-center text-xs text-gray-400 hidden sm:block bg-black/50 backdrop-blur-sm z-10">
        © 2025 Mustafa J. All rights reserved.
      </footer>
    </div>
  )
}
