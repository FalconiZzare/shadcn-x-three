import { useEffect, useRef } from "react";
import { gsap, Circ } from "gsap";
import { cn } from "@/lib/utils.js";
import PropTypes from "prop-types";
import { useCurrentTheme } from "@/hooks/get-theme.js";

const AnimatedCrawler = ({ className }) => {
  const canvasRef = useRef(null);
  const points = [];
  const currentTheme = useCurrentTheme();
  const crawlerColor = currentTheme === "dark" ? "255,255,255" : "0,0,0";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animateHeader = true;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let target = { x: width / 2, y: height / 2 };

    const initHeader = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      canvas.width = width;
      canvas.height = height;

      // Create points
      const puntitos = 20;
      for (let x = 0; x < width; x = x + width / puntitos) {
        for (let y = 0; y < height; y = y + height / puntitos) {
          const px = x + Math.random() * (width / puntitos);
          const py = y + Math.random() * (height / puntitos);
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // For each point find the 5 closest points
      for (let i = 0; i < points.length; i++) {
        const closest = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        }
        p1.closest = closest;
      }

      function Circle(pos, rad, color) {
        this.pos = pos || null;
        this.radius = rad || null;
        this.color = color || null;

        this.draw = () => {
          if (!this.active) return;
          ctx.beginPath();
          ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
          // ctx.fillStyle = 'rgba(255,255,255,' + this.active + ')';
          ctx.fillStyle = `rgba(${crawlerColor},${this.active})`;
          ctx.fill();
        };
      }

      // Assign a circle to each point
      points.forEach((point) => {
        point.circle = new Circle(point, 2 + Math.random() * 2, `rgba(${crawlerColor},1)`);
      });
    };

    // Event handling
    const addListeners = () => {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    };

    const mouseMove = (e) => {
      let posx = 0;
      let posy = 0;

      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      target.x = posx;
      target.y = posy;
    };

    const scrollCheck = () => {
      animateHeader = document.body.scrollTop <= height;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Animation
    const initAnimation = () => {
      animate();
      points.forEach((point) => {
        shiftPoint(point);
      });
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point) => {
          // Detect points in range
          if (Math.abs(getDistance(target, point)) < 4000) {
            point.active = 0.3;
            point.circle.active = 0.6;
          } else if (Math.abs(getDistance(target, point)) < 20000) {
            point.active = 0.1;
            point.circle.active = 0.3;
          } else if (Math.abs(getDistance(target, point)) < 40000) {
            point.active = 0.02;
            point.circle.active = 0.1;
          } else {
            point.active = 0;
            point.circle.active = 0;
          }

          drawLines(point);
          point.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      gsap.to(p, 1 + Math.random(), {
        x: p.originX - 50 + Math.random() * 50,
        y: p.originY - 50 + Math.random() * 50,
        ease: Circ.easeInOut,
        onComplete: () => {
          shiftPoint(p);
        }
      });
    };

    // Canvas manipulation
    const drawLines = (p) => {
      if (!p.active) return;
      p.closest.forEach((closestPoint) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closestPoint.x, closestPoint.y);
        // ctx.strokeStyle = 'rgba(255,255,255,' + p.active + ')';
        ctx.strokeStyle = `rgba(${crawlerColor},${p.active})`;
        ctx.stroke();
      });
    };

    // Util
    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    initHeader();
    initAnimation();
    addListeners();
  }, [crawlerColor]);

  return (
    <div className={cn("absolute inset-0 z-[-1] h-full w-full", className)}>
      <canvas id="x-canvas" className={"opacity-[0.5]"} ref={canvasRef}></canvas>
    </div>
  );
};

export default AnimatedCrawler;

AnimatedCrawler.propTypes = {
  className: PropTypes.string
};
