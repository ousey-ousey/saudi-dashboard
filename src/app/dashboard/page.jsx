"use client";

import { useState } from "react";
import ProtectedPage from "../../components/auth/ProtectedPage";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  Activity,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  FileText,
  RefreshCw,
  Home,
  Maximize2,
  Users,
  GitCommit,
} from "lucide-react";

// Legend styling variables
const LEGEND_STYLES = {
  container:
    "grid grid-cols-3  direction-rtl sm:grid-cols-3  gap-1 sm:gap-3 mt-2 sm:mt-3",
  item: "flex items-center gap-2 sm:gap-1 text-xs direction",
  dot: "w-1 h-1 sm:w-2 sm:h-2 rounded-full flex-shrink-0",
  text: "text-slate-300 text-right flex-1 text-[.5rem] ",
};

// Styled Components for Tooltips
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 999999;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom-color: #000;
  }
`;

// Small Donut Component
const SmallDonutCard = ({ title, series, labels, centerValue, colors }) => (
  <div className="border border-white/10 rounded-lg p-1 sm:p-2 bg-slate-800 w-full ">
    <div className="text-xs font-semibold text-white mb-1 sm:mb-2 text-center truncate">
      {title}
    </div>
    <div className="relative h-20 sm:h-24 w-full">
      <Chart
        options={{
          chart: { type: "donut", background: "transparent" },
          plotOptions: {
            pie: { donut: { size: "70%", labels: { show: false } } },
          },
          labels,
          legend: { show: false },
          dataLabels: { enabled: false },
          colors: colors || [
            "#8b5cf6",
            "#f59e0b",
            "#fbbf24",
            "#86efac",
            "#22c55e",
            "#ef4444",
          ],
        }}
        series={series}
        type="donut"
        height="100%"
      />
      {centerValue && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white text-center">
          {centerValue}
        </div>
      )}
    </div>
  </div>
);

export default function Dashboard() {
  const chartOptions = {
    theme: { mode: "dark" },
    chart: {
      background: "#0f172a",
      toolbar: { show: false },
      fontFamily: "inherit",
      locales: [
        {
          name: "ar",
        },
      ],
      defaultLocale: "ar",
    },
    colors: [
      "#63ff0385",
      "#f59e0b",
      "#fbbf24",
      "#fde047",
      "#86efac",
      "#22c55e",
      "#ef4444",
      "#f97316",
      "#06b6d4",
      "#3b82f6",
      "#84cc16",
      "#10b981",
      "#6366f1",
      "#d946ef",
    ],
    legend: {
      labels: { colors: "#ffffff" },
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "inherit",
      fontSize: "10px",
    },
    tooltip: {
      theme: "dark",
      rtl: true,
      y: {
        formatter: function (value) {
          if (typeof value === "number") {
            if (value > 1000000000)
              return (value / 1000000000).toFixed(2) + " بليون";
            if (value > 1000000) return (value / 1000000).toFixed(0) + " مليون";
            if (value > 1000) return (value / 1000).toFixed(0) + " ألف";
          }
          return value;
        },
      },
    },
    dataLabels: { enabled: false },
  };

  // Geographical Distribution Data
  const geographicalDistributionSeries = [
    { name: "الورد", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "المواشي", data: [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 4, 4] },
    {
      name: "المحاصيل البعليه",
      data: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 3, 3],
    },
    {
      name: "القيمة المضافة",
      data: [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2],
    },
    { name: "الفاكهة", data: [0, 1, 1, 1, 0, 0, 0, 1, 1, 2, 1, 2, 3, 2] },
    { name: "العسل", data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 4, 3] },
    { name: "البن العربي", data: [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 2, 1, 3, 2] },
    { name: "الاسماك", data: [0, 1, 1, 2, 1, 0, 1, 1, 1, 1, 3, 2, 5, 3] },
  ];

  // Sector Distribution Data
  const sectorDistributionSeriesCount = [20, 18, 6, 18, 12, 12, 9, 16];
  const sectorDistributionSeriesValue = [
    0.37, 0.24, 0.19, 0.12, 0.13, 0.09, 0.17, 0.22,
  ];
  const sectorDistributionSeriesValueFormatted = [
    370, 240, 190, 120, 130, 90, 170, 220,
  ]; // in millions
  const sectorDistributionLabels = [
    "الاسماك",
    "البن العربي",
    "العسل",
    "الفاكهة",
    "القيمة المضافة",
    "المحاصيل البعليه",
    "المواشي",
    "الورد",
  ];

  // Project Stages Data
  const projectStagesSeriesCount = [63, 21, 13, 9, 11, 4];
  const projectStagesSeriesValue = [0.74, 0.34, 0.05, 0.01, 0.13, 0.04];
  const projectStagesSeriesValueFormatted = [740, 340, 50, 10, 130, 40]; // in millions
  const projectStagesLabels = [
    "بدء المشروع",
    " فحص العروض",
    "تم الترسية",
    "تم التوقيع",
    "الطرح",
    "إنتهاء المشروع",
  ];

  // Project Types Data
  const projectTypesSeriesCount = [65, 19, 17, 3, 2, 2, 3];
  const projectTypesSeriesValue = [0.8, 0.25, 0.03, 0.05, 0.09, 0.03, 0.07];
  const projectTypesSeriesValueFormatted = [800, 250, 30, 50, 90, 30, 70]; // in millions
  const projectTypesLabels = [
    "انشاءات",
    "اعمال الخدمات",
    "توريدات",
    "تشغيل",
    "الاشراف",
    "استشارات",
    "تقنية المعلومات",
  ];

  // Budget Data
  const budgetChartSeries = [
    {
      name: "مبالغ تحت إجراءات الترسية",
      data: [366.45],
    },
    {
      name: "مشاريع تمت ترسيتها",
      data: [221.42],
    },
    {
      name: "الفرق بين التقديري و الفعلي",
      data: [2.22],
    },
    {
      name: "المبلغ المتبقي",
      data: [226.28],
    },
  ];

  // Completion Timeline Data
  const completionTimelineSeries = [
    {
      name: "المخطط التراكمي",
      type: "line",
      data: [5, 15, 24, 31, 41, 54, 66, 74, 81, 89, 95, 100],
    },
    {
      name: "الفعلي التراكمي",
      type: "line",
      data: [4, 14, 22, 29, 39, 52, 64, 72, 79, 87, 93, 98],
    },
    {
      name: "نسبة الانجاز المخطط",
      type: "line",
      data: [5, 12, 10, 7, 13, 22, 8, 13, 7, 8, 6, 5],
    },
    {
      name: "نسبة الانجاز الفعلي",
      type: "line",
      data: [4, 10, 8, 6, 10, 11, 7, 7, 6, 2, 5, 4],
    },
  ];

  // Quality Statistics Data
  const workReceiptsSeries = [3994, 916, 195, 119, 130, 19];
  const workReceiptsLabels = [
    "مرفوض",
    "متأخر",
    "معتمد مع ملاحظات",
    "يعاد التسليم",
    "تحت الدراسة",
    "معتمد بدون ملاحظات",
  ];

  const technicalApprovalsSeries = [3988, 2764, 398, 140, 56, 26];
  const technicalApprovalsLabels = [
    "مرفوض",
    "متأخر",
    "معتمد مع ملاحظات",
    "يعاد التسليم",
    "تحت الدراسة",
    "معتمد بدون ملاحظات",
  ];

  const changeOrdersSeries = [1, 1, 14];
  const changeOrdersLabels = ["مرفوض", "مفتوح", "معتمد"];

  const nonConformanceSeries = [3, 3, 11];
  const nonConformanceLabels = ["غير مطابق", "تحت المعالجة", "مطابق"];

  // Risk Management Data
  const risksTableData = [
    { id: 1, name: "تأخر تورسية المشاريع", impact: 4, probability: 3 },
    { id: 2, name: "تأخر في صرف المستحقات", impact: 3, probability: 4 },
    { id: 3, name: "عدم تفرغ الكادر", impact: 4, probability: 4 },
  ];

  const riskMatrixSeries = [
    {
      name: "المخاطر",
      data: [
        { x: 3, y: 4 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
      ],
    },
  ];

  return (
    <ProtectedPage title="لوحة بيانات المشاريع">
      <div
        className="p-2 sm:p-4 lg:p-6 overflow-visible"
        dir="rtl"
        style={{
          background: "linear-gradient(-2deg, #023002, #0f172a)",
        }}
      >
        {/* Main Grid Container - Matching the original grid structure */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 w-full"
          style={{
            gridTemplateAreas: `
              "distripution firstcharts secondcharts thiardcharts timeline timeline"
              "distripution firstcharts secondcharts thiardcharts achiveandabstract achiveandabstract"
              "qualitycheck qualitycheck budget budget budget posibilityanddanger"
              "qualitycheck qualitycheck lineofhalfyearsandstate lineofhalfyearsandstate lineofhalfyearsandstate posibilityanddanger"
            `,
          }}
        >
          {/* Geographical Distribution - distripution */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px] sm:min-h-[400px]"
            style={{ gridArea: "distripution" }}
          >
            <motion.h3 className="text-xs  font-semibold text-white mb-10  flex items-center justify-center gap-1">
              <BarChart3 size={14} />
              التوزيع الجغرافي للمشاريع
            </motion.h3>
            <div className="h-full w-full mx-auto">
              <Chart
                options={{
                  ...chartOptions,
                  chart: {
                    ...chartOptions.chart,
                    type: "bar",
                    stacked: true,
                    background: "transparent",
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                      barHeight: "80%",
                      borderRadius: 4,
                    },
                  },
                  xaxis: {
                    categories: [
                      "الجوف",
                      "تبوك",
                      "الباحة",
                      "عسير",
                      "الحدود الشمالية",
                      "القصيم",
                      "حائل",
                      "نجران",
                      "المدينة المنورة",
                      "المنطقة الشرقية",
                      "مكة المكرمة",
                      "الرياض",
                      "مناطق المملكة",
                      "جازان",
                    ],
                    labels: {
                      style: { colors: "#ffffff", fontSize: "7px" },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: { colors: "#ffffff", fontSize: "8px" },
                    },
                  },
                  grid: {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  legend: {
                    ...chartOptions.legend,
                    position: "bottom",
                    itemMargin: { horizontal: 5, vertical: 0 },
                    markers: { width: 5, height: 5 },
                    fontSize: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  },
                }}
                series={geographicalDistributionSeries}
                type="bar"
                height="80%"
                width="100%"
              />
            </div>
          </div>

          {/* Sector Distribution - firstcharts */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px]"
            style={{ gridArea: "firstcharts" }}
          >
            <motion.h3 className="text-xs  font-semibold text-white mb-10 flex items-center justify-center gap-1">
              <BarChart3 size={14} />
              توزيع المشاريع بالقطاعات
            </motion.h3>
            <div className="space-y-3 ">
              <div className="mb-10">
                <div className="text-xs text-white mb-1 text-center">العدد</div>
                <div className="h-24 sm:h-32">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: {
                        type: "donut",
                        background: "transparent",
                        fontFamily: "Cairo, sans-serif",
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".6rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                color: "#ffffff",
                                fontFamily: "Cairo, sans-serif",
                              },
                            },
                          },
                        },
                      },
                      labels: sectorDistributionLabels,
                      legend: { show: false },
                      dataLabels: {
                        enabled: false,
                        style: {
                          fontSize: "0.8rem",
                          fontFamily: "Cairo, sans-serif",
                          fontWeight: 600,
                        },
                      },
                      tooltip: {
                        ...chartOptions.tooltip,
                        style: {
                          fontSize: "0.9rem",
                          fontFamily: "Cairo, sans-serif",
                        },
                      },
                    }}
                    series={sectorDistributionSeriesCount}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-white mb-1 text-center">
                  القيمة (B)
                </div>
                <div className="h-24 sm:h-32">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "donut", background: "transparent" },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".7rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                offsetY: -5,
                                margin: -3,
                                fontFamily: "Cairo, sans-serif",
                                color: "#ffffff",
                                formatter: function (w) {
                                  const total = w.globals.seriesTotals.reduce(
                                    (a, b) => a + b
                                  );
                                  return (total / 1000).toFixed(1) + " B";
                                },
                              },
                            },
                          },
                        },
                      },
                      labels: sectorDistributionLabels,
                      legend: { show: false },
                      tooltip: {
                        ...chartOptions.tooltip,
                        y: {
                          formatter: function (val) {
                            return val.toFixed(0) + " M";
                          },
                        },
                      },
                    }}
                    series={sectorDistributionSeriesValueFormatted}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
            </div>
            {/* Legend for Sector Distribution */}
            <div className={LEGEND_STYLES.container}>
              {sectorDistributionLabels.map((label, index) => (
                <div key={label} className={LEGEND_STYLES.item}>
                  <div
                    className={LEGEND_STYLES.dot}
                    style={{
                      backgroundColor:
                        chartOptions.colors[index % chartOptions.colors.length],
                    }}
                  ></div>
                  <span className={LEGEND_STYLES.text}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Stages - secondcharts */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px]"
            style={{ gridArea: "secondcharts" }}
          >
            <motion.h3 className="text-xs  font-semibold text-white mb-10  flex items-center justify-center gap-1">
              <BarChart3 size={14} />
              توزيع مراحل المشاريع
            </motion.h3>
            <div className="space-y-3">
              <div className="mb-10">
                <div className="text-xs text-white mb-1 text-center">العدد</div>
                <div className="h-24 sm:h-32 ">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "donut", background: "transparent" },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".7rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                color: "#ffffff",
                                fontFamily: "Cairo, sans-serif",
                              },
                            },
                          },
                        },
                      },
                      labels: projectStagesLabels,
                      legend: { show: false },
                    }}
                    series={projectStagesSeriesCount}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-white mb-1 text-center">
                  القيمة (B)
                </div>
                <div className="h-24 sm:h-32">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "donut", background: "transparent" },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".7rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                fontFamily: "Cairo, sans-serif",
                                offsetY: -5,
                                color: "#ffffff",
                                formatter: function (w) {
                                  const total = w.globals.seriesTotals.reduce(
                                    (a, b) => a + b
                                  );
                                  return (total / 1000).toFixed(1) + " B";
                                },
                              },
                            },
                          },
                        },
                      },
                      labels: projectStagesLabels,
                      legend: { show: false },
                      tooltip: {
                        ...chartOptions.tooltip,
                        y: {
                          formatter: function (val) {
                            return val.toFixed(0) + " M";
                          },
                        },
                      },
                    }}
                    series={projectStagesSeriesValueFormatted}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
            </div>
            {/* Legend for Project Stages */}
            <div className={LEGEND_STYLES.container}>
              {projectStagesLabels.map((label, index) => (
                <div key={label} className={LEGEND_STYLES.item}>
                  <div
                    className={LEGEND_STYLES.dot}
                    style={{
                      backgroundColor:
                        chartOptions.colors[index % chartOptions.colors.length],
                    }}
                  ></div>
                  <span className={LEGEND_STYLES.text}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Types - thiardcharts */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px]"
            style={{ gridArea: "thiardcharts" }}
          >
            <motion.h3 className="text-xs  font-semibold text-white mb-10  flex items-center justify-center gap-1">
              <Building size={14} />
              توزيع أنواع المشاريع
            </motion.h3>
            <div className="space-y-3">
              <div className="mb-10">
                <div className="text-xs text-white mb-1 text-center">العدد</div>
                <div className="h-24 sm:h-32">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "donut", background: "transparent" },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".7rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                fontFamily: "Cairo, sans-serif",
                                color: "#ffffff",
                              },
                            },
                          },
                        },
                      },
                      labels: projectTypesLabels,
                      legend: { show: false },
                    }}
                    series={projectTypesSeriesCount}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-white mb-1 text-center">
                  القيمة (B)
                </div>
                <div className="h-24 sm:h-32">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "donut", background: "transparent" },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: "70%",
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: "المجموع",
                                fontSize: ".7rem",
                                fontWeight: 500,
                                transform: "translateY(-0.5rem)",
                                fontFamily: "Cairo, sans-serif",
                                color: "#ffffff",
                                formatter: function (w) {
                                  const total = w.globals.seriesTotals.reduce(
                                    (a, b) => a + b
                                  );
                                  return (total / 1000).toFixed(1) + " B";
                                },
                              },
                            },
                          },
                        },
                      },
                      labels: projectTypesLabels,
                      legend: { show: false },
                      tooltip: {
                        ...chartOptions.tooltip,
                        y: {
                          formatter: function (val) {
                            return val.toFixed(0) + " M";
                          },
                        },
                      },
                    }}
                    series={projectTypesSeriesValueFormatted}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
            </div>
            {/* Legend for Project Types */}
            <div className={LEGEND_STYLES.container}>
              {projectTypesLabels.map((label, index) => (
                <div key={label} className={LEGEND_STYLES.item}>
                  <div
                    className={LEGEND_STYLES.dot}
                    style={{
                      backgroundColor:
                        chartOptions.colors[index % chartOptions.colors.length],
                    }}
                  ></div>
                  <span className={LEGEND_STYLES.text}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline - timeline */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[20%]"
            style={{ gridArea: "timeline" }}
          >
            <motion.h3 className="text-xs sm:text-sm font-semibold text-white mb-4 text-right justify-end flex items-center gap-2">
              <Clock size={14} />
              الخط الزمني للبرنامج
            </motion.h3>
            <div className="relative mt-[4rem] h-12 mx-2 bg-gradient-to-r from-green-800 to-red-800 rounded-full flex items-center ">
              <div className="absolute left-[-4%] top-8 text-xs text-white font-semibold text-center">
                البداية
                <br />
                2021
              </div>
              <div className="absolute left-3/4 top-5 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
              <div className="absolute left-[68%] top-8 text-xs text-yellow-400 font-semibold text-center">
                الوقت الحالي
                <br />
                2025
              </div>
              <div className="absolute right-[-4%] top-8 text-xs text-white font-semibold text-center">
                النهاية
                <br />
                2026
              </div>
              <div className=" absolute top-[-25px] left-0 right-0 flex flex-row justify-between px-4">
                {[2026, 2025, 2024, 2023, 2022, 2021].map((year) => (
                  <span
                    key={year}
                    className={`text-xs ${
                      year === 2025
                        ? "font-semibold text-yellow-400"
                        : "text-slate-400"
                    }`}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Summary & Completion - achiveandabstract */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[200px]"
            style={{ gridArea: "achiveandabstract", direction: "rtl" }}
          >
            <div className="flex gap-4 h-full ">
              <div className="w-2/5 mt-7 flex flex-col justify-center items-center  ">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">
                  ملخص تنفيذي
                </h4>
                <div className=" p-2 rounded-lg text-xs text-slate-200 space-y-2 h-full">
                  <p className="flex items-start gap-1 pb-5 border-b-1 border-b-black/70">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                    تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                  </p>
                  <p className="flex items-start gap-1 pb-5 border-b-1 border-b-black/70">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                    تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                  </p>
                  <p className="flex items-start gap-1 pb-5">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                    تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                  </p>
                </div>
              </div>
              <div className="w-3/5 flex flex-col justify-space-between items-center">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 text-center">
                  نسبة الانجاز الفعلية للبرنامج
                </h4>
                <div className="flex flex-col items-center justify-space-between">
                  <div className="h-20 sm:h-24 w-32">
                    <Chart
                      options={{
                        ...chartOptions,
                        chart: { type: "radialBar", background: "transparent" },
                        plotOptions: {
                          radialBar: {
                            hollow: { size: "70%", margin: 0 },
                            dataLabels: {
                              showOn: "always",
                              name: { show: false },
                              value: {
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: 700,
                                show: true,
                                offsetY: 8,
                                formatter: (val) => val + "%",
                              },
                            },
                            track: { margin: 0 },
                          },
                        },
                        fill: {
                          colors: ["darkgreen"],
                        },
                        stroke: { lineCap: "round" },
                        labels: ["نسبة الإنجاز الفعلي"],
                      }}
                      series={[28]}
                      type="radialBar"
                      height="100%"
                    />
                  </div>
                  <div className="flex gap-4 flex-column mt-2">
                    <div
                      className="flex bg-red-500/20 rounded-2xl flex-col border-1-red-200 p-5 items-center justify-center "
                      style={{ flexDirection: "column" }}
                    >
                      <div className="text-xs text-red-500">
                        نسبة الحياد الناتج
                      </div>
                      <div className="text-sm text-red-500 font-bold">-4%</div>
                    </div>
                    <div className="flex bg-blue-500/20 rounded-2xl flex-col border-1-red-200 p-5 items-center justify-center ">
                      <div className="text-xs text-green-500">
                        نسبة الانجاز المخطط
                      </div>
                      <div className="text-sm text-green-500 font-bold">
                        32%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Statistics - qualitycheck */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px] overflow-hidden"
            style={{ gridArea: "qualitycheck" }}
          >
            <motion.h3 className="text-xs sm:text-sm font-semibold text-white mb-[4rem] flex items-center justify-center gap-1">
              <Zap size={14} />
              احصائيات الجودة
            </motion.h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-green-500/20 rounded-lg p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-500">
                  350
                </div>
                <div className="text-xs text-white">اجمالي زيارات ميدانية</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-500">
                  13505
                </div>
                <div className="text-xs text-white">
                  اجمالي الاعتمادات و الاستلامات
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              {/* First Row */}
              <div className="flex flex-row gap-2 sm:gap-3 justify-center items-center w-full">
                <div className="flex-1 rounded-lg p-1 sm:p-2 min-w-0">
                  <SmallDonutCard
                    title="استلام الأعمال"
                    series={workReceiptsSeries}
                    labels={workReceiptsLabels}
                    centerValue="5595"
                  />
                  {/* Legend for Work Receipts */}
                  <div className={LEGEND_STYLES.container}>
                    {workReceiptsLabels.map((label, index) => (
                      <div key={label} className={LEGEND_STYLES.item}>
                        <div
                          className={LEGEND_STYLES.dot}
                          style={{
                            backgroundColor: [
                              "#8b5cf6",
                              "#f59e0b",
                              "#fbbf24",
                              "#86efac",
                              "#22c55e",
                              "#ef4444",
                            ][index % 6],
                          }}
                        ></div>
                        <span className={LEGEND_STYLES.text}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 rounded-lg p-1 sm:p-2 min-w-0">
                  <SmallDonutCard
                    title="الاعتمادات الفنية"
                    series={technicalApprovalsSeries}
                    labels={technicalApprovalsLabels}
                    centerValue="7715"
                  />
                  {/* Legend for Technical Approvals */}
                  <div className={LEGEND_STYLES.container}>
                    {technicalApprovalsLabels.map((label, index) => (
                      <div key={label} className={LEGEND_STYLES.item}>
                        <div
                          className={LEGEND_STYLES.dot}
                          style={{
                            backgroundColor: [
                              "#8b5cf6",
                              "#f59e0b",
                              "#fbbf24",
                              "#86efac",
                              "#22c55e",
                              "#ef4444",
                            ][index % 6],
                          }}
                        ></div>
                        <span className={LEGEND_STYLES.text}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex flex-row gap-2 sm:gap-3 justify-center items-center w-full">
                <div className="flex-1 rounded-lg p-1 sm:p-2 min-w-0">
                  <SmallDonutCard
                    title="اوامر التغيير"
                    series={changeOrdersSeries}
                    labels={changeOrdersLabels}
                    centerValue="16"
                  />
                  {/* Legend for Change Orders */}
                  <div className={LEGEND_STYLES.container}>
                    {changeOrdersLabels.map((label, index) => (
                      <div key={label} className={LEGEND_STYLES.item}>
                        <div
                          className={LEGEND_STYLES.dot}
                          style={{
                            backgroundColor: [
                              "#8b5cf6",
                              "#f59e0b",
                              "#fbbf24",
                              "#86efac",
                              "#22c55e",
                              "#ef4444",
                            ][index % 6],
                          }}
                        ></div>
                        <span className={LEGEND_STYLES.text}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 rounded-lg p-1 sm:p-2 min-w-0">
                  <SmallDonutCard
                    title="عدم المطابقة"
                    series={nonConformanceSeries}
                    labels={nonConformanceLabels}
                    centerValue="17"
                  />
                  {/* Legend for Non-Conformance */}
                  <div className={LEGEND_STYLES.container}>
                    {nonConformanceLabels.map((label, index) => (
                      <div key={label} className={LEGEND_STYLES.item}>
                        <div
                          className={LEGEND_STYLES.dot}
                          style={{
                            backgroundColor: [
                              "#8b5cf6",
                              "#f59e0b",
                              "#fbbf24",
                              "#86efac",
                              "#22c55e",
                              "#ef4444",
                            ][index % 6],
                          }}
                        ></div>
                        <span className={LEGEND_STYLES.text}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Distribution - budget */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[10rem] overflow-visible"
            style={{ gridArea: "budget" }}
          >
            <motion.h3 className="text-xs sm:text-sm font-bold text-white mb-4 flex items-center justify-center gap-1">
              <Activity size={14} />
              توزيع ميزانية البرنامج
            </motion.h3>
            <div className="space-y-4">
              {/* Budget Metrics */}
              <div className="flex justify-between items-center">
                <div className="text-right flex items-center gap-1">
                  <div className="text-slate-300 text-xs">اجمالي الميزانية</div>
                  <div className="text-white font-bold text-sm">1.53 b</div>
                </div>
                <div className="text-left flex items-center gap-1">
                  <div className="text-slate-300 text-xs">اجمالي التعاقدات</div>
                  <div className="text-green-400 font-bold text-sm">
                    M 922.63
                  </div>
                </div>
              </div>

              {/* Budget Pie Chart */}
              <div className="h-42">
                <Chart
                  options={{
                    ...chartOptions,
                    chart: {
                      type: "pie",
                      background: "transparent",
                      toolbar: { show: false },
                    },
                    plotOptions: {
                      pie: {
                        expandOnClick: true,
                        donut: {
                          size: "0%",
                        },
                      },
                    },
                    labels: budgetChartSeries.map((item) => item.name),
                    legend: {
                      show: false,
                      position: "bottom",
                      fontSize: "12px",
                      labels: {
                        colors: "#ffffff",
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      style: {
                        fontSize: "1rem",
                        fontWeight: "semibold",
                        fontFamily: "inherit",
                        color: "#034945",
                      },
                      formatter: function (val, opts) {
                        return opts.w.config.series[opts.seriesIndex] + "M";
                      },
                    },
                    colors: ["#8b5cf6", "#f59e0b", "#fbbf24", "#6b7280"],
                    tooltip: {
                      ...chartOptions.tooltip,
                      y: {
                        formatter: function (val) {
                          return val.toFixed(2) + " M";
                        },
                      },
                    },
                  }}
                  series={budgetChartSeries.map((item) => item.data[0])}
                  type="pie"
                  height="100%"
                />
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs flex-row justify-center items-center flex gap-3">
                {budgetChartSeries.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-row gap-2 text-[.5rem] cursor-pointer group hover:bg-slate-700/50 px-2 py-1 rounded transition-all duration-200"
                  >
                    <div
                      className="w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: chartOptions.colors[index] }}
                    ></div>
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Management - posibilityanddanger */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px]"
            style={{ gridArea: "posibilityanddanger" }}
          >
            <motion.h3 className="text-[.7rem] font-semibold text-white mb-3 flex items-center gap-1">
              <AlertTriangle size={14} />
              إدارة المخاطر
            </motion.h3>
            <div className="space-y-3">
              <div className="text-[.6rem]">
                <div className="flex justify-between font-thin text-white mb-1">
                  <span className="w-1/12">#</span>
                  <span className="w-7/12 text-right">المخاطر</span>
                  <span className="w-2/12 text-center">التأثير</span>
                  <span className="w-2/12 text-center">الاحتمالية</span>
                </div>
                {risksTableData.map((risk) => (
                  <div
                    key={risk.id}
                    className="flex justify-between py-1 border-b border-white/10"
                  >
                    <span className="w-1/12 text-slate-300">{risk.id}</span>
                    <span className="w-7/12 text-slate-300 text-right">
                      {risk.name}
                    </span>
                    <span className="w-2/12 text-red-400 text-center">
                      {risk.impact}
                    </span>
                    <span className="w-2/12 text-yellow-400 text-center">
                      {risk.probability}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-[.7rem] font-semibold text-white my-7 flex items-center gap-1">
                  <CheckCircle size={12} />
                  أعلى مهام الإنجاز المطلوبة
                </h4>
                <div className="space-y-2 text-[.5rem]">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span className="text-green-400 font-bold">99%</span>
                    <span className="text-slate-300 text-right flex-1 mr-2">
                      إعادة محطة تربية الكائنات المائية بـ روابح جازان
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span className="text-green-400 font-bold">78%</span>
                    <span className="text-slate-300 text-right flex-1 mr-2">
                      تنفيذ محطات فرز التمور في رياض الخبراء بالقصيم
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span className="text-green-400 font-bold">75%</span>
                    <span className="text-slate-300 text-right flex-1 mr-2">
                      إعادة محطات تربية الكائنات المائية في روابح جازان
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-32">
                <Chart
                  options={{
                    ...chartOptions,
                    chart: {
                      type: "scatter",
                      toolbar: { show: false },
                      background: "transparent",
                    },
                    xaxis: {
                      title: {
                        text: "الاحتمالية",
                        style: { color: "#ffffff" },
                      },
                      tickAmount: 5,
                      min: 1,
                      max: 5,
                      labels: { style: { colors: "#ffffff", fontSize: "8px" } },
                    },
                    yaxis: {
                      title: { text: "التأثير", style: { color: "#ffffff" } },
                      tickAmount: 5,
                      min: 1,
                      max: 5,
                      labels: { style: { colors: "#ffffff", fontSize: "8px" } },
                    },
                    grid: {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      xaxis: { lines: { show: true } },
                      yaxis: { lines: { show: true } },
                    },
                    markers: {
                      size: 6,
                      colors: ["#ef4444"],
                      strokeColors: "#fff",
                      strokeWidth: 1,
                    },
                  }}
                  series={riskMatrixSeries}
                  type="scatter"
                  height="100%"
                />
              </div>
            </div>
          </div>

          {/* Program Timeline Chart - lineofhalfyearsandstate */}
          <div
            className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-gray-700 min-h-[300px]"
            style={{ gridArea: "lineofhalfyearsandstate" }}
          >
            <motion.h3 className="text-xs sm:text-sm font-bold text-white mb-3 flex items-center justify-center gap-1">
              <Clock size={14} />
              الخط الزمني لنسب إنجاز البرنامج
            </motion.h3>
            <div className="flex gap-4 h-full">
              <div className="flex-1">
                <div className="h-48 sm:h-[80%]">
                  <Chart
                    options={{
                      ...chartOptions,
                      chart: { type: "line", background: "transparent" },
                      stroke: { width: [3, 3, 2, 2], curve: "smooth" },
                      tooltip: {
                        ...chartOptions.tooltip,
                        y: {
                          formatter: function (val) {
                            return val.toFixed(2) + "%";
                          },
                        },
                      },
                      xaxis: {
                        categories: [
                          "21-H1",
                          "21-H2",
                          "22-H1",
                          "22-H2",
                          "23-H1",
                          "23-H2",
                          "24-H1",
                          "24-H2",
                          "25-H1",
                          "25-H2",
                          "26-H1",
                          "26-H2",
                        ],
                        labels: {
                          style: { colors: "#ffffff", fontSize: "8px" },
                          rotate: -45,
                        },
                      },
                      yaxis: {
                        labels: {
                          style: { colors: "#ffffff", fontSize: "8px" },
                          formatter: (val) => val + "%",
                        },
                        title: {
                          text: "النسبة المئوية",
                          style: { color: "#ffffff" },
                        },
                        min: 0,
                        max: 100,
                      },
                      grid: {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    series={completionTimelineSeries}
                    type="line"
                    height="100%"
                  />
                </div>
              </div>
              <div className="w-24 sm:w-32">
                <h4 className="text-xs font-bold text-white mb-2 text-center">
                  حالة المشاريع
                </h4>
                <div className="space-y-2 text-xs mb-3">
                  <div className="bg-blue-500/10 rounded p-2 text-center border border-blue-500/20">
                    <div className="text-blue-400 font-bold">88</div>
                    <div className="text-blue-400">منتظم</div>
                  </div>
                  <div className="bg-green-500/10 rounded p-2 text-center border border-green-500/20">
                    <div className="text-green-400 font-bold">12</div>
                    <div className="text-green-400">مكتمل</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded p-2 text-center border border-yellow-500/20">
                    <div className="text-yellow-400 font-bold">13</div>
                    <div className="text-yellow-400">متأخر</div>
                  </div>
                  <div className="bg-red-500/10 rounded p-2 text-center border border-red-500/20">
                    <div className="text-red-400 font-bold">5</div>
                    <div className="text-red-400">متوقف</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-1 text-[.7rem]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">إجمالي المشاريع</span>
                    <span className="text-white font-bold">118</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      نسبة الإنجاز الإجمالي
                    </span>
                    <span className="text-green-400 font-bold">84.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">المشاريع النشطة</span>
                    <span className="text-blue-400 font-bold">101</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
