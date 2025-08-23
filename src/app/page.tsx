"use client"
import { Button } from "@/components/ui/button"
import { Github, Zap, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isChatExpanded, setIsChatExpanded] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Memojo Chat</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/components">
                <Button variant="ghost" size="sm">
                  Components
                </Button>
              </Link>
              
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </nav>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          {/* Gallery Section - Top on mobile, Right on desktop */}
          <div className={`bg-card border rounded-lg p-6 order-1 lg:order-2 mt-2 flex flex-col ${!isChatExpanded ? 'h-[calc(100vh-200px)]' : 'h-[calc(100vh-200px)]'}`}>
            <div className="flex justify-center mb-4 flex-shrink-0">
              <h2 className="text-2xl font-bold">Gallery</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1">
              {/* Placeholder thumbnails */}
              {Array.from({ length: 12 }, (_, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <span className="text-sm text-muted-foreground">Thumbnail {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section - Bottom on mobile, Left on desktop */}
          <div className={`bg-card border rounded-lg p-6 order-2 lg:order-1 transition-all duration-300 ${!isChatExpanded ? 'h-16 overflow-hidden' : ''}`}>
            <div className="flex flex-col items-center mb-4">
              {/* Mobile Toggle Button - Above title */}
              <Button 
                variant="ghost" 
                size="lg" 
                className="lg:hidden mb-1"
                onClick={() => setIsChatExpanded(!isChatExpanded)}
              >
                {isChatExpanded ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
              </Button>
              <h2 className="text-2xl font-bold">Chat</h2>
            </div>
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Chat placeholder content will go here</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 hidden md:block">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Memojo Chat. Built with Next.js and Tailwind CSS.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Terms
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
