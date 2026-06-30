import { useState, useMemo, useEffect } from "react";
import { ChevronRight, ChevronDown, X, ArrowLeft, Search, FileText, Download, Moon, Sun } from "lucide-react";
import tdnaLogo from "../assets/tdna_logo.png";
import mrZero from "../assets/mrzero.png";
import { talents } from "../data/talents";
import profileImg from "../assets/profile.jpg";
import reportImage from "../assets/talentdna_results.jpeg";

/* ─────────────────────────── DESIGN TOKENS ─────────────────────────── */
const C = {
  primary:      "#7B5CF5",
  primaryDark:  "#5B3FD4",
  navy:         "#1A1456",
  purpleCard:   "#5C269E",
  purpleLight:  "#A78BFA",
  purpleTint:   "#E8E4FF",
  white:        "#FFFFFF",
  pageBg:       "#F5F4FF",
  textPrimary:  "#273653",
  textSecondary:"#767489",
  mutedText:    "#C4BFFF",
  drive:        "#60A5FA",
  network:      "#FACC15",
  action:       "#F472B6",
};
const FONT_HEAD = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Be Vietnam Pro', sans-serif";

/* ─────────────────────────── DATA ─────────────────────────── */
const DOMAINS = {
  Drive: {
    color: C.drive,
    label: "Drive",
    desc: "Apa yang mendorongmu bergerak dan bertahan.",
    tagline: "Mesin penggerak di balik setiap langkahmu",
    longDesc: "Drive adalah domain yang menjelaskan apa yang membuatmu termotivasi, fokus, dan terus bertahan menghadapi tantangan. Talenta dalam domain ini berbicara tentang energi internal: bagaimana kamu menetapkan target, mempertahankan disiplin, dan mendorong dirimu untuk terus berkembang meski keadaan tidak mudah.",
  },
  Network: {
    color: C.network,
    label: "Network",
    desc: "Bagaimana caramu terhubung dan membangun relasi.",
    tagline: "Cara alami kamu membangun hubungan",
    longDesc: "Network menjelaskan bagaimana kamu terhubung dengan orang lain — caramu membangun kepercayaan, memahami perasaan orang lain, dan menciptakan kolaborasi yang bermakna. Talenta dalam domain ini menunjukkan kekuatan sosial dan emosionalmu dalam berelasi.",
  },
  Action: {
    color: C.action,
    label: "Action",
    desc: "Bagaimana caramu mengeksekusi dan mewujudkan ide.",
    tagline: "Caramu mengubah ide menjadi nyata",
    longDesc: "Action menggambarkan caramu mengeksekusi rencana dan mewujudkan ide menjadi hasil nyata. Talenta dalam domain ini berbicara tentang inisiatif, kecepatan eksekusi, dan kemampuanmu menyelesaikan sesuatu sampai tuntas.",
  },
};
const TALENTS = talents;
const TOP10   = TALENTS.slice(0, 10);
const MID30   = TALENTS.slice(10, 40);
const BOTTOM5 = TALENTS.slice(40, 45);

const USER = { name: "Alisha" };

/* ─────────────────────────── HOOK: desktop detection ─────────────────────────── */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

/* ─────────────────────────── DNA MARK ─────────────────────────── */
function DnaOrbitMark({ size = 100, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ opacity }}>
      <circle cx="60" cy="60" r="58" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke={C.drive}   strokeWidth="2" opacity="0.85"/>
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke={C.network} strokeWidth="2" opacity="0.85" transform="rotate(60 60 60)"/>
      <ellipse cx="60" cy="60" rx="48" ry="20" stroke={C.action}  strokeWidth="2" opacity="0.85" transform="rotate(120 60 60)"/>
      <circle cx="60" cy="60" r="14" fill={C.white}/>
      <circle cx="60" cy="60" r="14" fill={C.primary} opacity="0.25"/>
      <circle cx="108" cy="60" r="5" fill={C.drive}/>
      <circle cx="35" cy="100" r="5" fill={C.network}/>
      <circle cx="35" cy="20"  r="5" fill={C.action}/>
    </svg>
  );
}

