'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, ChevronLeft, ChevronRight, MessageCircle, Sparkles, X } from 'lucide-react';
import { fetchChatbotFaqs, fetchChatbotImage } from '@/services/bot.service';

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-message',
    role: 'bot',
    text: 'Welcome to CORE Media! How can we help you today?',
  },
];

type QuestionItem = {
  id: string;
  question: string;
  answer: string;
};

type BotApiResponse = {
  reply?: string;
  interactionId?: string;
  suggestedLinks?: unknown[];
  error?: string;
};

const SUGGESTIONS = [
  'Which industries do you serve?',
  'Why should I partner with CORE Media?',
  'How do I stay updated on your events?',
  'How can I contact CORE Media?',
  'How can I participate in your events?',
  'Who attends CORE Media events?',
  'How can I sponsor an event?',
  'What is CORE Media?',
  'Do you offer Account-Based Marketing (ABM)?',
  'Can I request a proposal?',
];

function createMessageId() {
  if (typeof window !== 'undefined' && typeof window.crypto?.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function BotIcon() {
  const [open, setOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [questionItems, setQuestionItems] = useState<QuestionItem[]>([]);
  const [botImageUrl, setBotImageUrl] = useState<string | null>(null);
  const [previousInteractionId, setPreviousInteractionId] = useState('');
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
    const consent =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('core_media_cookie_consent')
        : null;

    setShowBot(consent !== null);

    const handleConsentChanged = () => {
      const updatedConsent = window.localStorage.getItem('core_media_cookie_consent');
      setShowBot(updatedConsent !== null);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChanged);

    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChanged);
    };
  }, []);

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

  useEffect(() => {
    const loadBotResources = async () => {
      try {
        const [questionsData, imageUrl] = await Promise.all([
          fetchChatbotFaqs(),
          fetchChatbotImage(),
        ]);

        setQuestionItems(Array.isArray(questionsData) ? questionsData : []);
        setBotImageUrl(typeof imageUrl === 'string' ? imageUrl : null);
      } catch {
        setQuestionItems([]);
        setBotImageUrl(null);
      }
    };

    loadBotResources();
  }, []);

  function handleQuestionSelect(questionItem: QuestionItem) {
    if (isSending) return;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      text: questionItem.question,
    };

    const botMessage: ChatMessage = {
      id: createMessageId(),
      role: 'bot',
      text: questionItem.answer,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage, botMessage]);

    if (!open) {
      setHasUnreadMessage(true);
    }
  }

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
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/core-media-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed, previousInteractionId }),
      });

      const data = (await response.json()) as BotApiResponse;
      const botText =
        data.reply ||
        data.error ||
        'Sorry, I could not answer that. Please contact the CORE Media team.';

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: 'bot',
          text: botText,
        },
      ]);

      if (data.interactionId) {
        setPreviousInteractionId(data.interactionId);
      }
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createMessageId(),
          role: 'bot',
          text: 'Sorry, the assistant is not available right now. Please try again later.',
        },
      ]);
    } finally {
      setIsSending(false);

      if (!open) {
        setHasUnreadMessage(true);
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSend(input);
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

  if (!showBot) {
    return null;
  }

  return (
    <div className="wrapper">
      {open && (
        <section className="panel" aria-label="CORE Media chatbot">
          <div className="header">
            <div className="headerGlow" />

            <div className="headerContent">
              <div className="headerInformation">
                <div className="avatar">
                  {botImageUrl ? (
                    <Image
                      src={botImageUrl}
                      alt="CORE Media Assistant"
                      width={36}
                      height={36}
                      className="assistant-icon"
                    />
                  ) : (
                    <Bot size={24} />
                  )}
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
                    {botImageUrl ? (
                      <Image
                        src={botImageUrl}
                        alt="CORE Media Assistant"
                        width={18}
                        height={18}
                        className="assistant-icon-small"
                      />
                    ) : (
                      <Bot size={18} />
                    )}
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
                {questionItems.length > 0
                  ? questionItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        disabled={isSending}
                        className="suggestionButton"
                        onClick={() => handleQuestionSelect(item)}
                      >
                        {item.question}
                      </button>
                    ))
                  : SUGGESTIONS.map((suggestion) => (
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

            <form className="form" onSubmit={handleSubmit}>
              {/* <label htmlFor="bot-message" className="srOnly">
                Type your message
              </label> */}

              {/* <div className="inputWrapper">
                <input
                  ref={inputRef}
                  id="bot-message"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about CORE Media..."
                  maxLength={500}
                  disabled={isSending}
                  autoComplete="off"
                  className="input"
                />
              </div> */}

              {/* <button
                type="submit"
                disabled={!input.trim() || isSending}
                aria-label="Send message"
                className="sendButton"
              >
                <Send size={18} />
              </button> */}
            </form>
          </div>
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
