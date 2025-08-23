import { Button } from "@/components/ui/button"
import { Github, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Gallery Section - Top on mobile, Right on desktop */}
          <div className="bg-card border rounded-lg p-6 order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Gallery placeholder content will go here</p>
            </div>
          </div>

          {/* Chat Section - Bottom on mobile, Left on desktop */}
          <div className="bg-card border rounded-lg p-6 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-4">Chat</h2>
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Chat placeholder content will go here</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
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
