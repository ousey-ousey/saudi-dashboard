import ProtectedPage from "../../components/auth/ProtectedPage";

export default function QualityControl() {
  return (
    <ProtectedPage>
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">مراقبة الجودة</h1>
        <p className="text-gray-600">صفحة مراقبة الجودة</p>
      </div>
    </ProtectedPage>
  );
}
