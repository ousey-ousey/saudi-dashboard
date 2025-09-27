import ProtectedPage from "../../components/auth/ProtectedPage";

export default function Schedules() {
  return (
    <ProtectedPage title="الجداول الزمنية">
      <div
        className="p-6"
        dir="rtl"
        style={{
          background: "linear-gradient(-2deg, #023002, #0f172a)",
          minHeight: "100vh",
        }}
      >
        <h1 className="text-2xl font-bold text-white mb-4">الجداول الزمنية</h1>
        <p className="text-white">صفحة الجداول الزمنية</p>
      </div>
    </ProtectedPage>
  );
}
