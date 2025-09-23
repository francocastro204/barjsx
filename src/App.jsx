import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 p-8">
                <ItemListContainer greeting="Bienvenidos a Bar JSX" />
            </main>
        </div>
    );
}

export default App;