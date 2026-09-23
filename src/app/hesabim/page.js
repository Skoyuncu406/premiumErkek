import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountPage from "@/components/account/AccountPage";

export const metadata = {
  title: "Hesabım",
  description: "ARES hesabınıza giriş yapın veya yeni bir hesap oluşturun.",
};

export default function HesabimPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <AccountPage />

      <Footer />
    </main>
  );
}