/* ─────────────────────────── SECTION LABEL ─────────────────────────── */
function SectionLabel({ children, center }) {
  return (
    <div style={{
      fontFamily: FONT_BODY, fontSize: 11, fontWeight: 700, color: C.primary,
      letterSpacing: 1.2, textTransform: "uppercase",
      textAlign: center ? "center" : "left",
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────── TALENT CARD ─────────────────────────── */
function TalentCard({ talent, onSelect, theme }) {
  const d = DOMAINS[talent.domain];
  return (
    <button
      className="talent-card"
      onClick={() => onSelect(talent)}
      style={{
        display:"flex", flexDirection:"column", gap:8,
        padding:"14px 12px",
        background: theme.surface,
        border:`1px solid ${theme.border}`,
        borderRadius:16,
        cursor:"pointer", textAlign:"left", minWidth:0,
        width:"100%",
        transition:"box-shadow 0.18s, transform 0.18s, border-color 0.18s",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{
          width:26, height:26, borderRadius:8,
          background: d.color+"25", color: d.color,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:11, fontWeight:700, fontFamily:FONT_BODY, flexShrink:0,
        }}>{talent.rank}</span>
        <span style={{ width:8, height:8, borderRadius:4, background:d.color }}/>
      </div>
      <span style={{
        fontFamily:FONT_BODY, fontSize:13.5, fontWeight:600,
        color:theme.textPrimary, lineHeight:1.3,
        overflow:"hidden", textOverflow:"ellipsis",
        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical",
      }}>{talent.name}</span>
      <span style={{ fontFamily:FONT_BODY, fontSize:11, color:theme.textSecondary }}>{d.label}</span>
    </button>
  );
}

/* ─────────────────────────── COLLAPSIBLE TALENT SECTION ─────────────────────────── */
function TalentGridSection({ title, subtitle, talents, defaultOpen, onSelectTalent, cols = 2, theme }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div style={{ background: theme.surface, borderRadius:20, marginBottom:14, overflow:"hidden", border:`1px solid ${theme.border}` }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="section-toggle"
        style={{
          width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"18px 20px", background:isHovered ? theme.sectionHoverBg : "transparent", border:"none", cursor:"pointer", textAlign:"left",
          transition:"background 0.15s",
        }}
      >
        <div>
          <div style={{ fontFamily:FONT_HEAD, fontSize:16, fontWeight:600, color:isHovered ? theme.sectionHoverTitle : theme.textPrimary }}>
            {title}&nbsp;<span style={{ color:theme.textSecondary, fontWeight:500, fontSize:13 }}>({talents.length})</span>
          </div>
          <div style={{ fontFamily:FONT_BODY, fontSize:12.5, color:theme.textSecondary, marginTop:2 }}>{subtitle}</div>
        </div>
        <ChevronDown size={20} color={theme.primary}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.25s", flexShrink:0 }}/>
      </button>
      {open && (
        <div style={{ padding:"0 16px 18px" }}>
          {talents.length === 0 ? (
            <div style={{ textAlign:"center", padding:"20px 10px", color:theme.textSecondary, fontFamily:FONT_BODY, fontSize:13 }}>
              Tidak ada talent yang cocok.
            </div>
          ) : (
            <div className="talent-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:10 }}>
              {talents.map(t => <TalentCard key={t.id} talent={t} onSelect={onSelectTalent} theme={theme}/>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── SEARCH + FILTER ─────────────────────────── */
function SearchFilterBar({ query, onQueryChange, activeDomain, onDomainChange, theme }) {
  const filters = ["All","Drive","Network","Action"];
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{
        display:"flex", alignItems:"center", gap:10,
        background:theme.surface, border:`1px solid ${theme.border}`,
        borderRadius:16, padding:"12px 14px", marginBottom:10,
        transition:"box-shadow 0.15s",
      }}
        onFocus={e => e.currentTarget.style.boxShadow=`0 0 0 3px ${theme.border}`}
        onBlur={e  => e.currentTarget.style.boxShadow="none"}
      >
        <Search size={17} color={theme.textSecondary}/>
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Cari nama talent..."
          style={{ flex:1, border:"none", outline:"none", background:"transparent", fontFamily:FONT_BODY, fontSize:13.5, color:theme.textPrimary }}
        />
        {query && (
          <button onClick={() => onQueryChange("")} style={{ border:"none", background:"transparent", cursor:"pointer", display:"flex" }}>
            <X size={15} color={theme.textSecondary}/>
          </button>
        )}
      </div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
        {filters.map(f => {
          const isActive = activeDomain === f;
          const col = f === "All" ? theme.primary : DOMAINS[f].color;
          return (
            <button key={f} onClick={() => onDomainChange(f)}
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"8px 14px", borderRadius:20,
                border:`1.5px solid ${isActive ? col : theme.border}`,
                background: isActive ? col+"22" : theme.surface,
                color: isActive ? col : theme.textSecondary,
                fontFamily:FONT_BODY, fontSize:12.5, fontWeight:600,
                cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
                transition:"all 0.15s",
              }}
            >
              {f !== "All" && <span style={{ width:7, height:7, borderRadius:4, background:col }}/>}
              {f === "All" ? "Semua Domain" : f}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── TALENT MODAL ─────────────────────────── */

function TalentModal({ talent, onClose, theme }) {
  if (!talent) return null;

  const d = DOMAINS[talent.domain];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,20,86,0.58)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 300,
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 430,
          background: theme.surface,
          borderRadius: 28,
          padding: "26px",
          position: "relative",
          boxShadow: "0 30px 70px rgba(26,20,86,.28)",
          animation: "popIn .25s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            width: 34,
            height: 34,
            borderRadius: 999,
            border: "none",
            background: theme.pageBg,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="modal-close-btn"
        >
          <X size={16} color={theme.textSecondary} />
        </button>

        {/* Domain Icon */}
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            background: `${d.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: d.color,
            }}
          />
        </div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 999,
            background: `${d.color}18`,
            color: d.color,
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          #{talent.rank} • {d.label}
        </div>

        {/* Talent Name */}
        <h2
          style={{
            fontFamily: FONT_HEAD,
            fontSize: 24,
            color: theme.textPrimary,
            margin: 0,
          }}
        >
          {talent.name}
        </h2>

        {/* Translation */}
        <p
          style={{
            marginTop: 6,
            marginBottom: 16,
            color: C.primary,
            fontWeight: 600,
            fontSize: 14,
            fontFamily: FONT_BODY,
          }}
        >
          {talent.translation}
        </p>

        {/* Short Description */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: theme.textPrimary,
            lineHeight: 1.6,
            marginBottom: 12,
            fontFamily: FONT_BODY,
          }}
        >
          {talent.shortDescription}
        </p>

        {/* Full Description */}
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: theme.textSecondary,
            marginBottom: 24,
            fontFamily: FONT_BODY,
          }}
        >
          {talent.description}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 14,
            border: "none",
            background: C.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            transition: ".2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = C.primaryDark)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = C.primary)
          }
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

function MrZeroFloatingButton({ isDesktop }) {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    function handleClickOutside() {
      setShowBubble(false);
    }

    if (showBubble) {
      window.addEventListener("click", handleClickOutside);
    }

    return () =>
      window.removeEventListener("click", handleClickOutside);
  }, [showBubble]);

  return (
    <div
      style={{
        position: "fixed",
        right: isDesktop ? 28 : 18,
        bottom: isDesktop ? 28 : 22,
        zIndex: 999,
      }}
    >
      {/* Bubble */}
      {showBubble && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: 72,
            right: isDesktop ? 20 : 0,

            width: isDesktop ? 260 : 220,

            background:
              "linear-gradient(135deg,#8B5CF6,#7B5CF5)",

            color: "#fff",

            borderRadius: 18,

            padding: "18px",

            boxShadow:
              "0 14px 34px rgba(123,92,245,.35)",

            animation: "fadeIn .25s ease",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 6,
            }}
          >
            AI Coach Mr.Zero
          </div>

          <div
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              opacity: .95,
            }}
          >
            Punya pertanyaan tentang hasil TalentDNA?
            Aku siap membantu menjelaskannya.
          </div>

          <button
  onClick={() => {
    window.open(
      "https://talentdna.me/tdna/lite/0e183ab221d343b9680ffebfeadd6a83d75e662c?ucode=VFp3RENFanYweVhWQmlGRGxtRElYcy9pdXY5SkZEc3JxRUVPb3Zvd0piTGFyUGw5dDhqZEZmbTMzSEtrSkFuVA==",
      "_blank"
    );
  }}
  style={{
    marginTop: 12,
    background: "#fff",
    color: C.primary,
    border: "none",
    borderRadius: 999,
    padding: "8px 14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .2s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(123,92,245,.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
>
  ✨ Mulai Chat
</button>

          {/* Bubble Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              right: 24,

              width: 14,
              height: 14,

              background: "#7B5CF5",

              transform: "rotate(45deg)",

              borderRadius: 2,
            }}
          />
        </div>
      )}

      {/* Avatar */}
      <a
  href="LINK_MRZERO"
  target="_blank"
  rel="noopener noreferrer"

  onClick={(e)=>{
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(!showBubble);
  }}

  style={{
    position:"relative",

    width:isDesktop?62:58,
    height:isDesktop?62:58,

    display:"block",

    animation:"floatingAI 3.5s ease-in-out infinite",

    cursor:"pointer",
  }}
>
        {/* Ring */}
     <div
  style={{
    position:"absolute",

    inset:-4,

    borderRadius:"50%",

    padding:2,

    background:
      "linear-gradient(135deg,#8B5CF6,#A78BFA,#6D4CF5,#8B5CF6)",

    animation:
      "rotateRing 6s linear infinite, pulseGlow 2.2s ease-in-out infinite",
  }}
>

  <div
    style={{
      width:"100%",
      height:"100%",

      borderRadius:"50%",

      background:"#fff",
    }}
  />

</div>

{/* Desktop Label */}
{isDesktop && !showBubble && (
  <div
    style={{
      position: "absolute",

      right: 72,
      top: "50%",

      transform: "translateY(-50%)",

      background: "rgba(255,255,255,.88)",

      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",

      border: `1px solid ${C.purpleTint}`,

      borderRadius: 999,

      padding: "8px 14px",

      boxShadow:
        "0 8px 24px rgba(26,20,86,.10)",

      whiteSpace: "nowrap",

      pointerEvents: "none",

      zIndex: 3,
    }}
  >
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: C.primary,
        lineHeight: 1.15,
      }}
    >
     Mr. Zero
    </div>

    <div
      style={{
        fontSize: 10,
        color: C.textSecondary,
        lineHeight: 1.15,
      }}
    >
      AI Coach
    </div>
  </div>
)}
        {/* Foto */}
       <img
  src={mrZero}
  alt="Mr.Zero"

  style={{

    position:"absolute",

    inset:2,

    width:"calc(100% - 4px)",
    height:"calc(100% - 4px)",

    borderRadius:"50%",

    objectFit:"cover",

    zIndex:2,

    transition:".25s",

    boxShadow:
      "0 12px 30px rgba(123,92,245,.35)",

  }}
/>
      </a>
    </div>
  );
}

/* ─────────────────────────── PDF GENERATOR ─────────────────────────── */
function generatePDFReport(user) {
  const htmlContent = `<!DOCTYPE html>
<html lang="id"><head><meta charset="UTF-8"/>
<title>TalentDNA Report – ${user.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Be Vietnam Pro',sans-serif;background:#fff;color:#273653}
  .page{max-width:800px;margin:0 auto;padding:48px 40px}
  .header{background:linear-gradient(160deg,#1A1456,#5C269E);border-radius:20px;padding:36px;color:#fff;margin-bottom:36px}
  .header-badge{font-size:11px;font-weight:700;color:#C4BFFF;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
  .header h1{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;line-height:1.3;margin-bottom:10px}
  .header p{font-size:13.5px;color:#C4BFFF;line-height:1.6}
  .header-meta{margin-top:20px;font-size:12px;color:#A78BFA}
  .section{margin-bottom:32px}
  .section-label{font-size:10px;font-weight:700;color:#7B5CF5;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
  .section-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;color:#273653;margin-bottom:4px}
  .section-sub{font-size:12.5px;color:#767489;margin-bottom:16px}
  .domain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:32px}
  .domain-card{border-radius:14px;padding:18px}
  .domain-card.Drive{background:#EFF6FF;border:1.5px solid #BFDBFE}
  .domain-card.Network{background:#FEFCE8;border:1.5px solid #FEF08A}
  .domain-card.Action{background:#FDF2F8;border:1.5px solid #FBCFE8}
  .domain-dot{width:13px;height:13px;border-radius:7px;margin-bottom:10px}
  .domain-dot.Drive{background:#60A5FA}
  .domain-dot.Network{background:#FACC15}
  .domain-dot.Action{background:#F472B6}
  .domain-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;color:#273653;margin-bottom:3px}
  .domain-desc{font-size:11px;color:#767489;line-height:1.5}
  .talent-table{width:100%;border-collapse:collapse}
  .talent-table th{font-size:10px;font-weight:700;color:#7B5CF5;text-transform:uppercase;letter-spacing:0.5px;padding:8px 12px;text-align:left;border-bottom:2px solid #E8E4FF}
  .talent-table td{padding:9px 12px;font-size:13px;border-bottom:1px solid #F5F4FF}
  .talent-table tr:last-child td{border-bottom:none}
  .rank-badge{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;font-size:10px;font-weight:700}
  .rank-badge.Drive{background:#DBEAFE;color:#60A5FA}
  .rank-badge.Network{background:#FEF9C3;color:#A16207}
  .rank-badge.Action{background:#FCE7F3;color:#DB2777}
  .domain-tag{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600}
  .domain-tag.Drive{background:#DBEAFE;color:#2563EB}
  .domain-tag.Network{background:#FEF9C3;color:#A16207}
  .domain-tag.Action{background:#FCE7F3;color:#DB2777}
  .bottom-section{background:#F5F4FF;border-radius:16px;padding:20px 24px}
  .footer{margin-top:48px;padding-top:20px;border-top:1px solid #E8E4FF;display:flex;justify-content:space-between;align-items:center}
  .footer-brand{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;color:#7B5CF5}
  .footer-note{font-size:11px;color:#767489}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px 28px}}
</style></head><body><div class="page">
<div class="header">
  <div class="header-badge">Laporan Hasil TalentDNA</div>
  <h1>Peta Talenta<br/>${user.name}</h1>
  <p>45 talenta unik yang mencerminkan pola perilaku alami kamu, terbagi dalam tiga domain utama: Drive, Network, dan Action.</p>
  <div class="header-meta">Tanggal: ${new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})} · Total Talenta: 45</div>
</div>
<div class="section">
  <div class="section-label">Tiga Domain Utama</div>
  <div class="domain-grid">
    ${Object.entries(DOMAINS).map(([k,d])=>`<div class="domain-card ${k}"><div class="domain-dot ${k}"></div><div class="domain-name">${d.label}</div><div class="domain-desc">${d.desc}</div></div>`).join('')}
  </div>
</div>
<div class="section">
  <div class="section-label">Top 10 Talents</div>
  <div class="section-title">Talenta Paling Dominan</div>
  <div class="section-sub">Pola perilaku yang paling kuat muncul secara alami dalam dirimu.</div>
  <table class="talent-table"><thead><tr><th>#</th><th>Nama Talent</th><th>Domain</th><th>Keterangan</th></tr></thead><tbody>
  ${TOP10.map(t=>`<tr><td><span class="rank-badge ${t.domain}">${t.rank}</span></td><td style="font-weight:600;color:#273653">${t.name}</td><td><span class="domain-tag ${t.domain}">${t.domain}</span></td><td style="color:#767489;font-size:12px">Talenta dominan di ranah ${t.domain}.</td></tr>`).join('')}
  </tbody></table>
</div>
<div class="section">
  <div class="section-label">Mid 30 Talents</div>
  <div class="section-title">Talenta Pendukung</div>
  <div class="section-sub">Membentuk gaya dan cara unik kamu dalam berbagai situasi.</div>
  <table class="talent-table"><thead><tr><th>#</th><th>Nama Talent</th><th>Domain</th></tr></thead><tbody>
  ${MID30.map(t=>`<tr><td><span class="rank-badge ${t.domain}">${t.rank}</span></td><td style="font-weight:500;color:#273653">${t.name}</td><td><span class="domain-tag ${t.domain}">${t.domain}</span></td></tr>`).join('')}
  </tbody></table>
</div>
<div class="bottom-section">
  <div class="section-label">Bottom 5 Talents — Area untuk Dikenali</div>
  <table class="talent-table" style="margin-top:10px"><thead><tr><th>#</th><th>Nama Talent</th><th>Domain</th></tr></thead><tbody>
  ${BOTTOM5.map(t=>`<tr><td><span class="rank-badge ${t.domain}">${t.rank}</span></td><td style="font-weight:500;color:#273653">${t.name}</td><td><span class="domain-tag ${t.domain}">${t.domain}</span></td></tr>`).join('')}
  </tbody></table>
</div>
<div class="footer">
  <div class="footer-brand">TalentDNA</div>
  <div class="footer-note">Laporan ini bersifat personal dan tidak untuk dipublikasikan.</div>
</div>
</div></body></html>`;

  const blob = new Blob([htmlContent], { type:"text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (win) win.onload = () => setTimeout(() => win.print(), 500);
}

/* ─────────────────────────── DOWNLOAD BUTTON ─────────────────────────── */
function DownloadReportButton({ user, centered }) {
  const [loading, setLoading] = useState(false);
  const handle = () => {
    setLoading(true);
    setTimeout(() => { generatePDFReport(user); setLoading(false); }, 300);
  };
  return (
    <div style={{ display:"flex", justifyContent: centered ? "center" : "stretch" }}>
      <button
        onClick={handle}
        disabled={loading}
        className="dl-btn"
        style={{
          display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
          padding:"13px 28px",
          background: loading ? C.purpleTint : C.white,
          color: loading ? C.textSecondary : C.primary,
          border:`1.5px solid ${loading ? C.purpleTint : C.purpleLight}`,
          borderRadius:16,
          fontFamily:FONT_BODY, fontWeight:600, fontSize:14,
          cursor: loading ? "not-allowed" : "pointer",
          transition:"all 0.18s",
          width: centered ? "auto" : "100%",
          boxShadow: centered ? "0 4px 16px -6px rgba(123,92,245,0.18)" : "none",
        }}
      >
        {loading ? <Download size={17} color={C.textSecondary}/> : <FileText size={17} color={C.primary}/>}
        {loading ? "Menyiapkan laporan..." : "Download Laporan PDF"}
      </button>
    </div>
  );
}


/* ─────────────────────────── MOBILE: Hero Section ─────────────────────────── */
/* ─────────────────────────── MOBILE: Hero Section ─────────────────────────── */
function MobileHero({ name }) {
  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${C.navy} 0%, #2A1A7A 50%, ${C.purpleCard} 100%)`,
        borderRadius: 24,
        padding: "28px 24px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
        minHeight: 240,
      }}
    >
      {/* Decorative Glows */}
      <div
        style={{
          position: "absolute",
          left: -60,
          top: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.drive}30 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -40,
          bottom: -50,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.action}28 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.network}20 0%, transparent 70%)`,
        }}
      />

      {/* Orbit */}
      <div
        style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.5,
        }}
      >
        <DnaOrbitMark size={145} />
      </div>

      {/* Floating Particles */}
      <div
        style={{
          position: "absolute",
          left: "48%",
          top: 20,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: C.purpleLight,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "75%",
          bottom: 26,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: C.drive,
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "24%",
          bottom: 44,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: C.action,
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 230,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,.10)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 999,
            padding: "5px 12px",
            marginBottom: 16,
            backdropFilter: "blur(10px)",
          }}
        >
          <DnaOrbitMark size={15} opacity={0.9} />

          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: .5,
              color: C.mutedText,
            }}
          >
            TALENT DNA REPORT
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: FONT_HEAD,
            fontSize: 22,
            lineHeight: 1.28,
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 12px",
          }}
        >
          Halo, {name}.<br />

          <span
            style={{
              color: C.purpleLight,
            }}
          >
            Inilah dirimu.
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.65,
            color: C.mutedText,
            margin: 0,
          }}
        >
          45 talenta unik telah dipetakan dari pola perilaku alami kamu, 
          terbagi ke dalam tiga domain utama:
          <span
            style={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {" "}Drive, Network,
          </span>{" "}
          dan
          <span
            style={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {" "}Action.
          </span>
        </p>

        {/* Tidak ada stats di mobile */}
      </div>
    </div>
  );
}
/* ─────────────────────────── DESKTOP: Hero Section ─────────────────────────── */
function DesktopHero({ name }) {
  return (
    <div style={{
      background:`linear-gradient(145deg, ${C.navy} 0%, #2A1A7A 50%, ${C.purpleCard} 100%)`,
      borderRadius:28, padding:"56px 64px",
      marginBottom:40, position:"relative", overflow:"hidden",
      minHeight:280,
    }}>
      {/* Decorative glows */}
      <div style={{ position:"absolute", left:-60,  top:-60,  width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle, ${C.drive}30 0%, transparent 70%)`,    pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:-40, bottom:-60, width:280, height:280, borderRadius:"50%", background:`radial-gradient(circle, ${C.action}28 0%, transparent 70%)`,  pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:"30%", right:"20%", width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${C.network}20 0%, transparent 70%)`, pointerEvents:"none" }}/>

      {/* Orbit decorations */}
      <div style={{ position:"absolute", right:48, top:"50%", transform:"translateY(-50%)", opacity:0.55 }}>
        <DnaOrbitMark size={210}/>
      </div>
      {/* Floating dot accents */}
      <div style={{ position:"absolute", left:"42%", top:24, width:6, height:6, borderRadius:3, background:C.purpleLight, opacity:0.6 }}/>
      <div style={{ position:"absolute", left:"60%", bottom:32, width:5, height:5, borderRadius:3, background:C.drive, opacity:0.5 }}/>
      <div style={{ position:"absolute", left:"25%", bottom:48, width:4, height:4, borderRadius:2, background:C.action, opacity:0.55 }}/>

      <div style={{ position:"relative", zIndex:1, maxWidth:520 }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(255,255,255,0.1)",
          border:"1px solid rgba(255,255,255,0.15)",
          borderRadius:20, padding:"6px 14px",
          marginBottom:20,
        }}>
          <DnaOrbitMark size={18} opacity={0.9}/>
          <span style={{ fontFamily:FONT_BODY, fontSize:12, color:C.mutedText, fontWeight:600, letterSpacing:0.5 }}>
            TALENT DNA REPORT
          </span>
        </div>

        <h1 style={{ fontFamily:FONT_HEAD, fontSize:38, color:C.white, lineHeight:1.25, margin:"0 0 14px", fontWeight:700 }}>
          Halo, {name}.<br/>
          <span style={{ color:C.purpleLight }}>Inilah dirimu.</span>
        </h1>
        <p style={{ fontFamily:FONT_BODY, fontSize:15, color:C.mutedText, lineHeight:1.7, maxWidth:440 }}>
          45 talenta unik telah dipetakan dari pola perilaku alami kamu, 
          terbagi ke dalam tiga domain utama: Drive, Network, dan Action.
        </p>

        {/* Stats row */}
        <div style={{ display:"flex", gap:28, marginTop:28 }}>
          {[["45","Total Talenta"],["3","Domain Utama"],["10","Talent Teratas"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:FONT_HEAD, fontSize:26, fontWeight:700, color:C.white }}>{n}</div>
              <div style={{ fontFamily:FONT_BODY, fontSize:12, color:C.mutedText, marginTop:1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DOMAIN PILL CHIPS ─────────────────────────── */
const DOMAIN_PILL = {
  Drive:   { bg:"#DBEAFE", border:"#BFDBFE", text:"#1D4ED8" },
  Network: { bg:"#FEF9C3", border:"#FDE68A", text:"#92400E" },
  Action:  { bg:"#FCE7F3", border:"#FBCFE8", text:"#9D174D" },
};



/* ─────────────────────────── SHARED: Domain Summary Cards ─────────────────────────── */
function DomainSummaryCards({ onOpenDomain, isDesktop, theme }) {
  return (
    <div style={{ marginBottom: isDesktop ? 44 : 22 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom: isDesktop ? 18 : 12 }}>
        <SectionLabel>Struktur Talentamu</SectionLabel>
        {isDesktop && <div style={{ flex:1, height:1, background:theme.border }}/>}
      </div>
      <div style={{
        display:"grid",
        gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
        gap: isDesktop ? 16 : 12,
      }}>
        {Object.entries(DOMAINS).map(([key, d]) => (
          <div key={key} className="domain-card-desktop" style={{
            background:theme.surface,
            borderRadius: isDesktop ? 22 : 18,
            border:`1px solid ${theme.border}`,
            overflow:"hidden",
            position:"relative",
            transition:"box-shadow 0.2s, transform 0.2s, border-color 0.2s",
          }}>
            {/* Top color stripe */}
            <div style={{ height:3, background:d.color }}/>
            <div style={{ padding: isDesktop ? "20px 22px 22px" : "16px 16px 18px" }}>
              {/* Header: icon + title + desc */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
                <div style={{
                  width:40, height:40, borderRadius:12,
                  background:d.color+"20",
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                }}>
                  <div style={{ width:16, height:16, borderRadius:8, background:d.color }}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:FONT_HEAD, fontWeight:700, fontSize: isDesktop ? 15 : 14, color:theme.textPrimary, marginBottom:3 }}>{d.label}</div>
                  <div style={{ fontFamily:FONT_BODY, fontSize:12, color:theme.textSecondary, lineHeight:1.5 }}>{d.desc}</div>
                </div>
              </div>
              {/* Detail link */}
              <button
                onClick={() => onOpenDomain(key)}
                className="domain-detail-link"
                style={{
                  display:"inline-flex", alignItems:"center", gap:4,
                  background:d.color+"15", border:`1px solid ${d.color}30`,
                  borderRadius:20, padding:"6px 14px",
                  cursor:"pointer", transition:"background 0.15s",
                }}
              >
                <span style={{ fontFamily:FONT_BODY, fontSize:12, fontWeight:600, color:d.color }}>Lihat Detail</span>
                <ChevronRight size={13} color={d.color}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── SHARED: Download CTA Banner ─────────────────────────────────────────────── */
function DownloadBanner({ user, isDesktop }) {

  const handleDownloadImage = () => {

    const link = document.createElement("a");

    link.href = reportImage;

    link.download = "talent-results.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  return (

    <div
      style={{
        marginTop:14,

        borderRadius:28,

        overflow:"hidden",

        background:
          "linear-gradient(135deg,#23186E,#4C2FB6)",

        padding:isDesktop
          ? "34px 40px"
          : "20px 18px",

        position:"relative",
      }}
    >

      <div
        style={{
          display:"flex",

          flexDirection:isDesktop
            ?"row"
            :"column",

          justifyContent:"space-between",

          gap:26,

          alignItems:isDesktop
            ?"center"
            :"stretch",
        }}
      >

        {/* Left */}

        <div>

          <div
            style={{
              fontSize:isDesktop?34:24,

              fontWeight:800,

              color:"#fff",

              marginBottom:10,
            }}
          >
            Simpan Hasil TalentDNA-mu
          </div>

          <div
            style={{
              color:"rgba(255,255,255,.75)",

              maxWidth:320,

              lineHeight:1.6,
            }}
          >
            Laporan lengkap 45 Talenta tersedia
            dalam format PDF maupun Image
            yang siap disimpan dan dibagikan.
          </div>

        </div>

        {/* Buttons */}


<div
  style={{
    display: "flex",
    flexDirection: isDesktop ? "row" : "row",
    gap: 12,
    width: isDesktop ? "auto" : "100%",
  }}
>

  {/* PDF */}

  <button
    onClick={() => generatePDFReport(user)}
    style={{
      width: isDesktop ? 240 : "50%",
      height: isDesktop ? 54 : 46,

      border: "none",

      borderRadius: 16,

      background: "#fff",

      color: C.primary,

      fontWeight: 700,

      fontSize: isDesktop ? 14 : 13,

      cursor: "pointer",

      boxShadow: "0 8px 22px rgba(0,0,0,.08)",
    }}
  >
    {isDesktop ? "Download Laporan PDF" : "PDF"}
  </button>

  {/* IMAGE */}

  <button
    onClick={handleDownloadImage}
    style={{
      width: isDesktop ? 240 : "50%",
      height: isDesktop ? 54 : 46,

      border: "none",

      borderRadius: 16,

      background:
        "linear-gradient(135deg,#9B72FF,#7B5CF5)",

      color: "#fff",

      fontWeight: 700,

      fontSize: isDesktop ? 14 : 13,

      cursor: "pointer",

      boxShadow:
        "0 12px 28px rgba(123,92,245,.35)",
    }}
  >
    {isDesktop ? "Download Image TalentDNA" : "Image"}
  </button>

</div>

      </div>

    </div>

  );

}

/* ─────────────────────────── DOMAIN DETAIL SCREEN ─────────────────────────── */
function DomainDetailScreen({ domainKey, onBack, isDesktop, theme }) {
  const d = DOMAINS[domainKey];
  const talents = TALENTS.filter(t => t.domain === domainKey);
  return (
    <div style={{ minHeight:"100vh", background:theme.pageBg, color:theme.textPrimary }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(145deg, ${C.navy}, ${C.purpleCard})`, padding: isDesktop ? "36px 0 44px" : "22px 20px 30px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, opacity:0.3 }}>
          <DnaOrbitMark size={isDesktop ? 260 : 160}/>
        </div>
        <div style={{ maxWidth:isDesktop ? 960 : "100%", margin:"0 auto", padding: isDesktop ? "0 48px" : "0", position:"relative", zIndex:1 }}>
          <button onClick={onBack} style={{ width:38, height:38, borderRadius:12, border:"none", background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", marginBottom:20, transition:"background 0.15s" }}
            onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseOut={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
          >
            <ArrowLeft size={18} color={C.white}/>
          </button>
          <div style={{ width:52, height:52, borderRadius:16, background:d.color+"30", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
            <div style={{ width:20, height:20, borderRadius:10, background:d.color }}/>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <h1 style={{ fontFamily:FONT_HEAD, fontSize: isDesktop?30:24, color:C.white, margin:"0 0 6px", fontWeight:700 }}>{d.label}</h1>
              <p style={{ fontFamily:FONT_BODY, fontSize: isDesktop?14:13, color:C.mutedText, margin:0 }}>{d.tagline}</p>
            </div>
            <div style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:14, padding:"10px 18px" }}>
              <span style={{ fontFamily:FONT_HEAD, fontSize:22, fontWeight:700, color:C.white }}>{talents.length}</span>
              <span style={{ fontFamily:FONT_BODY, fontSize:12, color:C.mutedText, marginLeft:6 }}>talents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: isDesktop?960:"100%", margin:"0 auto", padding: isDesktop?"36px 48px 56px":"20px 18px 36px" }}>
        <div style={{
          background:theme.surface, borderRadius:18, padding: isDesktop?"24px 28px":"16px 18px",
          border:`1px solid ${theme.border}`, marginBottom: isDesktop?32:22,
        }}>
          <p style={{ fontFamily:FONT_BODY, fontSize: isDesktop?14.5:13.5, lineHeight:1.75, color:theme.textSecondary, margin:0 }}>{d.longDesc}</p>
        </div>
        <SectionLabel>{talents.length} Talent di Domain {d.label}</SectionLabel>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14 }}>
          {talents.map(t => {
            const pill = DOMAIN_PILL[domainKey];
            return (
              <span key={t.id} style={{
                display:"inline-flex", alignItems:"center",
                padding:"6px 14px",
                background: pill.bg,
                border:`1px solid ${pill.border}`,
                borderRadius:20,
                fontFamily:FONT_BODY, fontSize:12.5, fontWeight:600,
                color: pill.text,
                lineHeight:1.4,
                whiteSpace:"nowrap",
              }}>{t.name}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN RESULTS SCREEN ─────────────────────────── */
function ResultsScreen({ user, onOpenDomain, isDesktop, darkMode, setDarkMode, theme }) {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [selectedTalent, setSelectedTalent] = useState(null);

  // SEARCH
  const matches = (t) => {
    const keyword = query.trim().toLowerCase();

    const q =
      keyword === "" ||
      t.name.toLowerCase().includes(keyword) ||
      (t.translation || "").toLowerCase().includes(keyword) ||
      (t.shortDescription || "").toLowerCase().includes(keyword) ||
      (t.description || "").toLowerCase().includes(keyword) ||
      t.domain.toLowerCase().includes(keyword) ||
      t.rank.toString().includes(keyword);

    const d =
      activeDomain === "All" ||
      t.domain === activeDomain;

    return q && d;
  };

  const filteredTop10 = useMemo(
    () => TOP10.filter(matches),
    [query, activeDomain]
  );

  const filteredMid30 = useMemo(
    () => MID30.filter(matches),
    [query, activeDomain]
  );

  const filteredBottom5 = useMemo(
    () => BOTTOM5.filter(matches),
    [query, activeDomain]
  );

  const filteredTalents = useMemo(
    () => TALENTS.filter(matches),
    [query, activeDomain]
  );

  

  const colsMain = isDesktop ? 4 : 2;
  const colsBottom = isDesktop ? 5 : 2;

 return (
  <div
    style={{
      background: theme.pageBg,
      minHeight: "100vh",
      transition: "all .35s ease",
    }}
  >
    <TalentModal
      talent={selectedTalent}
      onClose={() => setSelectedTalent(null)}
      theme={theme}
    />

     {/* ── STICKY NAVBAR ── */}
<div
  style={{
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: theme.navBg,
    backdropFilter: isDesktop ? "blur(14px)" : "none",
    WebkitBackdropFilter: isDesktop ? "blur(14px)" : "none",
    borderBottom: `1px solid ${theme.border}`,
    padding: isDesktop ? "0" : "14px 18px 12px",
  }}
>
  <div
    style={{
      maxWidth: isDesktop ? 960 : "100%",
      margin: "0 auto",
      padding: isDesktop ? "16px 48px" : "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* Logo TalentDNA */}
    <img
      src={tdnaLogo}
      alt="TalentDNA"
      style={{
        height: isDesktop ? 38 : 34,
        width: "auto",
        objectFit: "contain",
      }}
    />

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          width: 40,
          height: 40,
          borderRadius: 999,
          border: `1px solid ${theme.border}`,
          background: theme.surface,
          color: theme.textPrimary,
          cursor: "pointer",
          transition: "all .2s ease",
        }}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
        }}
      >
        <img
          src={profileImg}
          alt="Profile"
          style={{
            width: isDesktop ? 40 : 36,
            height: isDesktop ? 40 : 36,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 6px 16px rgba(123,92,245,.18)",
            flexShrink: 0,
          }}
        />

        {isDesktop && (
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 600,
              color: theme.navText,
            }}
          >
            {user.name}
          </span>
        )}
      </div>
    </div>
  </div>
</div>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        maxWidth: isDesktop ? 960 : "100%",
        margin:"0 auto",
        padding: isDesktop ? "44px 48px 72px" : "20px 18px 44px",
      }}>

        {/* Hero */}
        {isDesktop ? <DesktopHero name={user.name}/> : <MobileHero name={user.name}/>}

        {/* Domain structure */}
        <DomainSummaryCards onOpenDomain={onOpenDomain} isDesktop={isDesktop} theme={theme} />

        {/* Talent explorer */}
        <div style={{ marginBottom: isDesktop ? 20 : 12 }}>
          {isDesktop ? (
            <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:20 }}>
              <SectionLabel>Eksplorasi Talent</SectionLabel>
              <div style={{ flex:1, height:1, background:C.purpleTint }}/>
            </div>
          ) : (
            <div style={{ marginBottom:10 }}>
              <SectionLabel>Eksplorasi Talent</SectionLabel>
            </div>
          )}
          <SearchFilterBar query={query} onQueryChange={setQuery} activeDomain={activeDomain} onDomainChange={setActiveDomain} theme={theme}/>
        </div>

        {query.trim() ? (

  <TalentGridSection
    title={`Hasil Pencarian (${filteredTalents.length})`}
    subtitle="Talent yang sesuai dengan pencarianmu"
    talents={filteredTalents}
    defaultOpen={true}
    onSelectTalent={setSelectedTalent}
    cols={colsMain}
    theme={theme}
  />

) : (

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: isDesktop ? 6 : 0,
    }}
  >

    <TalentGridSection
      title="Top 10 Talents"
      subtitle="Talenta paling dominan dalam dirimu"
      talents={filteredTop10}
      defaultOpen={true}
      onSelectTalent={setSelectedTalent}
      cols={colsMain}
      theme={theme}
    />

    <TalentGridSection
      title="Mid 30 Talents"
      subtitle="Talenta pendukung yang membentuk gaya unikmu"
      talents={filteredMid30}
      defaultOpen={false}
      onSelectTalent={setSelectedTalent}
      cols={colsMain}
      theme={theme}
    />

    <TalentGridSection
      title="Bottom 5 Talents"
      subtitle="Talenta yang perlu kamu sadari"
      talents={filteredBottom5}
      defaultOpen={false}
      onSelectTalent={setSelectedTalent}
      cols={colsBottom}
      theme={theme}
    />

  </div>

)}

                {/* Download CTA */}
        <DownloadBanner
          user={user}
          isDesktop={isDesktop}
        />
      </div>

      <MrZeroFloatingButton
        isDesktop={isDesktop}
      />
  </div>
);
}

/* ─────────────────────────── ROOT ─────────────────────────── */
export default function TalentDNAResults() {
  const [activeDomainView, setActiveDomainView] = useState(null);
  const [selectedTalent,   setSelectedTalent]   = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const isDesktop = useIsDesktop();

  const theme = {
    ...C,
    pageBg: darkMode ? "#0F1428" : C.pageBg,
    white: darkMode ? "#171D34" : "#FFFFFF",
    textPrimary: darkMode ? "#FFFFFF" : C.textPrimary,
    sectionHoverTitle: darkMode ? "#564097" : C.textPrimary,
    textSecondary: darkMode ? "#8288a8" : C.textSecondary,
    purpleTint: darkMode ? "#293152" : C.purpleTint,
    mutedText: darkMode ? "#C9D0F3" : C.mutedText,
    surface: darkMode ? "#161E3F" : "#FFFFFF",
    sectionHoverBg: darkMode ? "rgba(255,255,255,0.08)" : "#FAFAFF",
    navBg: darkMode ? "rgba(15,20,40,0.92)" : "rgba(245,244,255,0.85)",
    navText: darkMode ? "#E3E8FF" : C.textPrimary,
    border: darkMode ? "#2A3153" : C.purpleTint,
  };

  return (
    <div style={{ minHeight:"100vh", background:theme.pageBg, color:theme.textPrimary, fontFamily:FONT_BODY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn  { from{transform:scale(0.93);opacity:0} to{transform:scale(1);opacity:1} }

        * { box-sizing:border-box; }
        body { margin:0; }
        ::-webkit-scrollbar { width:0 }

        /* ── Card hover (desktop only) ── */
        @media (hover:hover) and (pointer:fine) {
          .talent-card:hover {
            box-shadow: 0 8px 28px -8px rgba(123,92,245,0.22);
            transform: translateY(-2px);
            border-color: #C4BFFF !important;
          }
          .domain-card-desktop:hover {
            box-shadow: 0 12px 36px -10px rgba(123,92,245,0.22);
            transform: translateY(-3px);
            border-color: #C4BFFF !important;
          }
          .section-toggle:hover {
            background: #FAFAFF !important;
          }
          .dl-btn:hover {
            background: #EDE9FF !important;
            border-color: #A78BFA !important;
            box-shadow: 0 8px 24px -8px rgba(123,92,245,0.25) !important;
          }
          .modal-close-btn:hover {
            background: #F5F4FF !important;
          }
          .domain-detail-link:hover span {
            opacity: 0.75;
          }
        }
          @keyframes floatingAI{
  0%{
    transform:translateY(0px);
  }

  50%{
    transform:translateY(-8px);
  }

  100%{
    transform:translateY(0px);
  }
}

@keyframes pulseGlow{

  0%{
    box-shadow:
      0 0 0 rgba(123,92,245,0),
      0 0 18px rgba(123,92,245,.18);
  }

  50%{
    box-shadow:
      0 0 24px rgba(123,92,245,.55),
      0 0 60px rgba(123,92,245,.30);
  }

  100%{
    box-shadow:
      0 0 0 rgba(123,92,245,0),
      0 0 18px rgba(123,92,245,.18);
  }

}

@keyframes rotateRing{

  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }

}
      `}</style>

      {activeDomainView ? (
        <DomainDetailScreen
          domainKey={activeDomainView}
          onBack={() => setActiveDomainView(null)}
          onSelectTalent={setSelectedTalent}
          isDesktop={isDesktop}
          theme={theme}
        />
      ) : (
        <ResultsScreen user={USER} onOpenDomain={setActiveDomainView} isDesktop={isDesktop} darkMode={darkMode} setDarkMode={setDarkMode} theme={theme}/>
      )}

      <TalentModal talent={selectedTalent} onClose={() => setSelectedTalent(null)} theme={theme}/>
    </div>
  );
}
