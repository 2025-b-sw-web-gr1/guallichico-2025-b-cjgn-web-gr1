// Funcionalidad para el header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Simulación de búsqueda
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.width = '300px';
    searchInput.style.width = '260px';
});

searchInput.addEventListener('blur', () => {
    if (!searchInput.value) {
        searchInput.parentElement.style.width = 'auto';
        searchInput.style.width = '200px';
    }
});

// Funcionalidad para los botones de reproducir
const playButtons = document.querySelectorAll('.play-btn, .btn-primary');
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Reproduciendo contenido... (Demo)');
    });
});

// Funcionalidad para agregar a "Mi lista"
const addButtons = document.querySelectorAll('.add-btn');
addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.content-card');
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--primary-color)';
        button.style.borderColor = 'var(--primary-color)';
        
        // Mostrar mensaje temporal
        const message = document.createElement('div');
        message.textContent = 'Agregado a Mi lista';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 2000);
    });
});

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simulación de carga de contenido adicional (scroll infinito)
let isLoading = false;
window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 500 && !isLoading) {
        isLoading = true;
        console.log('Cargando más contenido...');
        // Aquí iría la lógica para cargar más contenido
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    }
});

// Animación de entrada para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las categorías
document.querySelectorAll('.category').forEach(category => {
    observer.observe(category);
});

// Funcionalidad del botón "Ver todo"
const viewAllButtons = document.querySelectorAll('.view-all');
viewAllButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Mostrando todos los títulos de esta categoría... (Demo)');
    });
});

// Prevenir clicks en enlaces vacíos
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// Funcionalidad para el botón "Más información"
const infoButtons = document.querySelectorAll('.btn-secondary:last-child');
infoButtons.forEach(button => {
    if (button.textContent.includes('Más información')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Mostrando más información... (Demo)');
        });
    }
});

// Mejorar la experiencia del hover en tarjetas
const contentCards = document.querySelectorAll('.content-card');
contentCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '100';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

console.log('Amazon Prime Video - Réplica cargada correctamente');