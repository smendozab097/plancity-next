import Footer from "@/components/footer";
import "./globals.css";
import NavBar from "@/components/nav-bar";



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
