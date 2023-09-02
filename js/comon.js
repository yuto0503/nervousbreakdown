// HTMLからid(table)を取得する
let table = document.getElementById('table');

/***********************************************************************************
トランプの数字の「表面」を配列で並べる
**********************************************************************************/
const cards = [
  {number : 1, src : "img/1_of_clubs.png"},
  {number : 2, src : "img/2_of_clubs.png"},
  {number : 3, src : "img/3_of_clubs.png"},
  {number : 4, src : "img/4_of_clubs.png"},
  {number : 5, src : "img/5_of_clubs.png"},
  {number : 6, src : "img/6_of_clubs.png"},
  {number : 7, src : "img/7_of_clubs.png"},
  {number : 8, src : "img/8_of_clubs.png"},
  {number : 9, src : "img/9_of_clubs.png"},
  {number : 10, src : "img/10_of_clubs.png"},
  {number : 11, src : "img/11_of_clubs.png"},
  {number : 12, src : "img/12_of_clubs.png"},
  {number : 13, src : "img/13_of_clubs.png"},
  
  {number : 1, src : "img/1_of_spades.png"},
  {number : 2, src : "img/2_of_spades.png"},
  {number : 3, src : "img/3_of_spades.png"},
  {number : 4, src : "img/4_of_spades.png"},
  {number : 5, src : "img/5_of_spades.png"},
  {number : 6, src : "img/6_of_spades.png"},
  {number : 7, src : "img/7_of_spades.png"},
  {number : 8, src : "img/8_of_spades.png"},
  {number : 9, src : "img/9_of_spades.png"},
  {number : 10, src : "img/10_of_spades.png"},
  {number : 11, src : "img/11_of_spades.png"},
  {number : 12, src : "img/12_of_spades.png"},
  {number : 13, src : "img/13_of_spades.png"},
  
  {number : 1, src : "img/1_of_diamonds.png"},
  {number : 2, src : "img/2_of_diamonds.png"},
  {number : 3, src : "img/3_of_diamonds.png"},
  {number : 4, src : "img/4_of_diamonds.png"},
  {number : 5, src : "img/5_of_diamonds.png"},
  {number : 6, src : "img/6_of_diamonds.png"},
  {number : 7, src : "img/7_of_diamonds.png"},
  {number : 8, src : "img/8_of_diamonds.png"},
  {number : 9, src : "img/9_of_diamonds.png"},
  {number : 10, src : "img/10_of_diamonds.png"},
  {number : 11, src : "img/11_of_diamonds.png"},
  {number : 12, src : "img/12_of_diamonds.png"},
  {number : 13, src : "img/13_of_diamonds.png"},

  {number : 1, src : "img/1_of_hearts.png"},
  {number : 2, src : "img/2_of_hearts.png"},
  {number : 3, src : "img/3_of_hearts.png"},
  {number : 4, src : "img/4_of_hearts.png"},
  {number : 5, src : "img/5_of_hearts.png"},
  {number : 6, src : "img/6_of_hearts.png"},
  {number : 7, src : "img/7_of_hearts.png"},
  {number : 8, src : "img/8_of_hearts.png"},
  {number : 9, src : "img/9_of_hearts.png"},
  {number : 10, src : "img/10_of_hearts.png"},
  {number : 11, src : "img/11_of_hearts.png"},
  {number : 12, src : "img/12_of_hearts.png"},
  {number : 13, src : "img/13_of_hearts.png"},

  {number : 14, src : "img/joker_1.png"},
  {number : 14, src : "img/joker_2.png"},
  ];


