import { useState, useEffect } from 'react';
import { Card, CardBody, Image, Button } from '@heroui/react';



const ItemCount = () => {
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(false);
    const maxValue = 10;

    // tarea de montaje
    useEffect(() => {
        console.log('🗂️Consultando base de datos para conocer Stock...');
    }, [limit]);

    const sumar = () => {
        if (count < maxValue) { setCount(count + 1); }
        else {
            setLimit(true);
        }
    };

    const restar = () => {
        if (count > 0) { setCount(count - 1); }
    };

    return (
        <div id="counter-button" className="flex items-center gap-2 pt-4 pb-4">
            <Button onPress={restar} color="default" size="sm" radius="full" variant="bordered">-</Button>
            <h3 className="text-2xl font-bold text-center pl-4 pr-4">{count}</h3>
            <Button onPress={sumar} color="default" size="sm" radius="full" variant="bordered">+</Button>
            {limit ? <p className="text-gray-500 text-sm">Alcanzaste el máximo de productos</p> : <></>}
        </div>
    );
};

export default ItemCount;