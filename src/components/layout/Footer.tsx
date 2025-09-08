export default function Footer() {
  return (
    <footer className="w-full border-t bg-white text-center dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
