"use client";
export default function UserDashboard() {
  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 px-8 pt-8">Dashboard Pemohon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-12">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Permohonan Saya</h3>
          <p className="text-4xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">0</p>
          <p className="text-sm text-slate-500 mt-2">Belum ada permohonan</p>
        </div>

        {/* Card 2: Status Semasa */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Status Semasa</h3>
          <div className="flex items-center justify-center h-24">
            <span className="text-xl font-semibold text-green-600">Tiada permohonan aktif</span>
          </div>
        </div>

        {/* Card 3: Bantuan Terkini */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Bantuan Terkini</h3>
          <p className="text-sm text-slate-500">Tiada rekod bantuan</p>
        </div>
      </div>
    </div>
  );
}
