CopiarUrl();
VideoFuncionalities();
ParticiparChamada();

const videoTag = document.querySelector('#video');
const tooltip = document.querySelector("#tooltip");


class IniciarCamera {
  constructor(showCam, hideCam){
    this.cameraOn = showCam;
    this.cameraOff = hideCam;    
  }
  getMedia(){
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoTag.srcObject = stream;
        })
        .catch(err0r => {
          ShowHide([hideCam, showCam]);
        });
    }
  }
  
}

/* SEND THE STREAM ON CAMERA TO VIDEO SRC */
InitCam();
function InitCam (){
  const showCam = document.querySelector("#show_camera");
  const hideCam = document.querySelector("#sem_camera");
  
  const camera = new IniciarCamera(showCam, hideCam);

  camera.getMedia();
}


function VideoFuncionalities(){
  const videoButton = document.querySelector(".box-cam_botoes .video");
  const videoPausado = document.querySelector("#cam_pausada");
  const videoButtonPlay = videoButton.querySelector(".cam-play");
  const videoButtonPause = videoButton.querySelector(".cam-stop");
  const audioButton = document.querySelector(".box-cam_botoes .audio");
  const audioButtonPlay = document.querySelector(".audio-play");
  const audioButtonPause = document.querySelector(".audio-stop");

  /* ADD PLAY / PAUSE VIDEO */
  videoButton.addEventListener('click', () => {
    ShowHide([videoTag, videoPausado, videoButtonPlay, videoButtonPause]);
    if(videoTag.paused)
      videoTag.play();    
    else
      videoTag.pause();    
  })
  
  /* ADD MUTE / UNMUTE */
  audioButton.addEventListener('click', () =>{
    ShowHide([audioButtonPause, audioButtonPlay]);
    if(videoTag.muted)
      videoTag.muted = false
    else
      videoTag.muted = true;
  })
}

/* FUNCOES PARA PARTICIPAR DA CHAMADA */
function ParticiparChamada(){
  const botaoAnfitriao = document.querySelector(".participar_anfitriao");
  const participarVideo = document.querySelector(".participar_video");
  const participarPin = document.querySelector(".participar_pin");

  /* ENTRAR COMO ANFITRIÃO */
  botaoAnfitriao.addEventListener('click', () =>{
    ShowHide([botaoAnfitriao]);
    ShowHide([participarPin], "hide_width");  
  })

  /* PARTICIPAR CHAMADA */
  participarVideo.addEventListener("click", () => {
    if(participarPin.value){
      alert(`Entrar como anfitrião com o PIN: ${participarPin.value}`);
      //location.replace("http://127.0.0.1:5500/entrevista.html");
    }
    else{
      alert('Entrar como entrevistado');
      //location.replace("http://127.0.0.1:5500/entrevista.html?teste");
    }
  })
}

/* COPIAR URL */
function CopiarUrl(){
  const urlItem = document.querySelector(".url_item");
  
  urlItem.addEventListener('click', () =>{
    document.execCommand("copy");
    tooltip.innerHTML = "Endereço Copiado";
  })
  
  urlItem.addEventListener("copy", event => {
    event.preventDefault();
    const link_item = document.querySelector(".link_item");
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", link_item.textContent);    
    }
  });
  
}
function outFunc() {
  tooltip.innerHTML = "Copiar Endereço";
};

function TentarNovamente(){
  const tryAgain = document.querySelector("#sem_camera .participar_botao");

  /* TENTAR NOVAMENTE */
  tryAgain.addEventListener("click", event => {
    event.preventDefault();
    location.reload();
  });
}

function ShowHide(itens, classe = "hide_item"){
  itens.forEach(item => {
    item.classList.toggle(classe);    
  })
}