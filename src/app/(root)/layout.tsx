import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className="pt-18">{children}</main>
            <Footer />
        </>
    )
}


export default RootLayout;