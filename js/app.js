let timer;
let startTimer = false;

const createVideoOverlay = (playerElement) => {
  const overlay = document.createElement("div");
  overlay.className = "ag-video-overlay";

  if (playerElement) {
    playerElement.appendChild(overlay);
  }

  return overlay;
};

const createButtonMuted = (playerElement) => {
  const wrapperButton = document.createElement("div");
  wrapperButton.className = "ag-wrapper-button-mute";
  const button = document.createElement("button");
  button.className = "ag-button-mute";
  button.innerHTML = `
    <p>Clique aqui</p>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="7.999 9.062 46.75 32.563" enable-background="new 7.999 9.062 46.75 32.563" xml:space="preserve"> <style>@keyframes BLINK{0%{opacity: 0;}33%{opacity: 1;}66%{opacity: 1;}100%{opacity: 0;}}.blink_1{animation: BLINK 2s infinite; opacity: 0;}.blink_2{animation: BLINK 2s infinite .3s; opacity: 0;}.blink_3{animation: BLINK 2s infinite .6s; opacity: 0;}</style><style class="darkreader darkreader--sync" media="screen"></style> <g class="adjustable fg" style="fill: rgb(255, 255, 255); --darkreader-inline-fill:#ffffff;" data-darkreader-inline-fill=""> <path d="M53.249,39.616c-0.186,0-0.371-0.051-0.537-0.157l-43.5-27.75c-0.466-0.297-0.603-0.916-0.306-1.381c0.298-0.466,0.917-0.601,1.381-0.306l43.5,27.75c0.467,0.297,0.604,0.916,0.307,1.381C53.901,39.453,53.579,39.616,53.249,39.616z"></path> <path class="blink_3" d="M48.896,33.467l1.699,1.085c3.497-7.791,2.073-17.271-4.313-23.659c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414C50.581,18.019,51.913,26.463,48.896,33.467z"></path> <path class="blink_3" d="M46.926,36.956c-0.612,0.863-1.286,1.695-2.059,2.469c-0.392,0.391-0.392,1.023,0,1.414c0.194,0.195,0.45,0.293,0.707,0.293c0.256,0,0.512-0.098,0.706-0.293c0.878-0.878,1.642-1.824,2.333-2.807L46.926,36.956z"></path> <path class="blink_2" d="M42.543,29.415l1.777,1.135c1.545-5.315,0.229-11.293-3.953-15.476c-0.392-0.391-1.023-0.391-1.414,0c-0.392,0.391-0.392,1.023,0,1.414C42.454,19.987,43.639,24.925,42.543,29.415z"></path> <path class="blink_2" d="M41,33.174c-0.563,0.94-1.235,1.837-2.047,2.646c-0.391,0.392-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.916-0.914,1.676-1.924,2.317-2.984L41,33.174z"></path> <path class="blink_1" d="M35.771,25.094l2.003,1.277c0.012-0.203,0.029-0.404,0.029-0.609c0-3.079-1.2-5.974-3.381-8.153c-0.391-0.391-1.022-0.391-1.414,0c-0.391,0.391-0.391,1.023,0,1.414C34.652,20.666,35.613,22.802,35.771,25.094z"></path> <path class="blink_1" d="M35.084,29.401c-0.474,1.145-1.172,2.197-2.076,3.1c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.707-0.293c1.008-1.006,1.795-2.17,2.361-3.43L35.084,29.401z"></path> <polygon points="28.124,20.215 28.124,14.991 24.635,17.99 "></polygon> <path d="M20.921,20.366h-6.423c-0.553,0-1,0.508-1,1.135v8.229c0,0.627,0.447,1.135,1,1.135h7.375l6.25,5.875V24.96L20.921,20.366z"></path> </g> </svg>
    <p>para ativar o som</p>
  `;

  wrapperButton.appendChild(button);

  if (playerElement) {
    playerElement.appendChild(wrapperButton);
  }

  return wrapperButton;
};

