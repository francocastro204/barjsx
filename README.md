# Bar JSX - E-commerce de Bebidas

Proyecto final del curso de React.js de CoderHouse. Una Single Page Application (SPA) de e-commerce desarrollada con React, que permite a los usuarios explorar y comprar bebidas (cocktails, mocktails y limonadas).

## Descripción

Bar JSX es una aplicación web de comercio electrónico que ofrece una experiencia de compra fluida para productos de bebidas. La aplicación utiliza React Router para la navegación, Firebase Firestore como base de datos, y Context API para el manejo del estado global del carrito de compras.

## Características

- **Catálogo de productos**: Visualización de productos con filtrado por categorías
- **Detalle de productos**: Vista detallada con información completa de cada producto
- **Carrito de compras**: Gestión del carrito con persistencia en localStorage
- **Checkout**: Formulario de compra con validación
- **Confirmación de pedido**: Página de confirmación con ID de orden y detalles
- **Navegación SPA**: Navegación sin recargas de página
- **Base de datos en la nube**: Integración con Firebase Firestore

## Tecnologías Utilizadas

- **React** 19.1.1
- **React Router** 7.9.3
- **Firebase** 12.4.0 (Firestore)
- **Vite** 7.1.2
- **Tailwind CSS** (via @tailwindcss/vite)
- **HeroUI** 2.8.4 (Componentes UI)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ProyectoFinal+Castro.git
cd barjsx
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Completa las variables con tus credenciales de Firebase:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Ejecuta la aplicación en modo desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
barjsx/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CartContainer.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartWidget.jsx
│   │   ├── CheckoutForm.jsx
│   │   ├── Item.jsx
│   │   ├── ItemCount.jsx
│   │   ├── ItemDetail.jsx
│   │   ├── ItemDetailContainer.jsx
│   │   ├── ItemList.jsx
│   │   ├── ItemListContainer.jsx
│   │   ├── NavBar.jsx
│   │   └── SkeletonItemDetail.jsx
│   ├── context/             # Context API
│   │   └── cartContext.jsx
│   ├── firebase/            # Configuración Firebase
│   │   └── config.js
│   ├── pages/               # Páginas/Contenedores
│   │   ├── 404.jsx
│   │   └── OrderConfirmation.jsx
│   ├── services/            # Servicios
│   │   └── FirestoreService.js
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Punto de entrada
├── .env.example
├── package.json
└── README.md
```

## Funcionalidades Principales

### Listado y Detalle de Productos
- **ItemListContainer**: Contenedor que obtiene productos de Firestore
- **ItemList**: Componente de presentación que muestra la lista
- **ItemDetailContainer**: Contenedor que obtiene un producto por ID
- **ItemDetail**: Componente de presentación con detalles del producto

### Carrito de Compras
- Gestión del estado mediante Context API
- Persistencia en localStorage
- Cálculo de totales y cantidades
- Visualización de items en el carrito

### Checkout
- Formulario de datos del comprador
- Validación de campos (nombre, email, teléfono)
- Creación de orden en Firestore
- Redirección a página de confirmación

### Confirmación de Pedido
- Visualización del ID de orden
- Detalles del comprador
- Resumen de productos comprados
- Total de la compra

## Firebase

El proyecto utiliza Firebase Firestore para:
- **Colección `products`**: Almacena todos los productos del catálogo
- **Colección `orders`**: Registra las órdenes de compra realizadas

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza el build de producción
- `npm run lint`: Ejecuta el linter

## Deploy

Para hacer deploy en Vercel:

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en Vercel (Settings > Environment Variables)
3. Vercel detectará automáticamente que es un proyecto Vite y lo desplegará

## 👤 Autor

**Franco Castro Miranda**
- Email: francocastro204@gmail.com

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso de React.js de CoderHouse.

---

**Nota**: Asegúrate de no subir el archivo `.env` con tus credenciales a GitHub. El archivo `.env.example` está incluido como referencia.
