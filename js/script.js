document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const gameOverMusic = document.getElementById('game-over-music');
    let musicStarted = false;

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
    
        document.getElementById('start-button').addEventListener('click', () => {
        startMusic();
        document.getElementById('start-button').style.display = 'none';
    });

    document.addEventListener('keydown', startMusic);

    const princess = document.querySelector('.princess');
    const pipe = document.querySelector('.pipe');
    const coin = document.querySelector('.coin');

    const jump = () => {
        princess.classList.add('jump');

        setTimeout(() => {
            princess.classList.remove('jump');
        }, 500);
    };

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const princessPosition = +window.getComputedStyle(princess).bottom.replace('px', '');

     
        coin.style.left = `${pipePosition + 10}px`; 
        coin.style.top = `${parseInt(pipe.style.height) + 10}px`;

        if (pipePosition <= 120 && pipePosition > 0 && princessPosition < 100) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            princess.style.animation = 'none';
            princess.style.bottom = `${princessPosition}px`;

            princess.src = './imagens/gameover.png';
            princess.style.width = '75px';
            princess.style.marginLeft = '50px';

            clearInterval(loop);
            playGameOverMusic();
        }
    }, 10);

    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
});
