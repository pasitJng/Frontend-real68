import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 p-4 bg-white shadow-sm">
      <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 list-none">
        <li>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-500 px-2 py-1 transition-colors duration-200 aria-[current=page]:font-bold aria-[current=page]:border-b-2 aria-[current=page]:border-blue-500"
            aria-current={typeof window !== "undefined" && window.location.pathname === "/" ? "page" : undefined}
          >
            หน้าแรก
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-500 px-2 py-1 transition-colors duration-200 aria-[current=page]:font-bold aria-[current=page]:border-b-2 aria-[current=page]:border-blue-500"
            aria-current={typeof window !== "undefined" && window.location.pathname === "/about" ? "page" : undefined}
          >
            เกี่ยวกับ
          </Link>
        </li>
        <li>
          <Link
            href="/service"
            className="text-gray-700 hover:text-blue-500 px-2 py-1 transition-colors duration-200 aria-[current=page]:font-bold aria-[current=page]:border-b-2 aria-[current=page]:border-blue-500"
            aria-current={typeof window !== "undefined" && window.location.pathname === "/service" ? "page" : undefined}
          >
            บริการของเรา
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-blue-500 px-2 py-1 transition-colors duration-200 aria-[current=page]:font-bold aria-[current=page]:border-b-2 aria-[current=page]:border-blue-500"
            aria-current={typeof window !== "undefined" && window.location.pathname === "/contact" ? "page" : undefined}
          >
            ติดต่อ
          </Link>
        </li>
      </ul>
    </nav>
  );
}