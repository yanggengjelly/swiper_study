import { getNode, endScroll } from "../lib/index.js";

function showAndHideImage() {
  const imageElement = document.getElementById("scrollImg");

  imageElement.style.display = "block";

  setTimeout(function () {
    gsap.to("#scrollImg", {
      opacity: 0,
    });
  }, 6000);
}
// 함수 호출
showAndHideImage();

// ! gsap
gsap.from(".topBar", {
  delay: 2,
  ease: "power1.out",
  duration: 2,
  height: "100%",
});

gsap.to(".title", {
  duration: 3,
  delay: 1,
  top: "16%",
  opacity: 0,
});

// ! gsap Text
const text = getNode(".title");
const split = new SplitText(text, { type: "words" }); //"chars"
gsap.from(split.words, {
  opacity: 0,
  y: -50,
  stagger: 0.5, // 각 애니메이션 사이의 지연 시간
});

const musicName = getNode(".audio-title");
const split2 = new SplitText(musicName, { type: "chars" });
// 애니메이션을 반복시키기 위한 Timeline 생성
const timeline = gsap.timeline({ repeat: 1000 });
// 반복적으로 실행되는 애니메이션 설정
timeline.from(split2.chars, {
  opacity: 0,
  x: -30,
  stagger: 0.1,
  duration: 2,
  borderBottom: "6px solid red",
});
// 애니메이션 시작
timeline.play();

// ! swiper
const swiper = new Swiper(".swiper", {
  direction: "vertical", // 세로 슬라이드 설정
  mousewheel: {
    invert: false, // 마우스 휠 방향 반전
  },
  pagination: {
    el: ".swiper-pagination", // 표시할 위치의 CSS 선택자
    clickable: true, // 페이지네이션 점을 클릭할 수 있도록 설정
  },
  speed: 500, // 슬라이드 전환 속도를 0.5초로 설정
});

// ! audio
const audio = new Audio("./audio/ss501.mp3");
audio.volume = 0.2;
getNode("#toggleAudioButton").addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});
getNode("#stopAudioButton").addEventListener("click", function () {
  audio.pause();
  audio.currentTime = 0;
});

//! chat

const input = getNode(".chat-input");
const messages = getNode(".chat-messages");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && input.value) {
    // 엔터키가 눌렸고, 입력란에 텍스트가 있을 때
    const message = document.createElement("p"); // 새로운 <p> 요소를 생성
    message.textContent = input.value; // <p> 요소의 텍스트를 입력란의 텍스트로 설정
    messages.appendChild(message); // 메시지를 메시지 목록에 추가
    input.value = ""; // 입력란을 비움
    endScroll(messages); // 스크롤을 가장 아래로 내림
  }
});
