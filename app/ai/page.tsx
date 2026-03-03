"use client";

import { useChat } from "@ai-sdk/react";
import { IconArrowUp, IconSparkles } from "../components/icons";
import { DefaultChatTransport } from 'ai';
import React, { useState, useEffect, useRef } from "react"; 
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Array of objects to hold prompts and their specific styles
const suggestedPrompts = [
  { 
    text: "Are you available for hiring?", 
    style: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 border border-red-200/30 dark:border-red-800/20" 
  },
  { 
    text: "What are your design and development philosophies?", 
    style: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-950/60 border border-violet-200/30 dark:border-violet-800/20" 
  },
  { 
    text: "What are your main technical skills?", 
    style: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/30 dark:border-amber-800/20" 
  },
];

export default function AiPage() {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/completion',
    }),
  });

  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({
      role: "user",
      parts: [{ type: 'text', text: input }],
    });
    setInput("");
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--color-accent)]">
          ध्रुव://ai
        </h1>
        <span className="tag gap-1.5 px-3 py-1 text-xs font-medium bg-[var(--color-accent-light)] text-[var(--color-accent)] border-[rgba(117,83,253,0.2)] dark:border-[rgba(155,125,255,0.2)]">
          <IconSparkles size={12} />
          just for fun!
        </span>
      </div>
      <p className="mt-2 text-sm sm:text-base text-[var(--color-contrast-medium)]">
        Have a chat with my AI persona to know more about me!
      </p>

      {/* Chat Window */}
      <div 
        ref={chatContainerRef}
        className="mt-6 h-[60vh] sm:h-[55vh] overflow-y-auto space-y-4 p-4 card"
      >
        {/* Initial Message */}
        <div className="flex justify-start">
          <div className="px-3 py-2 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-foreground)]">
            <p className="text-sm">
              Hi! I'm Dhruv's AI persona. Ask me anything about him or his
              work. I'll be happy to assist you.
            </p>
          </div>
        </div>

        {/* Render Chat Messages */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[var(--color-background-subtle)] text-[var(--color-contrast-high)] border border-[var(--color-border)]"
                  : "bg-[var(--color-accent-light)] text-[var(--color-foreground)]"
              }`}
            >
              {m.parts.map(part => {
                if (part.type === 'text') {
                  return (
                    <div key={`${m.id}-text`} className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-0 prose-ul:my-0 prose-li:my-0">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {part.text}
                      </ReactMarkdown>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about me or my work!..."
            className="w-full pl-4 pr-12 py-3 rounded-full bg-[var(--color-background-light)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent focus:outline-none transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-contrast-low)]"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary p-2 h-8 w-8 rounded-full disabled:opacity-40"
            aria-label="Send message"
            disabled={!input.trim()}
          >
            <IconArrowUp size={16} />
          </button>
        </div>
      </form>

      {/* Styled Suggested Prompts */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt.text}
            onClick={() => setInput(prompt.text)}
            className={`p-3 text-sm font-medium rounded-lg transition-all text-center cursor-pointer shadow-[var(--shadow-xs)] ${prompt.style}`}
          >
            {prompt.text}
          </button>
        ))}
      </div>
      
      {/* Disclaimer */}
      <p className="mt-6 text-xs text-center text-[var(--color-contrast-low)]">
        Everyone makes mistakes, including this AI powered by{' '}
        <a 
          href="https://gemini.google.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold no-underline text-[var(--color-contrast-medium)]"
        >
          Google's Gemini
        </a>{' '}
        and{' '}
        <a 
          href="https://sdk.vercel.ai/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold no-underline text-[var(--color-contrast-medium)]"
        >
          Vercel AI SDK
        </a>
        . Make sure to double-check important information.
      </p>
    </section>
  );
}