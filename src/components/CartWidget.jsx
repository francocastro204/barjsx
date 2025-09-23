import { Badge, Button } from '@heroui/react';

const CartWidget = () => (
    <Badge content={1} color="primary" size="md">
        <Button
            color="secondary"
            variant="flat"
            startContent="🛒"
            className="text-white"
        >
            Carrito
        </Button>
    </Badge>
);

export default CartWidget;