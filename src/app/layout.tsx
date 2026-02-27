import type { Metadata, Viewport } from "next";
import { Inter, Comic_Neue, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6C3CE1",
};

export const metadata: Metadata = {
  title: "EduJoy Kids - Where Learning Feels Like Play",
  description:
    "AI-powered gamified educational platform for children from Play Group to Class 5. Safe, engaging, and curriculum-aligned learning experiences.",
  keywords: [
    "education",
    "kids learning",
    "gamified learning",
    "AI tutoring",
    "child safety",
    "curriculum",
  ],
  authors: [{ name: "EduJoy Kids Team" }],
  robots: "index, follow",
  openGraph: {
    title: "EduJoy Kids - Where Learning Feels Like Play",
    description: "AI-powered gamified educational platform for children",
    type: "website",
    url: "https://edujoykids.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduJoy Kids",
    description: "Where Learning Feels Like Play",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${comicNeue.variable} ${quicksand.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 font-kidsfont">
        <Providers>
          <div className="relative">
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#fff",
                  color: "#333",
                  borderRadius: "1rem",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
