"use strict";

//画像が回りながら降るJs
let kip = document.getElementsByClassName('kip');

//let oncli = document.createElement("script");   //onclick.jsを持ってくる
//oncli.src = "onclick.js";

//画像を作る関数。n は個数
function kipMaker(n) {
    let kip = document.createElement("div");
    kip.className = "kip";
    let p = '<img src=img/koufuku1.jpg alt="画像" />';
    kip.innerHTML = p;
    for(let i = 0; i < n; i++) {
        kipSet(kip);
    }
}

//画像のセッティングをする関数。
function kipSet(clone) {
    let kipClone = clone.cloneNode(true);
    let kipStyle = kipClone.style;

    //画像の位置（left）、時間をずらす（animation-delay）、サイズ（font-size）をランダムで指定
    kipStyle.left = 100 * Math.random() + "%";
    kipStyle.animationDelay = 12 * Math.random() + "s";
    kipStyle.fontSize = Math.floor(50 * Math.random() + 20) + "px";
    document.body.appendChild(kipClone);

    //一つのアニメーションが終わったら新しい画像を生成
    kipClone.addEventListener("animationend", function() {
        this.parentNode.removeChild(this);
        let kip = document.createElement("div");
        kip.className = "kip";
        let p = '<img src=img/koufuku1.jpg alt="画像" />';
        kip.innerHTML = p;
        kipSet(kip);
    }, false)
}

//画像を50個降らせる
kipMaker(5)
