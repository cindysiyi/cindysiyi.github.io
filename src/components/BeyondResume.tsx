import React, { useCallback, useEffect, useRef, useState } from "react";
import { Eye, Heart } from "lucide-react";
import Section from "./Section";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
};

const flagBalls = [
  { label: "China" },
  { label: "United States" },
  { label: "United Kingdom" },
  { label: "Japan" },
  { label: "France" },
];

const mediaCovers = [
  { src: "/assets/profile/media-01.jpg", label: "产品构建" },
  { src: "/assets/profile/media-02.jpg", label: "AI 现场" },
  { src: "/assets/profile/media-03.jpg", label: "Prompt 实验" },
  { src: "/assets/profile/media-04.jpg", label: "公开表达" },
  { src: "/assets/profile/media-05.jpg", label: "内容拆解" },
];

const AnimatedMetric: React.FC<{
  value: number;
  start: boolean;
  decimals?: number;
  suffix?: string;
}> = ({ value, start, decimals = 0, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(start ? value : 0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return undefined;
    }

    const startedAt = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / 1150);
      setDisplayValue(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{displayValue.toFixed(decimals)}{suffix}</>;
};

const LanguagePool: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let started = false;
    let lastTime = 0;
    let balls: Ball[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawStar = (
      x: number,
      y: number,
      outerRadius: number,
      points = 5,
    ) => {
      context.beginPath();
      for (let point = 0; point < points * 2; point += 1) {
        const angle = -Math.PI / 2 + (point * Math.PI) / points;
        const radius = point % 2 === 0 ? outerRadius : outerRadius * 0.42;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (point === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.closePath();
      context.fill();
    };

    const drawFlag = (ball: Ball) => {
      const diameter = ball.radius * 2;
      const left = ball.x - ball.radius;
      const top = ball.y - ball.radius;

      switch (ball.label) {
        case "China": {
          context.fillStyle = "#de2910";
          context.fillRect(left, top, diameter, diameter);
          context.fillStyle = "#ffde00";
          drawStar(ball.x - ball.radius * 0.36, ball.y - ball.radius * 0.3, ball.radius * 0.22);
          [
            [-0.02, -0.5],
            [0.12, -0.26],
            [0.1, 0.02],
            [-0.05, 0.2],
          ].forEach(([dx, dy]) => {
            drawStar(ball.x + ball.radius * dx, ball.y + ball.radius * dy, ball.radius * 0.07);
          });
          break;
        }
        case "United States": {
          context.fillStyle = "#fff";
          context.fillRect(left, top, diameter, diameter);
          const stripeHeight = diameter / 13;
          context.fillStyle = "#c83d4a";
          for (let stripe = 0; stripe < 13; stripe += 2) {
            context.fillRect(left, top + stripe * stripeHeight, diameter, stripeHeight);
          }
          context.fillStyle = "#31558a";
          context.fillRect(left, top, diameter * 0.56, stripeHeight * 7);
          context.fillStyle = "rgba(255,255,255,0.94)";
          for (let row = 0; row < 4; row += 1) {
            for (let column = 0; column < 4; column += 1) {
              context.beginPath();
              context.arc(
                left + diameter * (0.09 + column * 0.13),
                top + stripeHeight * (0.8 + row * 1.55),
                Math.max(1, ball.radius * 0.025),
                0,
                Math.PI * 2,
              );
              context.fill();
            }
          }
          break;
        }
        case "United Kingdom": {
          context.fillStyle = "#284a84";
          context.fillRect(left, top, diameter, diameter);
          context.lineCap = "butt";
          context.strokeStyle = "#fff";
          context.lineWidth = ball.radius * 0.42;
          context.beginPath();
          context.moveTo(left, top);
          context.lineTo(left + diameter, top + diameter);
          context.moveTo(left + diameter, top);
          context.lineTo(left, top + diameter);
          context.stroke();
          context.strokeStyle = "#c83d4a";
          context.lineWidth = ball.radius * 0.16;
          context.stroke();
          context.fillStyle = "#fff";
          context.fillRect(left, ball.y - ball.radius * 0.27, diameter, ball.radius * 0.54);
          context.fillRect(ball.x - ball.radius * 0.27, top, ball.radius * 0.54, diameter);
          context.fillStyle = "#c83d4a";
          context.fillRect(left, ball.y - ball.radius * 0.14, diameter, ball.radius * 0.28);
          context.fillRect(ball.x - ball.radius * 0.14, top, ball.radius * 0.28, diameter);
          break;
        }
        case "Japan": {
          context.fillStyle = "#fff";
          context.fillRect(left, top, diameter, diameter);
          context.beginPath();
          context.arc(ball.x, ball.y, ball.radius * 0.43, 0, Math.PI * 2);
          context.fillStyle = "#bc3550";
          context.fill();
          break;
        }
        case "France": {
          context.fillStyle = "#244f9b";
          context.fillRect(left, top, diameter / 3, diameter);
          context.fillStyle = "#fff";
          context.fillRect(left + diameter / 3, top, diameter / 3, diameter);
          context.fillStyle = "#e3424b";
          context.fillRect(left + (diameter * 2) / 3, top, diameter / 3, diameter);
          break;
        }
        default:
          break;
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      balls.forEach((ball) => {
        context.save();
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.clip();
        drawFlag(ball);
        context.restore();

        context.save();
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.strokeStyle = "rgba(32, 33, 35, 0.24)";
        context.lineWidth = 1.2;
        context.stroke();
        context.restore();
      });
    };

    const createBalls = () => {
      const baseRadius = Math.max(25, Math.min(34, width * 0.055));
      balls = flagBalls.map((item, index) => ({
        ...item,
        radius: baseRadius + (index % 2) * 3,
        x: baseRadius + Math.random() * Math.max(baseRadius, width - baseRadius * 2),
        y: reduceMotion
          ? height - baseRadius - 8
          : -baseRadius - index * 54 - Math.random() * 110,
        vx: reduceMotion ? 0 : (Math.random() - 0.5) * 3.8,
        vy: reduceMotion ? 0 : Math.random() * 0.8,
      }));

      if (reduceMotion) {
        balls.forEach((ball, index) => {
          ball.x = baseRadius + 12 + index * ((width - baseRadius * 2 - 24) / 4);
        });
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createBalls();
      if (reduceMotion) draw();
    };

    const resolveCollisions = () => {
      for (let i = 0; i < balls.length; i += 1) {
        for (let j = i + 1; j < balls.length; j += 1) {
          const a = balls[i];
          const b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy) || 0.01;
          const minimum = a.radius + b.radius;
          if (distance >= minimum) continue;

          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = (minimum - distance) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (relativeVelocity < 0) {
            const impulse = relativeVelocity * 0.92;
            a.vx += impulse * nx;
            a.vy += impulse * ny;
            b.vx -= impulse * nx;
            b.vy -= impulse * ny;
          }
        }
      }
    };

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67 || 1, 1.8);
      lastTime = time;

      balls.forEach((ball) => {
        ball.vy += 0.24 * delta;

        if (pointer.active) {
          const dx = ball.x - pointer.x;
          const dy = ball.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const reach = ball.radius + 58;
          if (distance < reach) {
            const force = (reach - distance) / reach;
            ball.vx += (dx / distance) * force * 0.7;
            ball.vy += (dy / distance) * force * 0.7;
          }
        }

        ball.x += ball.vx * delta;
        ball.y += ball.vy * delta;
        ball.vx *= 0.998;

        if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= -0.8;
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -0.8;
        }

        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -0.72;
          if (Math.abs(ball.vy) < 0.28) ball.vy = 0;
          ball.vx *= 0.97;
        }
      });

      resolveCollisions();
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        wrap.classList.add("is-dropped");
        if (!reduceMotion) frame = window.requestAnimationFrame(tick);
        intersectionObserver.disconnect();
      },
      { threshold: 0.42 },
    );
    intersectionObserver.observe(wrap);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="language-marble-pool">
      <canvas
        ref={canvasRef}
        className="language-marble-canvas"
        role="img"
        aria-label="中国、美国、英国、日本与法国国旗弹珠落入池中"
      />
      <span className="marble-pool-floor" aria-hidden="true" />
    </div>
  );
};

