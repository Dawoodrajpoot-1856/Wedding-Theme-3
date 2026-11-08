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
  Heart,
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

    // Golden Silk Foil Texture for Canvas Cover
    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#D4AF37");
    grad.addColorStop(0.3, "#FFF5D1");
    grad.addColorStop(0.6, "#C59B27");
    grad.addColorStop(1, "#E5C158");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Pattern on Scratch surface
    ctx.strokeStyle = "rgba(163, 116, 21, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Text on scratch card
    ctx.font = "bold 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "#4A3B12";
    ctx.textAlign = "center";
    ctx.letterSpacing = "2px";
    ctx.fillText("✧ SCRATCH WITH LOVE ✧", width / 2, height / 2 - 4);
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#695319";
    ctx.fillText(
      "Reveal Ahmad & Hania's Secret Note",
      width / 2,
      height / 2 + 16,
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
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    if (!isScratched) {
      setIsScratched(true);
      if (onRevealed) onRevealed();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        height: "120px",
        margin: "0 auto",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(212, 175, 55, 0.25)",
        border: "1.5px solid #D4AF37",
      }}
    >
      {/* Hidden Message Underneath */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #FFFDF8 0%, #FAF2DE 100%)",
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
            fontSize: "17px",
            color: "#835E12",
            margin: "0 0 2px 0",
            fontWeight: 700,
          }}
        >
          VIP Royal Guest Table Reserved
        </h4>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#6B583E",
            margin: 0,
          }}
        >
          "Your presence is the most cherished gift for our new beginning."
        </p>
      </div>

      {/* Golden Canvas Overlay to be scratched */}
      <canvas
        ref={canvasRef}
        width={320}
        height={120}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
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

