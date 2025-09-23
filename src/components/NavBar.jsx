import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import CartWidget from './CartWidget';

const NavBar = () => {

    const logo = () => (
        <NavbarBrand>
            <h1 className="font-extrabold text-inherit text-2xl textoLogo">BAR JSX</h1>
        </NavbarBrand>
    );

    const cartButton = () => (
        <NavbarContent justify="end">
            <NavbarItem>
                <CartWidget />
            </NavbarItem>
        </NavbarContent>
    );

    return (
        <Navbar position="sticky" className="shadow-sm p-4 bg-black text-white">
            {logo()}
            {cartButton()}
        </Navbar>
    );
};

export default NavBar;