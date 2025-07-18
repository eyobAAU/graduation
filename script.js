document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio
    const audio = document.getElementById('celebrationSound');
    audio.volume = 0.3;
    
    // Create meteors
    createMeteors();
    
    // Animate name letters
    animateName();
    
    // Make planets interactive
    initPlanets();
    
    // Start subtle animation
    startSubtleAnimation();
});

function createMeteors() {
    const meteorShower = document.querySelector('.meteor-shower');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const meteor = document.createElement('div');
            meteor.classList.add('meteor');
            meteor.style.left = `${Math.random() * 100}%`;
            meteor.style.top = `${Math.random() * 20 - 20}%`;
            meteor.style.animationDuration = `${Math.random() * 3 + 2}s`;
            meteor.style.animationDelay = `${Math.random() * 5}s`;
            meteorShower.appendChild(meteor);
            
            // Remove meteor after animation
            setTimeout(() => {
                meteor.remove();
            }, 5000);
        }, i * 500);
    }
    
    // Continuous meteors
    setInterval(createMeteors, 10000);
}

function animateName() {
    const letters = document.querySelectorAll('.grad-name-letter');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transform = 'translateY(-20px)';
            letter.style.opacity = '1';
            
            setTimeout(() => {
                letter.style.transform = 'translateY(0)';
            }, 300);
        }, index * 200);
    });
}

function initPlanets() {
    const planets = document.querySelectorAll('.message-planet');
    
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            this.style.boxShadow = `0 0 50px ${getComputedStyle(this).boxShadow.split(' ')[4]}`;
            
            // Create particle burst
            const particles = 30;
            const color = getComputedStyle(this).boxShadow.split(' ')[4];
            
            for (let i = 0; i < particles; i++) {
                createParticle(this, color);
            }
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    });
}

function createParticle(element, color) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.background = color;
    particle.style.left = `${element.offsetLeft + element.offsetWidth/2}px`;
    particle.style.top = `${element.offsetTop + element.offsetHeight/2}px`;
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;
    
    let posX = element.offsetLeft + element.offsetWidth/2;
    let posY = element.offsetTop + element.offsetHeight/2;
    let opacity = 1;
    
    const animate = () => {
        posX += x;
        posY += y;
        opacity -= 0.02;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    requestAnimationFrame(animate);
}

function startSubtleAnimation() {
    const title = document.querySelector('.cosmic-title');
    const subtitle = document.querySelector('.cosmic-subtitle');
    
    // Pulsing title
    setInterval(() => {
        title.style.transform = 'scale(1.05)';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 1000);
    }, 3000);
    
    // Floating subtitle
    setInterval(() => {
        subtitle.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            subtitle.style.transform = 'translateY(0)';
        }, 1000);
    }, 3500);
}

function celebrate() {
    // Cosmic explosion
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6a00f4', '#ff00c1', '#ffe700', '#00f5d4'],
                shapes: ['circle', 'star'],
                scalar: 1.5
            });
        }, i * 300);
    }
    
    // Play sound
    const audio = document.getElementById('celebrationSound');
    audio.play();
    
    // Screen flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'white';
    flash.style.opacity = '0.8';
    flash.style.zIndex = '100';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    
    // Animate flash
    let opacity = 0.8;
    const fadeOut = () => {
        opacity -= 0.05;
        flash.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(fadeOut);
        } else {
            flash.remove();
        }
    };
    
    requestAnimationFrame(fadeOut);
    
    // Animate name letters
    const letters = document.querySelectorAll('.grad-name-letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.transform = 'translateY(-30px) scale(1.5)';
            letter.style.boxShadow = '0 0 30px white';
            
            setTimeout(() => {
                letter.style.transform = 'translateY(0) scale(1)';
                letter.style.boxShadow = '0 0 20px var(--cosmic-purple)';
            }, 1000);
        }, index * 200);
    });
}

function toggleSound() {
    const audio = document.getElementById('celebrationSound');
    const soundControl = document.querySelector('.sound-control i');
    
    if (audio.paused) {
        audio.play();
        soundControl.className = 'fas fa-volume-up';
        soundControl.style.textShadow = '0 0 10px var(--galaxy-teal)';
    } else {
        audio.pause();
        soundControl.className = 'fas fa-volume-mute';
        soundControl.style.textShadow = 'none';
    }
}