import ProtectedPage from "../../components/auth/ProtectedPage";

export default function Schedules() {
  return (
    <ProtectedPage>
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          الجداول الزمنية
        </h1>
        <p className="text-gray-600">صفحة الجداول الزمنية</p>
      </div>
    </ProtectedPage>
  );
}
