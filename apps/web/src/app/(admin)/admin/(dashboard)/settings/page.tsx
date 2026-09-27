"use client";

import type { AdminRole } from "@/components/layout/admin-sidebar";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { AdminSettings } from "@/features/settings/components/admin-settings";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  return (
    <div className="space-y-6">
      <AdminSettings currentRole={currentRole} onRoleChange={() => {}} />
    </div>
  );
}
