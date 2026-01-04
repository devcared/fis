"use client";

interface WelcomeMessageProps {
  message?: string;
}

/**
 * WelcomeMessage-Komponente
 * Zeigt eine Willkommensnachricht
 */
export default function WelcomeMessage({ message }: WelcomeMessageProps) {
  if (!message) return null;

  return (
    <div className="bg-white px-8 py-3 border-b border-gray-200">
      <div className="text-2xl font-semibold text-black">{message}</div>
    </div>
  );
}

