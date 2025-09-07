import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white dark:border-neutral-800 dark:bg-black">
      <Link href="/" className="px-4 py-2 hover:underline">
        Home
      </Link>
      <Link href="/menu" className="px-4 py-2 hover:underline">
        Menu
      </Link>
      <Link href="/about" className="px-4 py-2 hover:underline">
        About
      </Link>
      <Link href="/admin" className="px-4 py-2 hover:underline">
        Admin
      </Link>
    </nav>
  );
}
