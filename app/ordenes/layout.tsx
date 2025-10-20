import OrdenesSidebar from "@/components/ordenes/OrdenesSidebar";
import OrdenesSumary from "@/components/ordenes/OrdenesSumary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="md:flex">
        <OrdenesSidebar />
        <main className="md:flex-1 md:h-screen md:overflow-scroll p-5">
          {children}
        </main>
        <OrdenesSumary />
      </div>
      <ToastNotification />
    </>
  );
}
