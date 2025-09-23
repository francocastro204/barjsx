import ItemProduct from './ItemProduct';

const ItemListContainer = ({ greeting }) => {

    const renderGreeting = () => greeting &&(
        <h1 className="text-2xl font-bold text-center mt-8 mb-12">{greeting}</h1>
    );

    return (
        <div className="container mx-auto px-4">
            {renderGreeting()}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                <ItemProduct sku={1} title="Orange Ramazzoti" price={80} image="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg" description="Delicioso cóctel con sabor a naranja y hierbas aromáticas" categoria="cocktails" />
                <ItemProduct sku={2} title="Virgin Mojito" price={45} image="https://images.pexels.com/photos/2336667/pexels-photo-2336667.jpeg" description="Refrescante mojito sin alcohol con menta fresca y lima" categoria="mocktails" />
                <ItemProduct sku={3} title="Limonada de Coco" price={39} image="https://images.pexels.com/photos/2093089/pexels-photo-2093089.jpeg" description="Exótica limonada con agua de coco, limón fresco y hielo" categoria="limonadas" />
            </div>
        </div>
    );
};

export default ItemListContainer;