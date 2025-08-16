// stack-dhruv/web-portfolio/stack-dhruv-web-portfolio-8a98663164198b155740d1baaa07ed22b9473b64/app/dhruv-ai/page.tsx
"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { DefaultChatTransport } from 'ai';
import React, { useState } from "react"; // Import useState

const suggestedPrompts = [
  "What was your role at MIDAS Lab?",
  "Tell me about your national hackathon project.",
  "What are your main technical skills?",
];

export default function AiPage() {
  // Get chat utilities from the hook
//   const { messages, append } = useChat({
//     api: "/api/completion",
//   });
    const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/completion',
    }),
  });


  // Manage the input state manually with useState
  const [input, setInput] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission (which causes a refresh)
    if (!input.trim()) return; // Don't send empty messages

    // Send the user's message to the AI
    sendMessage({
      role: "user",
      parts: [{ type: 'text', text: input }],
    });

    // Clear the input field
    setInput("");
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <h1 className="font-serif text-4xl font-bold text-teal-700 dark:text-teal-400">
          ध्रुव://ai
        </h1>
        <span className="px-3 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full">
          just for fun!
        </span>
      </div>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        Have a chat with my AI persona to know more about me!
      </p>

      {/* Chat Window */}
      <div className="mt-6 flex flex-col h-[60vh] rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-[#111]">
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Initial Message */}
          <div className="flex">
            <div className="px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/50 text-neutral-800 dark:text-neutral-200">
              <p>
                Hi! I'm Dhruv's AI persona. Ask me anything about him or his
                work. I'll be happy to assist you.
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          {/* {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`px-4 py-2 rounded-lg whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    : "bg-teal-50 dark:bg-teal-900/50 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))} */}
          {messages.map((message, index) => (
                <div key={index}>
                {message.parts.map(part => {
                    if (part.type === 'text') {
                    return <div key={`${message.id}-text`}>{part.text}</div>;
                    }
                })}
                </div>
            ))}
        </div>

        {/* Suggested Prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)} // Use the setInput from useState
              className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800/80 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)} // Use the setInput from useState
              placeholder="Ask about my work or projects..."
              className="w-full pl-4 pr-12 py-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
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
      </div>
      
      {/* Disclaimer */}
      <p className="mt-4 text-xs text-center text-neutral-500 dark:text-neutral-500">
        This AI is powered by Google's Gemini and Vercel AI SDK. Responses are generated and may not be 100% accurate.
      </p>
    </section>
  );
}