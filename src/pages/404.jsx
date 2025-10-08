const errorPage = () => {
    return (
        <main className="flex-1 p-24 mt-16 mb-16">
            <div className="container mx-auto px-4">
                <h1 className="text-9xl font-bold text-center mt-8 mb-12 text-gray-900">404</h1>
                <p className="text-2xl font-bold text-center mt-8 mb-12 text-gray-900">Página no encontrada</p>
            </div>
        </main>
    );
};

export default errorPage;