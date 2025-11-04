import Item from './Item';

const ItemList = ({ greeting, products }) => {

    const renderGreeting = () => greeting &&(
        <h1 className="text-2xl font-bold text-center mt-8 mb-12">{greeting}</h1>
    );

    const renderItems = () => {
        if (products.length === 0) {
            return <h1>Cargando...</h1>;
        }

        return (
            products.map(item => (
                <Item
                    key={item.id}
                    item={item}
                />
            ))
        );
    };

    return (
        <div>
            {renderGreeting()}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                {renderItems()}
            </div>
        </div>
    );
};

export default ItemList;