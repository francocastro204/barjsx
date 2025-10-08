import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link } from 'react-router';
import CartWidget from './CartWidget';

const NavBar = () => {

    const logo = () => (
        <NavbarBrand>
            <Link to="/">
                <h1 className="font-extrabold text-inherit text-2xl textoLogo">BAR JSX</h1>
            </Link>
        </NavbarBrand>
    );

    const menu = () => (
        <NavbarContent justify="center" className="menu-principal">
            <Link to="/category/cocktails">
                <NavbarItem>
                    Cocktails
                </NavbarItem>
            </Link>
            <Link to="/category/mocktails">
                <NavbarItem>
                    Mocktails
                </NavbarItem>
            </Link>
            <Link to="/category/limonadas">
                <NavbarItem>
                    Limonadas
                </NavbarItem>
            </Link>
        </NavbarContent>
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
            {menu()}
            {cartButton()}
        </Navbar>
    );
};

export default NavBar;