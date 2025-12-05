import Image from "next/image";

export default function Header() {
  return (
    <nav className="relative z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Flight Genius Logo"
            width={200}
            height={200}
            className="rounded-lg"
            unoptimized
          />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-8">
          <button className="text-white hover:text-white/80 font-medium text-sm transition-colors cursor-pointer">
            Support
          </button>
          <button className="text-white hover:text-white/80 font-medium text-sm transition-colors cursor-pointer">
            My Trips
          </button>
          <button className="bg-white text-genius-500 hover:bg-white/90 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
