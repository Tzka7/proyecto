document.addEventListener('DOMContentLoaded', () => {

    // 1. Ocultar la pantalla de carga (Preloader) al terminar de cargar la web
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
        }, 2500); 
    });
    
    // Respaldo de seguridad para quitar el preloader si tarda demasiado
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 5000); 

    // 2. Efecto de cambio en el menú (Header) al hacer Scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Efecto de Escritura Automática (Typewriter) en el Banner Principal
    const textElement = document.getElementById('typewriter');
    const phrases = [
        'Protegemos lo que más valoras.',
        'Tu tranquilidad, en manos expertas.',
        'Cotiza tu seguro automotor hoy.',
        'Soporte 24/7 en cualquier siniestro.'
    ];
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && characterIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pausa larga al terminar la frase
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 300; // Pausa corta antes de escribir de nuevo
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // 4. Acordeón Interactivo de Preguntas Frecuentes (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // 5. Animación de Entrada al hacer Scroll (Fade In / Fade Up)
    const scrollElements = document.querySelectorAll('.fade-in, .fade-up');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // 6. Contador Numérico de Estadísticas Animadas
    const counters = document.querySelectorAll('.counter');
    let speed = 200;
    let started = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.textContent;
                const time = value / speed;
                if(data < value) {
                    counter.textContent = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.textContent = value + "+";
                }
            }
            animate();
        });
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('estadisticas');
        if(statsSection && elementInView(statsSection, 1) && !started) {
            startCounters();
            started = true;
        }
    });

    // 7. Configuración y Envío Automático del Formulario a WhatsApp
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const seguro = document.getElementById('seguro').value;

        const numeroWhatsApp = "595984099366"; 
        const mensajeText = `Hola Paraná Broker. Me gustaría solicitar una cotización.%0A%0A*Nombre:* ${nombre}%0A*Celular:* ${telefono}%0A*Seguro solicitado:* ${seguro}`;
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeText}`;

        Swal.fire({
            title: '¡Formulario Recibido!',
            text: 'Te estamos redirigiendo a WhatsApp para conectar con un asesor experto de Paraná Broker.',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#0A2A5E'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(urlWhatsApp, '_blank');
                form.reset();
            }
        });
    });

    // 8. Lógica Inteligente para Pestañas Dinámicas con Rotación Automática y Pausa
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabsContainer = document.querySelector('.tabs-container'); 
    let currentIndex = 0;
    let rotationInterval;

    // Función unificada para cambiar la pestaña activa
    function changeTab(index) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        tabButtons[index].classList.add('active');
        tabPanels[index].classList.add('active');
        currentIndex = index;
    }

    // Iniciar rotación cada 10 segundos para dar tiempo a leer
    function startAutoRotation() {
        rotationInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % tabButtons.length;
            changeTab(nextIndex);
        }, 10000); 
    }

    // Detener la rotación temporalmente
    function stopAutoRotation() {
        clearInterval(rotationInterval);
    }

    // Evento de clic manual del usuario
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            changeTab(index);
            stopAutoRotation(); 
            startAutoRotation(); 
        });
    });

    // Control inteligente por proximidad (Pausa al pasar el mouse por encima)
    if (tabsContainer) {
        tabsContainer.addEventListener('mouseenter', stopAutoRotation);
        tabsContainer.addEventListener('mouseleave', startAutoRotation);
    }

    // Arrancar la rotación automática al cargar la página
    startAutoRotation();
});