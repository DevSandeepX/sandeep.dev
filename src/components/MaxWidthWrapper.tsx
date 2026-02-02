import { ReactNode } from "react";

type MaxWidthWrapperProps = {
    children: ReactNode
    className?: string
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
    return (
        <div className={`w-full px-4 mx-auto max-w-screen-xl sm:px-24 lg:px-32 ${className}`}>
            {children}
        </div>
    )

}

export default MaxWidthWrapper;