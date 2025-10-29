import { Badge, Button } from '@heroui/react';
import { useContext } from 'react';
import { Link } from 'react-router';
import cartContext from '../context/cartContext';

const CartWidget = () => {

    const { cart } = useContext(cartContext);
    console.log('cart', cart);
    const cartItemCount = cart.length;

    return (
        <Badge content={cartItemCount} color="primary" size="md">
            <Button
                color="secondary"
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