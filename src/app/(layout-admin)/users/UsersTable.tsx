"use client";
import { formatDateTime } from '@/helpers';
import { useState } from "react";
import Link from 'next/link';

type UserRow = {
    id: number;
    name: string;
    email: string;
    role: string;
    created: string;
};

export default function UsersTable({ initialUsers }: { initialUsers: UserRow[] }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10; // 10 users per page

    const filteredUsers = initialUsers.filter((user) =>
        (user.name + user.email).toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {/* Search + Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Cari nama atau email..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on search
                    }}
                    className="flex-1 max-w-md px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                />
                <Link
                    href="/users/new"
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm whitespace-nowrap"
                >
                    Tambah Pengguna
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Bil
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Peranan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Tarikh Daftar
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                    Tindakan
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            {currentUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-slate-900">
                                            {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-slate-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${user.role === "Pentadbir"
                                                ? "bg-orange-100 text-orange-800"
                                                : "bg-blue-100 text-blue-800"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {formatDateTime(user.created)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-orange-600 hover:text-orange-900 mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Padam
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {currentUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-sm text-slate-500"
                                    >
                                        Tiada pengguna ditemui.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ✅ PAGINATION */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                            {/* Info */}
                            <div className="text-sm text-slate-700">
                                Menunjukkan {(currentPage - 1) * USERS_PER_PAGE + 1} hingga{' '}
                                {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} daripada{' '}
                                {filteredUsers.length} pengguna
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Sebelumnya
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${currentPage === page
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Seterusnya
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
