import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "medreminder",
  description: "Login and register for doctors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className="bg-gray-50">  
        <Navbar/>
        {children}
        <Footer/>
        </body>   
    </html>
    
  );
}
