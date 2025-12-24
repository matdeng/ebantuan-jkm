// app/(user)/layout.tsx
"use client";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect admin to admin layout
  useEffect(() => {
      if (status === "authenticated") {
        if (session?.user?.role === "PENTADBIR_SYSTEM") {
          router.push("/admin-dashboard");  // Unik path!
        } else {
          router.push("/user-dashboard");        // User path
        }
      }
    }, [status]);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
