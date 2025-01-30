

// app/admin/logout/page.tsx
"use client";

import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Logic to handle logout (e.g., clearing session or token)
    // Redirect to the homepage or login page
    router.push("/admin/login");
  };

  return (
    <div className="logout-container">
      <h1>You are logged out</h1>
      <button onClick={handleLogout} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Log out
      </button>
    </div>
  );
};

export default LogoutPage;
