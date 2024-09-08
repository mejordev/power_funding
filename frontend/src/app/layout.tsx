import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Topbar } from "@/components/topbar";
import { Providers } from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Power Funding",
  description: "Power Funding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="container space-y-4 pt-4 pb-10">
            <Topbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
