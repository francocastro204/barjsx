import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '../services/services';
import ItemDetailContainer from '../components/ItemDetailContainer';
import SkeletonItemProduct from '../components/SkeletonItemProduct';

const Detail = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { idParam } = useParams();

    useEffect( () => {
        setLoading(true);
        getProductById(idParam).then(res => {
            setProduct(res);
            setLoading(false);
        });
    }, [idParam]);

    const renderLoading = () => <SkeletonItemProduct />;

    const renderProduct = () => <ItemDetailContainer product={product} />;

    return product &&(
        <main className="flex-1 p-8">
            <div className="container mx-auto px-4">
                {loading ? renderLoading() : renderProduct()}
            </div>
        </main>
    );
};

export default Detail;