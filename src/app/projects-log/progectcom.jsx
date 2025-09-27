"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Bar, Line, Scatter } from "react-chartjs-2";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import Heading from "../../components/ui/Heading";
import Row from "../../components/ui/Row";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  box-sizing: border-box;
  background: linear-gradient(-2deg, #023002, #0f172a);
  min-height: 100vh;
  position: relative;
  direction: rtl;

  @media (max-width: 1200px) {
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ProjectHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #1e293b;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 80px;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ProjectTitle = styled(motion.h1)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const ProjectDate = styled(motion.div)`
  font-size: 1.2rem;
  color: #d1d5db;
  background: #1e293b;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Card = styled(motion.div)`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.3);
  }
`;

const CardTitle = styled(motion.h3)`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartContainer = styled(motion.div)`
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailsCard = styled(motion.div)`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 250px;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.3);
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #d1d5db;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 0.8rem;
  color: #ffffff;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  background: ${(props) =>
    props.status === "regular"
      ? "#10b981"
      : props.status === "delayed"
      ? "#ef4444"
      : "#f59e0b"};
  color: #ffffff;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981, #22c55e);
  width: ${(props) => props.percentage}%;
  transition: width 0.8s ease;
  border-radius: 4px;
`;

const ScopeSection = styled(motion.div)`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 250px;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.3);
  }
`;

const ScopeTitle = styled(motion.h3)`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ScopeDescription = styled.p`
  font-size: 0.8rem;
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ScopeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ScopeItem = styled.li`
  font-size: 0.8rem;
  color: #d1d5db;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem 0;
`;

const NavButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #10b981, #22c55e);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    transform: translateY(-1px);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
    transform: none;
  }
`;

const DashboardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RiskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  text-align: right;
  padding: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  color: #ffffff;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
`;

const TableCell = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #d1d5db;
  font-size: 0.8rem;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const AchievementItem = styled.li`
  font-size: 0.8rem;
  color: #d1d5db;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  line-height: 1.5;

  &:last-child {
    border-bottom: none;
  }
