import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SignUp from './signup';
import SchoolInfo from './schoolInfo';
import RatingSystem from './ratingSystem';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate My Madrasa",
  description: "A platform to rate and review madrasas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignUp />
        <SchoolInfo />
        <RatingSystem />
        {children}
      </body>
    </html>
  );
}
