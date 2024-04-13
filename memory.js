//"use strict";

// グローバル
// div要素を格納
let cards = [];

// 開始時間 現在時刻を取得
let startTime;

// 経過秒数用 タイマーID
let timer;

// カードめくり用 タイマーID これが動いている間はカードはめくれない
let backTimer;

// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
let flgFirst = true;

// 1枚目のカードを格納
let cardFirst;

// そろえた枚数
let countUnit = 0;


let img_arr = [
    "img/aakagi","img/akagi","img/akebono","img/amagi",
    "img/ariake","img/asamaL","img/asashio","img/azusaL",
    "img/choukai","img/fuji","img/hakuchoh","img/hakusan",
    "img/hakutaka","img/hamakaze","img/hatsukariL","img/hibariL",
    "img/hida","img/hita","img/hokuetsu","img/hokuriku",
    "img/hokutosei","img/howaito","img/ishikari",
    "img/ishizuchi",
    "img/JNR2","img/JNR3","img/kaetsu","img/kaijiL",
    "img/kamomeL","img/kii","img/komakusa","img/kuroshio",
    "img/marimo","img/mutsu","img/nanki","img/nichirinL",
    "img/nupuri","img/odoriko","img/ohtori","img/oki",
    "img/oozora","img/raicyoh","img/rairakku","img/sayonara",
    "img/sazanami","img/shinanoL","img/shinsetsu","img/shiokaze",
    "img/shiokazeL","img/shiosaiL","img/shiraneL","img/shirasagiL",
    "img/suigou","img/suisei","img/tanigawaL","img/tanigawa",
    "img/tohkai","img/toki",
    "img/tsubame","img/tsubasa","img/uzushio","img/yakumo",
    "img/yamabiko"
    /*,"img/","img/"*/
    
];

shuffle(img_arr);
//console.log(img_arr);

//imgタグづくり ここでできたタグを使って画像を表示させる
let img_tag_arr = [];
for (let i = 0; i < 6; i++){  //10ペアのときは10
    img_tag_arr.push("<img src='" +img_arr[i] + ".jpg'>")
}

//実際の関数
//まず、0〜9の数字を2個ずつ作る
window.onload = function(){
    // 数字格納 一時配列
    let arr = [];
    for (let i = 0; i < 6; i++ ){   //10ペアのときは10
        
        // ペアの数字を10組
        arr.push(i);
        arr.push(i);
    }   //[0,0,1,1,2,2,....8,8,9,9]合計20の要素
    
    // シャッフル後は配列の中身が変わっている
    //     [1.7.3.4.4.5.....]
    //そうしてからゲーム用panelを取得する
    //このpanelの中に実際のカードが入っていることになる
    shuffle(arr);
    let panel = document.getElementById('panel');
    
    // div要素作成(カードの作成)
    // 全部で20枚必要 for文で作成
    for (i = 0; i < 12; i++){    //10ペアのときは20
        let div = document.createElement('div');  //divタグの作成
        div.className = 'card back';  //最初カードの裏面を表示
        //div.index = i;
        div.number = arr[i];   //プロパティを設定  
                               //divナンバーにarrのi番目を入れている
                               //シャッフルされたarrのランダムな数字が入っていく
        //console.log(Object.keys(div));
        //console.log(Object.values(div));
                                //プロパティ['number']で[0]〜[9]が設定されている
                                //divタグのプロパティにnumberを設定することで
                                //そのカードが何番の数字を持っているかが判断できる
        //div.innerHTML = '';
        div.onclick = turn;//それぞれのdivタグにオンクリックを指定
                           //turnというクリックイベントの登録
         
         //appendChildでカードをdivタグの中に入れている
        panel.appendChild(div);
        //cards.push(div);
    }
    // 現在の開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    
}


// シャッフル用関数
// 配列の要素分だけシャッフル
function shuffle(arr) {
    let n = arr.length;
    //let temp, i;
    
    //シャッフルする毎にn-1する nが0になったら終了
    while (n) {
        i = Math.floor(Math.random() * n--);
        //temp = arr[n];

        //arr[n] = arr[i];
        //arr[i] = temp;
        
        //スワップを使って配列の要素を入れ替えてシャッフルを実現
        [arr[n],arr[i]] = [arr[i], arr[n]]
        //arr[i] = temp;

    }
    return arr;
}

// カードクリック時の処理
function turn(e){
             //クリックしたカードを取得
    let div = e.target;
    
             // カードのタイマー処理が動作中は return
             //連続では押せないように
    if (backTimer) return;

              // 裏向きのカードをクリックした場合は画像を表示する
              //innerHTMLの中が空''であれば裏向きカード
              //innerHTMLの中にimgを持っていたら表向きカード
    if (div.innerHTML === ''){
    	
    	      //裏向きのカードだったらbackというclass名を取り除く
        div.className = 'card';
        
               //カードの表面を表示させる
               //imgタグを挿入させる
        div.innerHTML = img_tag_arr[div.number] ;
        
    }else{
        //カードが表向きだったときは何もしない return
        return
    }
    
             // 何枚目のカードなのかを判断するためflagFirstを使う
             //初期値はtrue クリックしていなかったら実行される
    if (flgFirst){
             // 最初にクリックしたものをcardFirstに入れる 
        cardFirst = div;
              // 1枚目のカードの処理が終わったのでflgFirstをfalseにする
        flgFirst = false;
        
        // ここからは2枚目の処理
    }else{
        
          // 画像が同じかどうかを判断する
        if (cardFirst.number === div.number){
        	
        	//同じだった場合、ペアの数を1増やす
            countUnit++;
            
            backTimer = setTimeout(function(){
            	
            	//backTimerを設定している
            	//この0.5秒の間は他の動作はさせない
            	//透明にする(finishのclass名によってopasitiが0になる)
            	//それぞれのカードのclass名をcard finishとする
                div.className = 'card finish';  //2枚目のカード
                cardFirst.className = 'card finish';  //1枚目のカード
                backTimer = NaN;     //NaNにすることによってfalseになる
                
                if (countUnit === 6 ){     //すべてのペアが揃ったら10ペアのときは10
                    clearInterval(timer);  // timer終了
                }
            }, 500)

            // 画像が一致していなかったとき　　
        }else{  
            // カードを裏側に戻す
            backTimer = setTimeout(function(){
                div.className = 'card back'; //2枚目class名にbackをつける
                div.innerHTML = '';          //2枚目カードに空文字''を挿入する
                cardFirst.className = 'card back';//1枚目class名にback
                cardFirst.innerHTML = '';         //2枚目カードに空文字''挿入
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
         flgFirst = true;    //1枚目のカードとわかるようにtrueに戻す
    }  
}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){

    let nowTime = new Date();
    let elapsedTime = Math.floor((nowTime - startTime) / 1000);
    let str = '経過秒数: ' + elapsedTime + '秒';

    let re = document.getElementById('result');
    re.innerHTML = str;
}

let btnReload = document.getElementById('btnReload');
btnReload.addEventListener('click', function(){
    location.reload();
})