`;

const QualityCharts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptySection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #1e293b;
  border-radius: 8px;
  color: #d1d5db;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const EmptyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

function ProjectsLog() {
  // Mock data for different projects
  const projectsData = [
    {
      id: 1,
      title:
        "إنشاء وتجهيز مجمع المزارع النموذجية للإنتاج الحيواني بالمدينة المنورة",
      date: "سبتمبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [98, 2],
        total: "10.5M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
        actual: [0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 7, 0],
        actual: [100, 100, 5, 0],
      },
      risks: [
        {
          id: 1,
          risk: "تأخر في صرف المستخلصات",
          solution: "تكثيف المتابعة مع الادارة المالية",
        },
        {
          id: 2,
          risk: "موقع الارض",
          solution:
            "التاكد من ابتعاد موقع المشروع بما يزيد عن 2 كيلو عن اقرب منطقة سكنية",
        },
      ],
      achievements: [
        "الموقع العام (انهاء أعمال تجهيز الطرق للموقع و عمل المدقات الخاصة بطرق المشروع تحت الطبقات الاسفلتية للطرق واستكمال اخذ الجسات بالموقع)",
      ],
      quality: {
        deliverables: { approved: 4, total: 4 },
        technical: { total: 35, data: [1, 2, 8, 12, 12] },
      },
      riskAssessment: [
        { x: 4, y: 3, label: "1" },
        { x: 2, y: 2, label: "2" },
      ],
    },
    {
      id: 2,
      title: "مشروع تطوير البنية التحتية للمنطقة الصناعية الجديدة",
      date: "أكتوبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [85, 15],
        total: "25.8M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        actual: [0, 3, 8, 12, 18, 22, 28, 32, 38, 42],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 45, 10],
        actual: [100, 100, 42, 8],
      },
      risks: [
        {
          id: 1,
          risk: "تأخير في الحصول على التراخيص",
          solution: "التنسيق المسبق مع الجهات المعنية",
        },
        {
          id: 2,
          risk: "ارتفاع تكاليف المواد",
          solution: "تحديث العقد مع المقاول",
        },
      ],
      achievements: [
        "انتهاء التصميمات التفصيلية",
        "استكمال أعمال الحفر والردم",
        "بدء أعمال البنية التحتية",
      ],
      quality: {
        deliverables: { approved: 8, total: 10 },
        technical: { total: 42, data: [2, 3, 5, 15, 17] },
      },
      riskAssessment: [
        { x: 3, y: 4, label: "1" },
        { x: 4, y: 2, label: "2" },
      ],
    },
    {
      id: 3,
      title: "مشروع إنشاء مجمع تعليمي متكامل",
      date: "نوفمبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [70, 30],
        total: "18.2M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72],
        actual: [0, 6, 14, 20, 28, 35, 42, 50, 58, 65],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 72, 25],
        actual: [100, 100, 65, 20],
      },
      risks: [
        {
          id: 1,
          risk: "تأخير في تسليم الموقع",
          solution: "متابعة مستمرة مع الجهة المالكة",
        },
        {
          id: 2,
          risk: "نقص في العمالة الماهرة",
          solution: "التعاقد مع شركات إضافية",
        },
      ],
      achievements: [
        "انتهاء التصميمات المعمارية والإنشائية",
        "بدء أعمال الحفر",
        "استكمال أعمال الأساسات",
      ],
      quality: {
        deliverables: { approved: 12, total: 15 },
        technical: { total: 28, data: [1, 2, 3, 8, 14] },
      },
      riskAssessment: [
        { x: 2, y: 3, label: "1" },
        { x: 3, y: 2, label: "2" },
      ],
    },
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projectsData[currentProjectIndex];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
          callback: function (value) {
            return value + "%";
          },
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          color: "#ffffff",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "الاحتمالية",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        min: 1,
        max: 5,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "التأثير",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        min: 1,
        max: 5,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  const handlePrevious = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentProjectIndex < projectsData.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  // Dynamic chart data based on current project
  const financialData = {
    labels: currentProject.financial.labels,
    datasets: [
      {
        data: currentProject.financial.data,
        backgroundColor: ["#3b82f6", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: currentProject.performance.labels,
    datasets: [
      {
        label: "المخطط",
        data: currentProject.performance.planned,
        borderColor: "#6b7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        tension: 0.4,
        borderDash: [5, 5],
      },
      {
        label: "الفعلي",
        data: currentProject.performance.actual,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const stagesData = {
    labels: currentProject.stages.labels,
    datasets: [
      {
        label: "المخطط",
        data: currentProject.stages.planned,
        backgroundColor: "#f59e0b",
      },
      {
        label: "الفعلي",
        data: currentProject.stages.actual,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const qualityDeliverablesData = {
    labels: ["معتمد مع ملاحظات"],
    datasets: [
      {
        data: [currentProject.quality.deliverables.approved],
        backgroundColor: ["#8b5cf6"],
        borderWidth: 0,
      },
    ],
  };

  const qualityTechnicalData = {
    labels: [
      "تحت الدراسة",
      "يعاد التسليم",
      "متأخر",
      "معتمد مع ملاحظات",
      "معتمد بدون ملاحظات",
    ],
    datasets: [
      {
        data: currentProject.quality.technical.data,
        backgroundColor: [
          "#10b981",
          "#34d399",
          "#f59e0b",
          "#8b5cf6",
          "#3b82f6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const riskAssessmentData = {
    datasets: [
      {
        label: "المخاطر",
        data: currentProject.riskAssessment.map((risk) => ({
          x: risk.x,
          y: risk.y,
          label: risk.label,
        })),
        backgroundColor: ["#f59e0b", "#ef4444"],
        borderColor: ["#f59e0b", "#ef4444"],
        pointRadius: 12,
        pointHoverRadius: 16,
        borderWidth: 2,
      },
    ],
  };
  return (
    <Container>
      <ProjectHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProjectTitle
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentProject.title}
        </ProjectTitle>
        <ProjectDate
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {currentProject.date}
        </ProjectDate>
      </ProjectHeader>

      <DashboardSection>
        {/* الاداء الحالي للمشروع */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            الاداء الحالي للمشروع
          </CardTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Line data={performanceData} options={lineOptions} />
          </ChartContainer>
        </Card>

        {/* مراحل المشروع */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            مراحل المشروع
          </CardTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Bar data={stagesData} options={chartOptions} />
          </ChartContainer>
        </Card>

        {/* المخاطر */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            المخاطر
          </CardTitle>
          <RiskTable>
            <thead>
              <tr>
                <TableHeader>الرقم</TableHeader>
                <TableHeader>المخاطر</TableHeader>
                <TableHeader>الحل</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentProject.risks.map((risk) => (
                <tr key={risk.id}>
                  <TableCell>{risk.id}</TableCell>
                  <TableCell>{risk.risk}</TableCell>
                  <TableCell>{risk.solution}</TableCell>
                </tr>
              ))}
            </tbody>
          </RiskTable>
        </Card>
      </DashboardSection>

      <BottomSection>
        {/* ما تم انجازه */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            ما تم انجازه
          </CardTitle>
          <AchievementList>
            {currentProject.achievements.map((achievement, index) => (
              <AchievementItem key={index}>{achievement}</AchievementItem>
            ))}
          </AchievementList>
          <div>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                استلامات اعمال
              </div>
            </div>
            <ChartContainer style={{ height: "15rem" }}>
              <Doughnut
                data={qualityDeliverablesData}
                options={doughnutOptions}
              />
            </ChartContainer>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                  }}
                ></div>
                <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>
                  معتمد مع ملاحظات
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* ادارة الجودة */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            ادارة الجودة
          </CardTitle>
          <QualityCharts>
            <div>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  اعتمادات فنية
                </div>
                <div
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {currentProject.quality.technical.total}
                </div>
              </div>
              <ChartContainer style={{ height: "15rem" }}>
                <Doughnut
                  data={qualityTechnicalData}
                  options={doughnutOptions}
                />
              </ChartContainer>
            </div>
          </QualityCharts>
          <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#f59e0b",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>متأخر</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#8b5cf6",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>معتمد مع ملاحظات</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#34d399",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>يعاد التسليم</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>تحت الدراسة</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>معتمد بدون ملاحظات</span>
            </div>
          </div>
        </Card>

        {/* تقييم المخاطر */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            تقييم المخاطر
          </CardTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Scatter data={riskAssessmentData} options={scatterOptions} />
          </ChartContainer>
        </Card>
      </BottomSection>

      <BottomSection>
        {/* لا يوجد */}
        <EmptySection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <EmptyIcon>📷</EmptyIcon>
          <div>لا يوجد</div>
        </EmptySection>

        {/* البيانات المالية */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            البيانات المالية
          </CardTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <Doughnut data={financialData} options={doughnutOptions} />
          </ChartContainer>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <div
              style={{
                fontSize: "2.4rem",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {currentProject.financial.total}
            </div>
            <div style={{ fontSize: "1.2rem", color: "#d1d5db" }}>
              إجمالي المبلغ
            </div>
          </div>
        </Card>

        {/* مؤشر انجاز المشروع */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <CardTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            مؤشر انجاز المشروع
          </CardTitle>
          <div style={{ textAlign: "center", marginBottom: "1.6rem" }}>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "700",
                color: "#10b981",
              }}
            >
              {
                currentProject.performance.actual[
                  currentProject.performance.actual.length - 1
                ]
              }
              %
            </div>
            <div style={{ fontSize: "1.4rem", color: "#d1d5db" }}>
              نسبة الانجاز الفعلي
            </div>
          </div>
          <DetailRow>
            <DetailLabel>المخطط له:</DetailLabel>
            <DetailValue>
              {
                currentProject.performance.planned[
                  currentProject.performance.planned.length - 1
                ]
              }
              %
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>الحياد:</DetailLabel>
            <DetailValue style={{ color: "#ef4444" }}>
              {currentProject.performance.actual[
                currentProject.performance.actual.length - 1
              ] -
                currentProject.performance.planned[
                  currentProject.performance.planned.length - 1
                ]}
              %
            </DetailValue>
          </DetailRow>
          <ProgressBar>
            <ProgressFill
              percentage={
                currentProject.performance.actual[
                  currentProject.performance.actual.length - 1
                ]
              }
            />
          </ProgressBar>
        </Card>
      </BottomSection>

      <NavigationContainer>
        <NavButton
          onClick={handlePrevious}
          disabled={currentProjectIndex === 0}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineChevronLeft />
          السابق
        </NavButton>
        <NavButton
          onClick={handleNext}
          disabled={currentProjectIndex === projectsData.length - 1}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          التالي
          <HiOutlineChevronRight />
        </NavButton>
      </NavigationContainer>
    </Container>
  );
}

export default ProjectsLog;
