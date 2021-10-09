const DELAY_TIME_OUT = 300;
const ENTER_KEY = 13;
const ENOUGH_CORRECT_TIME = 2;
const SHIFT_KEY = 16;
const CTRL_KEY = 17;
const F2_KEY = 113;

const VOLUME = 5;
const VOICE_URI = "native";
const PITCH_AUDIO = 1;
const RATE_AUDIO = 1; 
const SPEAKER_LANGUAGE = 'en-US';

let viMeaningHTML = document.getElementById("vi");

let currentVocabulary;
let correctInputTime = 0;
let thongBao = document.getElementById("thongbao");
let thongBao2 = document.getElementById("thongbao2");

let VOCABULARIES = [{eng:"student", vi:"học sinh"}, {eng:"teacher", vi:"giáo viên"}];

let soLanNhanShift = 0;






var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
let userVoiceTextHTML = document.getElementById("voiceuser");

recognition.onresult = function (e) {
  var userVoiceText = e.results[0][0].transcript;
  userVoiceTextHTML.innerText = "oh no, you said : " + userVoiceText + " , let's try F2 again";
  if (userVoiceText.toLowerCase() === currentVocabulary.eng){
    thongBao2.innerText = "yeah, hoàn thành khóa học";
    responsiveVoice.speak(currentVocabulary.eng ); 
    $(".vocab").addClass("right-green");
    resetUserInputForm();
    userVoiceTextHTML.innerText = "";
    if (correctInputTime === ENOUGH_CORRECT_TIME) {
      goToNextVocabulary();
    }
  }
}




$(".container").css("display", "block");
$(".input-text").focus();
currentVocabulary = VOCABULARIES[0];
$(".vocab").html(currentVocabulary.eng);
viMeaningHTML.innerText = currentVocabulary.vi;








$(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === SHIFT_KEY) {
          soLanNhanShift++;
          if(soLanNhanShift === 1){
            thongBao2.innerText = "good, bấm shift một lần nữa để ẩn nghĩa";
          }
          thongBao2.innerText = "good, hãy nhấn F2 sau đó phát âm từ vựng ở trên, giả vờ nói sai trước";
        $("#vi").slideToggle();
      }
    }
  );
  
  
  
  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === CTRL_KEY) {
        $("#thongbao").css("display", "none");
        thongBao2.innerText = "rất tốt, hãy thử bấm shift nếu bạn quên từ này nghĩa gì";
        Speaker.say(currentVocabulary.eng);
      }
    }
  );
  
  
  
  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === ENTER_KEY) {
        currentVocabularyCompareWith($('input[type="text"]').val());
        resetUserInputForm();
        if (correctInputTime === ENOUGH_CORRECT_TIME) {
          goToNextVocabulary();
        }
      }
    }
  );


  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if(correctInputTime == 2){
        thongBao.innerText = "good, hãy bấm thử nút Ctrl để nói giọng khác";
      }
    }
  );

  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if(correctInputTime == 1){
          thongBao.innerText = "good, hãy gõ thêm một lần nữa để qua từ mới";
      }
    }
  );


  $(document).on(
    "keyup",
    $('input[type="text"]'),
    (userInput) =>{
      if (userInput.keyCode === F2_KEY) {
        recognition.start();
      }
    }
  );






class Speaker{
    static main = new SpeechSynthesisUtterance();
    static config(){
      Speaker.main.voiceURI = VOICE_URI;
      Speaker.main.volume = VOLUME;
      Speaker.main.rate = RATE_AUDIO;
      Speaker.main.pitch = PITCH_AUDIO;
      Speaker.main.lang = SPEAKER_LANGUAGE;
    }
    static say(msg){
      Speaker.main.text = msg;
      window.speechSynthesis.speak(Speaker.main);
    }
  }
  
  
  
  
  
  
  
  function goToNextVocabulary () {
    setTimeout(
      () => {
        currentVocabulary = VOCABULARIES[1];
        $(".vocab").html(currentVocabulary.eng);
        viMeaningHTML.innerText = currentVocabulary.vi;
      },
      DELAY_TIME_OUT
    );
  }
  
  
  
  function resetUserInputForm () {
    setTimeout(
      () =>{
        $(".vocab").removeClass("wrong-red right-green");
        $("input").val("");
      },
      DELAY_TIME_OUT
    );
  }
  
  
  
  function currentVocabularyCompareWith (userInputValue) {
    if (userInputValue=== currentVocabulary.eng.toLowerCase() ) {
      correctInputTime++;
      responsiveVoice.speak(currentVocabulary.eng ); 
      $(".vocab").addClass("right-green");
    }
    else {
      $(".vocab").addClass("wrong-red");
    }
  }
  
  