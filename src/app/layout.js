import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

/*
|--------------------------------------------------------------------------
| ARES — Typography
|--------------------------------------------------------------------------
|
| Cormorant Garamond:
| Editorial / luxury başlıklar, hero metinleri ve marka vurguları.
|
| Manrope:
| Navbar, ürün bilgileri, butonlar, formlar ve genel UI.
|
*/

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export const metadata = {
  metadataBase: new URL("https://ares.com"),

  title: {
    default: "ARES | Premium Men's Clothing",
    template: "%s | ARES",
  },

  description:
    "ARES — Zamansız tasarım, modern çizgiler ve premium erkek giyim koleksiyonları.",

  keywords: [
    "ARES",
    "erkek giyim",
    "premium erkek giyim",
    "erkek moda",
    "erkek takım elbise",
    "erkek gömlek",
    "erkek ceket",
    "menswear",
    "premium menswear",
  ],

  authors: [
    {
      name: "ARES",
    },
  ],

  creator: "ARES",
  publisher: "ARES",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "ARES",
    title: "ARES | Premium Men's Clothing",
    description:
      "Zamansız tasarım, modern çizgiler ve premium erkek giyim koleksiyonları.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/*
|--------------------------------------------------------------------------
| Root Layout
|--------------------------------------------------------------------------
*/

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`
          ${cormorant.variable}
          ${manrope.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
