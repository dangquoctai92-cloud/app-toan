
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Fredoka', 'sans-serif'],
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        drift: {
                            '0%': { transform: 'translateX(-20vw)' },
                            '100%': { transform: 'translateX(120vw)' },
                        },
                        bob: {
                            '0%, 100%': { transform: 'translateY(150px)', opacity: '0' },
                            '10%, 90%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        bubble: {
                            '0%': { transform: 'translateY(0) scale(0.5)', opacity: '1' },
                            '100%': { transform: 'translateY(-120px) scale(1.5)', opacity: '0' },
                        },
                        subMove: {
                            '0%': { transform: 'translateX(120vw)' },
                            '100%': { transform: 'translateX(-20vw)' },
                        },
                        sway: {
                            '0%, 100%': { transform: 'rotate(-5deg)', transformOrigin: 'bottom center' },
                            '50%': { transform: 'rotate(5deg)', transformOrigin: 'bottom center' },
                        },
                        runDog: {
                            '0%': { transform: 'translateX(0) scaleX(1)' },
                            '45%': { transform: 'translateX(-100px) scaleX(1)' },
                            '50%': { transform: 'translateX(-100px) scaleX(-1)' },
                            '95%': { transform: 'translateX(0) scaleX(-1)' },
                            '100%': { transform: 'translateX(0) scaleX(1)' },
                        },
                        dolphinJump: {
                            '0%, 100%': { transform: 'translate(150px, 150px) rotate(-45deg)', opacity: '0' },
                            '10%': { transform: 'translate(50px, -20px) rotate(-20deg)', opacity: '1' },
                            '20%': { transform: 'translate(-50px, -80px) rotate(0deg)', opacity: '1' },
                            '30%': { transform: 'translate(-150px, -20px) rotate(45deg)', opacity: '1' },
                            '40%': { transform: 'translate(-250px, 150px) rotate(70deg)', opacity: '0' },
                            '50%, 99%': { transform: 'translate(150px, 150px) rotate(-45deg)', opacity: '0' }
                        }
                    },
                    animation: {
                        float: 'float 4s ease-in-out infinite',
                        floatDelayed: 'float 5s ease-in-out infinite 2s',
                        floatSlow: 'float 8s ease-in-out infinite',
                        drift1: 'drift 30s linear infinite',
                        drift2: 'drift 45s linear infinite',
                        drift3: 'drift 35s linear infinite',
                        bob1: 'bob 10s ease-in-out infinite',
                        bob2: 'bob 12s ease-in-out infinite 2s',
                        bob3: 'bob 15s ease-in-out infinite 5s',
                        bubble: 'bubble 1.5s ease-out forwards',
                        subMove: 'subMove 40s linear infinite',
                        sway: 'sway 3s ease-in-out infinite',
                        runDog: 'runDog 8s linear infinite',
                        dolphinJump: 'dolphinJump 8s linear infinite'
                    }
                }
            }
        }
    