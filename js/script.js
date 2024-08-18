document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const gameOverMusic = document.getElementById('game-over-music');
    const princess = document.querySelector('.princess');
    const pipe = document.querySelector('.pipe');
    const coin = document.querySelector('.coin');
    let musicStarted = false;
    let gameStarted = false;
    let gameLoop; 

    pipe.style.display = 'none';

    const startMusic = () => {
        if (!musicStarted) {
            backgroundMusic.play().then(() => {
                console.log('Música de fundo iniciada com sucesso.');
                musicStarted = true;
            }).catch(error => {
                console.log('Erro ao tentar tocar a música de fundo:', error);
            });
        }
    };

    const playGameOverMusic = () => {
        backgroundMusic.pause();
        gameOverMusic.play().then(() => {
            console.log('Música de game over iniciada com sucesso.');
        }).catch(error => {
            console.log('Erro ao tentar tocar a música de game over:', error);
        });
    };

    const jump = () => {
        if (gameStarted) {
            princess.classList.add('jump');
            setTimeout(() => {
                princess.classList.remove('jump');
            }, 700);
        }
    };

    const resetCoin = () => {
        coin.style.display = 'block';
        coin.style.left = `${pipe.offsetLeft + 10}px`;
        coin.style.top = `${parseInt(pipe.style.height) + 10}px`;
    };

    const startGame = () => {
        gameStarted = true;
        startMusic();
        document.getElementById('start-button').style.display = 'none';

      
        pipe.style.display = 'block';
        
    
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            pipe.style.animation = 'pipe-animation 1s infinite linear'; 
        } else {
            pipe.style.animation = 'pipe-animation 3s infinite linear'; 
        }
        
        coin.style.animation = 'coin-animation 3s infinite linear';

        gameLoop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const princessPosition = +window.getComputedStyle(princess).bottom.replace('px', '');
            const coinPosition = coin.offsetLeft;
            const coinHeight = +window.getComputedStyle(coin).bottom.replace('px', '');

            coin.style.left = `${pipePosition + 10}px`;
            coin.style.top = `${parseInt(pipe.style.height) + 10}px`;

            if (coinPosition <= 100 && coinPosition > 0 && princessPosition >= coinHeight) {
                coin.style.display = 'none';
                console.log('Moeda coletada!');
            }

            if (pipePosition <= 90 && pipePosition > 0 && princessPosition < 100) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                princess.style.animation = 'none';
                princess.style.bottom = `${princessPosition}px`;

                princess.src = './imagens/gameover.png';
                princess.style.width = '75px';
                princess.style.marginLeft = '50px';

                clearInterval(gameLoop); 
                playGameOverMusic();
            }

            if (pipePosition <= 0) {
                resetCoin();
            }
        }, 10);
    };

    document.getElementById('start-button').addEventListener('click', startGame);
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
});

