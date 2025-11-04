import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

const ItemCount = ({ quantity, setQuantity, stock }) => {
    const [limit, setLimit] = useState(false);
    const [minLimit, setMinLimit] = useState(false);
    const maxValue = stock;
    const minValue = 1;
    const mensajeLimiteMaximo = 'Alcanzaste el máximo de productos';
    const mensajeLimiteMinimo = 'La cantidad mínima es 1';

    useEffect(() => {
        if (quantity < maxValue && limit) {
            setLimit(false);
        }
        if (quantity >= minValue && minLimit) {
            setMinLimit(false);
        }
    }, [quantity, maxValue, minValue, limit, minLimit]);

    const sumar = () => {
        if (quantity < maxValue) {
            setQuantity(quantity + 1);
        } else {
            setLimit(true);
        }
    };

    const restar = () => {
        if (quantity > minValue) {
            setQuantity(quantity - 1);
        } else {
            setMinLimit(true);
        }
    };

    return (
        <div id="counter-button" className="flex flex-col gap-2 pt-4 pb-4">
            <div className="flex items-center gap-2">
                <Button 
                    onPress={restar} 
                    color="default" 
                    size="sm" 
                    radius="full" 
                    variant="bordered"
                    isDisabled={quantity <= minValue}
                >
                    -
                </Button>
                <h3 className="text-2xl font-bold text-center pl-4 pr-4">{quantity}</h3>
                <Button 
                    onPress={sumar} 
                    color="default" 
                    size="sm" 
                    radius="full" 
                    variant="bordered"
                    isDisabled={quantity >= maxValue}
                >
                    +
                </Button>
            </div>
            {limit && <p className="text-red-500 text-sm">{mensajeLimiteMaximo}</p>}
            {minLimit && <p className="text-red-500 text-sm">{mensajeLimiteMinimo}</p>}
        </div>
    );
};

export default ItemCount;