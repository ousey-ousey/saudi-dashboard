import ProtectedPage from "../../components/auth/ProtectedPage";
import Analyticsoo from "./Anylitics1";

export default function Analytics() {
  return (
    <ProtectedPage title="التحليلات والتقارير">
      <div
        className="p-6"
        dir="rtl"
        style={{
          background: "linear-gradient(-2deg, #023002, #0f172a)",
          minHeight: "100vh",
        }}
      >
        <Analyticsoo />
      </div>
    </ProtectedPage>
  );
}
