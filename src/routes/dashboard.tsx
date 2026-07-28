import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CitizenDashboard } from "@/components/dashboard/CitizenDashboard";
import type { UserProfile } from "@/data/types";
import { AuthModal } from "@/components/AuthModal";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleOpenLogin = () => {
    setAuthMode("login");
    setShowAuth(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-obsidian selection:bg-ember/20 relative pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-fog hover:text-obsidian transition-colors bg-white border border-cloud px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to ApniSabha Home
        </Link>
      </div>
      
      <CitizenDashboard user={user} onOpenLogin={handleOpenLogin} />
      
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode={authMode}
        onSuccess={(u) => {
          setUser(u);
          setShowAuth(false);
        }}
      />
    </div>
  );
}
