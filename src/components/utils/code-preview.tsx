"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Code, Eye, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface CodePreviewProps {
  code: string
  language: string
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [iframeKey, setIframeKey] = useState(Date.now())
  const [iframeHeight, setIframeHeight] = useState(300)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true)
        toast({
          title: "Copied to clipboard!",
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy!",
          description: err.message,
        })
      })
  }

  const refreshPreview = () => {
    setIframeKey(Date.now())
  }

  // Replace the entire getHtmlContent function with this improved version
  const getHtmlContent = () => {
    // Create a base HTML template with necessary scripts and styles
    const baseHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              padding: 16px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
            .preview-error {
              color: #ef4444;
              padding: 12px;
              border: 1px solid #ef4444;
              border-radius: 4px;
              background-color: #fef2f2;
              margin-bottom: 12px;
            }
            .preview-container {
              padding: 20px;
            }
            .preview-container .box {
              width: 100px;
              height: 100px;
              background-color: #3b82f6;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            // Helper function to report errors
            function reportError(error) {
              const errorEl = document.createElement('div');
              errorEl.className = 'preview-error';
              errorEl.textContent = 'Error: ' + error.message;
              document.getElementById('root').appendChild(errorEl);
              console.error(error);
            }
            
            // Helper function to report height to parent
            function reportHeight() {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ type: 'resize', height }, '*');
            }
            
            // Set up height reporting
            window.addEventListener('load', reportHeight);
            window.addEventListener('resize', reportHeight);
            setTimeout(reportHeight, 100); // Fallback
          </script>
        </body>
      </html>
    `

    // Create a DOM parser to modify the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(baseHtml, "text/html")

    try {
      if (language === "jsx" || language === "tsx" || language === "react") {
        // For React components
        const babelScript = doc.createElement("script")
        babelScript.type = "text/babel"
        babelScript.textContent = `
          try {
            ${code}
            
            // Try to find and render a React component
            // Look for exported components or components defined at the top level
            const possibleComponents = Object.values(window).filter(
              val => typeof val === 'function' && /^[A-Z]/.test(val.name || '')
            );
            
            if (possibleComponents.length > 0) {
              // Use the first component found
              const Component = possibleComponents[0];
              ReactDOM.render(React.createElement(Component), document.getElementById('root'));
            } else {
              // If no component is found, try to render the JSX directly if it looks like JSX
              const jsxMatch = \`${code}\`.match(/<([A-Z][\\w]*|[a-z][\\w]*)/);
              if (jsxMatch) {
                const jsx = \`${code.replace(/`/g, "\\`")}\`;
                ReactDOM.render(eval('(' + jsx + ')'), document.getElementById('root'));
              } else {
                document.getElementById('root').innerHTML = '<div>No React component found to render</div>';
              }
            }
          } catch (error) {
            reportError(error);
          }
        `
        doc.body.appendChild(babelScript)
      } else if (language === "html") {
        // For HTML, directly insert into the root
        const rootEl = doc.getElementById("root")
        if (rootEl) rootEl.innerHTML = code
      } else if (language === "css") {
        // For CSS, add a style tag and some demo elements
        const styleEl = doc.createElement("style")
        styleEl.textContent = code
        doc.head.appendChild(styleEl)

        const rootEl = doc.getElementById("root")
        if (rootEl)
          rootEl.innerHTML = `
          <div class="preview-container">
            <h1>CSS Preview</h1>
            <p>This is a paragraph with the applied CSS.</p>
            <button>Button Example</button>
            <div class="box">Box Element</div>
          </div>
        `
      } else {
        // For other languages, show a message
        const rootEl = doc.getElementById("root")
        if (rootEl) {
          rootEl.innerHTML = `<div style="color: #6b7280; text-align: center; padding: 40px;">
            Preview not available for ${language} code
          </div>`
        }
      }
    } catch (error) {
      console.error("Error preparing preview:", error)
      const rootEl = doc.getElementById("root")
      if (rootEl) {
        rootEl.innerHTML = `<div class="preview-error">Error preparing preview:</div>`
      }
    }

    return new XMLSerializer().serializeToString(doc)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "resize") {
        setIframeHeight(event.data.height + 32) // Add padding
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div className="rounded-md border shadow-sm mt-4 overflow-hidden">
      <Tabs defaultValue="code">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
          <TabsList className="grid w-[180px] grid-cols-2">
            <TabsTrigger value="code" className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              <span>Code</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <TabsContent value="code" className="m-0">
          <pre className={cn("p-4 overflow-auto text-sm", "bg-slate-950 text-slate-50")}>
            <code>{code}</code>
          </pre>
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="relative bg-white">
            <Button variant="outline" size="sm" className="absolute top-2 right-2 z-10" onClick={refreshPreview}>
              Refresh
            </Button>
            {/* Updated iframe with enhanced sandbox permissions */}
            <iframe
              key={iframeKey}
              srcDoc={getHtmlContent()}
              className="w-full border-0"
              style={{ height: `${iframeHeight}px`, minHeight: "200px" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              title="Code Preview"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

