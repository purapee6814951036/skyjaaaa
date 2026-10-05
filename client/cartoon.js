const movies = [
  { title: "Big Buck Bunny", meta: "แอนิเมชัน · 10 นาที", badge: "คอมเมดี้", color: "orange", videoId: "YE7VzlLtp-4" },
  { title: "วันพีช (ONE PIECE)", meta: "ตัวอย่าง · 15 นาที", badge: "แนวผจญภัย", color: "pink", videoId: "tlJMx8H9Jd8", provider: "ตัวอย่างทางการจาก ONE PIECE Official - ENG", watchUrl: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece" },
  { title: "Attack on Titan", meta: "ตัวอย่าง · 15 นาที", badge: "แฟนตาซี", color: "blue", videoId: "pQWMwQFjXjo", provider: "ตัวอย่างซับไทยจาก Muse Thailand", watchUrl: "https://www.youtube.com/watch?v=pQWMwQFjXjo", watchLabel: "เปิดตัวอย่างจาก Muse Thailand" },
];
const stories = [
  {
    title: "เปิดโลกเบื้องหลัง Big Buck Bunny",
    summary: "กระต่ายตัวใหญ่กับหนังสั้นที่สร้างประวัติศาสตร์ให้วงการแอนิเมชันแบบเปิด",
    paragraphs: [
      "Big Buck Bunny เป็นหนังสั้นแอนิเมชันคอมเมดี้จาก Blender Foundation เล่าเรื่องกระต่ายยักษ์ใจดีที่ใช้ชีวิตสงบในทุ่งหญ้า ก่อนจะถูกรบกวนโดยสัตว์ตัวเล็กจอมป่วนสามตัว",
      "ผลงานนี้สร้างขึ้นเป็น Open Movie เพื่อสาธิตความสามารถของ Blender และเปิดเผยไฟล์ประกอบการผลิตให้ผู้ชมและนักทำแอนิเมชันได้ศึกษา เป็นตัวอย่างของการสร้างภาพยนตร์ที่เปิดทั้งผลงานและกระบวนการทำงาน",
      "หนังมีความยาวประมาณ 10 นาที และรับชมฉบับเต็มได้จากปุ่มด้านล่าง"
    ],
    movie: movies[0]
  },
  {
    title: "วันพีช: การผจญภัยของกลุ่มหมวกฟาง",
    summary: "ลูฟี่และกลุ่มหมวกฟางออกเดินทางตามหาวันพีชและเผชิญการผจญภัยครั้งใหม่",
    paragraphs: [
      "วันพีชติดตามการเดินทางของมังกี้ ดี. ลูฟี่และกลุ่มโจรสลัดหมวกฟาง ที่มุ่งหน้าสู่แกรนด์ไลน์เพื่อตามหาสมบัติวันพีช",
      "ตัวอย่างนี้มาจากช่อง ONE PIECE Official - ENG บน YouTube กดปุ่มด้านล่างเพื่อเปิดชมวิดีโอต้นฉบับ",
      "รายการนี้จัดเป็นตัวอย่างรับชม 15 นาที"
    ],
    movie: movies[1]
  },
  {
    title: "Attack on Titan: มหาศึกมนุษยชาติกับไททัน",
    summary: "เรื่องราวการต่อสู้เพื่อเอาชีวิตรอดของมนุษย์จากเหล่าไททัน",
    paragraphs: [
      "Attack on Titan เล่าเรื่องมนุษย์ที่ต้องต่อสู้กับไททันและค้นหาความจริงเบื้องหลังกำแพงที่ใช้ปกป้องเมือง",
      "ตัวอย่างที่เลือกเป็นวิดีโอจากช่อง Crunchyroll บน YouTube กดปุ่มด้านล่างเพื่อเปิดชมต้นฉบับ",
      "รายการนี้จัดเป็นตัวอย่างรับชม 15 นาที"
    ],
    movie: movies[2]
  }
];

const movieCard = (movie, featured = false) => featured
  ? `<article class="featured-match movie-card" data-video-id="${movie.videoId}" data-video-title="${movie.title}"><div class="feature-top"><span class="live-pill">OPEN MOVIE</span><span>BLENDER FOUNDATION</span><button class="dots">•••</button></div><div class="feature-teams movie-feature"><div class="movie-mascot ${movie.color}">★</div><div class="movie-title"><strong>${movie.title}</strong><span>${movie.meta}</span></div><div class="play-bubble">▶</div></div><div class="match-stats"><span>แอนิเมชันต้นฉบับ</span><i><b></b></i><span>รับชมออนไลน์</span></div><button class="bet-match movie-button" data-video-id="${movie.videoId}" data-video-title="${movie.title}">ดูการ์ตูน <span>→</span></button></article>`
  : `<article class="match-card movie-card" data-video-id="${movie.videoId}" data-video-title="${movie.title}"><div class="league-line"><span class="league-dot ${movie.color}"></span> ${movie.badge}<time>OPEN</time></div><div class="movie-mini"><div class="movie-mascot ${movie.color}">✦</div><strong>${movie.title}</strong></div><p class="movie-meta">${movie.meta}</p><button class="movie-watch" data-video-id="${movie.videoId}" data-video-title="${movie.title}">▶ ดูการ์ตูน</button></article>`;

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
    ["ทั้งหมด 12", "มาใหม่ 5", "แนวผจญภัย", "ตลก", "แฟนตาซี"].forEach((label, index) => {
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
    const storyHeadlines = [
      "เปิดโลกเบื้องหลัง Big Buck Bunny",
      "วันพีช: การผจญภัยของกลุ่มหมวกฟาง",
      "Attack on Titan: มหาศึกมนุษยชาติกับไททัน"
    ];
    storyHeadlines.forEach((text, index) => {
      if (stories[index]) stories[index].textContent = text;
    });
    document.querySelectorAll("#news .story-copy p, #news .small-story > p").forEach((text) => { text.textContent = "TOON90 · วันนี้"; });
    document.querySelectorAll("#news .story-copy a, #news .small-story a").forEach((link, index) => {
      link.href = `#story-${index + 1}`;
      link.dataset.storyIndex = String(index);
      link.textContent = index === 0 ? "อ่านต่อ →" : "อ่านเรื่องนี้ →";
    });
  }

  replaceText("footer p", "ดูการ์ตูนอย่างสนุกและเหมาะสมกับวัย · TOON90");
}

const style = document.createElement("style");
style.textContent = `.movie-feature{margin:45px 0 28px;gap:18px}.movie-mascot{display:grid;place-items:center;width:82px;height:82px;border:4px solid var(--ink);border-radius:28px;color:#fff;font:800 42px "Baloo 2";transform:rotate(-6deg);box-shadow:5px 5px 0 var(--ink)}.movie-mascot.orange{background:#ff6b4a}.movie-mascot.pink{background:#ff8fbd}.movie-mascot.blue{background:#5abde8}.movie-title{display:grid;gap:4px;text-align:left}.movie-title strong{font:800 22px "Baloo 2"}.movie-title span,.movie-meta{color:#7c6c8e;font-size:12px}.play-bubble{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--lime);color:var(--ink);font-size:18px}.movie-mini{display:flex;align-items:center;gap:14px;margin:22px 0 10px}.movie-mini .movie-mascot{width:52px;height:52px;border-radius:18px;font-size:27px}.movie-mini strong{font:800 17px "Baloo 2"}.movie-watch{width:100%;border:2px solid var(--ink);border-radius:9px;background:var(--orange);color:#fff;padding:9px;font:700 13px "Baloo 2";cursor:pointer;box-shadow:3px 3px 0 var(--ink)}.movie-button{background:var(--lime)!important}.movie-card .league-dot.pink{background:#ff8fbd}.movie-card .league-dot.blue{background:#5abde8}.topbar{background:#ff6b5b!important;border-bottom:5px solid #34204f!important;box-shadow:0 5px 0 #34204f!important}.hero{background:#ffd166!important;color:#34204f!important;border-bottom:8px solid #34204f!important}.hero:before{background:#fff9!important}.hero-number{color:#ff8fbd!important;text-shadow:6px 6px 0 #fff!important}.hero-tag{border-color:#ff6b5b!important;color:#34204f!important}.ticker{background:#34204f!important;border-top:4px solid #34204f!important}.match-section,.news-section{background:#fff5df!important}.featured-match{background:#6c4ab6!important}.match-card{background:#fffdf7!important}.section-heading h2{color:#34204f!important}.league-strip{background:#8edcff!important;border-top:4px solid #34204f!important;border-bottom:4px solid #34204f!important}footer{background:#ff6b5b!important;border-top:5px solid #34204f!important}.bet-slip{background:#fffdf7!important}.login-modal{background:#fffdf7!important}.preview-backdrop{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:20px;background:#34204fcc}.preview-backdrop[hidden]{display:none!important}.preview-dialog{width:min(680px,100%);padding:28px;border:4px solid #34204f;border-radius:22px;background:#fffdf7;box-shadow:10px 10px 0 #34204f}.preview-screen{height:280px;display:grid;place-items:center;border:4px solid #34204f;border-radius:16px;background:#8edcff;color:#fff;font:800 76px "Baloo 2";text-shadow:5px 5px 0 #34204f}.preview-dialog h3{margin:18px 0 4px;color:#34204f;font:800 30px "Baloo 2"}.preview-dialog p{margin:0 0 18px;color:#7c6c8e}.preview-close{float:right;border:0;background:transparent;color:#34204f;font-size:26px;cursor:pointer}`;
document.head.appendChild(style);

const storyReader = document.createElement("div");
storyReader.className = "story-reader-backdrop";
storyReader.hidden = true;
storyReader.innerHTML = `<section class="story-reader" role="dialog" aria-modal="true" aria-labelledby="story-reader-title"><button class="story-reader-close" type="button" aria-label="ปิดบทความ">×</button><p class="story-reader-kicker">TOON90 · OPEN MOVIES</p><h2 id="story-reader-title"></h2><p class="story-reader-summary"></p><div class="story-reader-content"></div><button class="primary-button story-reader-watch" type="button">ดูการ์ตูนเรื่องนี้ <span>→</span></button></section>`;
document.body.appendChild(storyReader);
const storyReaderStyle = document.createElement("style");
storyReaderStyle.textContent = ".story-reader-backdrop{position:fixed;inset:0;z-index:55;display:grid;place-items:center;padding:20px;background:#34204fcc}.story-reader-backdrop[hidden]{display:none}.story-reader{position:relative;width:min(720px,100%);max-height:min(86vh,800px);overflow:auto;padding:32px;background:#fff8e8;border:4px solid #34204f;border-radius:16px;box-shadow:8px 8px 0 #34204f;color:#34204f}.story-reader-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border:2px solid #34204f;border-radius:50%;background:#ffe05b;font-size:23px;cursor:pointer}.story-reader-kicker{margin:0 48px 8px 0;color:#7c6c8e;font:700 12px 'DM Sans',sans-serif}.story-reader h2{margin:0 44px 8px 0;font:800 30px 'Baloo 2',Kanit,sans-serif;line-height:1.2}.story-reader-summary{margin:0 0 22px;color:#6c4ab6;font-weight:700}.story-reader-content p{margin:0 0 14px;line-height:1.8}.story-reader-watch{margin-top:8px;border:3px solid #34204f;border-radius:10px;background:#ff6b4a;padding:10px 16px;box-shadow:3px 3px 0 #34204f;color:#fff;font:700 15px 'Baloo 2',Kanit,sans-serif;cursor:pointer}@media(max-width:600px){.story-reader{padding:26px 20px}.story-reader h2{font-size:24px}}";
document.head.appendChild(storyReaderStyle);

const openStory = (index) => {
  const story = stories[index];
  if (!story) return;
  storyReader.querySelector("#story-reader-title").textContent = story.title;
  storyReader.querySelector(".story-reader-summary").textContent = story.summary;
  const content = storyReader.querySelector(".story-reader-content");
  content.replaceChildren(...story.paragraphs.map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  const watchButton = storyReader.querySelector(".story-reader-watch");
  watchButton.dataset.videoId = story.movie.videoId;
  watchButton.dataset.videoTitle = story.movie.title;
  storyReader.hidden = false;
  storyReader.querySelector(".story-reader-close").focus();
};

const closeStory = () => { storyReader.hidden = true; };
storyReader.querySelector(".story-reader-close").addEventListener("click", closeStory);
storyReader.addEventListener("click", (event) => {
  if (event.target === storyReader) closeStory();
});

const preview = document.createElement("div");
preview.className = "preview-backdrop";
preview.hidden = true;
preview.innerHTML = `<section class="preview-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-title"><button class="preview-close" aria-label="ปิด">×</button><div class="preview-screen"><iframe class="preview-video" title="เครื่องเล่นการ์ตูน" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><a class="primary-button preview-watch-external" href="#" target="_blank" rel="noreferrer">เปิดตัวอย่างจากช่องทางการ <span>↗</span></a><h3 id="preview-title">การ์ตูน</h3><p class="preview-description"></p><p class="preview-fallback-note">หากวิดีโอในกรอบเล่นไม่ได้ ให้กดปุ่มเพื่อเปิดตัวอย่างจากช่องทางการ</p></section>`;
document.body.appendChild(preview);
const previewMediaStyle = document.createElement("style");
previewMediaStyle.textContent = ".preview-dialog{width:min(920px,100%);max-height:90vh;overflow-y:auto;padding:24px}.preview-screen{position:relative;display:block;width:min(100%,620px);aspect-ratio:16/9;overflow:hidden;background:#17121f}.preview-video{position:absolute;inset:0;width:100%;height:100%;border:0}.preview-watch-external{display:inline-flex;align-items:center;gap:8px;margin:12px 0 0;text-decoration:none;color:inherit}.preview-fallback-note{margin:8px 0;color:#7c6c8e;font-size:13px}@media(max-height:520px){.preview-dialog{max-height:calc(100vh - 24px);padding:16px}.preview-screen{width:min(100%,520px)}}";
document.head.appendChild(previewMediaStyle);
const closePreview = () => {
  preview.hidden = true;
  preview.querySelector(".preview-video").src = "";
};
const openMovie = (videoId, title) => {
  const movie = movies.find((item) => item.videoId === videoId);
  preview.querySelector("#preview-title").textContent = title;
  preview.querySelector(".preview-description").textContent = movie?.provider || "ตัวอย่างการ์ตูนบน YouTube";
  preview.querySelector(".preview-video").src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
  const watchLink = preview.querySelector(".preview-watch-external");
  watchLink.href = movie?.watchUrl || `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  watchLink.firstChild.textContent = movie?.watchLabel || (movie?.watchUrl ? "ดูต่อที่ Crunchyroll " : "เปิดดูบน YouTube ");
  preview.hidden = false;
};
preview.querySelector(".preview-close").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closePreview();
});
preview.addEventListener("click", (event) => {
  if (event.target === preview) closePreview();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !preview.hidden) closePreview();
  if (event.key === "Escape" && !storyReader.hidden) closeStory();
});
document.addEventListener("click", (event) => {
  const storyLink = event.target.closest("a[data-story-index]");
  if (storyLink) {
    event.preventDefault();
    openStory(Number(storyLink.dataset.storyIndex));
    return;
  }

  const trigger = event.target.closest(".movie-card, .movie-watch, .movie-button, .story-reader-watch, .hero .primary-button");
  if (!trigger) return;
  event.preventDefault();
  event.stopPropagation();
  const title = trigger.dataset.videoTitle || trigger.dataset.match || trigger.querySelector("strong")?.textContent || "การ์ตูน";
  const videoId = trigger.dataset.videoId || trigger.closest("[data-video-id]")?.dataset.videoId;
  if (!videoId) return;
  if (trigger.classList.contains("story-reader-watch")) closeStory();
  openMovie(videoId, title);
}, true);

mountCartoonPage();
