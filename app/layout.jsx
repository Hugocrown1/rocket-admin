import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import { Providers } from "./providers";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Rocket Admin",
  description: "Admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
