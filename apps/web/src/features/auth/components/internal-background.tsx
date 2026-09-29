"use client";

export function InternalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-gradient-to-br from-[#faf8ff] via-[#f3eeff] to-[#ebe4ff]">
      {/* Primary Ambient Gradient Orbs (Purple, Lavender, White) */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full blur-[120px] opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(216, 180, 254, 0.25) 45%, rgba(255, 255, 255, 0) 70%)",
        }}
      />

      <div
        className="absolute top-[35%] -left-[10%] w-[500px] sm:w-[650px] h-[500px] rounded-full blur-[130px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.28) 0%, rgba(192, 132, 252, 0.18) 50%, rgba(255, 255, 255, 0) 75%)",
        }}
      />

      <div
        className="absolute -bottom-[10%] -right-[5%] w-[550px] sm:w-[700px] h-[550px] rounded-full blur-[140px] opacity-65"
        style={{
          background:
            "radial-gradient(circle, rgba(126, 34, 206, 0.22) 0%, rgba(233, 213, 255, 0.3) 55%, rgba(255, 255, 255, 0) 80%)",
        }}
      />

      {/* Center White Soft Light Spot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[90px] opacity-80"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(245, 240, 255, 0.4) 60%, transparent 80%)",
        }}
      />

      {/* Minimalist Concentric Accent Arc Lines (Sesuai Referensi Visual) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="50%"
          cy="50%"
          r="260"
          fill="none"
          stroke="url(#purpleLavenderGradient)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="50%"
          cy="50%"
          r="420"
          fill="none"
          stroke="url(#purpleLavenderGradient)"
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="50%"
          r="580"
          fill="none"
          stroke="url(#purpleLavenderGradient)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle
          cx="50%"
          cy="50%"
          r="740"
          fill="none"
          stroke="url(#purpleLavenderGradient)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient
            id="purpleLavenderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#e9d5ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
