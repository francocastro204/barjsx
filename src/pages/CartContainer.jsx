import { useContext } from 'react';
import { Image, Button, Card, CardHeader, CardBody, CardFooter, Divider } from '@heroui/react';
import cartContext from '../context/cartContext';
import { createBuyOrder } from '../services/FirestoreService';

const CartContainer = () => {
    const { cart } = useContext(cartContext);
    console.log('CartPAGE => cart', cart);

    const handleCheckout = async () => {
        console.log('CartPAGE => handleCheckout');

        const orderData = {
            buyer: {
                name: 'Melissa Castro',
                email: 'melissa@gmail.com',
                phone: '1234567890'
            },
            cart,
            total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            date: new Date().toISOString(),
        };
        console.log('CartPAGE => orderData', orderData);
        const orderId = await createBuyOrder(orderData);
        console.log('CartPAGE => orderId', orderId);
    };

    const renderSinProductos = () => <h2>No hay productos en el carrito</h2>;

    const renderCartItems = (item) => {
        console.log('CartPAGE => item', item);
        return (
            <div key={item.id} className="flex flex-row items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50">
                {/* Columna 1: Imagen + Nombre */}
                <div className="flex items-center gap-3 w-1/4">
                    <Image
                        alt={item.title}
                        fallbackSrc="https://via.placeholder.com/300x200"
                        height={60}
                        src={item.image}
                        width={60}
                        radius="md"
                    />
                    <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
                
                {/* Columna 2: Precio unitario */}
                <div className="w-1/4 text-center">
                    <p className="text-sm">${item.price}</p>
                </div>
                
                {/* Columna 3: Cantidad */}
                <div className="w-1/4 text-center">
                    <p className="text-sm">{item.quantity}</p>
                </div>
                
                {/* Columna 4: Total */}
                <div className="w-1/4 text-center">
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        );
    };

    const renderCart = () => {
        if (cart.length === 0 || cart === undefined) {
            return renderSinProductos();
        }

        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        return (
            <Card shadow="sm" className='bg-white'>
                {/* Título del carrito */}
                <CardHeader className="flex flex-col gap-3 p-4">
                    <h2 className="text-xl font-bold">Carrito de compras</h2>
                </CardHeader>
                
                <Divider />
                
                {/* Encabezados de las columnas */}
                <div className="flex flex-row gap-4 p-4 bg-gray-100 font-semibold text-sm">
                    <div className="w-1/4">Producto</div>
                    <div className="w-1/4 text-center">Precio unitario</div>
                    <div className="w-1/4 text-center">Cantidad</div>
                    <div className="w-1/4 text-center">Total</div>
                </div>
                
                {/* Productos del carrito */}
                <CardBody className="overflow-visible p-0">
                    {cart.map(item => renderCartItems(item))}
                </CardBody>
                
                <Divider />
                
                {/* Footer con total */}
                <CardFooter className="flex justify-between items-center p-4">
                    <p className="text-lg font-bold">Total:</p>
                    <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
                </CardFooter>
            </Card>
        );
    };

    return (
        <main>
            {renderCart()}
            <div className="container mx-auto px-4">
                <Button onPress={handleCheckout}>Finalizar compra</Button>
            </div>
        </main>
    );
};

export default CartContainer;
