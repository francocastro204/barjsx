import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import ErrorPage from './pages/404';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import CartContainer from './components/CartContainer';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './pages/OrderConfirmation';
import { CartContextProvider } from './context/cartContext';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <CartContextProvider>
                    <NavBar />
                    <div className="bg-blue-50 min-h-screen pt-8 pb-32">
                        <main className="container mx-auto px-4">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<ItemListContainer />}
                                />
                                <Route
                                    path="/detail/:idParam"
                                    element={<ItemDetailContainer />}
                                />
                                <Route
                                    path="/category/:catParam"
                                    element={<ItemListContainer />}
                                />
                                <Route
                                    path="/cart"
                                    element={<CartContainer />}
                                />
                                <Route
                                    path="/checkout"
                                    element={<CheckoutForm />}
                                />
                                <Route
                                    path="/order-confirmation/:orderId"
                                    element={<OrderConfirmation />}
                                />
                                <Route
                                    path="*"
                                    element={<ErrorPage />}
                                />
                            </Routes>
                        </main>
                    </div>
                </CartContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;