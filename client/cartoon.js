const movies = [
  { title: "เจ้าหมาน้อยผจญภัย", meta: "ผจญภัย · 1 ชม. 42 นาที", badge: "แนะนำ", color: "orange" },
  { title: "แก๊งแมวเหมียวป่วนเมือง", meta: "ตลก · 1 ชม. 35 นาที", badge: "ใหม่", color: "pink" },
  { title: "อาณาจักรดาวกระดาษ", meta: "แฟนตาซี · 1 ชม. 50 นาที", badge: "ฮิต", color: "blue" },
];

const movieCard = (movie, featured = false) => featured
  ? `<article class="featured-match movie-card"><div class="feature-top"><span class="live-pill">NOW SHOWING</span><span>TOON90 ORIGINAL</span><button class="dots">•••</button></div><div class="feature-teams movie-feature"><div class="movie-mascot ${movie.color}">★</div><div class="movie-title"><strong>${movie.title}</strong><span>${movie.meta}</span></div><div class="play-bubble">▶</div></div><div class="match-stats"><span>เหมาะสำหรับทุกวัย</span><i><b></b></i><span>พากย์ไทย</span></div><button class="bet-match movie-button" data-match="${movie.title}">ดูตัวอย่าง <span>→</span></button></article>`
  : `<article class="match-card movie-card"><div class="league-line"><span class="league-dot ${movie.color}"></span> ${movie.badge}<time>HD</time></div><div class="movie-mini"><div class="movie-mascot ${movie.color}">✦</div><strong>${movie.title}</strong></div><p class="movie-meta">${movie.meta}</p><button class="movie-watch" data-match="${movie.title}">▶ ดูรายละเอียด</button></article>`;

const replaceText = (selector, text) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
};

export function mountCartoonPage() {
  document.title = "TOON90 - โรงหนังการ์ตูนออนไลน์";
  replaceText(".brand span:last-child", "TOON90");
  replaceText("footer .brand span:last-child", "TOON90");
  document.querySelectorAll(".main-nav a").forEach((link, index) => {
    link.textContent = ["หน้าแรก", "การ์ตูนมาใหม่", "หมวดหมู่"][index] || link.textContent;
  });
  replaceText(".hero-tag", "TOON90\nCARTOON NIGHT");
  replaceText(".ticker", "NOW SHOWING   ✦   วันนี้มีการ์ตูนสนุก ๆ รอคุณอยู่");

  const section = document.querySelector("#matches");
  if (section) {
    replaceText("#matches .kicker", "TONIGHT'S CARTOON PICKS");
    const heading = document.querySelector("#matches h2");
    if (heading) heading.innerHTML = "การ์ตูน <em>น่าดูคืนนี้</em>";
    const date = document.querySelector("#matches .date-switcher strong");
    if (date) date.textContent = "เลือกชมได้ทุกเวลา";
    const filters = document.querySelectorAll("#matches .filter");
    ["ทั้งหมด 12", "มาใหม่ 5", "ผจญภัย", "ตลก", "แฟนตาซี"].forEach((label, index) => {
      if (filters[index]) filters[index].innerHTML = label;
    });
    const grid = section.querySelector(".matches-grid");
    if (grid) grid.innerHTML = movieCard(movies[0], true) + movies.slice(1).map((movie) => movieCard(movie)).join("");
  }

  const news = document.querySelector("#news");
  if (news) {
    replaceText("#news .kicker", "FROM THE CARTOON WORLD");
    const heading = document.querySelector("#news h2");
    if (heading) heading.innerHTML = "เรื่องน่ารู้ <em>การ์ตูน</em>";
    const stories = document.querySelectorAll("#news h3");
    ["เปิดโลกเบื้องหลัง เจ้าหมาน้อยผจญภัย", "10 ตัวละครการ์ตูนที่เด็ก ๆ หลงรัก", "เรื่องลับจากอาณาจักรดาวกระดาษ"].forEach((text, index) => {
      if (stories[index]) stories[index].textContent = text;
    });
    document.querySelectorAll("#news .story-copy p, #news .small-story > p").forEach((text) => { text.textContent = "TOON90 · วันนี้"; });
  }

  replaceText("footer p", "ดูการ์ตูนอย่างสนุกและเหมาะสมกับวัย · TOON90");
  document.querySelectorAll(".bet-match, .movie-watch").forEach((button) => {
    button.onclick = () => {
      const movie = button.dataset.match || "การ์ตูนเรื่องนี้";
      alert(`กำลังเปิดตัวอย่าง: ${movie}`);
    };
  });
}