// ================= MAIN WEDDING CARD COMPONENT =================
export default function LightRoyalWeddingCard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Audio Reference (public/sajna.mp3)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer
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

  // Shahi Champagne & Rose Gold Petal Shower
  const triggerRoyalShower = () => {
    const colors = ["#E6CA65", "#F7DDB0", "#FFFFFF", "#FAD0C4", "#C5A059"];
    for (let i = 0; i < 75; i++) {
      const petal = document.createElement("div");
      petal.style.position = "fixed";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.top = "-25px";
      petal.style.width = Math.random() * 12 + 8 + "px";
      petal.style.height = Math.random() * 16 + 10 + "px";
      petal.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      petal.style.zIndex = "99999";
      petal.style.pointerEvents = "none";
      petal.style.borderRadius = "80% 0 80% 0";
      petal.style.boxShadow = "0 0 10px rgba(212, 175, 55, 0.4)";
      petal.style.transition =
        "transform 3.5s cubic-bezier(0.2, 0.8, 0.25, 1), opacity 3.5s ease";
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.style.transform = `translate(${
          Math.random() * 200 - 100
        }px, 105vh) rotate(${Math.random() * 720}deg)`;
        petal.style.opacity = "0";
      }, 20);

      setTimeout(() => petal.remove(), 3600);
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
        backgroundColor: "#FAF7F2", // Pure warm ivory
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isUnlocked ? "50px 16px 110px 16px" : "16px",
      }}
    >
      {/* 🎵 Audio File */}
      <audio ref={audioRef} src="/sajna.mp3" loop preload="auto" />

      {/* Google Luxury Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Amiri:wght@700&family=Montserrat:wght@300;400;600&display=swap"
      />

      <style>{`
        @keyframes subtleGoldShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes waxPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(212, 175, 55, 0.4); }
          50% { transform: scale(1.04); box-shadow: 0 0 45px rgba(212, 175, 55, 0.7); }
        }
        .light-gold-shimmer {
          background: linear-gradient(90deg, #9C721D 0%, #E6CA65 30%, #7A550C 50%, #E6CA65 70%, #9C721D 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: subtleGoldShimmer 6s linear infinite;
        }
        .royal-card-shadow {
          box-shadow: 0 25px 70px rgba(184, 148, 86, 0.18), 0 5px 25px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* ================= LIGHT SILK PEARL BACKGROUND ================= */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5EFEB 60%, #EDE4DB 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Elegant Damask Star Pattern */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(197, 160, 89, 0.2) 1.2px, transparent 1.2px)",
          backgroundSize: "36px 36px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 🎶 Floating Floating Music Toggle */}
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
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            cursor: "pointer",
            color: "#4A3B12",
            boxShadow: "0 10px 25px rgba(212, 175, 55, 0.25)",
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

      {/* ================= 1. STARTING SCREEN: ROYAL PEARL ENVELOPE ================= */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.25,
              rotateX: -15,
              filter: "blur(12px)",
              transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              zIndex: 50,
              width: "100%",
              maxWidth: "460px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* The Envelope Card */}
            <div
              className="royal-card-shadow"
              style={{
                width: "100%",
                background: "linear-gradient(145deg, #FFFFFF 0%, #FCF9F3 100%)",
                border: "2px solid #D4AF37",
                borderRadius: "24px",
                padding: "50px 30px",
                boxSizing: "border-box",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Corner Ornaments */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  color: "#C59B27",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  color: "#C59B27",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "14px",
                  color: "#C59B27",
                }}
              >
                ✦
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  right: "14px",
                  color: "#C59B27",
                }}
              >
                ✦
              </div>

              {/* Bismillah */}
              <span
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "24px",
                  color: "#A27B20",
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
                  letterSpacing: "0.4em",
                  color: "#9C7923",
                  textTransform: "uppercase",
                  marginBottom: "26px",
                }}
              >
                Royal Imperial Farman
              </span>

              {/* Gold Wax Stamp */}
              <motion.div
                onClick={handleUnlockPalace}
                style={{
                  width: "105px",
                  height: "105px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #FFF1C5 0%, #E6C25B 50%, #B3861B 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #FFFFFF",
                  cursor: "pointer",
                  animation: "waxPulse 2.8s infinite ease-in-out",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: "44px",
                    color: "#533C08",
                    fontWeight: 700,
                  }}
                >
                  A&H
                </span>
              </motion.div>

              <h2
                className="light-gold-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "52px",
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
                  letterSpacing: "0.25em",
                  color: "#7D6C58",
                  textTransform: "uppercase",
                  margin: "0 0 32px 0",
                  fontWeight: 600,
                }}
              >
                DECEMBER 28, 2025 • LAHORE
              </p>

              {/* Reveal Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlockPalace}
                style={{
                  background:
                    "linear-gradient(135deg, #ECC867 0%, #B88A22 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "50px",
                  padding: "15px 36px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(184, 138, 34, 0.4)",
                }}
              >
                <Sparkles size={16} />
                Open Royal Farman
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE EXPANDING UNFOLDED INVITATION CARD ================= */}
      {isUnlocked && (
        <motion.div
          initial={{
            opacity: 0,
            scaleY: 0.4,
            scaleX: 0.8,
            rotateX: 20,
          }}
          animate={{
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            rotateX: 0,
          }}
          transition={{
            duration: 1.3,
            ease: [0.16, 1, 0.3, 1], // Silk unfolding curve
          }}
          className="royal-card-shadow"
          style={{
            width: "100%",
            maxWidth: "680px",
            backgroundColor: "#FFFDF9",
            border: "2px solid #D4AF37",
            borderRadius: "28px",
            padding: "55px 30px",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
            color: "#3B3226",
            transformOrigin: "top center",
          }}
        >
          {/* Inner Golden Mughal Borders */}
          <div
            style={{
              position: "absolute",
              inset: "12px",
              border: "1.5px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "18px",
              border: "1px dashed rgba(212, 175, 55, 0.25)",
              borderRadius: "16px",
              pointerEvents: "none",
            }}
          />

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
              className="light-gold-shimmer"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "36px",
                marginBottom: "10px",
                fontWeight: 700,
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.div>

            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "12px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#9C7923",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              Under the blessings of Allah Almighty & Parents
            </span>

            {/* Couple Typography */}
            <div style={{ margin: "10px 0 24px 0" }}>
              <h1
                className="light-gold-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(62px, 13vw, 90px)",
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
                  gap: "16px",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    width: "55px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #D4AF37)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "22px",
                    color: "#99731D",
                  }}
                >
                  cordially weds
                </span>
                <span
                  style={{
                    width: "55px",
                    height: "1px",
                    background: "linear-gradient(90deg, #D4AF37, transparent)",
                  }}
                />
              </div>

              <h1
                className="light-gold-shimmer"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(62px, 13vw, 90px)",
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
                fontSize: "17px",
                fontStyle: "italic",
                color: "#5C4F40",
                maxWidth: "480px",
                lineHeight: 1.8,
                margin: "0 0 32px 0",
              }}
            >
              Request the honour of your graceful company and sacred prayers as
              we unite our hearts in the bond of love and faith.
            </p>

            {/* ================= 3. ARCHED VENUE & EVENT SECTION ================= */}
            <section
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #FFF9EB 0%, #FCF5E3 100%)",
                border: "1.5px solid #D4AF37",
                borderRadius: "180px 180px 18px 18px",
                padding: "55px 24px 35px 24px",
                boxSizing: "border-box",
                marginBottom: "35px",
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.12)",
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
                  fontSize: "32px",
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
                  fontSize: "16px",
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
                      fontSize: "20px",
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
                    padding: "13px 28px",
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
                padding: "20px 10px",
                background: "#FAF5E8",
                borderRadius: "18px",
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
                <Gift size={18} color="#B38728" />
                <span
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "12px",
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
                  fontSize: "14px",
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
            <section style={{ width: "100%", margin: "0 0 35px 0" }}>
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
                  maxWidth: "420px",
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
                      padding: "14px 6px",
                      borderRadius: "14px",
                      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.12)",
                    }}
                  >
                    <span
                      className="light-gold-shimmer"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "30px",
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
                background: "linear-gradient(145deg, #FFFFFF 0%, #FDF9EE 100%)",
                border: "1.5px solid #D4AF37",
                padding: "36px 20px",
                boxSizing: "border-box",
                borderRadius: "18px",
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.15)",
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
                  fontSize: "28px",
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
                    maxWidth: "360px",
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
                      padding: "14px 16px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#3D3222",
                      boxSizing: "border-box",
                      outline: "none",
                      borderRadius: "8px",
                    }}
                  />

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #D9C382",
                      padding: "14px 16px",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: "#3D3222",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "8px",
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
                      borderRadius: "8px",
                      padding: "15px 20px",
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
                    size={38}
                    color="#B88A22"
                    style={{ margin: "0 auto 12px auto" }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      color: "#4A3B1C",
                      margin: "0 0 8px 0",
                    }}
                  >
                    Attendance Confirmed
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px",
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
