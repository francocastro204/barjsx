import data from '../data/data';

function getProducts(){
    return new Promise( (resolve) => {
        setTimeout( () => {
            console.log('Promise completada');
            resolve(data);
        }, 1000 );
    });
};

function getProductById(idParam) {
    return new Promise( (resolve) => {
        const itemRequest = data.find(product => String(product.id) === idParam);
        setTimeout(() => {
            resolve(itemRequest);
        }, 1000 );
    });
};

function getProductsByCategory(catParam){
    return new Promise( (resolve,reject) => {
        const itemsRequested = data.filter((item) => item.category === catParam);
        if (itemsRequested.length === 0) {
            reject('No encontramos productos');
        }
        setTimeout(() => {
            resolve(itemsRequested);
        }, 2000);
    });
}



export { getProducts, getProductById, getProductsByCategory };
