import { collection, getDocs, doc, getDoc, query, where, addDoc } from 'firebase/firestore';
import db from '../firebase/config';
import data from '../data/data';

const getProducts = async () => {
    const productRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productRef);
    const products = productsSnapshot.docs.map(item => {
        return {...item.data(), id: item.id};
    });
    return products;
};

const getProductById = async (idParam) => {
    const productRef = doc(db, 'products', idParam);
    const productSnapshot = await getDoc(productRef);
    return {...productSnapshot.data(), id: productSnapshot.id};
};

const getProductsByCategory = async (categParam) => {
    const productRef = collection(db, 'products');

    const q = query(productRef, where('category', '==', categParam));
    const productsSnapshot = await getDocs(q);
    const products = productsSnapshot.docs.map(item => {
        return {...item.data(), id: item.id};
    });
    return products;
};

const createBuyOrder = async (orderData) => {
    const ordersRef = collection(db, 'orders');
    const newDoc = await addDoc(ordersRef, orderData);
    console.log('FirestoreService => createBuyOrder => newDoc', newDoc.id);
    return newDoc.id;
};

const getOrderById = async (orderId) => {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderRef);
    if (orderSnapshot.exists()) {
        return {...orderSnapshot.data(), id: orderSnapshot.id};
    }
    return null;
};

const exportProducts = async () => {
    const productRef = collection(db, 'products');
    for (let item of data) {
        const newDoc = await addDoc(productRef, item);
        console.log('FirestoreService => exportProducts => newDoc', newDoc.id);
    }
};

export { getProducts, getProductById, getProductsByCategory, createBuyOrder, getOrderById, exportProducts };