'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronLeft, ChevronRight, MessageCircle, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-message',
    role: 'bot',
    text: 'Hi! I’m the CORE Media assistant. Ask me about events, services, partnerships, or how to get in touch.',
  },
];

const SUGGESTIONS = [
  'Tell me about your events',
  'How can I contact sales?',
  'What services do you offer?',
  'What industries do you serve?',
  'How do I sponsor an event?',
  'Can I book a meeting with your team?',
];

function createMessageId() {
  if (typeof window !== 'undefined' && typeof window.crypto?.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getBotReply(userText: string) {
  const normalized = userText.toLowerCase();

  if (
    normalized.includes('event') ||
    normalized.includes('conference') ||
    normalized.includes('roundtable')
  ) {
    return 'CORE Media organizes technology events, executive roundtables, workshops, bespoke conferences, and recognition platforms for business and technology leaders.';
  }

  if (
    normalized.includes('contact') ||
    normalized.includes('sales') ||
    normalized.includes('reach') ||
    normalized.includes('phone') ||
    normalized.includes('email')
  ) {
    return 'You can contact CORE Media at +91 7506035537 or email contact@core-mediagroup.com. You can also use the contact form on this website.';
  }

  if (
    normalized.includes('service') ||
    normalized.includes('services') ||
    normalized.includes('offer')
  ) {
    return 'CORE Media offers B2B technology events, executive engagement platforms, bespoke events, digital roundtables, ABM campaigns, surveys, research, content solutions, and social media solutions.';
  }

  if (
    normalized.includes('partner') ||
    normalized.includes('partnership') ||
    normalized.includes('collaborate')
  ) {
    return 'To partner with CORE Media, use the website contact form or connect with the team by phone or email. They will guide you based on your campaign or event requirements.';
  }

  if (
    normalized.includes('about') ||
    normalized.includes('core media') ||
    normalized.includes('company')
  ) {
    return 'CORE Media creates meaningful platforms that connect technology leaders, enterprises, and innovators to exchange ideas, celebrate excellence, and drive business growth.';
  }

  return 'Thank you for your message. Please share a little more detail, or select one of the suggestions below so I can guide you to the correct information.';
}

export default function BotIcon() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  //   const [setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const chatButtonLabel = open ? 'Close bot' : 'Open bot';

  const scrollSuggestions = (distance: number) => {
    suggestionsRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isSending]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setHasUnreadMessage(false);

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  async function handleSend(messageText: string) {
    const trimmed = messageText.trim();

    if (!trimmed || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      text: trimmed,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);

    // setInput('');
    setIsSending(true);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 850);
    });

    const botMessage: ChatMessage = {
      id: createMessageId(),
      role: 'bot',
      text: getBotReply(trimmed),
    };

    setMessages((currentMessages) => [...currentMessages, botMessage]);

    setIsSending(false);

    if (!open) {
      setHasUnreadMessage(true);
    }
  }

  //   function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     void handleSend(input);
  //   }

  //   function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
  //     if (event.key === 'Escape') {
  //       setOpen(false);
  //     }
  //   }

  return (
    <div className="wrapper">
      {open && (
        <section className="panel" aria-label="CORE Media chatbot">
          <div className="header">
            <div className="headerGlow" />

            <div className="headerContent">
              <div className="headerInformation">
                <div className="avatar">
                  <Bot size={24} />
                </div>

                <div className="headerText">
                  <div className="titleRow">
                    <p className="title">CORE Media Assistant</p>

                    <Sparkles className="sparkle" />
                  </div>

                  <div className="status">
                    <span className="onlineDot" />

                    <p className="statusText">Online and ready to help</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bot"
                className="closeButton"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="messages" aria-live="polite">
            <div className="messageList">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`messageRow ${message.role === 'user' ? 'userRow' : 'botRow'}`}
                >
                  {message.role === 'bot' && (
                    <div className="smallAvatar">
                      <Bot size={18} />
                    </div>
                  )}

                  <div
                    className={`messageBubble ${
                      message.role === 'user' ? 'userMessage' : 'botMessage'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="messageRow botRow">
                  <div className="smallAvatar">
                    <Bot size={18} />
                  </div>

                  <div className="typingIndicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="suggestionsSection">
            <p className="suggestionsTitle">Quick questions</p>

            <div className="suggestionScroller">
              <button
                type="button"
                className="scrollButton"
                onClick={() => scrollSuggestions(-220)}
                aria-label="Scroll suggestions left"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="suggestions" ref={suggestionsRef}>
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isSending}
                    className="suggestionButton"
                    onClick={() => void handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="scrollButton"
                onClick={() => scrollSuggestions(220)}
                aria-label="Scroll suggestions right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="bot-message" className="srOnly">
              Type your message
            </label>

            <div className="inputWrapper">
              <input
                ref={inputRef}
                id="bot-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about CORE Media..."
                maxLength={500}


                disabled={isSending}
                autoComplete="off"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isSending}
              aria-label="Send message"
              className="sendButton"
            >
              <Send size={18} />
            </button>
          </form> */}

          {/* <div className="footer">
            <span>CORE Media digital assistant</span>

            <Link
              href="/#contact-section"
              onClick={() => setOpen(false)}
              className="contactLink"
            >
              Contact our team
            </Link>
          </div> */}
        </section>
      )}

      <div className="launcherWrapper">
        {!open && (
          <>
            <span className="pulseRing" />
            <span className="pulseRing pulseRingDelay" />
          </>
        )}

        {hasUnreadMessage && !open && <span className="notification">1</span>}

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={chatButtonLabel}
          aria-expanded={open}
          className={`launcher ${open ? 'launcherOpen' : ''}`}
        >
          {open ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}
