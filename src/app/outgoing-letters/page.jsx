import ProtectedPage from "../../components/auth/ProtectedPage";

export default function OutgoingLetters() {
  return (
    <ProtectedPage>
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          الخطابات الصادرة
        </h1>
        <p className="text-gray-600">صفحة الخطابات الصادرة</p>
      </div>
    </ProtectedPage>
  );
}