/***********************************************************************************
トランプを１から順番に並べる
**********************************************************************************/
  // 0から51までの数字をserialNumberに格納
  let serialNumber = [];
  for (let i = 0; i < cards.length; i++) { 
    serialNumber[i] = i;
  }

  let text = "";
  let imgID = "";
  let id = "";

  // トランプを並べる
  for (let i = 0; i < cards.length; i++) { // cardsの配列に格納してあるトランプの枚数だけ繰り返す。
    let imgID = String(serialNumber[i]); // serialNumber[i]を文字列に変更

  text += '<img src = "img/card_back.png" class="cards" id=' + imgID + ' onclick = "turn(this.id)">'; // classや画像を追加する
  }

  // HTMLからid(table)を取り出し、textに置き換える
  document.getElementById("table").innerHTML = text;

/**********************************************************************************
カードをクリックしたら画像を切り替える
**********************************************************************************/
function changeCards(id) {
  let index = Number(id); // idを文字列から数値に変換  
  const cardNumber = cards[index].number; // 配列の中にあるnumberを取得
  document.getElementById(id).src = cards[index].src; // 画像に置き換える
  console.log(cardNumber);
}

/*********************************************************************************
カードをシャッフルする（ランダムに並べる)
**********************************************************************************/
function shuffle(cards){ 
  for (i = (cards.length - 1);0 < i;i --){
  //ランダムな整数を作成
  let rnd = Math.floor(Math.random()*(i + 1)); 

  // cards[i]とcards[rnd]の値を入れ替えて、配列をシャッフルする。
  let tmp = cards[i]; 
  cards[i] = cards[rnd]; 
  cards[rnd] = tmp; 
}
return cards; //cardsをshuffle関数に返す
// （＊for文を利用しているから戻り値を返さないと繰り返すことができない）
}
shuffle(cards);

/***********************************************************************************
 ゲームスタート**********************************************************************************/
  let selectedCards = []; // 選んだカードの箇所の数字（id）を格納する
  selectedCards.length = 0; // 初期化
  let selectedNumber = []; // 配列の中のnumberを格納する
  selectedNumber.length = 0; // 初期化

// ゲームスタートボタンにクリックイベントリスナーを追加
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startButtonClick);

let timerStarted = false; // タイマーが既に開始されているかどうかのフラグ
// （＊タイマーが開始されていない時（false）にしかタイマーを開始できないようにしている。）

// ゲームスタートボタンがクリックされたときの処理
function startButtonClick() {
  if (!timerStarted) { // タイマーがfalseの時
    startGame();// ゲームを開始する
    timerStarted = true; // タイマーが開始されたことを記録
  }
}

/***********************************************************************************
クリックしたら画像を切り替える
**********************************************************************************/
 function turn(id) {
  // ゲームが開始されていない場合は何もしない
  if (!gameStarted) {
    return; 
  }

  // 一時停止中はトランプをクリックできない
  if (paused) {
    return;
  }

  const clickedCard = document.getElementById(id);

  console.log("clickedCard:", clickedCard);


  // クリックしたらカードを「表面」に切り替える
  if (selectedCards.length === 0) { // selectedCardsの配列に何もカードが入っていない時
    let index = Number(id); // idを文字列から数値に変換 
    const cardNumber = cards[index].number; // 配列の中にあるnumberを取得

    clickedCard.src = cards[id].src; // カードをクリックしたら画像を変更する
    selectedCards.push(Number(id)); // idの数字をselectedCardsに格納する
    selectedNumber.push(cardNumber);// 配列の中にあるnumberをselectedNumberに格納する

  } else if (selectedCards.length === 1 && Number(id) !== selectedCards[0]) {
    // もし、selectedCardsの配列の中に要素が１つ入っている。かつidがselectedCardsに選ばれた最初のカードと異なる時
    let index = Number(id); // idを文字列から数値に変換 
    const cardNumber = cards[index].number;

    clickedCard.src = cards[id].src;
    selectedCards.push(Number(id));
    selectedNumber.push(cardNumber);

    // トランプを2枚選択したら、1秒後にjudge(selectedCards)という関数を実行
    setTimeout(function() {
      judge(selectedCards);
    }, 1000);
  } else {
    // 上記の条件に当てはまらなかった場合、何もしない
  }
  console.log(selectedCards);
  console.log(selectedNumber);
}


