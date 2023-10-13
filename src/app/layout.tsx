"use client";
import StyledProvider from "@/Providers/StylesProvider/StylesProvider";
import { store } from "@/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <StyledProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </StyledProvider>
    </Provider>
  );
}
