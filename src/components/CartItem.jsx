import { Image, Button } from '@heroui/react';
import { IoTrashOutline } from 'react-icons/io5';

const CartItem = ({ item, customColumn, showPrice = true, onRemove }) => {
    const { id, title, price, image, quantity } = item;
    const classCustomColumn = customColumn || 'w-1/4';
    return (
        <div key={id} className="flex flex-row items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50">
            <div className={`flex items-center ${classCustomColumn}`}>
                <Image
                    alt={title}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    height={60}
                    src={image}
                    width={60}
                    radius="md"
                />
                <h3 className="pl-4 text-sm font-medium">{title}</h3>
            </div>
            {showPrice && (
                <div className={`${classCustomColumn} text-center`}>
                    <p className="text-sm">${price}</p>
                </div>
            )}
            <div className={`${classCustomColumn} text-center`}>
                <p className="text-sm">{quantity}</p>
            </div>
            <div className={`${classCustomColumn} text-center`}>
                <p className="text-sm font-semibold">${(price * quantity).toFixed(0)}</p>
            </div>
            {onRemove && (
                <div className={`${classCustomColumn} text-center`}>
                    <Button size="sm" color="danger" variant="light" onPress={() => onRemove(item)}>
                        <IoTrashOutline />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartItem;
