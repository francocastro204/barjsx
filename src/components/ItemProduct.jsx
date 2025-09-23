import { Card, CardBody, Image, Button } from '@heroui/react';

const ItemProduct = ({ sku, title, price, image, description, categoria }) => {

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
                    <h3 className="font-bold text-lg">{title}</h3>
                    <h4 className="text-sm font-bold">${price}</h4>
                    <small className=" text-gray-500"><i>{sku}</i></small>
                    <small className=" text-gray-900">{description}</small>
                    <br />
                    <small className="text-gray-500 text-xs"><i>{categoria}</i></small>
                    <br />
                    <br />
                    <Button color="secondary" size="sm" radius="full">Agregar al carrito</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default ItemProduct;

