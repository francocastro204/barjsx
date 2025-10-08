import { BrowserRouter, Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import ErrorPage from './pages/404';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <NavBar />
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
                        path="*"
                        element={<ErrorPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;