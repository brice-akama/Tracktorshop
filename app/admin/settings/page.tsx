"use client";

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast

// Define the types for the settings interface
interface Settings {
  general: {
    siteName: string;
    siteLogo: string;
  };
  user: {
    maxLoginAttempts: number;
    allowSocialLogin: boolean;
  };
  security: {
    enable2FA: boolean;
    passwordMinLength: number;
  };
  appearance: {
    theme: string;
  };
  seo: {
    metaTitle: string;
  };
  backup: {
    autoBackup: boolean;
  };
  performance: {
    cacheEnabled: boolean;
  };
}

// Component for the settings page
const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<Settings>({
    general: { siteName: '', siteLogo: '' },
    user: { maxLoginAttempts: 5, allowSocialLogin: false },
    security: { enable2FA: false, passwordMinLength: 8 },
    appearance: { theme: 'light' },
    seo: { metaTitle: '' },
    backup: { autoBackup: false },
    performance: { cacheEnabled: false },
  });

  // Fetch settings from the API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();

        if (response.ok) {
          setSettings(data);
          setSettingsId(data._id);
        } else {
          setError(data.message);
          toast.error("Failed to load settings."); // Error toast
        }
      } catch (err) {
        setError("Failed to load settings.");
        toast.error("An error occurred while fetching settings."); // Error toast
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle change in settings
  const handleChange = (category: keyof Settings, key: string, value: string | boolean | number) => {
    setSettings((prev) => ({
      ...prev!,
      [category]: {
        ...prev![category],
        [key]: value,
      },
    }));
  };

  // Handle form submission to update settings
  const handleSubmit = async () => {
    if (!settingsId) {
      setError("Settings ID is missing!");
      toast.error("Settings ID is missing!"); // Error toast
      return;
    }

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settingsId, updatedSettings: settings }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Settings updated successfully!"); // Success toast
      } else {
        setError("Error updating settings: " + data.message);
        toast.error("Error updating settings: " + data.message); // Error toast
      }
    } catch (err) {
      setError("An error occurred while updating settings.");
      toast.error("An error occurred while updating settings."); // Error toast
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Admin Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* General Settings */}
        <SettingSection title="General Settings">
          <SettingInput
            label="Site Name"
            value={settings?.general?.siteName || ''}
            onChange={(val: string) => handleChange("general", "siteName", val)}
          />
          <SettingInput
            label="Logo URL"
            value={settings?.general?.siteLogo || ''}
            onChange={(val: string) => handleChange("general", "siteLogo", val)}
          />
        </SettingSection>

        {/* User Settings */}
        <SettingSection title="User Settings">
          <SettingInput
            label="Max Login Attempts"
            type="number"
            value={settings?.user?.maxLoginAttempts.toString() || ''}
            onChange={(val: string) => handleChange("user", "maxLoginAttempts", parseInt(val))}
          />
          <SettingSelect
            label="Allow Social Login"
            value={settings?.user?.allowSocialLogin.toString() || ''}
            options={{ true: "Yes", false: "No" }}
            onChange={(val: string) => handleChange("user", "allowSocialLogin", val === "true")}
          />
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security Settings">
          <SettingSelect
            label="Enable 2FA"
            value={settings?.security?.enable2FA.toString() || ''}
            options={{ true: "Enabled", false: "Disabled" }}
            onChange={(val: string) => handleChange("security", "enable2FA", val === "true")}
          />
          <SettingInput
            label="Min Password Length"
            type="number"
            value={settings?.security?.passwordMinLength.toString() || ''}
            onChange={(val: string) => handleChange("security", "passwordMinLength", parseInt(val))}
          />
        </SettingSection>

        {/* Appearance Settings */}
        <SettingSection title="Appearance Settings">
          <SettingSelect
            label="Theme"
            value={settings?.appearance?.theme || ''}
            options={{ light: "Light", dark: "Dark" }}
            onChange={(val: string) => handleChange("appearance", "theme", val)}
          />
        </SettingSection>

        {/* SEO Settings */}
        <SettingSection title="SEO Settings">
          <SettingInput
            label="Meta Title"
            value={settings?.seo?.metaTitle || ''}
            onChange={(val: string) => handleChange("seo", "metaTitle", val)}
          />
        </SettingSection>

        {/* Backup Settings */}
        <SettingSection title="Backup Settings">
          <SettingSelect
            label="Auto Backup"
            value={settings?.backup?.autoBackup.toString() || ''}
            options={{ true: "Enabled", false: "Disabled" }}
            onChange={(val: string) => handleChange("backup", "autoBackup", val === "true")}
          />
        </SettingSection>

        {/* Performance Settings */}
        <SettingSection title="Performance Settings">
          <SettingSelect
            label="Enable Cache"
            value={settings?.performance?.cacheEnabled.toString() || ''}
            options={{ true: "Enabled", false: "Disabled" }}
            onChange={(val: string) => handleChange("performance", "cacheEnabled", val === "true")}
          />
        </SettingSection>
      </div>

      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Settings
      </button>

      {/* Add Toaster component to show toasts */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

// Component for each section of settings
interface SettingSectionProps {
  title: string;
  children: React.ReactNode; // This allows you to pass any valid JSX content as children
}

const SettingSection = ({ title, children }: SettingSectionProps) => (
  <div className="bg-white p-4 shadow rounded-lg">
    <h2 className="text-lg font-bold">{title}</h2>
    {children}
  </div>
);


// Component for input fields
interface SettingInputProps {
  label: string;
  value: string;
  type?: "text" | "number";
  onChange: (val: string) => void;
}

const SettingInput = ({ label, value, type = "text", onChange }: SettingInputProps) => (
  <label className="block mt-2">
    {label}: 
    <input 
      type={type} 
      className="border p-2 w-full rounded mt-1" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </label>
);

// Component for select dropdowns
interface SettingSelectProps {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (val: string) => void;
}

const SettingSelect = ({ label, value, options, onChange }: SettingSelectProps) => (
  <label className="block mt-2">
    {label}: 
    <select
      className="border p-2 w-full rounded mt-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.entries(options).map(([key, val]) => (
        <option key={key} value={key}>{val}</option>
      ))}
    </select>
  </label>
);

export default SettingsPage;
