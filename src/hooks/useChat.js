
import { useState, useCallback, useRef } from 'react';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = {
      role: 'user',
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages([
      ...updatedMessages,
      { role: 'assistant', content: '' },
    ]);

    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let assistantContent = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson?.error) {
            errorMsg = errJson.error;
          }
        } catch {
          // not json
        }
        throw new Error(errorMsg);
      }

      if (!response.body) {
        throw new Error('The server did not return a response stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);

          if (data === '[DONE]') {
            finished = true;
            break;
          }

          try {
            const parsed = JSON.parse(data);

            if (parsed.token) {
              assistantContent += parsed.token;

              setMessages((prev) => {
                const updated = [...prev];

                if (updated.length > 0) {
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  };
                }

                return updated;
              });
            }
          } catch {
            // Ignore malformed streaming chunks.
          }
        }
      }

      setMessages((prev) => {
        if (prev.length === 0) return prev;

        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex].role === 'assistant') {
          updated[lastIndex] = {
            role: 'assistant',
            content: assistantContent || 'No response generated.',
          };
        }

        return updated;
      });
    } catch (error) {
      if (error.name === 'AbortError') return;

      console.error('Chat error:', error);

      setMessages((prev) => {
        if (prev.length === 0) return prev;

        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex].role === 'assistant') {
          updated[lastIndex] = {
            role: 'assistant',
            content: `Error: ${error.message}. Please try again.`,
          };
        }

        return updated;
      });
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsStreaming(false);
      }
    }
  }, [messages, isStreaming]);

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setMessages([]);
    setIsStreaming(false);
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    stopStreaming,
    clearMessages,
  };
}
