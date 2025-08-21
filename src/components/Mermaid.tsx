'use client';

import { useEffect, useRef } from 'react';

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className = '' }: MermaidProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const mermaidRef = useRef<any>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        if (!mermaidRef.current) {
          const mermaid = await import('mermaid');
          mermaidRef.current = mermaid.default;
          
          mermaidRef.current.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
              primaryColor: '#3b82f6',
              primaryTextColor: '#1f2937',
              primaryBorderColor: '#6b7280',
              lineColor: '#6b7280',
              secondaryColor: '#f3f4f6',
              tertiaryColor: '#f9fafb',
              background: '#ffffff',
              mainBkg: '#ffffff',
              secondBkg: '#f3f4f6',
              tertiaryBkg: '#f9fafb',
            },
          });
        }

        if (elementRef.current && mermaidRef.current) {
          // Clear previous content
          elementRef.current.innerHTML = '';
          
          // Generate unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // Render the diagram
          const { svg } = await mermaidRef.current.render(id, chart);
          elementRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="border border-red-200 bg-red-50 p-4 rounded-lg">
              <p class="text-red-800 font-medium">Error rendering diagram</p>
              <pre class="text-sm text-red-600 mt-2 whitespace-pre-wrap">${chart}</pre>
            </div>
          `;
        }
      }
    };

    loadMermaid();
  }, [chart]);

  return (
    <div 
      ref={elementRef} 
      className={`mermaid-diagram my-6 flex justify-center ${className}`}
      style={{ minHeight: '200px' }}
    >
      <div className="animate-pulse bg-gray-200 rounded-lg w-full h-48 flex items-center justify-center">
        <span className="text-gray-500">Loading diagram...</span>
      </div>
    </div>
  );
}

export default Mermaid;
