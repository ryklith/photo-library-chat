import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code, Palette, Zap } from "lucide-react"
import Link from "next/link"

export default function SCSSDemoPage() {
  return (
    <div className="min-h-screen bg-background scss-global">
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
              <h1 className="text-2xl font-bold">SCSS Demo</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/components">
                <Button variant="ghost" size="sm">
                  Components
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">SCSS + Tailwind CSS</h2>
              <p className="text-xl text-muted-foreground">
                Demonstrating how to use SCSS alongside Tailwind CSS in your Next.js application
              </p>
            </div>
          </section>

          {/* SCSS Buttons */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Buttons</h3>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SCSS Button Variants</CardTitle>
                  <CardDescription>
                    Buttons styled with SCSS variables and mixins
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <button className="scss-button scss-button--primary scss-button--md">
                      Primary SCSS
                    </button>
                    <button className="scss-button scss-button--secondary scss-button--md">
                      Secondary SCSS
                    </button>
                    <button className="scss-button scss-button--outline scss-button--md">
                      Outline SCSS
                    </button>
                    <button className="scss-button scss-button--destructive scss-button--md">
                      Destructive SCSS
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SCSS Button Sizes</CardTitle>
                  <CardDescription>
                    Different button sizes using SCSS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="scss-button scss-button--primary scss-button--sm">
                      Small
                    </button>
                    <button className="scss-button scss-button--primary scss-button--md">
                      Medium
                    </button>
                    <button className="scss-button scss-button--primary scss-button--lg">
                      Large
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SCSS Cards */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Cards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="scss-card">
                <div className="scss-card__header">
                  <h4 className="scss-card__title">SCSS Card Title</h4>
                  <p className="scss-card__description">
                    This card is styled entirely with SCSS using variables and mixins
                  </p>
                </div>
                <div className="scss-card__content">
                  <p>
                    This demonstrates how you can use SCSS for component styling while 
                    still leveraging Tailwind CSS for utility classes.
                  </p>
                </div>
                <div className="scss-card__footer">
                  <button className="scss-button scss-button--outline scss-button--sm">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="scss-card">
                <div className="scss-card__header">
                  <h4 className="scss-card__title">Mixed Styling</h4>
                  <p className="scss-card__description">
                    Combining SCSS with Tailwind utility classes
                  </p>
                </div>
                <div className="scss-card__content">
                  <p className="text-sm text-muted-foreground">
                    You can use Tailwind classes like <code>text-sm text-muted-foreground</code> 
                    alongside SCSS-styled components.
                  </p>
                </div>
                <div className="scss-card__footer">
                  <button className="scss-button scss-button--primary scss-button--sm">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SCSS Alerts */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Alerts</h3>
            <div className="space-y-4">
              <div className="scss-alert scss-alert--info">
                <strong>Info:</strong> This is an informational alert styled with SCSS.
              </div>
              <div className="scss-alert scss-alert--success">
                <strong>Success:</strong> Operation completed successfully!
              </div>
              <div className="scss-alert scss-alert--warning">
                <strong>Warning:</strong> Please review your input before proceeding.
              </div>
              <div className="scss-alert scss-alert--error">
                <strong>Error:</strong> Something went wrong. Please try again.
              </div>
            </div>
          </section>

          {/* SCSS Grid */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Responsive Grid</h3>
            <div className="scss-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="scss-card">
                  <div className="scss-card__content">
                    <h4 className="scss-card__title">Grid Item {i}</h4>
                    <p className="scss-text--muted">
                      This grid uses SCSS mixins for responsive breakpoints.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SCSS Animations */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Animations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fade Animations</CardTitle>
                  <CardDescription>
                    CSS animations defined in SCSS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="scss-fade-in p-4 bg-muted rounded-md">
                    This element has a fade-in animation
                  </div>
                  <div className="scss-fade-out p-4 bg-muted rounded-md">
                    This element has a fade-out animation
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading Spinner</CardTitle>
                  <CardDescription>
                    Animated spinner using SCSS keyframes
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <div className="scss-spinner"></div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Example */}
          <section>
            <h3 className="text-2xl font-bold mb-6">SCSS Code Example</h3>
            <Card>
              <CardHeader>
                <CardTitle>SCSS Variables & Mixins</CardTitle>
                <CardDescription>
                  Example of how to use SCSS features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm">
                  <code>{`// SCSS Variables
$primary: #222.2 47.4% 11.2%;
$spacing-md: 1rem;
$radius-md: 0.5rem;

// SCSS Mixin
@mixin button-base {
  display: inline-flex;
  align-items: center;
  padding: $spacing-md;
  border-radius: $radius-md;
  transition: all 0.2s ease-in-out;
}

// Using the mixin
.scss-button {
  @include button-base;
  
  &--primary {
    background-color: hsl($primary);
    color: white;
    
    &:hover {
      background-color: hsl($primary / 0.9);
    }
  }
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-2xl font-bold mb-6">Benefits of SCSS + Tailwind</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    Variables & Mixins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use SCSS variables for design tokens and mixins for reusable styles
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Component Styling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Style complex components with SCSS while keeping utilities with Tailwind
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Best of Both Worlds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combine the power of SCSS with the utility-first approach of Tailwind
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
