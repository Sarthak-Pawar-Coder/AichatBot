import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const customCodeTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    padding: '1rem',
    margin: 0,
    fontSize: '0.875rem',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.875rem',
  },
};

function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 overflow-hidden rounded-lg">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 rounded-t-lg"
           style={{ background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded transition-all duration-200 cursor-pointer"
          style={{
            color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto max-w-full">
        <SyntaxHighlighter
          style={customCodeTheme}
          language={language || 'text'}
          PreTag="div"
          customStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 0 }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default function MessageBubble({ message, isStreaming }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}>
      <div
        className={`max-w-[92%] sm:max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 ${
          isUser
            ? 'rounded-br-md'
            : 'rounded-bl-md'
        }`}
        style={{
          background: isUser ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${isUser ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.06)'}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Role Label */}
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isUser ? '#3b82f6' : '#f59e0b' }}
          />
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {isUser ? 'You' : 'Zeal AI'}
          </span>
        </div>

        {/* Content */}
        <div className="markdown-content text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node: _node, inline, className, children, ...props }) {
                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <CodeBlock className={className} {...props}>
                        {children}
                      </CodeBlock>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
              {isStreaming && message.content && (
                <span className="typing-cursor" />
              )}
              {isStreaming && !message.content && (
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '200ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