/***********************************************************************************
 正誤判定
**********************************************************************************/
let missCount = 0; // 間違えた回数をカウント

  // あたり or はずれの文字を表示
  function displayResult(resultText) {
    let result = document.getElementById("result");
    result.textContent = resultText;
  }
  
  // 表示した文字（あたり or はずれ）の文字を消す
  function clearResult() {
    let resultElement = document.getElementById("result");
    resultElement.textContent = "";
  }
  clearResult();
  
function judge(selectedCards) {
  let first = selectedNumber[0]; 
  let second = selectedNumber[1];
  console.log(first);
  console.log(second);

  let firstElement = document.getElementById(String(selectedCards[0]));
  let secondElement = document.getElementById(String(selectedCards[1]));
  console.log("firstElement:", firstElement);
  console.log("secondElement:", secondElement);


  if (firstElement && secondElement) {
    if (first == second) { // firstとsecondが等しい場合、カードを非表示にする
      console.log("非表示にするカード:", firstElement, secondElement);
      firstElement.style.visibility = "hidden";
      secondElement.style.visibility = "hidden";
      displayResult("あたり！");

  // 表示した文字（あたり or はずれ）を消す
      setTimeout(function() {
        clearResult();
      },1000);

    } else { // 等しくない場合
      setTimeout(function() { // 等しくない場合、1秒後にカードを「裏面」に戻す
        firstElement.src = "img/card_back.png";
        secondElement.src = "img/card_back.png";
        displayResult("はずれ...");
        missCount++;

  // 表示した文字（あたり or はずれ）を消す
        setTimeout(function() {
          clearResult();

      }, 1000);
    }, 1000);
    }
  }

  // 配列の中をリセットする
  selectedCards.length = 0;
  selectedNumber.length = 0;


  // ゲーム結果（メッセージ）を表示
  function displayMessage(messageText) {
    let messageElement = document.getElementById("message");
    messageElement.textContent = messageText;
  }

/***********************************************************************************
最終結果発表
**********************************************************************************/
if (document.querySelectorAll('.cards:not([style*="visibility: hidden"])').length === 0) { // 場のカードが全てなくなった時

  // ゲームが終了した際、メッセージを表示
    displayMessage();

    if (missCount <= 30) {
      displayMessage("素晴らしい！");
    } else {
      displayMessage("次は頑張りましょう！");
    }

  // ボタンを追加する要素を取得
  const restartButton = document.createElement("button");

  // 諦めるボタンを追加
  const buttonContainer = document.querySelector(".giveup");          buttonContainer.appendChild(restartButton);

  // ゲームクリア時に「もう一度やる！」ボタンを追加
  restartButton.id = "restartButton";
  restartButton.textContent = "もう一度やる！";
  restartButton.addEventListener("click", restartGame);

    stopTimer(); // ゲーム終了時にタイマー停止

  // 全てのトランプがなくなった場合にアラートを表示
  const currentTime = new Date().getTime();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    
  // 上記、アラートの内容
    alert(`クリアです。おめでとうございます！\nクリアタイム ${elapsedSeconds} 秒\n間違えた回数 ${missCount} 回です。`);
      }
  }

  // ゲーム結果（メッセージ）をクリアする関数
function clearMessage() {
  let messageElement = document.getElementById("message");
  messageElement.textContent = "";
}

/***********************************************************************************
タイマー
**********************************************************************************/
// タイマー用の変数
let startTime;
let timerInterval;
let paused = false;

// ゲームを開始する関数
function startGame() {
  gameStarted = true; // ゲームが開始されたことを示すフラグを設定

  // シャッフル関数の呼び出し
  shuffle(cards);

  // タイマーをリセット
  resetTimer();

  // タイマーを開始
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000); // 1秒ごとにタイマー更新
}

// タイマーをリセットする関数
function resetTimer() {
  stopTimer(); // タイマーを停止
  const timerElement = document.getElementById("timer");
  timerElement.textContent = "0 秒経過"; // タイマーを初期状態に戻す
}

