let initialPath = "M 10 100 Q 400 100 790 100";

let finalPath = "M 300 100 Q 400 100 952 100";

let string = document.querySelector("#string svg");
const video = document.querySelector(".scroll-video");
const container = document.querySelector("#pikku");

gsap.registerPlugin(ScrollTrigger);
string.addEventListener("mousemove", (dets) => {
  const detX = dets.x - 44;
  const detY = dets.y - 123;

  path = `M 300 100 Q ${dets.x} ${detY} 952 100`;
  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.2,
    ease: "power3.out",
  });
});

string.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: { d: finalPath },

    duration: 0.8,
    ease: "elastic.out(1, 0.3)",
  });
});
const t1 = gsap.timeline();
const t2 = gsap.timeline();
t1.from("#navBar", {
  y: -50,
  opacity: 0,
  duration: 0.7,
});
t1.from("#pikku #profile", {
  x: -200,
  duration: 1.3,
  opacity: 0,
});

t1.from("#pikku #info", {
  x: 200,
  duration: 1.3,
  opacity: 0,
});

t2.from("#navBar h2", {
  y: -10,
  duration: 1,
  delay: 0.4,
  opacity: 0,
});
t2.from(".nav-links", {
  y: -10,
  opacity: 0,
  duartion: 0.3,
  stagger: 0.3,
});

gsap.from("#frontend", {
  x: -150,
  opacity: 0,
  duration: 1.3,
  scrollTrigger: {
    scroller: "body",
    trigger: "#frontend",

    scrub: 2,
    start: "top bottom",
    end: "top 20%",
  },
});
gsap.from("#backend", {
  x: 300,
  opacity: 0,
  duration: 1.3,
  scrollTrigger: {
    scroller: "body",
    trigger: "#backend",
    scrub: 2,
    start: "top bottom",
    end: "top 20%",
  },
});

gsap.from("#tools", {
  x: -150,
  opacity: 0,
  duration: 1.3,
  scrollTrigger: {
    scroller: "body",
    trigger: "#tools",
    scrub: 2,
    start: "top bottom",
    end: "top 60%",
  },
});

