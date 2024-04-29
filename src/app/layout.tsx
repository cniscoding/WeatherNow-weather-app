import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherNow - Your Instant Weather Companion",
  description: "WeatherNow is a sleek and intuitive weather application designed to provide you with up-to-date weather information at your fingertips. Whether you're planning your daily commute, scheduling outdoor activities, or simply staying informed about the weather conditions, WeatherNow has got you covered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
