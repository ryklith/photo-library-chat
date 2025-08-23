"use client"
import { Button } from "@/components/ui/button"
import { Github, Zap, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [isChatExpanded, setIsChatExpanded] = useState(false) // Default to folded on mobile

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
          {/* Gallery Section - Top on mobile, Right on desktop */}
          <div className={`bg-card border rounded-lg pt-2 px-6 pb-6 order-1 lg:order-2 mt-2 flex flex-col transition-all duration-500 ease-in-out ${!isChatExpanded ? 'h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)]' : 'h-[calc(50vh-60px)] lg:h-[calc(100vh-120px)]'}`}>
            <div className="flex items-center mb-4 flex-shrink-0">
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
          <div className={`bg-card border rounded-lg pt-2 px-6 pb-6 order-2 lg:order-1 transition-all duration-500 ease-in-out flex flex-col mt-2 ${!isChatExpanded ? 'h-16 overflow-hidden lg:h-[calc(100vh-120px)]' : 'h-[calc(50vh-60px)] lg:h-[calc(100vh-120px)]'}`}>
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-2xl font-bold">Chat</h2>
              {/* Mobile Toggle Button - Right side */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden p-1"
                onClick={() => setIsChatExpanded(!isChatExpanded)}
              >
                <ChevronDown className={`h-6 w-6 transition-transform duration-500 ease-in-out ${isChatExpanded ? 'rotate-0' : 'rotate-180'}`} />
              </Button>
            </div>
            <div className={`flex flex-col flex-1 transition-opacity duration-500 ease-in-out ${!isChatExpanded ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}>
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-6">
                {/* Sample conversation messages */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-lg p-3">
                    <p className="text-sm">Hello! I can help you explore your photo library. What would you like to know about your photos?</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-primary text-primary-foreground rounded-lg p-3">
                    <p className="text-sm">Can you show me all the photos from my vacation last summer?</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-lg p-3">
                    <p className="text-sm">I found 47 photos from your summer vacation! They're from July 15-22, 2023. Would you like me to organize them by location or date?</p>
                  </div>
                </div>
              </div>
              
              {/* Text Input */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <textarea 
                    className="w-full p-3 pr-12 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Talk to your photo library here..."
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <button className="absolute right-3 top-2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
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
