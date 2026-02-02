import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Github } from "lucide-react";

const Footer = () => {
    return (
        <MaxWidthWrapper className="py-4">
            <div className="flex items-center w-full h-16 border-b border-zinc-800/30 justify-between flex-col sm:flex-row">
                <div className="flex items-center sm:items-start justify-center">
                    <p className="text-zinc-500 text-sm">Copy &copy; {new Date().getFullYear()} All right reserved</p>
                </div>
                <div className="flex items-center sm:items-start gap-4 sm:gap-6 md:gap-12">
                    <Link className="text-sm hover:text-blue-600 flex text-blue-700" href="https://github.com/DevSandeepX"><Github className="size-4" /> Github</Link>

                </div>
            </div>
        </MaxWidthWrapper>
    )
}


export default Footer;