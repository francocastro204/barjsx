import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from '@heroui/react';
import { getProductById } from '../services/FirestoreService';
import SkeletonItemDetail from './SkeletonItemDetail';
import ItemDetail from './ItemDetail';
import EmptyState from './EmptyState';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { idParam } = useParams();

    const getProductDetail = async () => {
        try {
            setError(null);

            const product = await getProductById(idParam);
            setProduct(product);
        } catch (err) {
            console.error('Error fetching product:', err);
            setError(err.message || 'Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetail();
    }, [idParam]);

    const renderLoading = () => <SkeletonItemDetail />;

    const renderError = () => (
        <div className="text-center mt-9">
            <h2 className="text-xl font-bold text-red-600">
                Error: {error}
            </h2>
            <Button
                onPress={() => getProductDetail()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                color="primary"
                size="lg"
                radius="full"
            >
                Reintentar
            </Button>
        </div>
    );

    const renderEmpty = () => <EmptyState message="Producto no encontrado" />;

    const renderProduct = () => <ItemDetail product={product} />;

    return (
        <div className="container mx-auto px-4">
            {loading ? renderLoading() : error ? renderError() : !product || !product.id ? renderEmpty() : renderProduct()}
        </div>
    );
};

export default ItemDetailContainer;
