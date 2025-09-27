import { Cairo } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
});

export const metadata = {
  title: "Rife Saudi ",
  description: "Rife Saudi Dashboard",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
