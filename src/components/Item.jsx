import { Card, CardBody, Image, Button } from '@heroui/react';
import { Link } from 'react-router';

const Item = ({ item }) => {
    const { id, title, price, image, description } = item;
    return (
        <Card shadow="sm" className='bg-white'>
            <CardBody className="overflow-visible p-0 flex flex-row">
                <div className='w-1/3'>
                    <div className='pl-4 pt-4 pb-4'>
                        <Image
                            src={image}
                            alt={title}
                            className="w-full object-contain"
                        />
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="p-4">
                        <div>
                            <h3 className="font-bold text-lg pb-2">{title}</h3>
                            <h4 className="text-md font-bold pb-4">${price}</h4>
                        </div>
                        <div className="mb-2">
                            <small className=" text-gray-900">{description}</small>
                        </div>
                        <div>
                            <Link to={`/detail/${id}`}>
                                <Button color="primary" size="sm" radius="full">Ver detalle</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Item;

