import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "./providers";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>
          <AuthProvider>
            <ThemeProvider>
              <Toaster
                position="top-center"
                richColors
                closeButton
                expand
                theme="light"
                toastOptions={{
                  style: {
                    borderRadius: "20px",
                    padding: "16px",
                    backdropFilter: "blur(20px)",
                  },
                }}
              />

              <Navbar />

              <main className="pt-28 min-h-screen">
                {children}
              </main>

              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}