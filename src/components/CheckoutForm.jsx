import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input, Spinner } from '@heroui/react';
import cartContext from '../context/cartContext';
import { createBuyOrder } from '../services/FirestoreService';
import CartItem from './CartItem';
import EmptyState from './EmptyState';

const CheckoutForm = () => {
    const { cart, clearCart } = useContext(cartContext);
    const navigate = useNavigate();
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!nombreCliente.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!emailCliente.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente)) {
            newErrors.email = 'El email no es válido';
        }

        if (!telefonoCliente.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = async () => {
        if (!validateForm()) {
            return;
        }

        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                buyer: {
                    name: nombreCliente.trim(),
                    email: emailCliente.trim(),
                    phone: telefonoCliente.trim()
                },
                cart,
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                date: new Date().toISOString(),
            };
            const orderId = await createBuyOrder(orderData);
            clearCart();
            navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
            console.error('Error al crear la orden:', error);
            alert('Hubo un error al procesar la compra. Por favor, intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderProcesando = () => (
        <div className="flex justify-center mt-8 mb-8">
            <Spinner />
        </div>
    );

    const renderSinProductos = () => <EmptyState message="No hay productos en el carrito" />;

    const renderCartItems = (item) => (
        <CartItem
            item={item}
            customColumn='w-1/3'
            showPrice={false}
        />
    );

    const renderCart = () => {
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        return (
            <>
                <Card shadow="sm" className='bg-white'>
                    <CardHeader className="flex flex-col gap-3 p-4">
                        <h2 className="text-xl font-bold">Resumen de la compra</h2>
                    </CardHeader>
                    <div className="flex flex-row gap-4 p-4 bg-gray-100 font-semibold text-sm">
                        <div className="w-1/3">Producto</div>
                        <div className="w-1/3 text-center">Cantidad</div>
                        <div className="w-1/3 text-center">Total</div>
                    </div>
                    <CardBody className="overflow-visible p-0">
                        {cart.map(item => renderCartItems(item))}
                    </CardBody>
                    <Divider />
                    <CardFooter className="flex flex-row gap-4 p-4">
                        <div className="w-1/3">
                            <p className="text-lg font-bold">Total:</p>
                        </div>
                        <div className="w-1/3"></div>
                        <div className="w-1/3 text-center">
                            <p className="text-xl font-bold">${totalAmount.toFixed(0)}</p>
                        </div>
                    </CardFooter>
                </Card>
                <div className="flex justify-end mt-8">
                    <Button 
                        onPress={handleCheckout}
                        color="success"
                        size="lg"
                        radius="full"
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting || cart.length === 0}
                    >
                        Finalizar compra
                    </Button>
                </div>
            </>
        );
    };

    const renderFormularioCliente = () => (
        <Card shadow="sm" className='bg-white'>
            <CardHeader className="flex flex-col gap-3 p-4">
                <h2 className="text-xl font-bold">Información del cliente</h2>
            </CardHeader>
            <CardBody className="overflow-visible p-4">
                <div className="flex flex-col gap-2">
                    <div className="w-12/12 pb-4">
                        <Input
                            isRequired
                            isInvalid={!!errors.nombre}
                            errorMessage={errors.nombre || 'Favor ingresa tu Nombre'}
                            label="Nombre"
                            name="nombre"
                            type="text"
                            value={nombreCliente}
                            onValueChange={setNombreCliente}
                        />
                    </div>
                    <div className="w-12/12 pb-4">
                        <Input
                            isRequired
                            isInvalid={!!errors.email}
                            errorMessage={errors.email || 'Favor ingresa un email válido'}
                            label="Email"
                            name="email"
                            type="email"
                            value={emailCliente}
                            onValueChange={setEmailCliente}
                        />
                    </div>
                    <div className="w-12/12">
                        <Input
                            isRequired
                            isInvalid={!!errors.telefono}
                            errorMessage={errors.telefono || 'Favor ingresa tu Teléfono'}
                            label="Teléfono"
                            name="telefono"
                            type="text"
                            value={telefonoCliente}
                            onValueChange={setTelefonoCliente}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );

    return (
        <main>
            {cart.length === 0 || cart === undefined ? renderSinProductos() : isSubmitting ? renderProcesando() : (
                <>
                    <h1 className="text-2xl font-bold text-center mt-8 mb-12">Finalizar compra</h1>
                    <div className="flex flex-row gap-6 p-4">
                        <div className="w-6/12">
                            {renderFormularioCliente()}
                        </div>
                        <div className="w-6/12">
                            {renderCart()}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default CheckoutForm;
