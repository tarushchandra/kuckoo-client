import { SocketProvider } from "@/context/socket";
import PagesLayoutProvider from "@/providers/layouts/pages";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <PagesLayoutProvider>{children}</PagesLayoutProvider>
    </SocketProvider>
  );
}
