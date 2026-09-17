import Image from "next/image";
import Link from "next/link";

export default function Header({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark";

  return (
    <nav className="relative z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <Link href="/" className="flex items-center" aria-label="Flight Genius home">
          <span
            className={
              isDark
                ? "bg-white rounded-xl px-3 py-1.5 shadow-md"
                : "block"
            }
          >
            <Image
              src="/logo.jpeg"
              alt="Flight Genius"
              width={180}
              height={72}
              className="h-11 w-auto object-contain rounded-lg"
              unoptimized
              priority
            />
          </span>
        </Link>
      </div>
    </nav>
  );
}
