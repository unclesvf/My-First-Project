"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import StudentCard from "./StudentCard";
import type { StudentInfo } from "@/lib/firebase/types";

interface StudentWithProgress extends StudentInfo {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
}

interface StudentListProps {
  students: StudentWithProgress[];
  loading: boolean;
}

export default function StudentList({ students, loading }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students by search query
  const filteredStudents = students.filter((student) =>
    student.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-gray-200"
          ></div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">👥</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          No students yet
        </h3>
        <p className="text-gray-600">
          Click &quot;Add Student&quot; to create your first student account
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 py-2 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
        />
      </div>

      {/* Student Cards */}
      {filteredStudents.length === 0 ? (
        <div className="py-8 text-center text-gray-600">
          No students found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <StudentCard key={student.uid} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}