// タイマーを更新する関数
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  
  // タイマー表示を更新
  const timerElement = document.getElementById("timer");
  timerElement.textContent = ` ${elapsedSeconds} 秒経過`;
}

// タイマーを停止する関数
function stopTimer() {
  clearInterval(timerInterval);
}

/***********************************************************************************
一時停止、再開のボタン
***********************************************************************************/
const toggleButton = document.getElementById("stop");
let pauseStartTime = 0; // 一時停止が開始された時刻を保持する変数

// 一時停止、再開のボタンを切り替える
toggleButton.addEventListener("click", () => {
  paused = !paused; // 状態を切り替える
  toggleButton.textContent = paused ? "再開" : "一時停止"; // ボタンのテキストを切り替える

  if (paused) {
    // 一時停止が開始された時刻を保持
    pauseStartTime = new Date().getTime();
    clearInterval(timerInterval); // タイマーの更新を停止
  } else {
    // 再開ボタンを押す際に経過した時間を引いて新しいスタート時間を計算
    const currentTime = new Date().getTime();
    const elapsedTimeSincePause = currentTime - pauseStartTime;
    startTime += elapsedTimeSincePause;

    // タイマーの更新を再開
    timerInterval = setInterval(updateTimer, 1000);
  }
});


/***********************************************************************************
諦めるボタン**********************************************************************************/
const giveUpButton = document.getElementById("giveUpButton");
giveUpButton.addEventListener("click", giveUp);

// 諦めるボタンがクリックされたときの処理
function giveUp() {
  const confirmResult = confirm("諦めてよろしいですか？");

  if (confirmResult) {
    // 全てのカードを表面に切り替える
    revealAllCards();

    alert("また、チャレンジしてくださいね。");
    
  // アラートのOKボタンがクリックされた後にタイマーを停止
    stopTimer();

    // ボタンを追加する要素を取得
    const restartButton = document.createElement("button");

    // 諦めた時、「もう一度やる！」ボタンを追加
    restartButton.id = "restartButton";
    restartButton.textContent = "もう一度やる！";
    restartButton.addEventListener("click", restartGame);
    
    // ボタンを追加する要素を取得して、ボタンを追加
    const buttonContainer = document.querySelector(".giveup");
    buttonContainer.appendChild(restartButton);
  }
}

// カードの画像を表面に切り替える関数
function revealAllCards() {
  for (let i = 0; i < cards.length; i++) {
    const cardElement = document.getElementById(String(i));
    cardElement.src = cards[i].src; 
  }
}

// 間違えた回数をリセットする関数
function resetMissCount() {
  missCount = 0;
}

/***********************************************************************************
再度ゲームを再開する時の処理**********************************************************************************/
// 2回目以降、ゲームを開始する関数
function startGame() {
  gameStarted = true; // ゲームが開始されたことを示すフラグを設定

  // シャッフル関数の呼び出し
  shuffle(cards);

  // タイマーをリセット
  resetTimer();

  // タイマーを開始
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000); // 1秒ごとにタイマー更新
}

// 「もう一度やる！」ボタンを押して新しいゲームを開始する関数
function restartGame() {
  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    restartButton.remove(); // 既にボタンが存在する場合は削除する
  }

  clearMessage(); // ゲーム結果（メッセージ）をクリアする
  resetMissCount(); // 間違えた回数をリセットする
  stopTimer(); // タイマーを停止
  
  // ゲームが開始されたフラグをリセット
  gameStarted = false;

  // トランプをシャッフルして並べる
  shuffle(cards);

  // カードを表向きに戻す
  for (let i = 0; i < cards.length; i++) {
    const cardElement = document.getElementById(String(i));
    cardElement.src = "img/card_back.png";
    cardElement.style.visibility = "visible"; // カードを表示する
  }

  // ゲームを開始する（トランプを表示する）
  timerStarted = false; // タイマーがリセットされたことを記録
}











