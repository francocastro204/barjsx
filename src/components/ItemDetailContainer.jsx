import { Card, CardBody, Image, Button } from '@heroui/react';
import ItemCount from './ItemCount';

const ItemDetailContainer = ({ product }) => {
    return (
        <Card shadow="sm" className='bg-white'>
            <CardBody className="overflow-visible p-0 flex flex-row">
                <div className='w-1/3'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        className="w-full object-contain"
                    />
                </div>
                <div className="w-2/3 p-4">
                    <div className="ml-16">
                        <h1 className="font-bold text-4xl pt-6 mb-6">{product.title}</h1>
                        <h2 className="font-bold text-2xl ">${product.price}</h2>
                        <div className="mb-6 border-b-1 border-gray-200 pb-6"></div>
                        <div className="mb-2">
                            <small className=" text-gray-500">SKU: {product.sku}</small>
                            <br />
                            <small className=" text-gray-500">Tipo: {product.category}</small>
                        </div>
                        <div className="mb-6 border-b-1 border-gray-200 pb-6"></div>
                        <p className=" text-gray-900 text-2xl text-italic">{product.description}</p>
                        <div className="mt-24">
                            <ItemCount />
                            <Button color="primary" size="lg" radius="full">Agregar al carrito</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ItemDetailContainer;
