"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle,
  Gift,
} from "lucide-react";

// ================= INTERACTIVE SCRATCH CARD COMPONENT =================
function RoyalScratchBox({ onRevealed }: { onRevealed?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Metallic Champagne Gold Texture
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#EAC775");
    grad.addColorStop(0.3, "#FFF8E7");
    grad.addColorStop(0.5, "#D4AF37");
    grad.addColorStop(0.8, "#FAF0D7");
    grad.addColorStop(1, "#C29B38");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Border and text
    ctx.strokeStyle = "rgba(180, 130, 20, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.font = "bold 13px 'Cinzel Decorative', serif";
    ctx.fillStyle = "#533D08";
    ctx.textAlign = "center";
    ctx.fillText("✧ SCRATCH WITH LOVE ✧", width / 2, height / 2 - 4);

    ctx.font = "italic 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#6E5212";
    ctx.fillText(
      "Touch & scratch to reveal secret note",
      width / 2,
      height / 2 + 18,
    );
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    if (!isScratched) {
      setIsScratched(true);
      if (onRevealed) onRevealed();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "340px",
        height: "125px",
        margin: "0 auto",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.28)",
        border: "1.5px solid #D4AF37",
      }}
    >
      {/* Hidden Message Underneath */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #FFFDF8 0%, #FDF3DC 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <Sparkles size={20} color="#B38728" style={{ marginBottom: "4px" }} />
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "19px",
            color: "#835E12",
            margin: "0 0 4px 0",
            fontWeight: 700,
          }}
        >
          Special VIP Suite Reserved For You
        </h4>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#5C4A33",
            margin: 0,
          }}
        >
          "Your presence is the most precious prayer for our new life."
        </p>
      </div>

      {/* Canvas scratch layer */}
      <canvas
        ref={canvasRef}
        width={340}
        height={125}
        onMouseDown={(e) => {
          isDrawing.current = true;
          scratch(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (isDrawing.current) scratch(e.clientX, e.clientY);
        }}
        onMouseUp={() => (isDrawing.current = false)}
        onTouchMove={(e) => {
          if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}

// ================= MAIN COMPONENT =================
export default function LightRoyalGrandWeddingCard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-28T19:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Shahi Champagne Shower
  const triggerRoyalShower = () => {
    const colors = ["#E6CA65", "#FFF2D1", "#FFFFFF", "#FBDCC4", "#D4AF37"];
    for (let i = 0; i < 80; i++) {
      const petal = document.createElement("div");
      petal.style.position = "fixed";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.top = "-25px";
      petal.style.width = Math.random() * 14 + 8 + "px";
      petal.style.height = Math.random() * 18 + 10 + "px";
      petal.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      petal.style.zIndex = "99999";
      petal.style.pointerEvents = "none";
      petal.style.borderRadius = "80% 0 80% 0";
      petal.style.boxShadow = "0 0 12px rgba(212, 175, 55, 0.4)";
      petal.style.transition =
        "transform 3.8s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 3.8s ease";
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.style.transform = `translate(${
          Math.random() * 240 - 120
        }px, 105vh) rotate(${Math.random() * 720}deg)`;
        petal.style.opacity = "0";
      }, 20);

      setTimeout(() => petal.remove(), 3900);
    }
  };

  const handleUnlockPalace = () => {
    setIsUnlocked(true);
    triggerRoyalShower();
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play blocked:", e));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setIsSubmitted(true);
      triggerRoyalShower();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        backgroundColor: "#F7F2E9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isUnlocked ? "60px 16px 120px 16px" : "16px",
      }}
    >
      {/* 🎵 Audio File */}
      <audio ref={audioRef} src="/sajna.mp3" loop preload="auto" />

      {/* Luxury Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Amiri:wght@700&family=Montserrat:wght@300;400;600&display=swap"
      />

      <style>{`
        /* 🌊 Animated Silk Waves Background */
        @keyframes silkFlow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes floatGoldDust {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(0px) rotate(360deg); opacity: 0.3; }
        }
        @keyframes goldShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes waxPulseGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(220, 175, 60, 0.5), 0 0 10px rgba(255, 255, 255, 0.8);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 55px rgba(220, 175, 60, 0.85), 0 0 20px rgba(255, 255, 255, 0.95);
            transform: scale(1.05);
          }
        }
        .light-gold-text-shimmer {
          background: linear-gradient(90deg, #A1761E 0%, #ECC557 25%, #6A4907 50%, #ECC557 75%, #A1761E 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: goldShine 5.5s linear infinite;
        }
        .grand-card-shadow {
          box-shadow: 0 35px 90px rgba(189, 150, 75, 0.22), 0 10px 30px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* ================= 🌌 LUXURY ANIMATED LIGHT BACKGROUND ================= */}
      <div
        style={{
          position: "fixed",
          inset: -100,
          background:
            "radial-gradient(circle at 50% 40%, #FFFDF8 0%, #F5ECDD 40%, #EBDBC5 80%, #DEC8AE 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Rotating Ambient Silk Nebulas for depth */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "140vw",
          height: "140vh",
          background:
            "radial-gradient(circle, rgba(243, 219, 161, 0.45) 0%, rgba(255,255,255,0) 60%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "silkFlow 24s ease-in-out infinite",
        }}
      />

      {/* Golden Polka Dot Damask Pattern */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(196, 152, 68, 0.22) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 🎶 Floating Floating Crystal Audio Button */}
      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMusic}
          style={{
            position: "fixed",
            bottom: "26px",
            right: "26px",
            zIndex: 9999,
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #D4AF37",
            borderRadius: "50px",
            padding: "11px 20px",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            cursor: "pointer",
            color: "#4A3B12",
            boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          {isPlaying ? (
            <>
              <Volume2 size={18} color="#C59B27" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#835E12",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Music Playing
              </span>
            </>
          ) : (
            <>
              <VolumeX size={18} color="#9C8B7A" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#9C8B7A",
                  textTransform: "uppercase",
                }}
              >
                Music Paused
              </span>
            </>
          )}
        </motion.button>
      )}

      {/* ================= 1. STARTING SCREEN: MAJESTIC SEAL FARMAN ================= */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.4,
              filter: "blur(20px)",
              transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              zIndex: 50,
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* The Envelope Card */}
            <div
              className="grand-card-shadow"
              style={{
                width: "100%",
                background:
                  "linear-gradient(150deg, #FFFFFF 0%, #FDF9EE 70%, #F9F0DC 100%)",
                border: "2px solid #D4AF37",
                borderRadius: "28px",
                padding: "54px 34px",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Corner Ornaments */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  color: "#C59B27",
                  fontSize: "16px",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  color: "#C59B27",
                  fontSize: "16px",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "#C59B27",
                  fontSize: "16px",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  color: "#C59B27",
                  fontSize: "16px",
                }}
              >
                ✦
              </div>

              {/* Bismillah */}
              <span
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "25px",
                  color: "#9C761D",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>

              <span
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "11px",
                  letterSpacing: "0.45em",
                  color: "#99731C",
                  textTransform: "uppercase",
                  marginBottom: "26px",
                }}
              >
                Royal Imperial Farman
              </span>

              {/* Pulsing 3D Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                onClick={handleUnlockPalace}
                style={{
                  width: "115px",
                  height: "115px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #FFF6D8 0%, #E7C463 45%, #AA7F18 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "3px solid #FFFFFF",
                  cursor: "pointer",
                  animation: "waxPulseGlow 3s infinite ease-in-out",
                  marginBottom: "26px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "48px",
                    color: "#4A3608",
                    fontWeight: 700,
                    textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                  }}
                >
                  A&H
                </span>
              </motion.div>

              <h2
                className="light-gold-text-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "56px",
                  margin: "0 0 6px 0",
                  fontWeight: "normal",
                  lineHeight: 1.1,
                }}
              >
                Ahmad & Hania
              </h2>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  letterSpacing: "0.28em",
                  color: "#6D5A46",
                  textTransform: "uppercase",
                  margin: "0 0 34px 0",
                  fontWeight: 600,
                }}
              >
                DECEMBER 28, 2025 • LAHORE
              </p>

              {/* Open Royal Invitation Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(212, 175, 55, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlockPalace}
                style={{
                  background:
                    "linear-gradient(135deg, #ECC867 0%, #BF9126 50%, #996F12 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "50px",
                  padding: "16px 40px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(184, 138, 34, 0.38)",
                }}
              >
                <Sparkles size={16} />
                Open Royal Farman
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE REVEALED GRAND CARD (OPENS FROM DEAD CENTER) ================= */}
      {isUnlocked && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.55, // Expands from dead center!
            filter: "blur(14px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.3,
            ease: [0.16, 1, 0.3, 1], // Luxurious smooth Boutique expansion
          }}
          className="grand-card-shadow"
          style={{
            width: "100%",
            maxWidth: "780px", // 🔥 Bara اور Grand Size Card
            backgroundColor: "#FFFEFA",
            border: "2px solid #D4AF37",
            borderRadius: "32px",
            padding: "60px 36px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
            color: "#3B3226",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          {/* Inner Golden Mughal Borders */}
          <div
            style={{
              position: "absolute",
              inset: "14px",
              border: "1.5px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "24px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "20px",
              border: "1px dashed rgba(212, 175, 55, 0.3)",
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          />

          {/* SVG Ornamental Jaali Flourish Corners */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              fontSize: "18px",
              color: "#C59B27",
            }}
          >
            ❦
          </div>
          <div
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              fontSize: "18px",
              color: "#C59B27",
            }}
          >
            ❦
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
              fontSize: "18px",
              color: "#C59B27",
            }}
          >
            ❦
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              right: "24px",
              fontSize: "18px",
              color: "#C59B27",
            }}
          >
            ❦
          </div>

          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Arabic Bismillah */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="light-gold-text-shimmer"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "38px",
                marginBottom: "12px",
                fontWeight: 700,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.div>

            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#9C7923",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              Under the blessings of Allah Almighty & Parents
            </span>

            {/* Couple Calligraphy */}
            <div style={{ margin: "10px 0 24px 0" }}>
              <h1
                className="light-gold-text-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(68px, 14vw, 98px)",
                  margin: 0,
                  lineHeight: 1.05,
                  fontWeight: "normal",
                }}
              >
                Ahmad Raza
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "18px",
                  margin: "8px 0",
                }}
              >
                <span
                  style={{
                    width: "65px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #D4AF37)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "24px",
                    color: "#946E19",
                  }}
                >
                  cordially weds
                </span>
                <span
                  style={{
                    width: "65px",
                    height: "1px",
                    background: "linear-gradient(90deg, #D4AF37, transparent)",
                  }}
                />
              </div>

              <h1
                className="light-gold-text-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(68px, 14vw, 98px)",
                  margin: 0,
                  lineHeight: 1.05,
                  fontWeight: "normal",
                }}
              >
                Hania Tariq
              </h1>
            </div>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "18px",
                fontStyle: "italic",
                color: "#5C4A38",
                maxWidth: "520px",
                lineHeight: 1.8,
                margin: "0 0 35px 0",
              }}
            >
              Request the honour of your blissful presence to celebrate the
              union of two hearts and bless them with your auspicious prayers.
            </p>

            {/* ================= 3. VENUE DETAILS SECTION ================= */}
            <section
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #FFF9EB 0%, #FAF1DC 100%)",
                border: "1.5px solid #D4AF37",
                borderRadius: "190px 190px 20px 20px",
                padding: "60px 26px 38px 26px",
                boxSizing: "border-box",
                marginBottom: "36px",
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.14)",
              }}
            >
              <div
                style={{
                  color: "#B38728",
                  fontSize: "14px",
                  letterSpacing: "0.2em",
                  marginBottom: "6px",
                }}
              >
                ✧ ✦ ✧
              </div>

              <span
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "#856214",
                  display: "block",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                The Grand Celebration
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "34px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#4A3B1C",
                  textTransform: "uppercase",
                  margin: "0 0 25px 0",
                }}
              >
                Barat & Walima
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  color: "#4A3E31",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "17px",
                  marginBottom: "26px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Calendar size={18} color="#B38728" />
                  <span>Sunday, 28 December 2025</span>
                </div>
                <span style={{ color: "#D4AF37" }}>•</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Clock size={18} color="#B38728" />
                  <span>07:30 PM Sharp</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(212, 175, 55, 0.35)",
                  paddingTop: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#8A6413",
                    marginBottom: "6px",
                  }}
                >
                  <MapPin size={18} />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    Royal Palm Golf & Country Club
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    color: "#6E5E4F",
                    margin: "0 0 24px 0",
                  }}
                >
                  Bab-e-Azam Grand Marquee, Canal Bank Road, Lahore
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background:
                      "linear-gradient(135deg, #E6C25B 0%, #B88A22 100%)",
                    color: "#FFFFFF",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "14px 30px",
                    textDecoration: "none",
                    borderRadius: "50px",
                    boxShadow: "0 6px 20px rgba(184, 138, 34, 0.35)",
                  }}
                >
                  <Navigation size={15} />
                  Navigate To Venue
                </motion.a>
              </div>
            </section>

            {/* ================= 4. ✨ INTERACTIVE SCRATCH CARD ✨ ================= */}
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                width: "100%",
                margin: "0 0 35px 0",
                padding: "24px 14px",
                background: "#FAF4E6",
                borderRadius: "20px",
                border: "1.5px dashed #D4AF37",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <Gift size={20} color="#B38728" />
                <span
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "13px",
                    letterSpacing: "0.25em",
                    color: "#7E5E16",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Royal Mystery Box
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px",
                  color: "#6D5C4A",
                  margin: "0 0 16px 0",
                }}
              >
                Scratch with your finger or mouse to unlock your special
                message!
              </p>

              {/* The Scratch Card */}
              <RoyalScratchBox onRevealed={() => triggerRoyalShower()} />
            </motion.section>

            {/* ================= 5. COUNTDOWN TIMER ================= */}
            <section style={{ width: "100%", margin: "0 0 36px 0" }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.35em",
                  color: "#9C7923",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                ✦ Counting Every Auspicious Moment ✦
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  maxWidth: "440px",
                  margin: "0 auto",
                }}
              >
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #E0C77A",
                      padding: "16px 6px",
                      borderRadius: "14px",
                      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.12)",
                    }}
                  >
                    <span
                      className="light-gold-text-shimmer"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "32px",
                        fontWeight: 700,
                        display: "block",
                        lineHeight: 1,
                      }}
                    >
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#786551",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ================= 6. RSVP SECTION ================= */}
            <section
              style={{
                width: "100%",
                background: "linear-gradient(145deg, #FFFFFF 0%, #FCF8ED 100%)",
                border: "1.5px solid #D4AF37",
                padding: "38px 24px",
                boxSizing: "border-box",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.14)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "12px",
                  letterSpacing: "0.35em",
                  color: "#9C7923",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                Honour Us With Your Grace
              </span>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "30px",
                  letterSpacing: "0.15em",
                  color: "#4A3B1C",
                  textTransform: "uppercase",
                  margin: "0 0 25px 0",
                  fontWeight: 700,
                }}
              >
                RSVP & Attendance
              </h2>

              {!isSubmitted ? (
                <form
                  onSubmit={handleRSVP}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    maxWidth: "380px",
                    margin: "0 auto",
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #D9C382",
                      padding: "15px 18px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#3D3222",
                      boxSizing: "border-box",
                      outline: "none",
                      borderRadius: "10px",
                    }}
                  />

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #D9C382",
                      padding: "15px 18px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#3D3222",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                  >
                    <option value="1">1 GUEST ATTENDING</option>
                    <option value="2">2 GUESTS ATTENDING</option>
                    <option value="3">3 GUESTS ATTENDING</option>
                    <option value="Family">ENTIRE FAMILY ATTENDING</option>
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{
                      backgroundColor: "#B88A22",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(184, 138, 34, 0.3)",
                    }}
                  >
                    Confirm Royal Presence
                  </motion.button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <CheckCircle
                    size={40}
                    color="#B88A22"
                    style={{ margin: "0 auto 12px auto" }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "26px",
                      color: "#4A3B1C",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Attendance Confirmed
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "17px",
                      color: "#6E5F50",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    We eagerly await your auspicious presence, {guestName}!
                  </p>
                </div>
              )}
            </section>
          </main>
        </motion.div>
      )}
    </div>
  );
}
