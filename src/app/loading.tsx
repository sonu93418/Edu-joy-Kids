'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-edujoy-primary/10 via-purple-50 to-fun-blue/10 flex items-center justify-center">
      <div className="text-center">
        {/* Bouncing Characters */}
        <div className="flex items-end justify-center gap-3 mb-6">
          {['🦁', '🐸', '🦋', '⭐', '🎈'].map((emoji, i) => (
            <span
              key={i}
              className="text-4xl animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
          <div className="h-full bg-gradient-to-r from-edujoy-primary to-fun-purple rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>

        <p className="text-edujoy-primary font-bold text-xl animate-pulse">
          Loading magic... ✨
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; }
          50% { width: 80%; margin-left: 10%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
