const questionScreen = document.getElementById("questionScreen");
const site = document.getElementById("site");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");
let yesScale = 1;
let noAttempts = 0;
let yesCoveringScreen = false;
const yesMessages = [
  "آه.. كده كده كنت عارف 😂",
  " دوسي ياوليه",
  "أنا بكبر من الفرحة ولا إيه؟ ",
  "آه بقى.. الشاشة مش هتكفيني ",
  " أنا بقيت في كل حتة! ",
  "آه طبعًا ❤️"
];

function dodgeNoButton() {
  noAttempts++;
  const messages = [
    "لأ؟ طب استني بس أنا لسه مقلتش النكتة 😂",
    "الزرار ده أسرع منّي وأنا بجري ورا الأتوبيس 🏃‍♂️",
    "هو إنتِ بتلعبي استغماية مع الزرار؟ 🙈",
    "الزرار بيقولك: اختاري آه والنبي 😭",
    "لأ دي مش موجودة في الاختيارات المعتمدة يا فندم 😂",
    "كل ما تقربي منه بيعمل فيها مش شايفك 🫣",
    "أنا حاسس إن الزرار ده محتاج جلسة علاج نفسي 😅",
    "آه بتكبر… ولأ بتجري… اختاري بسرعة بقى! 💗",
    "الزرار بيهرب كأنه عليه فلوس 😂",
    "آخر فرصة قبل ما آه تاخد الشاشة كلها 😎"
  ];
  hint.textContent = messages[(noAttempts - 1) % messages.length];

  noBtn.style.position = "fixed";
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;
  const maxX = Math.max(0, window.innerWidth - noWidth);
  const maxY = Math.max(0, window.innerHeight - noHeight);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (!yesCoveringScreen) {
    questionScreen.classList.add("answer-chaos");
    document.documentElement.classList.add("question-active");
    yesBtn.textContent = yesMessages[(noAttempts - 1) % yesMessages.length];
    const maxScale = Math.max(window.innerWidth / yesBtn.offsetWidth, window.innerHeight / yesBtn.offsetHeight);
    yesScale = Math.min(maxScale, yesScale * 1.45);
    yesBtn.style.position = "fixed";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

    if (yesScale >= maxScale) {
      yesCoveringScreen = true;
      yesBtn.style.left = "0";
      yesBtn.style.top = "0";
      yesBtn.classList.add("yes-covering-screen");
      noBtn.hidden = true;
    }
  }
}

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("focus", dodgeNoButton);
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  dodgeNoButton();
}, { passive: false });
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dodgeNoButton();
});

yesBtn.addEventListener("click", () => {
  document.documentElement.classList.remove("question-active");
  questionScreen.classList.add("hidden");
  site.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  burstHearts(22);
});

function makeHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 25}px`;
  heart.style.animationDuration = `${7 + Math.random() * 8}s`;
  document.querySelector(".floating-hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 16000);
}
setInterval(makeHeart, 700);

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "♥";
      heart.style.left = `${15 + Math.random() * 70}%`;
      heart.style.bottom = `${Math.random() * 20}px`;
      heart.style.fontSize = `${18 + Math.random() * 24}px`;
      heart.style.animationDuration = "4s";
      document.querySelector(".floating-hearts").appendChild(heart);
      setTimeout(() => heart.remove(), 4200);
    }, i * 65);
  }
}

const envelopeBtn = document.getElementById("envelopeBtn");
const letterModal = document.getElementById("letterModal");
envelopeBtn.addEventListener("click", () => letterModal.classList.remove("hidden"));
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.close).classList.add("hidden"));
});
letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) letterModal.classList.add("hidden");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") letterModal.classList.add("hidden");
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");
const surpriseMessages = [
  "إنتِ مش مجرد ذكرى حلوة… إنتِ من أحلى الحاجات اللي حصلت في الحكاية دي كلها. بحب أشوفك مبسوطة دايمًا ❤️",
  "ضحكتك لوحدها كفاية تخلّي أي يوم عادي أحلى بكتير 💗",
  "وجودك جنبي من أجمل الحاجات اللي حصلتلي، ويا رب تفضلي دايمًا مبسوطة 🌸",
  "كل تفصيلة فيكي ليها مكان حلو أوي في قلبي 🥰",
  "مهما قلتلك إنك غالية، الكلام عمره ما هيوصف مكانتك عندي 💌",
  "يا رب أكون دايمًا سبب في ضحكتك وفرحتك يا أحلى رنرونتي ❤️"
];
let surpriseMessageIndex = 0;
surpriseBtn.addEventListener("click", () => {
  surpriseText.textContent = surpriseMessages[surpriseMessageIndex];
  surpriseMessageIndex = (surpriseMessageIndex + 1) % surpriseMessages.length;
  burstHearts(14);
});

const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");
function updateMusicButton() {
  musicBtn.textContent = music.paused ? "♫ شغّلي موسيقى هادية" : "Ⅱ إيقاف الموسيقى";
}

async function startMusic() {
  try {
    await music.play();
    updateMusicButton();
    document.removeEventListener("pointerdown", startMusicOnInteraction);
    document.removeEventListener("keydown", startMusicOnInteraction);
  } catch (error) {
    if (error.name === "NotAllowedError") {
      musicBtn.textContent = "♫ اضغطي لتشغيل الموسيقى";
      return;
    }

    musicBtn.textContent = "تعذر تشغيل الموسيقى";
    console.error("تعذر تشغيل ملف الموسيقى.", error);
  }
}

function startMusicOnInteraction(event) {
  if (event.target === musicBtn || musicBtn.contains(event.target)) return;
  startMusic();
}

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
document.addEventListener("pointerdown", startMusicOnInteraction);
document.addEventListener("keydown", startMusicOnInteraction);
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    startMusic();
  } else {
    music.pause();
  }
});
startMusic();
