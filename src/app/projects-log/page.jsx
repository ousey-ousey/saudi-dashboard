import ProtectedPage from "../../components/auth/ProtectedPage";
import ProjectsLogComponent from "./progectcom";

export default function ProjectsLog() {
  return (
    <ProtectedPage title="سجل المشاريع">
      <div
        className="p-6"
        dir="rtl"
        style={{
          background: "linear-gradient(-2deg, #023002, #0f172a)",
          minHeight: "100vh",
        }}
      >
        <ProjectsLogComponent />
      </div>
    </ProtectedPage>
  );
}
