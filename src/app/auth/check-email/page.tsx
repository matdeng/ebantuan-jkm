"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckEmail() {
  const [status, setStatus] = useState<"loading" | "verified" | "expired" | "error">("loading");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  // const email = searchParams.get("email");

  console.log("Verification token:", token);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      console.log("Verification response:", data);
      if (data.success) {
        setStatus("verified");
        setTimeout(() => router.push("/auth/login"), 3000);
      } else {
        setStatus("expired");
      }
    } catch {
      setStatus("error");
    }
  };

  const resendEmail = async () => {
    const res = await fetch("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({
        emailToken: searchParams.get("token")  // Pass current token
      })
    });

    if (res.ok) {
      alert("Emel pengesahan dihantar semula!");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 p-4">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-spin">
            <span className="text-white font-bold">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Sedang Dalam Pengesahan...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-md w-full mx-4 bg-white rounded-3xl shadow-2xl p-12 text-center">
        {status === "verified" && (
          <>
            <div className="w-24 h-24 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white font-bold">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Pengesahan Alamat E-mel Berjaya!</h1>
            <p className="text-slate-600 mb-8">Anda akan dibawa ke log masuk...</p>
          </>
        )}

        {status === "expired" && (
          <>
            <div className="w-24 h-24 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white font-bold">!</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Pengesahan Alamat E-mel Tamat Tempoh</h1>
            <p className="text-slate-600 mb-8">Sila hantar semula emel pengesahan.</p>
            <button
              onClick={resendEmail}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-2xl font-bold transition-all duration-200"
            >
              Hantar Semula Emel
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-24 h-24 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white font-bold">!</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ralat Pengesahan</h1>
            <p className="text-slate-600 mb-8">Pautan tidak sah.</p>
            <button
              onClick={() => router.push("/auth/register")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-2xl font-bold transition-all duration-200"
            >
              Daftar Semula
            </button>
          </>
        )}
      </div>
    </div>
  );
}
