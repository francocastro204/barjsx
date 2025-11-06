import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@heroui/react';
import cartContext from '../context/cartContext';
import { createBuyOrder } from '../services/FirestoreService';
import CartItem from './CartItem';
import EmptyState from './EmptyState';
import Loading from './Loading';

const CheckoutForm = () => {
    const { cart, clearCart } = useContext(cartContext);
    const navigate = useNavigate();
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const MAX_LENGTH = 30;

    const validateNombre = (value) => {
        if (!value.trim()) {
            return 'El nombre es requerido';
        }
        if (value.length > MAX_LENGTH) {
            return `Máximo ${MAX_LENGTH} caracteres`;
        }
        return '';
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'El email es requerido';
        }
        if (value.length > MAX_LENGTH) {
            return `Máximo ${MAX_LENGTH} caracteres`;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'El email no es válido';
        }
        return '';
    };

    const validateTelefono = (value) => {
        if (!value.trim()) {
            return 'El teléfono es requerido';
        }
        if (value.length > MAX_LENGTH) {
            return `Máximo ${MAX_LENGTH} caracteres`;
        }
        if (!/^[+]?\d+$/.test(value)) {
            return 'El teléfono solo puede contener + y números';
        }
        return '';
    };

    const handleNombreChange = (value) => {
        if (value.length <= MAX_LENGTH) {
            setNombreCliente(value);
            setErrors(prev => ({ ...prev, nombre: validateNombre(value) }));
        }
    };

    const handleEmailChange = (value) => {
        if (value.length <= MAX_LENGTH) {
            setEmailCliente(value);
            setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        }
    };

    const handleTelefonoChange = (value) => {
        // Solo permitir + y números
        if (/^[+]?\d*$/.test(value) && value.length <= MAX_LENGTH) {
            setTelefonoCliente(value);
            setErrors(prev => ({ ...prev, telefono: validateTelefono(value) }));
        }
    };

    const isFormValid = () => {
        return (
            nombreCliente.trim() &&
            emailCliente.trim() &&
            telefonoCliente.trim() &&
            !errors.nombre &&
            !errors.email &&
            !errors.telefono &&
            validateNombre(nombreCliente) === '' &&
            validateEmail(emailCliente) === '' &&
            validateTelefono(telefonoCliente) === ''
        );
    };

    const validateForm = () => {
        const newErrors = {
            nombre: validateNombre(nombreCliente),
            email: validateEmail(emailCliente),
            telefono: validateTelefono(telefonoCliente)
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
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

    const renderProcesando = () => <Loading />;

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
                <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
                <Card shadow="sm" className='bg-white'>
                    <CardHeader className="flex flex-row gap-4 p-4 font-semibold text-sm">
                        <div className="w-1/3">Producto</div>
                        <div className="w-1/3 text-center">Cantidad</div>
                        <div className="w-1/3 text-center">Total</div>
                    </CardHeader>
                    <Divider />
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
                        isDisabled={isSubmitting || cart.length === 0 || !isFormValid()}
                    >
                        Finalizar compra
                    </Button>
                </div>
            </>
        );
    };

    const renderFormularioCliente = () => (
        <>
            <h2 className="text-xl font-bold mb-4">Información del cliente</h2>
            <Card shadow="sm" className='bg-white'>
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
                                onValueChange={handleNombreChange}
                                maxLength={MAX_LENGTH}
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
                                onValueChange={handleEmailChange}
                                maxLength={MAX_LENGTH}
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
                                onValueChange={handleTelefonoChange}
                                maxLength={MAX_LENGTH}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );

    const renderContent = () => {
        if (cart.length === 0 || cart === undefined) {
            return renderSinProductos();
        }
        if (isSubmitting) {
            return renderProcesando();
        }
        return (
            <>
                <h1 className="text-3xl font-bold text-center mt-6 mb-12">Finalizar compra</h1>
                <div className="flex flex-row gap-6 p-4">
                    <div className="w-6/12">
                        {renderFormularioCliente()}
                    </div>
                    <div className="w-6/12">
                        {renderCart()}
                    </div>
                </div>
            </>
        );
    };

    return (
        <main>
            {renderContent()}
        </main>
    );
};

export default CheckoutForm;
