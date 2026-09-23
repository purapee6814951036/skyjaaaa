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
style.textContent = `.movie-feature{margin:45px 0 28px;gap:18px}.movie-mascot{display:grid;place-items:center;width:82px;height:82px;border:4px solid var(--ink);border-radius:28px;color:#fff;font:800 42px "Baloo 2";transform:rotate(-6deg);box-shadow:5px 5px 0 var(--ink)}.movie-mascot.orange{background:#ff6b4a}.movie-mascot.pink{background:#ff8fbd}.movie-mascot.blue{background:#5abde8}.movie-title{display:grid;gap:4px;text-align:left}.movie-title strong{font:800 22px "Baloo 2"}.movie-title span,.movie-meta{color:#7c6c8e;font-size:12px}.play-bubble{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--lime);color:var(--ink);font-size:18px}.movie-mini{display:flex;align-items:center;gap:14px;margin:22px 0 10px}.movie-mini .movie-mascot{width:52px;height:52px;border-radius:18px;font-size:27px}.movie-mini strong{font:800 17px "Baloo 2"}.movie-watch{width:100%;border:2px solid var(--ink);border-radius:9px;background:var(--orange);color:#fff;padding:9px;font:700 13px "Baloo 2";cursor:pointer;box-shadow:3px 3px 0 var(--ink)}.movie-button{background:var(--lime)!important}.movie-card .league-dot.pink{background:#ff8fbd}.movie-card .league-dot.blue{background:#5abde8}`;
document.head.appendChild(style);

mountCartoonPage();
