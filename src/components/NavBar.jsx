import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, useLocation } from 'react-router';
import CartWidget from './CartWidget';

const NavBar = () => {
    const location = useLocation();

    const categories = [
        { path: '/category/cocktails', label: 'Cocktails' },
        { path: '/category/mocktails', label: 'Mocktails' },
        { path: '/category/limonadas', label: 'Limonadas' }
    ];

    const isActive = (path) => location.pathname === path;

    const logo = () => (
        <NavbarBrand justify="start">
            <Link to="/">
                <h1 className="font-extrabold text-inherit text-2xl textoLogo">BAR JSX</h1>
            </Link>
        </NavbarBrand>
    );

    const menu = () => (
        <NavbarContent justify="center" className="menu-principal">
            {categories.map((category) => (
                <Link key={category.path} to={category.path}>
                    <NavbarItem className={isActive(category.path) ? 'active' : ''}>
                        {category.label}
                    </NavbarItem>
                </Link>
            ))}
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