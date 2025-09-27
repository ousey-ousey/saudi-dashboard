import ProtectedPage from "../../components/auth/ProtectedPage";

export default function IncomingLetters() {
  return (
    <ProtectedPage title="الخطابات الواردة">
      <div
        className="p-6"
        dir="rtl"
        style={{
          background: "linear-gradient(-2deg, #023002, #0f172a)",
          minHeight: "100vh",
        }}
      >
        <h1 className="text-2xl font-bold text-white mb-4">الخطابات الواردة</h1>
        <p className="text-white">صفحة الخطابات الواردة</p>
      </div>
    </ProtectedPage>
  );
}
