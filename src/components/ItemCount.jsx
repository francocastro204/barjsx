import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

const ItemCount = ({ quantity, setQuantity, stock }) => {
    const [limit, setLimit] = useState(false);
    const maxValue = stock;
    const mensajeLimiteMaximo = 'Alcanzaste el máximo de productos';

    useEffect(() => {
        if (quantity < maxValue && limit) {
            setLimit(false);
        }
    }, [quantity, maxValue, limit]);

    const sumar = () => {
        if (quantity < maxValue) {
            setQuantity(quantity + 1);
        } else {
            setLimit(true);
        }
    };

    const restar = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div id="counter-button" className="flex items-center gap-2 pt-4 pb-4">
            <Button onPress={restar} color="default" size="sm" radius="full" variant="bordered">-</Button>
            <h3 className="text-2xl font-bold text-center pl-4 pr-4">{quantity}</h3>
            <Button onPress={sumar} color="default" size="sm" radius="full" variant="bordered">+</Button>
            {limit ? <p className="text-gray-500 text-sm">{mensajeLimiteMaximo}</p> : <p></p>}
        </div>
    );
};

export default ItemCount;