const createFakeLive = (playerElement) => {
  const tag = document.createElement("div");
  tag.className = "ag-video-live";
  tag.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33331 8.00003C9.33331 8.73336 8.73331 9.33336 7.99998 9.33336C7.26665 9.33336 6.66665 8.73336 6.66665 8.00003C6.66665 7.2667 7.26665 6.6667 7.99998 6.6667C8.73331 6.6667 9.33331 7.2667 9.33331 8.00003ZM5.65331 5.63336L5.17998 5.1667C4.45331 5.8867 3.99998 6.89336 3.99998 8.00003C3.99998 9.1067 4.45331 10.1134 5.17998 10.8334L5.65331 10.36C5.04665 9.76003 4.66665 8.9267 4.66665 8.00003C4.66665 7.07336 5.04665 6.24003 5.65331 5.63336ZM10.82 5.1667L10.3466 5.64003C10.9533 6.24003 11.3333 7.07336 11.3333 8.00003C11.3333 8.9267 10.9533 9.76003 10.3466 10.3667L10.82 10.84C11.5466 10.1134 12 9.1067 12 8.00003C12 6.89336 11.5466 5.8867 10.82 5.1667ZM3.76665 3.75336L3.29998 3.28003C2.08665 4.4867 1.33331 6.16003 1.33331 8.00003C1.33331 9.84003 2.08665 11.5134 3.29998 12.72L3.77331 12.2467C2.67998 11.16 1.99998 9.66003 1.99998 8.00003C1.99998 6.34003 2.67998 4.84003 3.76665 3.75336ZM12.7 3.28003L12.2266 3.75336C13.32 4.84003 14 6.34003 14 8.00003C14 9.66003 13.32 11.16 12.2333 12.2467L12.7066 12.72C13.9133 11.5134 14.6666 9.84003 14.6666 8.00003C14.6666 6.16003 13.9133 4.4867 12.7 3.28003Z" fill="white"/>
    </svg>
    <span>Ao vivo</span>
  `;

  if (playerElement) {
    playerElement.appendChild(tag);
  }
};

const createPlayer = () => {
  const player = new Plyr("#player", {
    controls: ["play-large"],
    i18n: {
      restart: "Reiniciar",
      rewind: "Recuar {seektime}s",
      play: "Reproduzir",
      pause: "Pausar",
      fastForward: "Avançar {seektime}s",
      seek: "Procurar",
      seekLabel: "{currentTime} de {duration}",
      played: "Reproduzido",
      buffered: "Colocado na memória intermdia",
      currentTime: "Tempo atual",
      duration: "Duração",
      volume: "Volume",
      mute: "Sem som",
      unmute: "Com som",
      enableCaptions: "Ativar legendas",
      disableCaptions: "Desativar legendas",
      download: "Transferir",
      enterFullscreen: "Entrar no modo de fullscreen",
      exitFullscreen: "Sair do modo de fullscreen",
      frameTitle: "Leitor para {title}",
      captions: "Legendas",
      settings: "Configurações",
      pip: "PIP",
      menuBack: "Voltar ao menu anterior",
      speed: "Velocidade",
      normal: "Normal",
      quality: "Qualidade",
      loop: "Repetir",
      start: "Iní­cio",
      end: "Fim",
      all: "Tudo",
      reset: "Repor",
      disabled: "Desativado",
      enabled: "Ativado",
      advertisement: "Anúncio",
      qualityBadge: {
        2160: "4K",
        1440: "HD",
        1080: "HD",
        720: "HD",
        576: "SD",
        480: "SD",
      },
    },
    keyboard: {
      focused: false,
      global: false,
    },
  });

  window.player = player;

  return player;
};

const timeToSeconds = (time) => {
  return time
    .split(":")
    .reduce((acc, currentTime) => 60 * acc + Number(currentTime));
};

const showAllElements = () => {
  const elements = document.querySelectorAll(`.ag-hide`);

  elements.forEach((element) => {
    element.classList.remove("ag-hide");
  });
};

const observerVideoTime = (player) => {
  const { delay, smartAutoplay } = _player_config;
  const seconds = timeToSeconds(delay);

  let currentTime = 0;
  let interval = null;

  player.on("play", () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if (startTimer || !smartAutoplay) {
        currentTime++;
      }

      if (currentTime === seconds) {
        showAllElements();
      }
    }, 1000);
  });

  player.on("pause", () => {
    clearInterval(interval);
  });

  player.on("end", () => {
    clearInterval(interval);
  });
};

const handlePlayVideo = (player, overlay) => {
  player.once("play", () => {
    player.currentTime = 0;
  });

  overlay.addEventListener("click", () => {
    player.togglePlay();
    player.muted = false;
    player.volume = 1;
  });
};

const handleWidthFakeProgress = (progressElement, progress, height) => {
  progressElement.style = `--value-progress: ${progress}%; ${
    height ? `height: ${height}px` : ""
  }`;
};

const handleLoopFor80PercentVideo = (player) => {
  const { smartAutoplay } = _player_config;
  const percentage = 0.8;

  player.on("timeupdate", (event) => {
    if (!startTimer && smartAutoplay) {
      const duration = event.detail.plyr.duration;
      const currentTime = event.detail.plyr.currentTime;
      const timeToLoop = duration * percentage;

      if (currentTime >= timeToLoop) {
        player.currentTime = 0;
      }
    }
  });
};

const createProgress = (playerElement) => {
  const wrapper = document.createElement("div");
  wrapper.className = "ag-wrapper-alternative-progress";
  const progressElement = document.createElement("div");
  progressElement.className = "ag-alternative-progress";

  wrapper.appendChild(progressElement);

  if (playerElement) {
    playerElement.appendChild(wrapper);
  }

  const { alternativeProgress } = _player_config;

  player.on("timeupdate", (event) => {
    const defaultVelocity = alternativeProgress.recommendedSettings;
    const height = alternativeProgress.height;

    const duration = parseFloat(event.detail.plyr.duration.toFixed(3), 10);

    const currentTime = parseFloat(
      event.detail.plyr.currentTime.toFixed(3),
      10
    );

    let progress;

    if (defaultVelocity) {
      let percentage = currentTime / duration;

      progress = 100 * Math.sqrt(1 - (percentage -= 1) * percentage);

      handleWidthFakeProgress(progressElement, progress, height);
      return;
    }

    const percentageVideo = alternativeProgress.percentage;
    const velocity = alternativeProgress.velocity;
    const l = percentageVideo / 100 / velocity;

    progress =
      currentTime < duration * l
        ? (progress = ((100 * currentTime) / duration) * velocity).toFixed(2)
        : percentageVideo +
          ((currentTime - duration * l) * (100 - percentageVideo)) /
            (duration * (1 - l));

    if (progressElement && progress) {
      handleWidthFakeProgress(progressElement, progress, height);
    }
  });
};

const handleAutoplayAndMuted = (player) => {
  const { smartAutoplay } = _player_config;
  const wrapperButton = document.querySelector(".ag-wrapper-button-mute");

  if (smartAutoplay && !!wrapperButton) {
    wrapperButton.style.display = "block";
  }

  player.on("ready", (event) => {
    const instance = event.detail.plyr;
    instance.currentTime = 0;
    instance.muted = true;
    instance.play();
  });
};

const handlePlayVideoMuted = (player, button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    player.pause();
    player.currentTime = 0;
    player.muted = false;
    player.volume = 1;
    player.play();
    startTimer = true;

    button.style.display = "none";

    const playerElement = document.querySelector(".plyr");

    const { alternativeProgress } = window._player_config;

    if (alternativeProgress.active) createProgress(playerElement);
  });
};

var video;
var canvas;

const init = () => {
  const { alternativeProgress, smartAutoplay } = window._player_config;
  const fakeProgress = alternativeProgress.active;

  const player = createPlayer();

  const playerElement = document.querySelector(".plyr");

  const button = createButtonMuted(playerElement);
  createFakeLive(playerElement);

  handlePlayVideoMuted(player, button);

  const overlay = createVideoOverlay(playerElement);

  handlePlayVideo(player, overlay);

  observerVideoTime(player);

  if (smartAutoplay) handleAutoplayAndMuted(player);

  // fake progress
  if (fakeProgress && !smartAutoplay) createProgress(playerElement);

  handleLoopFor80PercentVideo(player);
};

const start = (e) => {
  if (e.type === "load" && window.location.search.includes("elementor")) {
    setTimeout(() => {
      init();
    }, 1000 * 2);
  } else {
    init();
  }
};

window.addEventListener("load", start);
window.addEventListener("playerload", start);
