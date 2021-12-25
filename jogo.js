console.log('Game Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoFundo = {
  sourceX: 390,
  sourceY: 0,
  largura: 276,
  altura: 204,
  destinationX: 0,
  destinationY: canvas.height,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0, 0, canvas.width, canvas.height); 
      contexto.drawImage(
        sprites,
        planoFundo.sourceX, planoFundo.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
        planoFundo.largura, planoFundo.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
        planoFundo.destinationX, (planoFundo.destinationY - planoFundo.altura), //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
        planoFundo.largura, planoFundo.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
      );
  
      contexto.drawImage(
        sprites,
        planoFundo.sourceX, planoFundo.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
        planoFundo.largura, planoFundo.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
        (planoFundo.destinationX + planoFundo.largura), (planoFundo.destinationY - planoFundo.altura), //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
        planoFundo.largura, planoFundo.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
      );
    }  
};

const chao = {
  sourceX: 0,
  sourceY: 610,
  largura: 224,
  altura: 112,
  destinationX: 0,
  destinationY: canvas.height,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.sourceX, chao.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
      chao.largura, chao.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
      chao.destinationX, (chao.destinationY - chao.altura), //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
      chao.largura, chao.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
    );

    contexto.drawImage(
      sprites,
      chao.sourceX, chao.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
      chao.largura, chao.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
      (chao.destinationX + chao.largura), (chao.destinationY - chao.altura), //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
      chao.largura, chao.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
    );
  }
}

const mensagemGetReady = {
  sourceX: 134,
  sourceY: 0,
  largura: 174,
  altura: 152,
  destinationX: 0,
  destinationY: 58,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sourceX, mensagemGetReady.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
      mensagemGetReady.largura, mensagemGetReady.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
      ((canvas.width / 2) - (this.largura / 2)), mensagemGetReady.destinationY, //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
      mensagemGetReady.largura, mensagemGetReady.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
    );
  }
}

const flappyBird = {
  sourceX: 0,
  sourceY: 0,
  largura: 34,
  altura: 24,
  destinationX: 10,
  destinationY: 50,
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade += this.gravidade;
    flappyBird.destinationY += this.velocidade;
  },
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.sourceX, flappyBird.sourceY, //sourceX, sourceY (Canto superior esquerdo do início da imagem)
      flappyBird.largura, flappyBird.altura, //sourceWidth, sourceHeight (altura e largura da imagem)
      flappyBird.destinationX, flappyBird.destinationY, //destinationX, destinationY (Canto superior esquedo para início da imagem dentro do canvas)
      flappyBird.largura, flappyBird.altura //destinationWidth, destinationHeight (altura e largura da imagem dentro do canvas)
    );
  }
};

let telaAtiva = {};

function mudarTela(novaTela) {
  telaAtiva = novaTela;
}

const telas = {
  inicio: {
    desenha() {
      planoFundo.desenha();
      chao.desenha();
      mensagemGetReady.desenha();
      flappyBird.desenha();
    },
    atualiza() {

    },
    click() {
      mudarTela(telas.jogo);
    }
  },

  jogo: {
    desenha() {
      planoFundo.desenha();
      chao.desenha();
      flappyBird.desenha();
    },
    atualiza() {
      flappyBird.atualiza();
    }
  }
};

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();
 
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudarTela(telas.inicio);
loop();

