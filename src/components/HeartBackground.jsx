import React, { useEffect, useRef } from 'react';

const HeartBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let hearts = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Heart {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 200;
                this.size = Math.random() * 12 + 4; // Smaller hearts
                this.speed = Math.random() * 0.8 + 0.3; // Slower speed
                this.opacity = Math.random() * 0.3 + 0.1; // More subtle
                this.wiggleSpeed = Math.random() * 0.03;
                this.time = Math.random() * 100;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#ff4d6d';
                ctx.translate(this.x + Math.sin(this.time) * 15, this.y);
                
                ctx.beginPath();
                const d = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-d/2, -d/2, -d, d/4, 0, d*0.75);
                ctx.bezierCurveTo(d, d/4, d/2, -d/2, 0, 0);
                ctx.fill();
                
                ctx.restore();
                this.y -= this.speed;
                this.time += this.wiggleSpeed;

                if (this.y < -50) {
                    this.reset();
                }
            }
        }

        const init = () => {
            // Fewer hearts for better performance and less visual clutter
            hearts = Array.from({ length: 25 }, () => new Heart());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach(heart => heart.draw());
            requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default HeartBackground;
