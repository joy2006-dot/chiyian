let radio;
let submitButton;
let resultP;
let question;
let table;
let currentQuestion;
let correctAnswer;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 讀取第一個問題
  loadQuestion(currentQuestionIndex);
  
  // 設定送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - 20, windowHeight / 2 - 50);
  submitButton.mousePressed(checkAnswer);
  
  // 設定結果文字
  resultP = createP('');
  resultP.style('font-size', '25px');
  resultP.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
}

function draw() {
  // 幫我畫一個全螢幕畫布
  resizeCanvas(windowWidth, windowHeight);
  // 幫我畫一個faf0ca背景
  background(250, 240, 202);
  
  // 設定方框的顏色
  fill(244, 244, 246); // 這裡使用f4f4f6顏色
  noStroke(); // 移除邊框

  // 計算方框的位置和大小
  let rectWidth = windowWidth / 2;
  let rectHeight = windowHeight / 2;
  let rectX = (windowWidth - rectWidth) / 2;
  let rectY = (windowHeight - rectHeight) / 2;

  // 畫出方框
  rect(rectX, rectY, rectWidth, rectHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  question.position(windowWidth / 2 - 50, windowHeight / 2 - 150);
  radio.position(windowWidth / 2 - 20, windowHeight / 2 - 100);
  submitButton.position(windowWidth / 2 - 20, windowHeight / 2 - 50);
  resultP.position(windowWidth / 2 - 50, windowHeight / 2 + 50);
}

function checkAnswer() {
  let answer = radio.value();
  if (answer === correctAnswer) {
    resultP.html('答對了');
    correctCount++;
  } else {
    resultP.html('答錯了');
    incorrectCount++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < table.getRowCount()) {
    loadQuestion(currentQuestionIndex);
  } else {
    resultP.html(`恭喜你，已完成所有問題！ 答對了 ${correctCount} 題，答錯了 ${incorrectCount} 題。`);
    // 設定重新開始按鈕
    let restartButton = createButton('再做一次');
    restartButton.position(windowWidth / 2 - 20, windowHeight / 2 + 100);
    restartButton.mousePressed(restartQuiz);
  }
}

function loadQuestion(index) {
  currentQuestion = table.getString(index, 'question');
  let option1 = table.getString(index, 'option1');
  let option2 = table.getString(index, 'option2');
  let option3 = table.getString(index, 'option3');
  let option4 = table.getString(index, 'option4');
  correctAnswer = table.getString(index, 'correct');
  
  // 移除上一題的題目和選項
  if (question) question.remove();
  if (radio) radio.remove();
  
  // 設定題目文字
  question = createP(currentQuestion);
  question.style('font-size', '35px');
  question.style('color', 'black');
  question.position(windowWidth / 2 - 50, windowHeight / 2 - 150);
  
  // 設定選項
  radio = createRadio();
  radio.option(option1);
  radio.option(option2);
  radio.option(option3);
  radio.option(option4);
  radio.style('width', '60px');
  radio.position(windowWidth / 2 - 20, windowHeight / 2 - 100);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  loadQuestion(currentQuestionIndex);
  resultP.html('');
  this.remove(); // 移除重新開始按鈕
}



