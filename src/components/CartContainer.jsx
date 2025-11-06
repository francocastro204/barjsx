import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Button, Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react';
import cartContext from '../context/cartContext';
import CartItem from './CartItem';
import EmptyState from './EmptyState';

const CartContainer = () => {
    const { cart, removeItem, clearCart } = useContext(cartContext);
    const [totalCart, setTotalCart] = useState(0);

    const calculateTotalCart = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        if (cart && cart.length > 0) {
            const total = calculateTotalCart(cart);
            setTotalCart(total);
        } else {
            setTotalCart(0);
        }
    }, [cart]);

    const renderSinProductos = () => <EmptyState message="No hay productos en el carrito" />;

    const renderCartItems = (item) => (
        <CartItem
            item={item}
            onRemove={removeItem}
        />
    );

    const renderCart = () => (
        <>
            <h1 className="text-3xl font-bold text-center mt-6 mb-12">Carrito de compras</h1>
            <Card shadow="sm" className='bg-white'>
                <CardHeader className="flex flex-row gap-4 p-4 font-semibold text-sm">
                    <div className="w-1/4">Producto</div>
                    <div className="w-1/4 text-center">Precio unitario</div>
                    <div className="w-1/4 text-center">Cantidad</div>
                    <div className="w-1/4 text-center">Total</div>
                    <div className="w-1/4 text-center"></div>
                </CardHeader>
                <Divider />
                <CardBody className="overflow-visible p-0">
                    {cart.map(item => renderCartItems(item))}
                </CardBody>
                <Divider />
                <CardFooter className="flex flex-row gap-4 p-4 font-semibold text-sm">
                    <div className="w-1/4"><p className="text-lg font-bold">Total:</p></div>
                    <div className="w-1/4"></div>
                    <div className="w-1/4 text-center"></div>
                    <div className="w-1/4 text-center"><p className="text-xl font-bold">${totalCart.toFixed(0)}</p></div>
                    <div className="w-1/4 text-center">
                        <Button color="danger" variant="light" size="sm" onPress={clearCart}>Vaciar carrito</Button>
                    </div>
                </CardFooter>
            </Card>
            <div className="container mx-auto px-4 flex justify-end mt-6">
                <Button color="primary" size="lg" radius="full">
                    <Link to="/checkout">
                        Continuar con la compra
                    </Link>
                </Button>
            </div>
        </>
    );

    return (
        <main>
            {cart.length === 0 || cart === undefined ? renderSinProductos() : renderCart()}
        </main>
    );
};

export default CartContainer;
