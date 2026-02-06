import NavbarClient from "./NavbarClient"
import AuthButton from "./admin/AuthButton"

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b bg-white">
            <NavbarClient>
                <AuthButton />
            </NavbarClient>
        </header>
    )
}
