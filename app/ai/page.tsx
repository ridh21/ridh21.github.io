"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp, Sparkles } from "lucide-react"; // Import Sparkles icon
import { DefaultChatTransport } from 'ai';
import React, { useState, useEffect, useRef } from "react"; 
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Array of objects to hold prompts and their specific styles
const suggestedPrompts = [
  { 
    text: "Are you available for hiring?", 
    style: "bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900" 
  },
  { 
    text: "What are your design and development philosophies?", 
    style: "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900" 
  },
  { 
    text: "What are your main technical skills?", 
    style: "bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900" 
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
        <h1 className="font-serif text-4xl font-bold text-teal-700 dark:text-teal-400">
          ध्रुव://ai
        </h1>
        <span className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full">
          <Sparkles className="w-3 h-3" />
          just for fun!
        </span>
      </div>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Have a chat with my AI persona to know more about me!
      </p>

      {/* Chat Window */}
      <div 
        ref={chatContainerRef}
        className="mt-6 h-[55vh] overflow-y-auto space-y-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111]"
      >
        {/* Initial Message */}
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/50 text-neutral-800 dark:text-neutral-200">
            <p>
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
              className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  : "bg-teal-50 dark:bg-teal-900/50 text-neutral-800 dark:text-neutral-200"
              }`}
            >
              {m.parts.map(part => {
                if (part.type === 'text') {
                  return (
                    <div key={`${m.id}-text`} className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0">
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
            className="w-full pl-4 pr-12 py-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors disabled:bg-neutral-400"
            aria-label="Send message"
            disabled={!input.trim()}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Styled Suggested Prompts */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt.text}
            onClick={() => setInput(prompt.text)}
            className={`p-3 text-sm font-medium rounded-lg transition-colors text-center ${prompt.style}`}
          >
            {prompt.text}
          </button>
        ))}
      </div>
      
      {/* Disclaimer */}
      <p className="mt-6 text-xs text-center text-neutral-500 dark:text-neutral-500">
        Everyone makes mistakes, including this AI powered by{' '}
        <a 
          href="https://gemini.google.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold no-underline text-neutral-600 dark:text-neutral-400"
        >
          Google's Gemini
        </a>{' '}
        and{' '}
        <a 
          href="https://sdk.vercel.ai/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold no-underline text-neutral-600 dark:text-neutral-400"
        >
          Vercel AI SDK
        </a>
        . Make sure to double-check important information.
      </p>
    </section>
  );
}