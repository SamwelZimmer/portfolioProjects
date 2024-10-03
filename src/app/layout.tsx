import type { Metadata } from "next";
import { Lexend as FontSans } from "next/font/google";
import { Source_Serif_4 as FontSerif } from "next/font/google";

import "./globals.css";
import RecoilRootWrapper from "./RecoilRootWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Samwel's Projects",
  description: "View Samwel Zimmmer's Projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased bg-background`}
      >
        <TooltipProvider>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </TooltipProvider>
      </body>
    </html>
  );
}
