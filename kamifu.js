let screen_w = window.innerWidth;//画面を全部使う
let screen_h = window.innerHeight;

const KAMIFUBUKI = 150;//紙の枚数
const COLORS = 
["#F5A4B8","#BEC14B","#DED5C0","#F8D400","#BBD33E","#A85EAC","#D64464",];
//鴇色(とき),鶸色(ひわ),象牙色,ジョンブリアン,シャトルーズグリーン,パープル,ローズ

function rand(min , max){//ランダムのrand関数  minとmaxの間で整数の乱数を求める
    return(Math.floor(
        Math.random() * (max-min+1)+min));
}

class Kam {
    constructor(){  //紙を一枚一枚作る
        this.elm = document.createElement("div");//divタグの中にその都度作る
        document.body.appendChild(this.elm);  //Element要素を足していく

        this.sty = this.elm.style;

        this.x = rand(0,screen_w);//紙の位置
        this.y = rand(0,screen_h);

        this.vx = rand(-10,10);//流れる速度 横方向
        this.vy = rand(5,10);  //   〃   たて方向

        this.ang = 0;//回転角度初期値
        this.spd = rand(15,40);//回転する角度。早めと遅め
        this.rX  = rand(0,10)/10;//0〜1まで0.1刻み。それぞれの軸で
        this.rY  = rand(0,10)/10;
        this.rZ  = rand(0,10)/10;

        this.sty.position = "fixed";
        this.sty.width = "37px";//紙一枚の大きさの設定
        this.sty.height = "14px";
        this.sty.borderRadius = "5px";//角丸に

        this.sty.backgroundColor = COLORS[//色をランダムに
            rand(0,COLORS.length-1)];

    }

    update(){//update関数//updateごとに　x,y座標、角度を入れる
        this.x += this.vx;//毎回xにvxを足す
        this.y += this.vy;//   yにvyを足す
        if(this.y >= screen_h){//画面下端まで降りたら上から繰り返し
            this.x = rand(0,screen_w);
            this.y = -20;
        }

        this.ang += this.spd;//3Dで回転 回転角度と速さ
        this.sty.left = this.x + "px";
        this.sty.top =  this.y + "px";
        this.sty.transform = "rotate3D(" +this.rX + "," + this.rY + ","
            + this.rZ + "," + this.ang + "deg)";
    }
}

let kami = [];//紙吹雪を枚数分作る
for (let i = 0 ; i<KAMIFUBUKI ; i++)
    kami.push(new Kam());

function mainLoop(){//mainLoop関数 update関数を呼び込む
    for (let i = 0; i<KAMIFUBUKI; i++)
    kami[i].update();
}
setInterval(mainLoop, 50);
