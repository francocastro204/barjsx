import { Card, CardBody, Image, Button, addToast } from '@heroui/react';
import { useContext, useState } from 'react';
import cartContext from '../context/cartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
    const { title, price, image, description, sku, category, stock } = product;
    const [quantity, setQuantity] = useState(1);
    const [itemAdded, setItemAdded] = useState(false);
    const { addItem } = useContext(cartContext);

    const addItemToCart = () => {
        addItem({ ...product, quantity: quantity });
        setItemAdded(true);
        addToast({
            title,
            description: '¡Producto agregado al carrito!',
            color: 'primary',
        });
    };

    const renderVolverAgregarAlCarrito = () => (
        <div>
            <Button
                color="primary"
                size="lg"
                radius="full"
                onPress={() => {
                    setItemAdded(false);
                    setQuantity(1);
                }}
                className="mt-8"
            >
                Agregar más unidades
            </Button>
        </div>
    );

    const renderButtonAgregarAlCarrito = () => (
        <div >
            <ItemCount quantity={quantity} setQuantity={setQuantity} stock={stock} />
            <Button color="primary" size="lg" radius="full" onPress={addItemToCart} className="mt-4">
                Agregar al carrito
            </Button>
        </div>
    );

    return (
        <Card shadow="sm" className='bg-white'>
            <CardBody className="overflow-visible p-0 flex flex-row">
                <div className='w-1/3'>
                    <Image
                        src={image}
                        alt={title}
                        className="w-full object-contain"
                    />
                </div>
                <div className="w-2/3 p-4">
                    <div className="ml-16">
                        <h1 className="font-bold text-4xl pt-6 mb-6">{title}</h1>
                        <h2 className="font-bold text-2xl ">${price}</h2>
                        <div className="mb-6 border-b-1 border-gray-200 pb-6"></div>
                        <div className="mb-2">
                            <small className=" text-gray-500">SKU: {sku}</small>
                            <br />
                            <small className=" text-gray-500">Tipo: {category}</small>
                        </div>
                        <div className="mb-6 border-b-1 border-gray-200 pb-6"></div>
                        <p className=" text-gray-900 text-2xl text-italic">{description}</p>
                        <div className="mb-6 border-b-1 border-gray-200 pb-6"></div>
                        <div>
                            {!itemAdded ? renderButtonAgregarAlCarrito() : renderVolverAgregarAlCarrito()}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ItemDetail;
