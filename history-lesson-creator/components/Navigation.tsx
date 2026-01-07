"use client";

import Link from "next/link";
import { Book } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <div className="rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 p-2">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">History Lesson Creator</h1>
              <p className="text-xs text-gray-600">American History - 7th Grade</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