const style = document.createElement("style");
style.textContent = `.movie-feature{margin:45px 0 28px;gap:18px}.movie-mascot{display:grid;place-items:center;width:82px;height:82px;border:4px solid var(--ink);border-radius:28px;color:#fff;font:800 42px "Baloo 2";transform:rotate(-6deg);box-shadow:5px 5px 0 var(--ink)}.movie-mascot.orange{background:#ff6b4a}.movie-mascot.pink{background:#ff8fbd}.movie-mascot.blue{background:#5abde8}.movie-title{display:grid;gap:4px;text-align:left}.movie-title strong{font:800 22px "Baloo 2"}.movie-title span,.movie-meta{color:#7c6c8e;font-size:12px}.play-bubble{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--lime);color:var(--ink);font-size:18px}.movie-mini{display:flex;align-items:center;gap:14px;margin:22px 0 10px}.movie-mini .movie-mascot{width:52px;height:52px;border-radius:18px;font-size:27px}.movie-mini strong{font:800 17px "Baloo 2"}.movie-watch{width:100%;border:2px solid var(--ink);border-radius:9px;background:var(--orange);color:#fff;padding:9px;font:700 13px "Baloo 2";cursor:pointer;box-shadow:3px 3px 0 var(--ink)}.movie-button{background:var(--lime)!important}.movie-card .league-dot.pink{background:#ff8fbd}.movie-card .league-dot.blue{background:#5abde8}.topbar{background:#ff6b5b!important;border-bottom:5px solid #34204f!important;box-shadow:0 5px 0 #34204f!important}.hero{background:#ffd166!important;color:#34204f!important;border-bottom:8px solid #34204f!important}.hero:before{background:#fff9!important}.hero-number{color:#ff8fbd!important;text-shadow:6px 6px 0 #fff!important}.hero-tag{border-color:#ff6b5b!important;color:#34204f!important}.ticker{background:#34204f!important;border-top:4px solid #34204f!important}.match-section,.news-section{background:#fff5df!important}.featured-match{background:#6c4ab6!important}.match-card{background:#fffdf7!important}.section-heading h2{color:#34204f!important}.league-strip{background:#8edcff!important;border-top:4px solid #34204f!important;border-bottom:4px solid #34204f!important}footer{background:#ff6b5b!important;border-top:5px solid #34204f!important}.bet-slip{background:#fffdf7!important}.login-modal{background:#fffdf7!important}.preview-backdrop{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:20px;background:#34204fcc}.preview-backdrop[hidden]{display:none!important}.preview-dialog{width:min(680px,100%);padding:28px;border:4px solid #34204f;border-radius:22px;background:#fffdf7;box-shadow:10px 10px 0 #34204f}.preview-screen{height:280px;display:grid;place-items:center;border:4px solid #34204f;border-radius:16px;background:#8edcff;color:#fff;font:800 76px "Baloo 2";text-shadow:5px 5px 0 #34204f}.preview-dialog h3{margin:18px 0 4px;color:#34204f;font:800 30px "Baloo 2"}.preview-dialog p{margin:0 0 18px;color:#7c6c8e}.preview-close{float:right;border:0;background:transparent;color:#34204f;font-size:26px;cursor:pointer}`;
document.head.appendChild(style);

const preview = document.createElement("div");
preview.className = "preview-backdrop";
preview.hidden = true;
preview.innerHTML = `<section class="preview-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-title"><button class="preview-close" aria-label="ปิด">×</button><div class="preview-screen"><canvas class="preview-scene" aria-label="การ์ตูนกระต่ายกระโดดเล่นในทุ่งหญ้า"></canvas></div><h3 id="preview-title">กระต่ายจอมซน</h3><p>มินิการ์ตูนแอนิเมชันต้นฉบับ</p><button class="primary-button preview-play">เริ่มชมตอนนี้ <span>→</span></button></section>`;
document.body.appendChild(preview);
const previewMediaStyle = document.createElement("style");
previewMediaStyle.textContent = ".preview-dialog{width:min(920px,100%)}.preview-screen{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;background:#8edcff}.preview-scene{position:absolute;inset:0;display:block;width:100%;height:100%}";
document.head.appendChild(previewMediaStyle);
const scene = preview.querySelector(".preview-scene");
const sceneContext = scene.getContext("2d");
let animationFrame;
let animationStartedAt;
let animationElapsed = 0;
let animationRunning = false;

