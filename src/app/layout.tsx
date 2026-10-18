import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";
import { CustomCursor } from "@/components/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mario Cosenza — Software Developer",
  description:
    "Portfolio di Mario Cosenza, Software Developer specializzato in architetture backend scalabili, AI Engineering e Cloud-Native. Backend architectures · AI · Cloud-Native.",
  keywords: [
    "Mario Cosenza",
    "Software Developer",
    "Backend",
    "AI Engineering",
    "Cloud",
    "Azure",
    "Kubernetes",
    "Docker",
    "Spring Boot",
    "React",
    "Next.js",
    "Python",
    "Java",
    "TypeScript",
    "Knowledge Graph",
    "LangGraph",
    "Portfolio",
  ],
  authors: [{ name: "Mario Cosenza", url: "https://github.com/mariocosenza" }],
  creator: "Mario Cosenza",
  openGraph: {
    title: "Mario Cosenza — Software Developer",
    description:
      "Backend architectures · AI Engineering · Cloud-Native. Portfolio of Mario Cosenza.",
    url: "https://github.com/mariocosenza",
    siteName: "Mario Cosenza Portfolio",
    type: "website",
    locale: "it_IT",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Cosenza — Software Developer",
    description: "Backend architectures · AI Engineering · Cloud-Native",
  },
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CustomCursor />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
