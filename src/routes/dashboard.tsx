import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CitizenDashboard } from "@/components/dashboard/CitizenDashboard";
import type { UserProfile } from "@/data/types";
import { AuthModal } from "@/components/AuthModal";

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
    <div className="min-h-screen bg-paper font-sans text-obsidian selection:bg-ember/20">
      <CitizenDashboard user={user} onOpenLogin={handleOpenLogin} onLogout={handleLogout} />
      
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
