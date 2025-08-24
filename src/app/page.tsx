"use client"
import { Button } from "@/components/ui/button"
import { Github, Zap, ChevronUp, ChevronDown, Send, TestTube } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export default function Home() {
  const [isChatExpanded, setIsChatExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I can help you explore your photo library. What would you like to know about your photos?',
      timestamp: new Date(),
      isUser: false,
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [webhookStatus, setWebhookStatus] = useState<{ configured: boolean; url: string } | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)
  
  const chatHistoryRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Check webhook status on component mount
  useEffect(() => {
    checkWebhookStatus()
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [inputMessage])

  const checkWebhookStatus = async () => {
    try {
      const response = await fetch('/api/test-webhook')
      const data = await response.json()
      setWebhookStatus(data)
    } catch (error) {
      console.error('Failed to check webhook status:', error)
      setWebhookStatus({ configured: false, url: 'Error checking status' })
    }
  }

  const testWebhook = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/test-webhook', {
        method: 'POST',
      })
      const data = await response.json()
      setTestResult(data)
      
      if (data.success) {
        // Add a test message to chat
        const testMessage: ChatMessage = {
          id: `test-${Date.now()}`,
          content: '✅ Webhook test successful! The chat is now connected.',
          timestamp: new Date(),
          isUser: false,
        }
        setMessages(prev => [...prev, testMessage])
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Failed to test webhook'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage.trim(),
      timestamp: new Date(),
      isUser: true,
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          chatHistory: messages,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Add bot response
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          content: data.data?.response || 'Message sent successfully!',
          timestamp: new Date(),
          isUser: false,
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        // Add error message
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          content: `❌ Error: ${data.error || 'Failed to send message'}`,
          timestamp: new Date(),
          isUser: false,
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: '❌ Network error: Failed to send message',
        timestamp: new Date(),
        isUser: false,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

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
              <div className="flex items-center space-x-2">
                {/* Webhook Test Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={testWebhook}
                  disabled={isLoading}
                  className="hidden lg:flex"
                >
                  <TestTube className="h-4 w-4 mr-1" />
                  Test Webhook
                </Button>
                
                {/* Mobile Toggle Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden p-1"
                  onClick={() => setIsChatExpanded(!isChatExpanded)}
                >
                  <ChevronDown className={`h-6 w-6 transition-transform duration-500 ease-in-out ${isChatExpanded ? 'rotate-0' : 'rotate-180'}`} />
                </Button>
              </div>
            </div>
            
            {/* Webhook Status */}
            {webhookStatus && (
              <div className="mb-2 text-xs">
                <span className={`inline-flex items-center px-2 py-1 rounded-full ${webhookStatus.configured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {webhookStatus.configured ? '✅ Webhook Configured' : '❌ Webhook Not Configured'}
                </span>
              </div>
            )}
            
            {/* Test Result */}
            {testResult && (
              <div className={`mb-2 p-2 rounded text-xs ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {testResult.success ? '✅' : '❌'} {testResult.message || testResult.error}
              </div>
            )}
            
            <div className={`flex flex-col flex-1 transition-opacity duration-500 ease-in-out ${!isChatExpanded ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`} style={{ height: 'calc(100% - 60px)' }}>
              {/* Chat History - Scrollable with explicit height calculation */}
              <div 
                ref={chatHistoryRef}
                className="flex-1 overflow-y-auto space-y-6 pr-2"
                style={{ 
                  height: 'calc(100% - 80px)',
                  minHeight: '200px'
                }}
              >
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : message.content.includes('❌') 
                          ? 'bg-red-100 text-red-800'
                          : message.content.includes('✅')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('en-US', {
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-muted rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <p className="text-sm">Sending message...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Text Input - Fixed at bottom with explicit height */}
              <div 
                className="flex-shrink-0 mt-4"
                style={{ height: '60px' }}
              >
                <div className="relative h-full">
                  <textarea 
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full h-full p-3 pr-20 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Talk to your photo library here..."
                    disabled={isLoading}
                    style={{ 
                      minHeight: '44px',
                      maxHeight: '60px',
                      overflowY: 'auto'
                    }}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
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
