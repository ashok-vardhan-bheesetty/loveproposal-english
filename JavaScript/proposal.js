
        // Function to play the 'Yes' audio and hide page1 with fade-out
        function playAudio() {
            const audio = document.getElementById('myAudio');
            const page1 = document.getElementById('page01');
            const page2 = document.getElementById('page2');
            const noButton = document.getElementById('noButton');
            const noButton2 =document.getElementById('noButton2');
            const page3 =document.getElementById('page3');
            audio.play();  // Play the audio for 'Yes'

            // Add fade-out class to trigger the animation on page1
            page1.classList.add('fade-out');

            // Show page2 after fade-out animation completes
            setTimeout(function() {
                page1.style.display = "none";  // Hide page1 after fade-out
                page2.style.display = "block"; // Show page2 after fade-out
            }, 2000); // Timeout matches the fade-out animation duration (2s)
        }
        
       // Function for accepting the proposal (Mobile/Desktop)
       function accepted() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    // Fade out Page 2
    page2.classList.add('fade-out');

    setTimeout(function () {
    page2.style.display = "none"; 
    page3.style.display="flex"; // Hide page2 after fade-out
}, 2000); // Timeout matches the fade-out animation duration (2s)
}

function accepted() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');

    // Fade out Page 2
    page2.classList.add('fade-out');

    setTimeout(function () {
    page2.style.display = "none"; 
    page3.style.display="flex"; // Hide page2 after fade-out
}, 2000); // Timeout matches the fade-out animation duration (2s)
}

        function moveButton() {
      const newX = Math.floor(Math.random() * (window.innerWidth - noButton.offsetWidth));
      const newY = Math.floor(Math.random() * (window.innerHeight - noButton.offsetHeight));
      noButton.style.position = 'absolute';
      noButton.style.left = newX + 'px';
      noButton.style.top = newY + 'px';
    }
    function moveButton2() {
      const newX = Math.floor(Math.random() * (window.innerWidth - noButton2.offsetWidth));
      const newY = Math.floor(Math.random() * (window.innerHeight - noButton2.offsetHeight));
      noButton2.style.position = 'absolute';
      noButton2.style.left = newX + 'px';
      noButton2.style.top = newY + 'px';
    }
   
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const fireworks = [];
    const particles = [];

    class Firework {
        constructor(x, y, targetX, targetY) {
            this.x = x;
            this.y = y;
            this.targetX = targetX;
            this.targetY = targetY;
            this.speed = 3;
            this.radius = 3;
            this.color = `hsl(${Math.random() * 180}, 100%, 50%)`;
            this.exploded = false;
        }

        update() {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            if (distance > 5) {
                this.x += Math.cos(angle) * this.speed;
                this.y += Math.sin(angle) * this.speed;
            } else {
                this.exploded = true;
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particle(this.targetX, this.targetY, this.color));
                }
            }

            this.draw();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 2 + 1;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.alpha = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.02;
            this.draw();
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }


    function launchFirework() {
        const targetX = Math.random() * canvas.width;
        const targetY = Math.random() * (canvas.height / 2);
        fireworks.push(new Firework(canvas.width / 2, canvas.height, targetX, targetY));
    }


    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            firework.update();
            if (firework.exploded) fireworks.splice(index, 1);
        });

        particles.forEach((particle, index) => {
            particle.update();
            if (particle.alpha <= 0) particles.splice(index, 1);
        });

        requestAnimationFrame(animate);
    }

    // Launch fireworks continuously
   // Launch first fireworks
setInterval(launchFirework, 800); // Launch every 800ms

// Combined window.onload
window.onload = () => {
    animate();  // Call the first animation loop
};
    


