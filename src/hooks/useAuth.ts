// src/hooks/useAuth.ts ✅
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Swal from "sweetalert2";

interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check cookie dulu, then localStorage
        const getToken = () => {
            // Cookie
            const cookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];

            if (cookie) return cookie;

            // localStorage backup
            return localStorage.getItem("token");
        };

        const token = getToken();

        if (token) {
            try {
                const decoded = jwt.decode(token) as any;
                if (decoded) {
                    setUser({
                        userId: decoded.userId,
                        name: decoded.name,
                        email: decoded.email,
                        role: decoded.role
                    });
                }
            } catch (error) {
                console.error('Invalid token');
                // Clear invalid token
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    }, []);

    const logout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('token');
        setUser(null);

        Swal.fire({
            icon: "success",
            title: "Berjaya Log Keluar!",
            // text: `Selamat datang, ${data.user.name}!`,
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            router.push('/login');
        });
        
        router.refresh();
    };

    return { user, loading, logout };
}
