import { Suspense } from "react";
import { LoginPanel } from "./login-panel";

export const metadata = {
  title: "Admin login",
  description: "Sign in to the Merxano admin dashboard.",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <LoginPanel />
    </Suspense>
  );
}
