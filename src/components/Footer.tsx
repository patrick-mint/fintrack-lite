"use client";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-4 text-center text-sm text-gray-500">
      <div>© {new Date().getFullYear()} FinTrack Lite</div>
      <div className="mt-1">Built with ❤️ by Patrick Mint</div>
    </footer>
  );
}
