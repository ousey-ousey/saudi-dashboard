import ProtectedPage from "../../components/auth/ProtectedPage";

export default function Analytics() {
  return (
    <ProtectedPage title="التحليلات والتقارير">
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">التحليلات</h1>
        <p className="text-gray-600">صفحة التحليلات والتقارير</p>
      </div>
    </ProtectedPage>
  );
}
