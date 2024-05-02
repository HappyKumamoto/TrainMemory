function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const canvas = document.getElementById("effectimg");
const ctx = canvas.getContext("2d");
const imgCnt = 40;                  // 画像の数 //
const aryImg = [];
const aryCloud = [];
const effectimgw = 2000;               // canvasの横サイズ //
const effectimgh = 1000;               // canvasの縦サイズ //
const imgBaseSizeW = 16;            // 画像の横 //
const imgBaseSizeH = 20;            // 画像の縦 //
const aspectMax = 2.5;
const aspectMin = 0.5;
const speedMax = 2.0;              // 速度の最大値 //
const speedMin = 0.5;              // 速度の最小値 //
const wind = 100;
const img = new Image();
img.src = "img/hatsukariR2.jpg";       // 画像を設定//
img.onload = () => {
  resizeCanvas();
  flow_start();
};

function setImagas() {
  let aspect = 0;
  for (let i = 0; i < imgCnt; i++) {
    aspect = Math.random() * (aspectMax - aspectMin) + aspectMin;
    aryImg.push({
      "posx": Math.random() * effectimgw,
      "posy": Math.random() * effectimgh,
      "sizew": imgBaseSizeW * aspect,
      "sizeh": imgBaseSizeH * aspect,
      "speedy": Math.random() * (speedMax - speedMin) + speedMin,
      "angle": Math.random() * 360,
    });
  }
}

let idx = 0;
let idxc = 0;
let cos = 0;
let sin = 0;
const rad = Math.PI / 180;
function flow() {
  ctx.clearRect(0, 0, effectimgw, effectimgh);
  for (idx = 0; idx < imgCnt; idx++) {
    aryImg[idx].posx += wind / aryImg[idx].sizew;
    aryImg[idx].posy += aryImg[idx].speedy;
    (idx % 2) ? aryImg[idx].angle += 1 : aryImg[idx].angle -= 1;
    cos = Math.cos(aryImg[idx].angle * rad);
    sin = Math.sin(aryImg[idx].angle * rad);
    ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
    ctx.drawImage(img, 0, 0, aryImg[idx].sizew, aryImg[idx].sizeh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (aryImg[idx].posy >= effectimgh) {
      aryImg[idx].posy = -aryImg[idx].sizeh;
      if (imgCnt < idx) {
        aryImg.splice(idx, 1);
      }
    }
    if (aryImg[idx].posx >= effectimgw) {
      aryImg[idx].posx = -aryImg[idx].sizew;
      if (imgCnt < idx) {
        aryImg.splice(idx, 1);
      }
    }
  }
  for (idxc = 0; idxc < aryCloud.length; idxc++) {
    ctx.drawImage(aryCloud[idxc].img, aryCloud[idxc].posx, aryCloud[idxc].posy, aryCloud[idxc].img.width, aryCloud[idxc].img.height);
    aryCloud[idxc].posx += aryCloud[idxc].speed / 15;
    if (aryCloud[idxc].posx > effectimgw) {
      aryCloud[idxc].posx = -aryCloud[idxc].img.width;
    }
  }
}

function flow_start() {
  setImagas();
  setInterval(flow, 10);
}