gsap.from("#about", {
  y: 50,
  opacity: 0,
  scrollTrigger: {
    scroller: "body",
    trigger: "#about",
    start: "top 95%",
    end: "top 2%",
    scrub: true,
  },
});
const TWO_PI = Math.PI * 2;
const DEFAULT_IMAGES = [
  {
    src: "https://tse2.mm.bing.net/th/id/OIP.BcDueX6P7-N3pGUnP1RZMgHaGT?r=0&w=1572&h=1338&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    src: "https://th.bing.com/th/id/OIP.m7BXGNMHiNQfOa5UizktaQHaHa?w=178&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    src: "https://www.bing.com/th/id/OIP.7rwMEjcw2fwJgJJivM6CVAHaHa?w=177&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=ImgMag&rm=2",
  },

  {
    src: "https://tse3.mm.bing.net/th/id/OIP.N_6DIrFp3b3qv3WTDohqxgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    src: "https://www.bing.com/th/id/OIP.mdLT2ZK_3OlDwK2R-Q2UlQHaGp?w=193&h=173&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=ImgAns&rm=2",
  },

  {
    src: "https://tse1.mm.bing.net/th/id/OIP.wGdP-ym3kqQopOA9us8nXgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    src: "https://static.vecteezy.com/system/resources/thumbnails/042/158/708/small_2x/python-logo-icon-programming-language-free-vector.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1280px-ISO_C%2B%2B_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
  },
  {
    src: "https://tse2.mm.bing.net/th/id/OIP.j4zOaCbIWiT8WvvekrtOJgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    src: "https://tse4.mm.bing.net/th/id/OIP.DoucfFwCgoWS7ROY7akVkgHaIz?r=0&w=736&h=875&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    src: "https://tse1.mm.bing.net/th/id/OIP.QgGDUB-ypil9XkdZTIdlqQHaGl?r=0&w=600&h=534&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

const spiralPanel = document.querySelector(".spiral-panel");
const spiralCanvas = document.getElementById("spiralCanvas");
if (spiralCanvas && spiralPanel) {
  const spiralCtx = spiralCanvas.getContext("2d");
  const images = DEFAULT_IMAGES.map((item) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = item.src;
    return img;
  });

  let progress = 0;
  let lastTime = 0;

  function spiral(n, R, turns) {
    const ang = n * turns * TWO_PI;
    const rad = R * (1 - n);
    return { x: rad * Math.cos(ang), y: -rad * Math.sin(ang) };
  }

  function resizeSpiralCanvas() {
    if (!spiralCtx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = spiralPanel.clientWidth || 900;
    const height = spiralPanel.clientHeight || 700;
    spiralCanvas.width = Math.floor(width * dpr);
    spiralCanvas.height = Math.floor(height * dpr);
    spiralCanvas.style.width = `${width}px`;
    spiralCanvas.style.height = `${height}px`;
    spiralCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function roundRect(ctx, x, y, rw, rh, r) {
    const rr = Math.min(r, rw / 2, rh / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + rw, y, x + rw, y + rh, rr);
    ctx.arcTo(x + rw, y + rh, x, y + rh, rr);
    ctx.arcTo(x, y + rh, x, y, rr);
    ctx.arcTo(x, y, x + rw, y, rr);
    ctx.closePath();
  }

  function drawSpiral(now) {
    if (!spiralCtx) return;
    const dt = lastTime ? (now - lastTime) / 1000 : 0;
    lastTime = now;
    const f = Math.min(dt, 0.1);
    progress = (progress + 2 * f) % 100;

    const width = spiralPanel.clientWidth || 900;
    const height = spiralPanel.clientHeight || 700;
    const cx = width / 2;
    const cy = height / 2;
    const turns = 3.5;
    const spacing = 4;
    const spread = 6;
    const sizeAttenuation = 2;
    const imageSize = 140;
    const fadeIn = 20;
    const fadeOut = 0;
    const cornerRadius = 5;
    const R = 0.46 * Math.min(width, height) * (1 + (spread - 1) * 0.18);

    spiralCtx.clearRect(0, 0, width, height);

    const stepFrac = Math.max(0.005, (spacing * 0.5) / 100);
    const slots = Math.min(400, Math.ceil(1 / stepFrac) + 2);
    const base = progress / 100;

    const M = 2000;
    const cum = new Float32Array(M + 1);
    let prev = spiral(0, 1, turns);
    for (let k = 1; k <= M; k++) {
      const pt = spiral(k / M, 1, turns);
      const dx = pt.x - prev.x;
      const dy = pt.y - prev.y;
      cum[k] = cum[k - 1] + Math.sqrt(dx * dx + dy * dy);
      prev = pt;
    }
    const total = cum[M] || 1;
    const K = 1024;
    const nForArc = new Float32Array(K + 1);
    let j = 0;
    for (let a = 0; a <= K; a++) {
      const target = (a / K) * total;
      while (j < M && cum[j + 1] < target) j++;
      const seg = cum[j + 1] - cum[j];
      const f2 = seg > 0 ? (target - cum[j]) / seg : 0;
      nForArc[a] = (j + f2) / M;
    }

    const arcToN = (s) => {
      const x = Math.max(0, Math.min(K, s * K));
      const i = Math.floor(x);
      const a = nForArc[i];
      const b = nForArc[Math.min(i + 1, K)];
      return a + (b - a) * (x - i);
    };

    const cards = [];
    for (let i = 0; i < slots; i++) {
      const s = (((base + i * stepFrac) % 1) + 1) % 1;
      const n = arcToN(s);
      cards.push({ tt: s * 100, n, img: i % images.length });
    }
    cards.sort((a, b) => a.n - b.n);

    for (let k = 0; k < cards.length; k++) {
      const { tt, n, img: imgIdx } = cards[k];
      const p = spiral(n, R, turns);
      const dist = Math.sqrt(p.x * p.x + p.y * p.y);

      let opacity = 1;
      if (tt < fadeIn) opacity = tt / fadeIn;
      else if (tt > 100 - fadeOut) opacity = (100 - tt) / fadeOut;
      if (opacity < 0.01) continue;

      const scale =
        sizeAttenuation > 0
          ? Math.pow(Math.min(dist / R, 1), sizeAttenuation * 0.5)
          : 1;

      const p2 = spiral(Math.min(n + 0.001, 1), R, turns);
      const angle = Math.atan2(p2.y - p.y, p2.x - p.x);

      const img = images[imgIdx];
      const ready = img && img.complete && img.naturalWidth > 0;
      const aspect = ready ? img.naturalWidth / img.naturalHeight : 1;
      let cw = imageSize * scale;
      let ch = cw / aspect;
      if (aspect < 1) {
        ch = imageSize * scale;
        cw = ch * aspect;
      }

      const x = cx + p.x;
      const y = cy + p.y;
      const rad = (cornerRadius / 20) * (Math.min(cw, ch) / 2);

      spiralCtx.save();
      spiralCtx.translate(x, y);
      spiralCtx.rotate(angle);
      spiralCtx.globalAlpha = opacity;
      roundRect(spiralCtx, -cw / 2, -ch / 2, cw, ch, rad);
      spiralCtx.clip();
      if (ready) {
        spiralCtx.drawImage(img, -cw / 2, -ch / 2, cw, ch);
      } else {
        spiralCtx.fillStyle = `hsl(${(imgIdx * 360) / images.length}, 65%, 55%)`;
        spiralCtx.fillRect(-cw / 2, -ch / 2, cw, ch);
      }
      spiralCtx.restore();
    }

    requestAnimationFrame(drawSpiral);
  }

  resizeSpiralCanvas();
  window.addEventListener("resize", resizeSpiralCanvas);
  requestAnimationFrame(drawSpiral);
}
