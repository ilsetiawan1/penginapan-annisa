"use client";

import { AdminSettings } from "@/features/admin/settings/components/admin-settings";
import { useAuth } from "@/features/auth/hooks/use-auth";
import type { AdminRole } from "@/components/layout/admin-sidebar";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const currentRole: AdminRole = (user?.role as AdminRole) || "staff";

  return (
    <div className="space-y-6">
      <AdminSettings
        currentRole={currentRole}
        onRoleChange={() => {}}
      />
    </div>
  );
}
