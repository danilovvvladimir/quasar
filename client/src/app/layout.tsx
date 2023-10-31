import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import type { Metadata } from "next";
import MainProvider from "@/components/MainProvider/MainProvider";
import {
  BASE_LAYOUT_METADATA_DESCRIPTION,
  BASE_LAYOUT_METADATA_TITLE,
} from "@/constants/metadata";

export const metadata: Metadata = {
  title: BASE_LAYOUT_METADATA_TITLE,
  description: BASE_LAYOUT_METADATA_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <main className="main">
          <div className="container">
            <MainProvider>
              <Navbar />
              {children}
            </MainProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
