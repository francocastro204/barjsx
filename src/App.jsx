import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ErrorPage from './pages/404';
import Cart from './pages/CartContainer';
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
                                    element={<Home />}
                                />
                                <Route
                                    path="/detail/:idParam"
                                    element={<Detail />}
                                />
                                <Route
                                    path="/category/:catParam"
                                    element={<Home />}
                                />
                                <Route
                                    path="/cart"
                                    element={<Cart />}
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