const MediaDeck: React.FC = () => {
  const [front, setFront] = useState(0);
  const [retreating, setRetreating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number>();
  const deckRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => {
    if (retreating) return;
    setRetreating(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setFront((current) => (current + 1) % mediaCovers.length);
      setRetreating(false);
    }, 260);
  }, [retreating]);

  useEffect(() => {
    const node = deckRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || retreating || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const autoplayTimer = window.setTimeout(advance, 2000);
    return () => window.clearTimeout(autoplayTimer);
  }, [advance, front, isPaused, isVisible, retreating]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <div
      ref={deckRef}
      className="media-deck"
    >
      <div
        className="media-card-stage"
        aria-live="polite"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setIsPaused(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setIsPaused(false);
        }}
      >
        {mediaCovers.map((cover, index) => {
          const depth = (index - front + mediaCovers.length) % mediaCovers.length;
          return (
            <button
              key={cover.src}
              type="button"
              className={`media-work-card ${depth === 0 ? "is-front" : ""} ${depth === 0 && retreating ? "is-retreating" : ""}`}
              style={{ "--deck-depth": depth } as React.CSSProperties}
              onClick={depth === 0 ? advance : () => setFront(index)}
              aria-label={`${cover.label}，${depth === 0 ? "点击查看下一张" : "点击抽出这张卡片"}`}
            >
              <img src={cover.src} alt={cover.label} loading="lazy" decoding="async" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const BeyondResume: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = pageRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="beyond-resume" className="portfolio-surface beyond-section" fullBleed>
      <div ref={pageRef} className="profile-page mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-20 md:px-10 lg:px-14">
        <div className="profile-heading-row">
          <header className="simple-page-heading profile-page-heading">
            <p className="section-kicker">04 · PROFILE</p>
            <h2 className="portfolio-title mt-3">Beyond the Resume</h2>
          </header>

          <div className="media-deck-meta profile-heading-metrics" aria-label="自媒体数据">
            <div className="media-metric media-metric-likes">
              <Heart aria-hidden="true" />
              <strong><AnimatedMetric value={3.4} decimals={1} suffix="w" start={isVisible} /></strong>
              <span>赞和收藏</span>
            </div>
            <div className="media-metric media-metric-views">
              <Eye aria-hidden="true" />
              <strong><AnimatedMetric value={120} suffix="w+" start={isVisible} /></strong>
              <span>播放量</span>
            </div>
          </div>
        </div>

        <div className="profile-showcase">
          <div className="profile-left-column">
            <article className="profile-panel language-panel">
              <div className="profile-panel-copy">
                <h3>Trilingual</h3>
                <p>IELTS 7.0 / 日语专四优秀 / 可全英文办公</p>
              </div>
              <LanguagePool />
            </article>

            <article className="profile-panel leadership-panel">
              <div className="leadership-copy">
                <h3>Communication &amp; Leadership</h3>
                <p>
                  连续五年学生组织负责人 /<br />
                  主导策划7场全校1000+人次大型活动
                </p>
              </div>
              <img
                src="/assets/profile/leadership-illustration.jpg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </article>
          </div>

          <article className="profile-panel media-panel">
            <MediaDeck />
          </article>
        </div>
      </div>
    </Section>
  );
};

export default BeyondResume;
