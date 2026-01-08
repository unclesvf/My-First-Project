"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, User, Mail, Key, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createUserProfile, updateUserRole, createStudentAccount } from "@/lib/firebase/firestore";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentCreated: () => void;
}

export default function CreateStudentModal({
  isOpen,
  onClose,
  onStudentCreated,
}: CreateStudentModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const generatePassword = () => {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Create the student account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const studentUid = userCredential.user.uid;

      // Create user profile
      await createUserProfile(studentUid, formData.email, formData.name);

      // Set role as student with teacher ID
      await updateUserRole(studentUid, "student", user.uid);

      // Add to teacher's student list
      await createStudentAccount(user.uid, formData.email, formData.name, studentUid);

      setSuccess(true);
      setTimeout(() => {
        onStudentCreated();
        handleClose();
      }, 1500);
    } catch (err: any) {
      console.error("Failed to create student:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(err.message || "Failed to create student account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "" });
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      Create Student Account
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-600">
                      Add a new student to your class
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {success ? (
                  <div className="py-8 text-center">
                    <div className="mb-4 text-6xl">✅</div>
                    <h3 className="mb-2 text-xl font-semibold text-green-900">
                      Student Created!
                    </h3>
                    <p className="text-gray-600">
                      {formData.name} has been added to your class.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Student Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full rounded-lg border-2 border-gray-300 py-2 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full rounded-lg border-2 border-gray-300 py-2 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
                          placeholder="student@example.com"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                      >
                        Temporary Password
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            id="password"
                            type="text"
                            required
                            value={formData.password}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border-2 border-gray-300 py-2 pl-10 pr-4 transition-colors focus:border-primary-500 focus:outline-none"
                            placeholder="Enter password"
                            minLength={6}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={generatePassword}
                          className="rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                        >
                          Generate
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">
                        Share this password with the student. They can change it after
                        first login.
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="rounded-lg border-2 border-red-300 bg-red-50 p-3 text-sm text-red-900">
                        {error}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Create Student"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
