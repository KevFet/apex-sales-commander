import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata = {
  title: "Apex Sales Commander",
  description: "High-Performance Sales Closer Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
