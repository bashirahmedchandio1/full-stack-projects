"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/settings/sidebar-nav";
import { ProfileForm } from "@/components/settings/profile-form";
import { SecurityForm } from "@/components/settings/security-form";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { Separator } from "@/components/ui/separator";
import { User, Shield, Palette } from "lucide-react";

const sidebarNavItems = [
  {
    id: "profile",
    title: "Profile",
    icon: User,
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
  },
];

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            activeItem={activeTab}
            onItemClick={setActiveTab}
          />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "security" && <SecurityForm />}
          {activeTab === "appearance" && <AppearanceForm />}
        </div>
      </div>
    </div>
  );
}
