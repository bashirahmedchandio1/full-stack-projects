"use client";

import Link from "next/link";
import { Facebook, Instagram, Icon as TikTokIcon } from "lucide-react";

export default function Footers() {
  return (
    <footer className="w-full py-6 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Brand Name */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          MWK Store
        </h1>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Facebook className="w-6 h-6" />
          </Link>

          <Link
            href="https://www.tiktok.com"
            target="_blank"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            {/* TikTok icon (custom SVG) */}
            <svg
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M448,209.1a210.06,210.06,0,0,1-122.77-39.25V346.83a165.17,165.17,0,1,1-137.94-163.3v84.41a82.6,82.6,0,1,0,57.4,78.89V0h80.54a127.62,127.62,0,0,0,1.94,23.32A122.36,122.36,0,0,0,373.22,97,122.78,122.78,0,0,0,448,121.06Z" />
            </svg>
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition"
          >
            <Instagram className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
