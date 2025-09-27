import ProtectedPage from "../../components/auth/ProtectedPage";

export default function RisksLog() {
  return (
    <ProtectedPage>
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">سجل المخاطر</h1>
        <p className="text-gray-600">صفحة سجل المخاطر</p>
      </div>
    </ProtectedPage>
  );
}
