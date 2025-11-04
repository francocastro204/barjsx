import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Skeleton, Button } from '@heroui/react';
import { getProducts, getProductsByCategory } from '../services/FirestoreService';
import SkeletonItemProduct from './SkeletonItemDetail';
import EmptyState from './EmptyState';
import ItemList from './ItemList';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { catParam } = useParams();

    const getProductsList = async () => {
        try {
            setError(null);
            const products = await getProducts();
            setProducts(products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Error al cargar los productos');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const filterCategoryListProducts = async () => {
        try {
            setError(null);
            const products = await getProductsByCategory(catParam);
            setProducts(products || []);
        } catch (err) {
            console.error('Error fetching products by category:', err);
            setError(err.message || 'Error al filtrar por categoría');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    const renderError = () => (
        <div className="text-center mt-9">
            <h2 className="text-xl font-bold text-red-600 mb-4">
                Error: {error}
            </h2>
            <Button 
                onPress={() => catParam ? filterCategoryListProducts() : getProductsList()}
                className="mb-4"
                color="primary"
                size="md"
            >
                Reintentar
            </Button>
        </div>
    );

    const renderSinProductos = () => <EmptyState message="Sin Productos" />;

    const renderProductos = () => {
        return (
            <ItemList greeting="Bienvenidos a Bar JSX" products={products} />
        );
    };

    return (
        <div>
            {loading ? renderLoading() : error ? renderError() : products.length === 0 ? renderSinProductos() : renderProductos()}
        </div>
    );
};

export default ItemListContainer;
