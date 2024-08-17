const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const princessPosition = +window.getComputedStyle(princess).bottom.replace('px', '');
    const coinPosition = coin.offsetLeft;
    const coinBottom = parseInt(window.getComputedStyle(coin).bottom.replace('px', ''));

 
    coin.style.left = `${pipePosition + 10}px`; 
    coin.style.top = `${parseInt(pipe.style.height) + 10}px`;

    
    if (coinPosition <= 120 && coinPosition > 0 && princessPosition <= coinBottom + 40) {
        coin.style.display = 'none'; 
        console.log('Moeda coletada!');
    }

    if (pipePosition <= 100 && pipePosition > 0 && princessPosition < 100) {
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

    if (pipePosition <= 0) {
        pipe.style.animation = '';
        princess.style.animation = '';
        resetCoin();
    }
}, 20);

    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
});

