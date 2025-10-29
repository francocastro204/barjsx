import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Skeleton, Button } from '@heroui/react';
import ItemListContainer from '../components/ItemListContainer';
import SkeletonItemProduct from '../components/SkeletonItemProduct';
import { getProducts, getProductsByCategory, exportProducts } from '../services/FirestoreService';

const Home = () => {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const showBtnCargarTodosLosProductos = false;
    const { catParam } = useParams();

    const cargarTodosLosProductos = async () => {
        await exportProducts();
    };

    const getProductsList = async () => {
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
    };

    const filterCategoryListProducts = async () => {
        const products = await getProductsByCategory(catParam);
        setProducts(products);
        setLoading(false);
    };

    useEffect( () => {
        catParam ? filterCategoryListProducts() : getProductsList();
    }, [catParam]);

    const renderLoading = () => {
        return (
            <div>
                <h1 className="text-2xl font-bold text-center mt-8 mb-12 flex justify-center">
                    <Skeleton className="w-2/5 rounded-lg mb-3">
                        <div className="h-6 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, index) => (
                        <SkeletonItemProduct key={`skeleton-${index}`} />
                    ))}
                </div>
            </div>
        );
    };

    const renderSinProductos = () => {
        return (
            <h1 className="text-2xl font-bold text-center mt-8 mb-12">No hay productos</h1>
        );
    };

    const renderProductos = () => {
        return (
            <ItemListContainer greeting="Bienvenidos a Bar JSX" products={products} />
        );
    };

    const renderCargarTodosLosProductos = () => showBtnCargarTodosLosProductos && (
        <div className="flex justify-center mt-16 mb-16 pb-12">
            <Button onPress={cargarTodosLosProductos} className="mt-9" color="primary" size="lg" radius="full">Cargar todos los productos</Button>
        </div>
    );

    return (
        <div>
            {renderCargarTodosLosProductos()}
            {products.length === 0 && !loading && renderSinProductos()}
            {loading ? renderLoading() : renderProductos()}
        </div>
    );
};

export default Home;