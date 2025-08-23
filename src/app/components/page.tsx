import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Component Showcase</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Button Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Buttons</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different button styles for various use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>Different button sizes for various contexts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button with Icons</CardTitle>
                  <CardDescription>Buttons with icons for better visual communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                    <Button variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                    <Button variant="ghost">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Card Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Cards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>A basic card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a simple card with some content. Cards are great for organizing information and creating visual hierarchy.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>A card with header, content, and footer sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card includes a footer section where you can place actions or additional information.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Learn More</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>A card with interactive elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card demonstrates how you can combine cards with buttons and other interactive elements.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Confirm</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Card</CardTitle>
                  <CardDescription>Showcasing a feature or product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium">Fast Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="font-medium">High Quality</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-medium">User Friendly</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Layout Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Layout Examples</h2>
            <Card>
              <CardHeader>
                <CardTitle>Responsive Grid Layout</CardTitle>
                <CardDescription>Cards in a responsive grid layout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-sm font-bold">{i}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Item {i}</h4>
                          <p className="text-sm text-muted-foreground">Description for item {i}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
