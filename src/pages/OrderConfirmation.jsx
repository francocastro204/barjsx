import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@heroui/react';
import { getOrderById } from '../services/FirestoreService';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(orderId);
                setOrder(orderData);
            } catch (error) {
                console.error('Error al obtener la orden:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return <Loading />;
    }

    if (!order) {
        return (
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-center mt-8 mb-12">Orden no encontrada</h1>
                <div className="flex justify-center">
                    <Link to="/">
                        <Button color="primary" size="lg" radius="full">
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    const { buyer, cart, total, date } = order;
    const formattedDate = new Date(date).toLocaleString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <main className="flex-1">
            <h1 className="text-3xl font-bold text-center mt-6 mb-12">¡Compra exitosa!</h1>
            <Card shadow="sm" className="bg-white max-w-4xl mx-auto">
                <CardHeader className="flex flex-col gap-3 p-6">
                    <h2 className="text-xl font-bold">Detalles de tu pedido</h2>
                    <p className="text-sm text-gray-600">ID de pedido: <span className="font-semibold">{orderId}</span></p>
                    <p className="text-sm text-gray-600"><span className="font-semibold">Fecha de compra:</span> {formattedDate}</p>
                </CardHeader>
                <Divider />
                <CardBody className="p-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Información del comprador</h3>
                        <div className="space-y-2">
                            <p><span className="font-semibold">Nombre:</span> {buyer.name}</p>
                            <p><span className="font-semibold">Email:</span> {buyer.email}</p>
                            <p><span className="font-semibold">Teléfono:</span> {buyer.phone}</p>
                        </div>
                    </div>
                    <Divider className="my-6" />
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Productos</h3>
                        <div className="flex flex-row gap-4 p-4 bg-gray-100 font-semibold text-sm mb-2">
                            <div className="w-1/3">Producto</div>
                            <div className="w-1/3 text-center">Cantidad</div>
                            <div className="w-1/3 text-center">Total</div>
                        </div>
                        <div>
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    customColumn="w-1/3"
                                    showPrice={false}
                                />
                            ))}
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center p-6">
                    <p className="text-lg font-bold">Total:</p>
                    <p className="text-2xl font-bold">${total.toFixed(0)}</p>
                </CardFooter>
            </Card>
            <div className="flex justify-center mt-8">
                <Link to="/">
                    <Button color="primary" size="lg" radius="full">
                        Volver al inicio
                    </Button>
                </Link>
            </div>
        </main>
    );
};

export default OrderConfirmation;

