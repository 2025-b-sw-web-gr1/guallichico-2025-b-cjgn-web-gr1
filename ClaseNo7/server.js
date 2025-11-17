const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===================== CONFIGURACIÓN DE HANDLEBARS =====================
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        // Helper para formatear precio en dólares
        formatPrice: function(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price);
        },
        // Helper para calcular descuento
        calcDiscount: function(price, discount) {
            return price - (price * discount / 100);
        },
        // Helper para verificar stock
        inStock: function(stock) {
            return stock > 0;
        },
        // Helper para verificar descuento
        hasDiscount: function(discount) {
            return discount > 0;
        },
        // Helper para rating de estrellas
        stars: function(rating) {
            let stars = '';
            for(let i = 1; i <= 5; i++) {
                stars += i <= rating ? '★' : '☆';
            }
            return stars;
        },
        // Helper para categorías
        isCategory: function(category, selectedCategory) {
            return category === selectedCategory;
        },
        // Helper comparación
        eq: function(a, b) {
            return a === b;
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ===================== MIDDLEWARE =====================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===================== DATOS DE PRODUCTOS GAMER =====================
const productos = [
    {
        id: 1,
        nombre: 'NVIDIA GeForce RTX 4090',
        categoria: 'gpu',
        descripcion: 'La tarjeta gráfica más potente del mercado. 24GB GDDR6X, ideal para gaming 4K y ray tracing.',
        precio: 1599.99,
        descuento: 10,
        stock: 15,
        rating: 5,
        specs: [
            '24GB GDDR6X',
            '16384 CUDA Cores',
            'Ray Tracing Gen 3',
            'DLSS 3.0',
            'Boost Clock: 2.52 GHz'
        ],
        imagen: 'rtx-4090.jpg',
        destacado: true
    },
    {
        id: 2,
        nombre: 'AMD Ryzen 9 7950X',
        categoria: 'cpu',
        descripcion: 'Procesador de 16 núcleos y 32 hilos. Perfecto para gaming y creación de contenido.',
        precio: 699.99,
        descuento: 15,
        stock: 23,
        rating: 5,
        specs: [
            '16 Cores / 32 Threads',
            'Base Clock: 4.5 GHz',
            'Boost Clock: 5.7 GHz',
            '80MB Cache',
            'TDP: 170W'
        ],
        imagen: 'ryzen-9.jpg',
        destacado: true
    },
    {
        id: 3,
        nombre: 'Corsair Vengeance RGB 32GB',
        categoria: 'ram',
        descripcion: 'Memoria RAM DDR5 de alto rendimiento con iluminación RGB personalizable.',
        precio: 189.99,
        descuento: 0,
        stock: 45,
        rating: 4,
        specs: [
            '32GB (2x16GB)',
            'DDR5-6000MHz',
            'CL36',
            'RGB Dinámico',
            'Intel XMP 3.0'
        ],
        imagen: 'corsair-ram.jpg',
        destacado: false
    },
    {
        id: 4,
        nombre: 'Samsung 990 PRO 2TB',
        categoria: 'storage',
        descripcion: 'SSD NVMe PCIe 4.0 de última generación. Velocidades increíbles de lectura/escritura.',
        precio: 199.99,
        descuento: 20,
        stock: 38,
        rating: 5,
        specs: [
            '2TB Capacidad',
            'Lectura: 7,450 MB/s',
            'Escritura: 6,900 MB/s',
            'PCIe 4.0 NVMe',
            'Garantía 5 años'
        ],
        imagen: 'samsung-990.jpg',
        destacado: true
    },
    {
        id: 5,
        nombre: 'ASUS ROG Strix B650-E',
        categoria: 'motherboard',
        descripcion: 'Motherboard gaming con soporte para Ryzen 7000, PCIe 5.0 y WiFi 6E.',
        precio: 329.99,
        descuento: 5,
        stock: 18,
        rating: 5,
        specs: [
            'Socket AM5',
            'PCIe 5.0',
            'WiFi 6E',
            '2.5G LAN',
            'RGB Aura Sync'
        ],
        imagen: 'asus-rog.jpg',
        destacado: false
    },
    {
        id: 6,
        nombre: 'Cooler Master MasterLiquid 360',
        categoria: 'cooling',
        descripcion: 'Sistema de refrigeración líquida AIO de 360mm. Silencioso y eficiente.',
        precio: 149.99,
        descuento: 10,
        stock: 27,
        rating: 4,
        specs: [
            'Radiador 360mm',
            'RGB Addressable',
            'Bomba Gen 3',
            'Ventiladores 120mm',
            'Socket Universal'
        ],
        imagen: 'cooler-master.jpg',
        destacado: false
    },
    {
        id: 7,
        nombre: 'Corsair RM1000x 1000W',
        categoria: 'psu',
        descripcion: 'Fuente de poder modular 80+ Gold. Certificada y ultra silenciosa.',
        precio: 179.99,
        descuento: 0,
        stock: 31,
        rating: 5,
        specs: [
            '1000W',
            '80+ Gold',
            'Modular Completa',
            'Ventilador 135mm',
            'Garantía 10 años'
        ],
        imagen: 'corsair-psu.jpg',
        destacado: false
    },
    {
        id: 8,
        nombre: 'NZXT H7 Flow RGB',
        categoria: 'case',
        descripcion: 'Gabinete mid-tower con excelente flujo de aire y panel de vidrio templado.',
        precio: 129.99,
        descuento: 15,
        stock: 22,
        rating: 4,
        specs: [
            'Mid Tower',
            'Vidrio Templado',
            '3x Ventiladores RGB',
            'USB-C Frontal',
            'Cable Management'
        ],
        imagen: 'nzxt-case.jpg',
        destacado: false
    },
    {
        id: 9,
        nombre: 'Logitech G Pro X Superlight',
        categoria: 'perifericos',
        descripcion: 'Mouse gaming inalámbrico ultraligero. Sensor HERO 25K de precisión extrema.',
        precio: 159.99,
        descuento: 10,
        stock: 54,
        rating: 5,
        specs: [
            'Peso: 63g',
            'Sensor HERO 25K',
            'Batería 70h',
            'Wireless LIGHTSPEED',
            'DPI: 100-25,600'
        ],
        imagen: 'logitech-mouse.jpg',
        destacado: true
    },
    {
        id: 10,
        nombre: 'Razer BlackWidow V4 Pro',
        categoria: 'perifericos',
        descripcion: 'Teclado mecánico premium con switches Green, RGB Chroma y control multimedia.',
        precio: 229.99,
        descuento: 20,
        stock: 19,
        rating: 5,
        specs: [
            'Switches Green',
            'RGB Chroma',
            'Multimedia Dial',
            'Reposamuñecas',
            'USB Passthrough'
        ],
        imagen: 'razer-keyboard.jpg',
        destacado: true
    }
];

const categorias = [
    { id: 'gpu', nombre: 'Tarjetas Gráficas', icono: 'fas fa-microchip' },
    { id: 'cpu', nombre: 'Procesadores', icono: 'fas fa-brain' },
    { id: 'ram', nombre: 'Memoria RAM', icono: 'fas fa-memory' },
    { id: 'storage', nombre: 'Almacenamiento', icono: 'fas fa-hdd' },
    { id: 'motherboard', nombre: 'Motherboards', icono: 'fas fa-network-wired' },
    { id: 'cooling', nombre: 'Refrigeración', icono: 'fas fa-fan' },
    { id: 'psu', nombre: 'Fuentes de Poder', icono: 'fas fa-plug' },
    { id: 'case', nombre: 'Gabinetes', icono: 'fas fa-cube' },
    { id: 'perifericos', nombre: 'Periféricos', icono: 'fas fa-keyboard' }
];

// ===================== RUTAS =====================

// Página principal
app.get('/', (req, res) => {
    const productosDestacados = productos.filter(p => p.destacado);
    const totalProductos = productos.length;
    const categoriasCount = categorias.length;
    
    res.render('home', {
        title: 'Inicio - TechGamer Store',
        productos: productosDestacados,
        categorias: categorias.slice(0, 6),
        stats: {
            productos: totalProductos,
            categorias: categoriasCount,
            envioGratis: 'Todo el país',
            garantia: '2 años'
        }
    });
});

// Catálogo completo
app.get('/productos', (req, res) => {
    const categoriaFiltro = req.query.categoria;
    let productosFiltrados = productos;
    
    if (categoriaFiltro) {
        productosFiltrados = productos.filter(p => p.categoria === categoriaFiltro);
    }
    
    res.render('productos', {
        title: 'Catálogo - TechGamer Store',
        productos: productosFiltrados,
        categorias: categorias,
        categoriaSeleccionada: categoriaFiltro,
        totalProductos: productosFiltrados.length
    });
});

// Detalle de producto
app.get('/producto/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        return res.status(404).render('404', { title: '404 - Producto no encontrado' });
    }
    
    const relacionados = productos
        .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
        .slice(0, 3);
    
    res.render('detalle', {
        title: `${producto.nombre} - TechGamer Store`,
        producto,
        relacionados
    });
});

// Carrito (simulado)
app.get('/carrito', (req, res) => {
    res.render('carrito', {
        title: 'Carrito - TechGamer Store',
        items: []
    });
});

// Página 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Página no encontrada',
        layout: false
    });
});

// ===================== SERVIDOR =====================
app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🎮 TechGamer Store - Servidor iniciado`);
    console.log(`${'='.repeat(50)}`);
    console.log(`🚀 URL: http://localhost:${PORT}`);
    console.log(`📦 Motor de renderizado: Handlebars`);
    console.log(`📂 Productos disponibles: ${productos.length}`);
    console.log(`🏷️  Categorías: ${categorias.length}`);
    console.log(`${'='.repeat(50)}\n`);
});
