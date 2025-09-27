import ProtectedPage from "../../components/auth/ProtectedPage";

export default function BudgetPlanning() {
  return (
    <ProtectedPage>
      <div className="p-6" dir="rtl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          تخطيط الميزانية
        </h1>
        <p className="text-gray-600">صفحة تخطيط الميزانية</p>
      </div>
    </ProtectedPage>
  );
}