const drawScene = (timestamp = 0) => {
  const bounds = scene.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(bounds.width * pixelRatio));
  const height = Math.max(1, Math.round(bounds.height * pixelRatio));
  if (scene.width !== width || scene.height !== height) {
    scene.width = width;
    scene.height = height;
  }
  const context = sceneContext;
  const scale = width / 800;
  const time = animationElapsed + (animationRunning ? (timestamp - animationStartedAt) / 1000 : 0);
  context.save();
  context.scale(scale, scale);
  context.clearRect(0, 0, 800, 450);
  context.fillStyle = "#8edcff";
  context.fillRect(0, 0, 800, 450);
  context.fillStyle = "#ffe05b";
  context.beginPath();
  context.arc(675, 88, 46, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#fff8e8";
  for (const [x, y] of [[130, 95], [370, 68], [535, 150]]) {
    context.beginPath();
    context.ellipse(x + Math.sin(time * 0.25 + x) * 14, y, 55, 17, 0, 0, Math.PI * 2);
    context.ellipse(x - 24 + Math.sin(time * 0.25 + x) * 14, y + 6, 27, 17, 0, 0, Math.PI * 2);
    context.ellipse(x + 22 + Math.sin(time * 0.25 + x) * 14, y + 7, 30, 16, 0, 0, Math.PI * 2);
    context.fill();
  }
  context.fillStyle = "#72ce78";
  context.beginPath();
  context.ellipse(150, 425, 340, 125, 0, Math.PI, Math.PI * 2);
  context.ellipse(600, 430, 390, 150, 0, Math.PI, Math.PI * 2);
  context.fill();
  const jump = Math.abs(Math.sin(time * 2.4)) * 78;
  context.save();
  context.translate(390 + Math.sin(time * 1.2) * 26, 320 - jump);
  context.rotate(Math.sin(time * 2.4) * 0.08);
  context.fillStyle = "#fff8e8";
  context.beginPath();
  context.ellipse(0, 18, 48, 42, 0, 0, Math.PI * 2);
  context.ellipse(0, -36, 36, 34, 0, 0, Math.PI * 2);
  context.ellipse(-18, -83, 11, 36, -0.16, 0, Math.PI * 2);
  context.ellipse(17, -84, 11, 38, 0.15, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ff8fbd";
  context.beginPath();
  context.ellipse(-18, -83, 5, 25, -0.16, 0, Math.PI * 2);
  context.ellipse(17, -84, 5, 27, 0.15, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#34204f";
  context.beginPath();
  context.arc(-12, -40, 4, 0, Math.PI * 2);
  context.arc(12, -40, 4, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ff6b4a";
  context.beginPath();
  context.moveTo(0, -29);
  context.lineTo(-7, -35);
  context.lineTo(7, -35);
  context.fill();
  context.restore();
  context.save();
  context.translate(510, 345);
  context.rotate(time * 1.7);
  context.fillStyle = "#ff6b4a";
  context.beginPath();
  context.moveTo(0, -31);
  context.quadraticCurveTo(32, 2, 0, 35);
  context.quadraticCurveTo(-32, 2, 0, -31);
  context.fill();
  context.fillStyle = "#54a85a";
  context.fillRect(-4, -46, 8, 18);
  context.restore();
  context.restore();
  if (animationRunning) animationFrame = requestAnimationFrame(drawScene);
};
const sceneResizeObserver = new ResizeObserver(() => drawScene());
sceneResizeObserver.observe(preview.querySelector(".preview-screen"));
drawScene();
const closePreview = () => {
  preview.hidden = true;
  if (animationRunning) animationElapsed += (performance.now() - animationStartedAt) / 1000;
  animationRunning = false;
  cancelAnimationFrame(animationFrame);
  animationElapsed = 0;
  animationStartedAt = undefined;
  drawScene();
  const playButton = preview.querySelector(".preview-play");
  playButton.disabled = false;
  playButton.innerHTML = "เริ่มชมตอนนี้ <span>→</span>";
};
preview.querySelector(".preview-close").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closePreview();
});
preview.querySelector(".preview-play").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const playButton = preview.querySelector(".preview-play");
  if (animationRunning) {
    animationElapsed += (performance.now() - animationStartedAt) / 1000;
    animationRunning = false;
    cancelAnimationFrame(animationFrame);
    playButton.innerHTML = "เล่นต่อ <span>▶</span>";
    return;
  }
  animationStartedAt = performance.now();
  animationRunning = true;
  playButton.innerHTML = "พักการ์ตูน <span>Ⅱ</span>";
  animationFrame = requestAnimationFrame(drawScene);
});
preview.addEventListener("click", (event) => {
  if (event.target === preview) closePreview();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !preview.hidden) closePreview();
});
document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".movie-card, .movie-watch, .movie-button, .hero .primary-button");
  if (!trigger) return;
  event.preventDefault();
  event.stopPropagation();
  const title = trigger.dataset.match || trigger.querySelector("strong")?.textContent || "การ์ตูนเรื่องใหม่";
  preview.querySelector("#preview-title").textContent = title;
  preview.hidden = false;
  animationElapsed = 0;
  drawScene();
}, true);

mountCartoonPage();
