import "./globals.css";

export const metadata = {
  title: "AyuTRAC | Clinical Trials Management System",
  description: "Cloud CTMS for Ayurveda research",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

