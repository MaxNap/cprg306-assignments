"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
      window.location.href = "/week-9/shopping-list";
    } catch (error) {
      console.log("Sign-in error:", error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log("Sign-out error:", error);
    }
  }

  console.dir(user);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Firebase Auth</h1>
        <p className="text-gray-600">Please sign in to continue</p>
      </header>

      {user ? (
        <section className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold">Welcome {user.displayName}</p>
            <p className="text-sm text-gray-700">Email: {user.email}</p>
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto mt-2"
            />
          </div>

          <Link
            href="/week-9/shopping-list"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Shopping List
          </Link>

          <button
            onClick={handleSignOut}
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </section>
      ) : (
        <section>
          <button
            onClick={handleSignIn}
            type="button"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Sign In with GitHub
          </button>
        </section>
      )}
      <Link
        href="../"
        className="mt-6 block mx-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Back to Home Page
      </Link>
    </main>
  );
}
