"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // Use full page reload to guarantee cookies update immediately
    window.location.href = "/auth/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
