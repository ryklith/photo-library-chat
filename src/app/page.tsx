import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Memojo Chat</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/components">
                <Button variant="ghost" size="sm">
                  Components
                </Button>
              </Link>
              <Link href="/scss-demo">
                <Button variant="ghost" size="sm">
                  SCSS Demo
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Your Next.js App
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, fast, and scalable web application built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>
                Built with TypeScript for better developer experience and type safety.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get better IntelliSense, catch errors early, and build more reliable applications.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>
                Utility-first CSS framework for rapid UI development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build beautiful, responsive interfaces with pre-built components and utilities.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Router</CardTitle>
              <CardDescription>
                Next.js 13+ App Router for better performance and developer experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server components, streaming, and improved routing with the latest Next.js features.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Start building your next great application with this modern stack.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
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
