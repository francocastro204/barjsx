import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Skeleton } from '@heroui/react';
import { getProducts, getProductsByCategory } from '../services/services';
import ItemListContainer from '../components/ItemListContainer';
import SkeletonItemProduct from '../components/SkeletonItemProduct';

const Home = () => {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const { catParam } = useParams();

    useEffect(() =>{
        setLoading(true);
        if (catParam) {
            getProductsByCategory(catParam).then((dataCategory) => {
                setProducts(dataCategory);
                setLoading(false);
            });
        } else {
            setLoading(true);
            getProducts().then((dataProducts) => {
                console.log('Datos recibidos', dataProducts);
                setProducts(dataProducts);
                setLoading(false);
            });
        }
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

    return (
        <main className="container mx-auto px-4">
            {loading ? renderLoading() : (
                <ItemListContainer greeting="Bienvenidos a Bar JSX" products={products} />
            )}
        </main>
    );
};

export default Home;