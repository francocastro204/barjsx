import { Badge, Button } from '@heroui/react';
import { useContext } from 'react';
import { Link } from 'react-router';
import cartContext from '../context/cartContext';

const CartWidget = () => {
    const { countItemsInCart } = useContext(cartContext);
    const cartItemCount = countItemsInCart();

    return (
        <Badge content={cartItemCount} color="primary" size="md">
            <Button
                color="default"
                variant="flat"
                startContent="🛒"
                className="text-white"
            >
                <Link to="/cart">Carrito</Link>
            </Button>
        </Badge>
    );
};

export default CartWidget;