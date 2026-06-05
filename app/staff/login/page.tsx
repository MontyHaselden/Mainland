import { StaffLoginForm } from "@/components/dashboard/staff-login-form";

export const metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <StaffLoginForm />
    </div>
  );
}
