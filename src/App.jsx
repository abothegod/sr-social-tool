import { useState, useEffect } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const CONTENT_TYPES = {
  instagram: { label: "Instagram Post", icon: "📸", color: "#ff40ff" },
  blog:      { label: "Blog Article",   icon: "✍️",  color: "#00e5ff" },
  email:     { label: "Email Campaign", icon: "📧",  color: "#ffaa00" },
};

const AURAS = {
  education: { label: "Education", icon: "🔬", desc: "Informative & mind-expanding", color: "#00e5ff", glow: "0 0 18px #00e5ff55" },
  promotion: { label: "Promotion", icon: "🔥", desc: "Deals, drops & conversions",   color: "#ff40ff", glow: "0 0 18px #ff40ff55" },
  mystical:  { label: "Mystical",  icon: "🍄", desc: "Spiritual & transcendent",      color: "#50ff50", glow: "0 0 18px #50ff5055" },
};

const DESIGNS = {
  cosmic:   { label: "🌌 Cosmic Void",  accent: "#bf7fff" },
  forest:   { label: "🌿 Neon Forest",  accent: "#50ff50" },
  abstract: { label: "⬡ Fractal Flux", accent: "#ff8040" },
  ocean:    { label: "🌊 Neon Depths",  accent: "#00e5ff" },
};

const QUICK_TOPICS = {
  education: ["Benefits of microdosing", "Psilocybin & the brain", "Mushroom species spotlight", "Safe set & setting", "History of psilocybin"],
  promotion: ["Flash sale announcement", "New product launch", "Free mystery gift", "Best seller spotlight", "Bundle deal"],
  mystical:  ["Inner journey ritual", "Ego dissolution wisdom", "Mycelium connection", "Sacred ceremony", "Consciousness expansion"],
};

// ─── COPY HELPER ─────────────────────────────────────────────────────────────

function copyText(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

// ─── UI ATOMS ─────────────────────────────────────────────────────────────────

function CopyBtn({ text, color }) {
  const [done, setDone] = useState(false);
  const go = () => { copyText(text); setDone(true); setTimeout(() => setDone(false), 2000); };
  return (
    <button onClick={go} style={{
      background: done ? `${color}33` : "#1a1a2a",
      border: `1px solid ${done ? color : "#333"}`,
      borderRadius: 4, color: done ? color : "#aaa",
      padding: "5px 14px", cursor: "pointer", fontSize: 12,
      fontFamily: "monospace", transition: "all 0.2s", whiteSpace: "nowrap",
      boxShadow: done ? `0 0 8px ${color}66` : "none", fontWeight: done ? 700 : 400,
    }}>{done ? "✓ Copied!" : "Copy"}</button>
  );
}

function TextBlock({ label, content, color }) {
  if (!content) return null;
  return (
    <div style={{ background: "#10101a", border: `1px solid ${color}35`, borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.18em", color, fontFamily: "monospace", fontWeight: 700 }}>{label}</span>
        <CopyBtn text={content} color={color} />
      </div>
      <div style={{ color: "#e2e2e2", fontSize: 13, lineHeight: 1.9, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{content}</div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: "#0c0c18", border: "1px solid #252535", borderRadius: 8, padding: 18, ...style }}>{children}</div>;
}

function SLabel({ children }) {
  return <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.28em", fontFamily: "monospace", marginBottom: 12, fontWeight: 700 }}>{children}</div>;
}

function TabBtn({ active, color, glow, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `${color}1a` : "transparent",
      border: `1px solid ${active ? color : "transparent"}`,
      borderRadius: 6, color: active ? color : "#777",
      padding: "9px 18px", cursor: "pointer", fontFamily: "monospace",
      fontSize: 12, fontWeight: active ? 700 : 400, letterSpacing: "0.1em",
      transition: "all 0.2s", boxShadow: active ? glow : "none",
    }}>{children}</button>
  );
}

function EmptyState({ color }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#444" }}>
      <div style={{ fontSize: 52, marginBottom: 16, display: "inline-block", animation: "float 3s ease-in-out infinite" }}>🍄</div>
      <div style={{ fontSize: 13, fontFamily: "monospace", lineHeight: 1.8, color: "#555" }}>
        Configure your settings on the left<br />and hit <span style={{ color }}>Generate</span> to create content
      </div>
    </div>
  );
}

// ─── INSTAGRAM PREVIEW ────────────────────────────────────────────────────────

function IGPreview({ result, aura, design }) {
  const ac = AURAS[aura];
  const dc = DESIGNS[design];
  return (
    <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden", boxShadow: `0 4px 40px ${ac.color}15` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px", borderBottom: "1px solid #222" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: `conic-gradient(${ac.color}, #ff40ff, #ff8040, ${ac.color})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#161616", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🍄</div>
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "sans-serif" }}>shroomroom.ca</div>
          <div style={{ color: "#777", fontSize: 11, fontFamily: "sans-serif" }}>Canada · Sponsored</div>
        </div>
        <div style={{ marginLeft: "auto", color: "#777", fontSize: 22 }}>···</div>
      </div>
      {/* Stylized image placeholder */}
      <div style={{ width: "100%", aspectRatio: "1/1", background: "linear-gradient(135deg, #0d0020, #000d1a, #001a0d)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${ac.color}22 0%, transparent 70%)`, top: "5%", left: "15%" }} />
        <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${dc.accent}20 0%, transparent 70%)`, bottom: "10%", right: "10%" }} />
        <div style={{ position: "absolute", fontSize: 90, opacity: 0.08 }}>🍄</div>
        <div style={{ position: "relative", textAlign: "center", padding: "0 24px" }}>
          <div style={{ color: ac.color, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.35em", marginBottom: 10, textShadow: ac.glow }}>SHROOMROOM.CA</div>
          {result?.seoTitle
            ? <div style={{ color: "#fff", fontSize: 14, fontFamily: "monospace", fontWeight: 700, lineHeight: 1.45, maxWidth: 240 }}>{result.seoTitle}</div>
            : <div style={{ color: "#333", fontSize: 12, fontFamily: "monospace" }}>Your image here</div>}
        </div>
      </div>
      <div style={{ padding: "13px 16px" }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>♡</span><span style={{ fontSize: 22 }}>💬</span><span style={{ fontSize: 22 }}>⇥</span>
          <span style={{ fontSize: 22, marginLeft: "auto" }}>🔖</span>
        </div>
        <div style={{ color: "#ddd", fontSize: 13, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 700 }}>2,847 likes</div>
        {result?.caption
          ? <div style={{ color: "#ccc", fontSize: 12, lineHeight: 1.65, fontFamily: "sans-serif" }}><strong style={{ color: "#fff" }}>shroomroom.ca </strong>{result.caption.slice(0, 130)}<span style={{ color: "#555" }}>… more</span></div>
          : <div style={{ color: "#444", fontSize: 12, fontFamily: "sans-serif", fontStyle: "italic" }}>Caption will appear here…</div>}
        {result?.hashtags?.length > 0 && (
          <div style={{ marginTop: 8, fontSize: 12, color: ac.color, fontFamily: "sans-serif" }}>
            {result.hashtags.slice(0, 5).map(h => `#${h}`).join(" ")} <span style={{ color: "#555" }}>…</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EMAIL PREVIEW ────────────────────────────────────────────────────────────

function EmailPreview({ result, aura }) {
  const ac = AURAS[aura];
  if (!result) return <EmptyState color={ac.color} />;
  return (
    <div style={{ background: "#0f0f1a", border: "1px solid #252535", borderRadius: 10, overflow: "hidden", fontFamily: "sans-serif" }}>
      {/* Email header */}
      <div style={{ background: `linear-gradient(135deg, #0d0020, #000d1a)`, padding: "28px 28px 20px", borderBottom: "1px solid #1a1a2a", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${ac.color}18 0%, transparent 70%)`, top: "-50%", left: "20%" }} />
        <div style={{ position: "relative" }}>
          <div style={{ color: ac.color, fontSize: 10, letterSpacing: "0.35em", marginBottom: 8, fontFamily: "monospace" }}>SHROOMROOM.CA</div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>{result.emailSubject || "Email Subject"}</div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 8 }}>{result.preheader}</div>
        </div>
      </div>
      {/* Email body */}
      <div style={{ padding: "24px 28px" }}>
        <div style={{ color: "#ddd", fontSize: 13, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
          {result.emailBody ? result.emailBody.slice(0, 400) + "…" : ""}
        </div>
        {result.ctaText && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div style={{ display: "inline-block", background: ac.color, color: "#000", padding: "12px 32px", borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: "0.05em" }}>
              {result.ctaText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BLOG PREVIEW ─────────────────────────────────────────────────────────────

function BlogPreview({ result, aura }) {
  const ac = AURAS[aura];
  if (!result) return <EmptyState color={ac.color} />;
  return (
    <div style={{ background: "#0f0f1a", border: "1px solid #252535", borderRadius: 10, overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #0d0020, #000d1a)", padding: "32px 32px 24px", borderBottom: "1px solid #1a1a2a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${ac.color}14 0%, transparent 70%)`, top: "-30%", right: "-5%" }} />
        <div style={{ position: "relative" }}>
          {result.blogCategory && <div style={{ color: ac.color, fontSize: 10, letterSpacing: "0.3em", marginBottom: 10, fontFamily: "monospace" }}>{result.blogCategory.toUpperCase()}</div>}
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.35, marginBottom: 12 }}>{result.blogTitle}</div>
          <div style={{ color: "#aaa", fontSize: 13, lineHeight: 1.6 }}>{result.metaDescription}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
            <span style={{ color: "#666", fontSize: 11 }}>shroomroom.ca</span>
            <span style={{ color: "#666", fontSize: 11 }}>· {result.readTime || "5 min read"}</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "24px 32px" }}>
        <div style={{ color: "#ddd", fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
          {result.blogIntro ? result.blogIntro.slice(0, 450) + "…" : ""}
        </div>
      </div>
    </div>
  );
}

// ─── BUSINESS DETAILS ────────────────────────────────────────────────────────

const BRAND_CONTEXT = `
BUSINESS DETAILS — always weave these naturally into content where relevant:
- Name: Shroom Room | Website: shroomroom.ca
- Products: Dry mushrooms, capsules, chocolates, gummies, weed
- Service area: Local delivery in GTA (Greater Toronto Area), Toronto, Ontario. Ships across all of Canada.
- Delivery pricing:
    • Orders UNDER $100 → $20 flat delivery fee
    • Orders $100 or MORE → FREE mystery gift included
    • Orders $200 or MORE → FREE product of customer's choice (any item they want)
- New customer promo: Use code NEWB20 for 20% off first order
- Brand voice: Trippy, neon psychedelic, mystical, community-driven, professional, trustworthy
- Always link back to shroomroom.ca in CTAs
`;

// ─── SYSTEM PROMPTS ───────────────────────────────────────────────────────────

function buildPrompt(contentType, aura, design, topic) {
  const ac = AURAS[aura];
  const dc = DESIGNS[design];

  const imagePromptInstruction = `"imagePrompts": [
    {
      "label": "Hero Banner",
      "prompt": "A bold presentation-style graphic: dark neon background, large centered text overlay reading '[POST TITLE]' in glowing ${ac.color} neon font, dramatic ${dc.label} psychedelic mushroom illustration filling the lower two-thirds, particle effects and light streaks, professional Instagram post design, 1080x1080px"
    },
    {
      "label": "Carousel Slide",
      "prompt": "Split-panel layout: left half shows a glowing neon ${dc.label} mushroom close-up, right half has dark background with bold headline text in ${ac.color}, subheadline in white, shroomroom.ca logo at bottom, clean editorial magazine aesthetic, trippy neon accents"
    },
    {
      "label": "Story Format",
      "prompt": "Vertical 9:16 presentation graphic: full bleed ${dc.label} neon mushroom illustration with heavy color grading, bold white text at top third, semi-transparent dark overlay for readability, animated-looking swirl effects, shroomroom.ca watermark, Instagram story dimensions"
    },
    {
      "label": "Minimalist Square",
      "prompt": "Dark minimalist square post: centered oversized glowing ${dc.label} mushroom icon, single-line neon headline in ${ac.color}, subtle grid lines in background, clean white body text, shroomroom.ca footer, feels like a premium brand ad"
    }
  ]`;

  if (contentType === "instagram") {
    return {
      sys: `You are an expert Instagram content creator and SEO strategist for Shroom Room (shroomroom.ca), a premium Canadian psilocybin & magic mushroom online dispensary.

${BRAND_CONTEXT}

Return ONLY a valid JSON object. No markdown, no backticks. Start with { end with }.

{
  "seoTitle": "max 60 char SEO-optimized title",
  "caption": "200-260 word emoji-rich Instagram caption with strong hook, value, naturally mention relevant delivery perks or promos if fitting, clear CTA mentioning shroomroom.ca",
  "hashtags": ["28 hashtag strings no # symbol, mix niche and broad, include Toronto/Canada/GTA tags"],
  "altText": "1-2 sentence image alt text for accessibility",
  "seoKeywords": ["8 SEO keyword strings"],
  ${imagePromptInstruction}
}`,
      usr: `Aura: ${aura} — ${ac.desc}\nDesign Theme: ${dc.label}\nTopic: ${topic}\nTone: ${aura === "education" ? "informative, scientific yet psychedelic" : aura === "promotion" ? "exciting, urgent, FOMO-driven — highlight the delivery perks and free gifts as incentives" : "mystical, poetic, spiritual"}`
    };
  }

  if (contentType === "blog") {
    return {
      sys: `You are an SEO content strategist and writer for Shroom Room (shroomroom.ca), a premium Canadian psilocybin & magic mushroom online dispensary.

${BRAND_CONTEXT}

Return ONLY a valid JSON object. No markdown, no backticks. Start with { end with }.

{
  "blogTitle": "SEO-optimized compelling blog title",
  "blogCategory": "category label e.g. Education, Wellness, Culture",
  "metaDescription": "150-160 char SEO meta description mentioning Canada or Toronto where relevant",
  "readTime": "e.g. 6 min read",
  "blogIntro": "Compelling 150-word blog introduction with hook",
  "blogOutline": ["Array of 6-8 H2 section headings for the full article"],
  "blogBody": "Full 500-600 word article body with clear sections, expert insights, and a natural CTA for shroomroom.ca mentioning delivery options or offers where appropriate",
  "seoKeywords": ["10 target SEO keyword strings, include local Toronto/GTA/Canada keywords"],
  "internalLinks": ["3-4 suggested internal link anchor texts"],
  "metaTags": ["8 meta tag strings"],
  ${imagePromptInstruction}
}`,
      usr: `Aura: ${aura} — ${ac.desc}\nDesign Theme: ${dc.label}\nTopic: ${topic}\nTone: ${aura === "education" ? "educational, authoritative, research-backed" : aura === "promotion" ? "benefit-focused, conversion-oriented — weave in delivery perks and free gift tiers as conversion hooks" : "spiritual, experiential, introspective"}`
    };
  }

  if (contentType === "email") {
    return {
      sys: `You are an expert email marketing strategist for Shroom Room (shroomroom.ca), a premium Canadian psilocybin & magic mushroom online dispensary.

${BRAND_CONTEXT}

Return ONLY a valid JSON object. No markdown, no backticks. Start with { end with }.

{
  "emailSubject": "High open-rate email subject line under 50 chars",
  "preheader": "Preview text under 90 chars that complements the subject",
  "emailBody": "350-450 word email body: warm greeting, engaging story or value, naturally highlight delivery perks (free mystery gift $100+, free product choice $200+, $20 delivery under $100, code NEWB20 for new customers) where relevant, personal tone, ends with strong CTA to shroomroom.ca",
  "ctaText": "Call-to-action button text under 30 chars",
  "ctaUrl": "shroomroom.ca/shop",
  "subjectLineVariants": ["3 alternative subject line options"],
  "segmentTip": "1-sentence tip on which customer segment this email suits best",
  "seoKeywords": ["6 keyword strings relevant to this email"],
  ${imagePromptInstruction}
}`,
      usr: `Aura: ${aura} — ${ac.desc}\nDesign Theme: ${dc.label}\nTopic: ${topic}\nTone: ${aura === "education" ? "informative, helpful, expert" : aura === "promotion" ? "urgent, exciting, exclusive — lead with the free gift/product tiers and NEWB20 promo as the hook" : "warm, spiritual, community-first"}`
    };
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function ShroomRoomStudio() {
  const [contentType, setContentType] = useState("instagram");
  const [aura,        setAura]        = useState("education");
  const [design,      setDesign]      = useState("cosmic");
  const [topic,       setTopic]       = useState("");
  const [writing,     setWriting]     = useState(false);
  const [result,      setResult]      = useState(null);
  const [error,       setError]       = useState(null);
  const [tab,         setTab]         = useState("preview");
  const [mainTab,     setMainTab]     = useState("create");
  const [saved,       setSaved]       = useState([]);

  const ac = AURAS[aura];
  const dc = DESIGNS[design];
  const ct = CONTENT_TYPES[contentType];

  // Active accent: blend content type color + aura color
  const accentColor = ct.color;

  useEffect(() => {
    setTab("preview");
    setResult(null);
  }, [contentType]);

  useEffect(() => {
    try { const s = sessionStorage.getItem("sr_saved_v2"); if (s) setSaved(JSON.parse(s)); } catch {}
  }, []);

  const persist = (posts) => {
    setSaved(posts);
    try { sessionStorage.setItem("sr_saved_v2", JSON.stringify(posts)); } catch {}
  };

  const generate = async () => {
    if (!topic.trim() || writing) return;
    setWriting(true); setError(null); setResult(null); setTab("preview");

    const { sys, usr } = buildPrompt(contentType, aura, design, topic);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
          },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 4096, system: sys, messages: [{ role: "user", content: usr }] }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found in response");
      setResult(JSON.parse(match[0]));
    } catch (err) {
      setError(err.message);
    } finally {
      setWriting(false);
    }
  };

  const savePost = () => {
    if (!result) return;
    const p = { contentType, aura, design, topic, result, at: new Date().toLocaleString() };
    persist([p, ...saved].slice(0, 15));
  };

  const loadPost = (p) => {
    setContentType(p.contentType); setAura(p.aura); setDesign(p.design);
    setTopic(p.topic); setResult(p.result);
    setMainTab("create"); setTab("preview");
  };

  // Tabs per content type
  const tabSets = {
    instagram: [["preview","📱 Preview"],["caption","📝 Caption"],["hashtags","# Hashtags"],["images","🎨 Image Prompts"],["seo","⬡ SEO"]],
    blog:      [["preview","📄 Preview"],["article","✍️ Article"],["outline","🗂 Outline"],["images","🎨 Image Prompts"],["seo","⬡ SEO"]],
    email:     [["preview","📧 Preview"],["copy","📝 Copy"],["variants","💡 Variants"],["images","🎨 Image Prompts"],["seo","⬡ SEO"]],
  };

  const fullIGText = result ? `${result.caption}\n\n${"#" + result.hashtags?.join(" #")}` : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        textarea{outline:none!important;resize:vertical;}
        textarea::placeholder{color:#555;font-family:monospace;font-size:12px;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
        @keyframes dot{0%,100%{transform:scale(.7);opacity:.3}50%{transform:scale(1.2);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      `}</style>

      <div style={{ minHeight: "100vh", background: "#07070f", fontFamily: "'Space Mono', monospace" }}>

        {/* Ambient */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-30%", left: "-20%", width: "70%", height: "70%", background: `radial-gradient(circle, ${accentColor}07 0%, transparent 65%)`, transition: "background 1s" }} />
          <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "50%", background: `radial-gradient(circle, ${dc.accent}05 0%, transparent 65%)`, transition: "background 1s" }} />
        </div>

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 20px", position: "relative", zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.45em", color: accentColor, marginBottom: 8, fontFamily: "monospace", transition: "color 0.5s" }}>✦ SHROOMROOM.CA ✦</div>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 900, color: "#fff" }}>
              CONTENT <span style={{ color: accentColor, transition: "color 0.5s" }}>STUDIO</span>
            </h1>
            <p style={{ color: "#666", fontSize: 12, letterSpacing: "0.18em", marginTop: 8, fontFamily: "monospace" }}>
              Instagram · Blog · Email · SEO · Image Prompts
            </p>

            {/* Main tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
              {[["create","⬡  Create"], ["saved",`⊹  Saved (${saved.length})`]].map(([k, l]) => (
                <button key={k} onClick={() => setMainTab(k)} style={{
                  background: mainTab===k ? `${accentColor}22` : "#0c0c18",
                  border: `1px solid ${mainTab===k ? accentColor : "#2a2a3a"}`,
                  borderRadius: 6, color: mainTab===k ? accentColor : "#888",
                  padding: "9px 24px", cursor: "pointer", fontFamily: "monospace",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", transition: "all 0.2s",
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* ── SAVED ── */}
          {mainTab === "saved" && (
            <div style={{ maxWidth: 620, margin: "0 auto", animation: "fadeUp 0.3s ease" }}>
              {saved.length === 0
                ? <div style={{ textAlign: "center", color: "#555", fontSize: 14, padding: "70px 0", fontFamily: "monospace" }}>No saved content yet — generate and save something!</div>
                : saved.map((p, i) => {
                  const pct = CONTENT_TYPES[p.contentType];
                  const pac = AURAS[p.aura];
                  return (
                    <div key={i} onClick={() => loadPost(p)} style={{
                      background: "#0c0c18", border: "1px solid #252535", borderRadius: 9,
                      padding: "14px 18px", cursor: "pointer", marginBottom: 10,
                      display: "flex", gap: 14, alignItems: "center", transition: "border-color 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = pct.color}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#252535"}
                    >
                      <div style={{ width: 46, height: 46, borderRadius: 8, background: `${pct.color}15`, border: `1px solid ${pct.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{pct.icon}</div>
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <div style={{ color: "#666", fontSize: 10, fontFamily: "monospace", marginBottom: 4, letterSpacing: "0.08em" }}>{pct.label.toUpperCase()} · {p.aura.toUpperCase()} · {p.design.toUpperCase()}</div>
                        <div style={{ color: "#ddd", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace", fontWeight: 700 }}>{p.topic}</div>
                        <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginTop: 4 }}>{p.at}</div>
                      </div>
                      <span style={{ color: pct.color, fontSize: 22 }}>↗</span>
                    </div>
                  );
                })}
            </div>
          )}

          {/* ── CREATE ── */}
          {mainTab === "create" && (
            <div style={{ display: "grid", gridTemplateColumns: "285px 1fr", gap: 20, alignItems: "start" }}>

              {/* LEFT PANEL */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* CONTENT TYPE */}
                <Card>
                  <SLabel>◈  CONTENT TYPE</SLabel>
                  {Object.entries(CONTENT_TYPES).map(([k, v]) => (
                    <div key={k} onClick={() => setContentType(k)} style={{
                      background: contentType===k ? `${v.color}18` : "#0a0a15",
                      border: `1px solid ${contentType===k ? v.color : "#222"}`,
                      borderRadius: 7, padding: "11px 15px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                      transition: "all 0.2s", boxShadow: contentType===k ? `0 0 16px ${v.color}44` : "none",
                    }}>
                      <span style={{ fontSize: 22 }}>{v.icon}</span>
                      <div style={{ color: contentType===k ? v.color : "#ccc", fontSize: 13, fontFamily: "monospace", fontWeight: 700, transition: "color 0.2s" }}>{v.label}</div>
                    </div>
                  ))}
                </Card>

                {/* AURA */}
                <Card>
                  <SLabel>◈  AURA / VIBE</SLabel>
                  {Object.entries(AURAS).map(([k, v]) => (
                    <div key={k} onClick={() => setAura(k)} style={{
                      background: aura===k ? `${v.color}15` : "#0a0a15",
                      border: `1px solid ${aura===k ? v.color : "#222"}`,
                      borderRadius: 7, padding: "11px 14px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                      transition: "all 0.2s", boxShadow: aura===k ? v.glow : "none",
                    }}>
                      <span style={{ fontSize: 22 }}>{v.icon}</span>
                      <div>
                        <div style={{ color: aura===k ? v.color : "#ccc", fontSize: 13, fontFamily: "monospace", fontWeight: 700, transition: "color 0.2s" }}>{v.label}</div>
                        <div style={{ color: "#777", fontSize: 11, marginTop: 2, fontFamily: "monospace" }}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>

                {/* DESIGN */}
                <Card>
                  <SLabel>◈  VISUAL THEME</SLabel>
                  {Object.entries(DESIGNS).map(([k, v]) => (
                    <div key={k} onClick={() => setDesign(k)} style={{
                      background: design===k ? `${v.accent}18` : "#0a0a15",
                      border: `1px solid ${design===k ? v.accent : "#222"}`,
                      borderRadius: 6, padding: "11px 14px", cursor: "pointer", marginBottom: 7,
                      color: design===k ? v.accent : "#bbb", fontSize: 13, fontFamily: "monospace",
                      fontWeight: design===k ? 700 : 400, transition: "all 0.2s",
                      boxShadow: design===k ? `0 0 12px ${v.accent}44` : "none",
                    }}>{v.label}</div>
                  ))}
                </Card>

                {/* TOPIC */}
                <Card>
                  <SLabel>◈  TOPIC / BRIEF</SLabel>
                  <textarea value={topic} onChange={e => setTopic(e.target.value)}
                    placeholder={contentType === "blog" ? "Blog topic e.g. 'How microdosing improves creativity'" : contentType === "email" ? "Email topic e.g. 'Weekly sale — 20% off everything'" : "Post topic e.g. 'Benefits of microdosing for focus'"}
                    rows={3}
                    style={{ width: "100%", background: "#07070f", border: `1px solid ${topic ? accentColor+"66" : "#252535"}`, borderRadius: 6, color: "#e8e8e8", padding: "11px 13px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.75, transition: "border-color 0.2s" }}
                  />
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace", marginBottom: 7 }}>Quick select:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {QUICK_TOPICS[aura].map((t, i) => (
                        <div key={i} onClick={() => setTopic(t)} style={{
                          background: "#0f0f20", border: `1px solid ${accentColor}40`,
                          borderRadius: 5, color: accentColor, padding: "5px 10px",
                          fontSize: 11, cursor: "pointer", fontFamily: "monospace", transition: "background 0.15s",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = `${accentColor}22`}
                          onMouseLeave={e => e.currentTarget.style.background = "#0f0f20"}
                        >{t}</div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* GENERATE */}
                <button onClick={generate} disabled={writing || !topic.trim()} style={{
                  background: writing || !topic.trim() ? "#0a0a15" : `${accentColor}20`,
                  border: `2px solid ${writing || !topic.trim() ? "#333" : accentColor}`,
                  borderRadius: 8, color: !topic.trim() ? "#555" : accentColor,
                  padding: "17px 0", cursor: writing || !topic.trim() ? "not-allowed" : "pointer",
                  fontFamily: "'Orbitron', monospace", fontSize: 12, letterSpacing: "0.2em", fontWeight: 900,
                  boxShadow: writing || !topic.trim() ? "none" : `0 0 20px ${accentColor}55`,
                  transition: "all 0.3s", width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                }}>
                  {writing
                    ? <>{[0,1,2].map(i => <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:accentColor, animation:`dot 1.2s ease ${i*0.2}s infinite` }} />)} GENERATING…</>
                    : `⬡  GENERATE ${ct.label.toUpperCase()}`
                  }
                </button>

                {error && (
                  <div style={{ background: "#200a0a", border: "1px solid #ff4a4a55", borderRadius: 7, padding: "13px 15px", color: "#ff7070", fontSize: 12, lineHeight: 1.65, fontFamily: "monospace" }}>
                    ⚠ {error}
                  </div>
                )}
              </div>

              {/* RIGHT PANEL */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Sub-tabs */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderBottom: "1px solid #1e1e2e", paddingBottom: 14 }}>
                  {tabSets[contentType].map(([k, l]) => (
                    <TabBtn key={k} active={tab===k} color={accentColor} glow={`0 0 12px ${accentColor}55`} onClick={() => setTab(k)}>{l}</TabBtn>
                  ))}
                </div>

                {/* ════ INSTAGRAM TABS ════ */}

                {contentType === "instagram" && tab === "preview" && (
                  <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
                    <IGPreview result={result} aura={aura} design={design} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {result?.seoTitle && (
                        <Card>
                          <SLabel>◈  SEO TITLE</SLabel>
                          <div style={{ color: dc.accent, fontSize: 15, fontFamily: "monospace", fontWeight: 700, lineHeight: 1.5, marginBottom: 12 }}>{result.seoTitle}</div>
                          <CopyBtn text={result.seoTitle} color={dc.accent} />
                        </Card>
                      )}
                      {result && (
                        <Card>
                          <SLabel>◈  POST STATS</SLabel>
                          {[
                            { label: "Caption words", value: result.caption?.split(/\s+/).length ?? 0, color: ac.color },
                            { label: "Hashtags",      value: result.hashtags?.length ?? 0,             color: ac.color },
                            { label: "SEO keywords",  value: result.seoKeywords?.length ?? 0,          color: dc.accent },
                          ].map(({ label, value, color }, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid #1a1a28" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <span style={{ fontSize: 14, color, fontFamily: "monospace", fontWeight: 700 }}>{value}</span>
                            </div>
                          ))}
                        </Card>
                      )}
                      {result && (
                        <Card>
                          <SLabel>◈  COPY & EXPORT</SLabel>
                          {[
                            { label: "Caption only",       text: result.caption },
                            { label: "Hashtags only",      text: "#" + result.hashtags?.join(" #") },
                            { label: "Caption + Hashtags", text: fullIGText },
                            { label: "Alt Text",           text: result.altText },
                            { label: "SEO Keywords",       text: result.seoKeywords?.join(", ") },
                          ].map(({ label, text }, i, arr) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length-1 ? "1px solid #1e1e2e" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <CopyBtn text={text} color={ac.color} />
                            </div>
                          ))}
                          <button onClick={savePost} style={{ width: "100%", background: "transparent", border: `1px solid ${ac.color}55`, borderRadius: 5, color: ac.color, padding: "10px 0", cursor: "pointer", fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginTop: 12, letterSpacing: "0.12em", transition: "all 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = `${ac.color}18`}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >⊹  Save to Library</button>
                        </Card>
                      )}
                      {!result && <EmptyState color={ac.color} />}
                    </div>
                  </div>
                )}

                {contentType === "instagram" && tab === "caption" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  SEO TITLE" content={result?.seoTitle} color={dc.accent} />
                    <TextBlock label="◈  INSTAGRAM CAPTION" content={result?.caption} color={ac.color} />
                    <TextBlock label="◈  ALT TEXT" content={result?.altText} color="#aaaaaa" />
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "instagram" && tab === "hashtags" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    {result?.hashtags
                      ? <>
                          <TextBlock label={`◈  ALL ${result.hashtags.length} HASHTAGS`} content={"#" + result.hashtags.join(" #")} color={ac.color} />
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 4 }}>
                            {result.hashtags.map((h, i) => (
                              <span key={i} style={{ background: `${ac.color}14`, border: `1px solid ${ac.color}44`, borderRadius: 5, color: ac.color, padding: "6px 11px", fontSize: 12, fontFamily: "monospace" }}>#{h}</span>
                            ))}
                          </div>
                        </>
                      : <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "instagram" && tab === "seo" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  SEO TITLE" content={result?.seoTitle} color={dc.accent} />
                    <TextBlock label="◈  TARGET KEYWORDS" content={result?.seoKeywords?.join(", ")} color={ac.color} />
                    <TextBlock label="◈  ALT TEXT" content={result?.altText} color="#aaaaaa" />
                    {result && (
                      <Card>
                        <SLabel>◈  SEO CHECKLIST</SLabel>
                        {[
                          ["Strong caption hook",        result.caption?.length > 50],
                          ["25+ hashtags",               (result.hashtags?.length ?? 0) >= 25],
                          ["CTA with shroomroom.ca",     result.caption?.includes("shroomroom.ca") ?? false],
                          ["Alt text written",           !!result.altText],
                          ["SEO title ≤ 60 chars",       (result.seoTitle?.length ?? 99) <= 60],
                          ["8 keywords defined",         (result.seoKeywords?.length ?? 0) >= 6],
                          ["Image prompts ready",        !!(result.imagePrompts?.length)],
                        ].map(([label, ok], i, arr) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < arr.length-1 ? "1px solid #1a1a28" : "none" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0, background: ok ? `${ac.color}33` : "#111", border: `1px solid ${ok ? ac.color : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {ok && <span style={{ color: ac.color, fontSize: 13, fontWeight: 900 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: 13, color: ok ? "#ddd" : "#555", fontFamily: "monospace" }}>{label}</span>
                          </div>
                        ))}
                      </Card>
                    )}
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {/* ════ BLOG TABS ════ */}

                {contentType === "blog" && tab === "preview" && (
                  <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
                    <BlogPreview result={result} aura={aura} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {result && (
                        <Card>
                          <SLabel>◈  BLOG STATS</SLabel>
                          {[
                            { label: "Read time",      value: result.readTime || "—",                   color: ac.color },
                            { label: "SEO keywords",   value: result.seoKeywords?.length ?? 0,          color: dc.accent },
                            { label: "Section count",  value: result.blogOutline?.length ?? 0,          color: ac.color },
                            { label: "Meta desc chars",value: result.metaDescription?.length ?? 0,      color: dc.accent },
                          ].map(({ label, value, color }, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #1a1a28" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <span style={{ fontSize: 13, color, fontFamily: "monospace", fontWeight: 700 }}>{value}</span>
                            </div>
                          ))}
                        </Card>
                      )}
                      {result && (
                        <Card>
                          <SLabel>◈  COPY & EXPORT</SLabel>
                          {[
                            { label: "Blog title",       text: result.blogTitle },
                            { label: "Meta description", text: result.metaDescription },
                            { label: "Full article",     text: result.blogBody },
                            { label: "SEO keywords",     text: result.seoKeywords?.join(", ") },
                          ].map(({ label, text }, i, arr) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length-1 ? "1px solid #1e1e2e" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <CopyBtn text={text} color={ac.color} />
                            </div>
                          ))}
                          <button onClick={savePost} style={{ width: "100%", background: "transparent", border: `1px solid ${ac.color}55`, borderRadius: 5, color: ac.color, padding: "10px 0", cursor: "pointer", fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginTop: 12, letterSpacing: "0.12em", transition: "all 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = `${ac.color}18`}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >⊹  Save to Library</button>
                        </Card>
                      )}
                      {!result && <EmptyState color={ac.color} />}
                    </div>
                  </div>
                )}

                {contentType === "blog" && tab === "article" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  BLOG TITLE" content={result?.blogTitle} color={dc.accent} />
                    <TextBlock label="◈  META DESCRIPTION" content={result?.metaDescription} color={ac.color} />
                    <TextBlock label="◈  INTRODUCTION" content={result?.blogIntro} color={ac.color} />
                    <TextBlock label="◈  FULL ARTICLE BODY" content={result?.blogBody} color={ac.color} />
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "blog" && tab === "outline" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    {result?.blogOutline
                      ? <>
                          <TextBlock label="◈  ARTICLE OUTLINE — COPY ALL" content={result.blogOutline.map((h, i) => `${i+1}. ${h}`).join("\n")} color={ac.color} />
                          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                            {result.blogOutline.map((h, i) => (
                              <div key={i} style={{ background: "#10101a", border: `1px solid ${ac.color}25`, borderRadius: 6, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <span style={{ color: dc.accent, fontFamily: "monospace", fontSize: 13, fontWeight: 700, minWidth: 24 }}>H{i===0?"1":"2"}</span>
                                  <span style={{ color: "#ddd", fontSize: 13, fontFamily: "monospace" }}>{h}</span>
                                </div>
                                <CopyBtn text={h} color={ac.color} />
                              </div>
                            ))}
                          </div>
                          {result.internalLinks && (
                            <div style={{ marginTop: 16 }}>
                              <TextBlock label="◈  SUGGESTED INTERNAL LINKS" content={result.internalLinks.join("\n")} color={dc.accent} />
                            </div>
                          )}
                        </>
                      : <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "blog" && tab === "seo" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  META DESCRIPTION" content={result?.metaDescription} color={dc.accent} />
                    <TextBlock label="◈  TARGET KEYWORDS" content={result?.seoKeywords?.join(", ")} color={ac.color} />
                    <TextBlock label="◈  META TAGS" content={result?.metaTags?.join(", ")} color="#aaaaaa" />
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {/* ════ EMAIL TABS ════ */}

                {contentType === "email" && tab === "preview" && (
                  <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
                    <EmailPreview result={result} aura={aura} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {result && (
                        <Card>
                          <SLabel>◈  EMAIL STATS</SLabel>
                          {[
                            { label: "Subject line chars", value: result.emailSubject?.length ?? 0,  color: ac.color },
                            { label: "Preheader chars",    value: result.preheader?.length ?? 0,     color: dc.accent },
                            { label: "Body words",         value: result.emailBody?.split(/\s+/).length ?? 0, color: ac.color },
                          ].map(({ label, value, color }, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid #1a1a28" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <span style={{ fontSize: 13, color, fontFamily: "monospace", fontWeight: 700 }}>{value}</span>
                            </div>
                          ))}
                        </Card>
                      )}
                      {result && (
                        <Card>
                          <SLabel>◈  COPY & EXPORT</SLabel>
                          {[
                            { label: "Subject line",   text: result.emailSubject },
                            { label: "Preheader",      text: result.preheader },
                            { label: "Email body",     text: result.emailBody },
                            { label: "CTA button",     text: result.ctaText },
                          ].map(({ label, text }, i, arr) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length-1 ? "1px solid #1e1e2e" : "none" }}>
                              <span style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace" }}>{label}</span>
                              <CopyBtn text={text} color={ac.color} />
                            </div>
                          ))}
                          <button onClick={savePost} style={{ width: "100%", background: "transparent", border: `1px solid ${ac.color}55`, borderRadius: 5, color: ac.color, padding: "10px 0", cursor: "pointer", fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginTop: 12, letterSpacing: "0.12em", transition: "all 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = `${ac.color}18`}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >⊹  Save to Library</button>
                        </Card>
                      )}
                      {!result && <EmptyState color={ac.color} />}
                    </div>
                  </div>
                )}

                {contentType === "email" && tab === "copy" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  SUBJECT LINE" content={result?.emailSubject} color={dc.accent} />
                    <TextBlock label="◈  PREHEADER TEXT" content={result?.preheader} color={ac.color} />
                    <TextBlock label="◈  EMAIL BODY" content={result?.emailBody} color={ac.color} />
                    <TextBlock label="◈  CTA BUTTON TEXT" content={result?.ctaText} color={dc.accent} />
                    <TextBlock label="◈  SEGMENT TIP" content={result?.segmentTip} color="#aaaaaa" />
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "email" && tab === "variants" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    {result?.subjectLineVariants
                      ? <>
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 11, color: "#888", letterSpacing: "0.2em", fontFamily: "monospace", fontWeight: 700, marginBottom: 12 }}>◈  SUBJECT LINE VARIANTS — A/B TEST THESE</div>
                            {[result.emailSubject, ...result.subjectLineVariants].map((s, i) => (
                              <div key={i} style={{ background: "#10101a", border: `1px solid ${i===0 ? ac.color+"55" : "#252535"}`, borderRadius: 6, padding: "13px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                  <div style={{ color: i===0 ? ac.color : "#666", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 5 }}>{i===0 ? "PRIMARY" : `VARIANT ${i}`}</div>
                                  <div style={{ color: "#ddd", fontSize: 13, fontFamily: "monospace" }}>{s}</div>
                                </div>
                                <CopyBtn text={s} color={ac.color} />
                              </div>
                            ))}
                          </div>
                          <TextBlock label="◈  SEGMENT TIP" content={result.segmentTip} color="#aaaaaa" />
                        </>
                      : <EmptyState color={ac.color} />}
                  </div>
                )}

                {contentType === "email" && tab === "seo" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <TextBlock label="◈  TARGET KEYWORDS" content={result?.seoKeywords?.join(", ")} color={ac.color} />
                    {!result && <EmptyState color={ac.color} />}
                  </div>
                )}

                {/* ════ IMAGE PROMPTS — ALL TYPES ════ */}

                {tab === "images" && (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    {result?.imagePrompts
                      ? <>
                          <div style={{ background: "#0c0c18", border: `1px solid ${dc.accent}33`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
                            <div style={{ fontSize: 12, color: "#bbb", fontFamily: "monospace", lineHeight: 1.7 }}>
                              🎨 <strong style={{ color: dc.accent }}>4 unique image prompts</strong> — paste any into <strong style={{ color: "#fff" }}>Midjourney</strong>, <strong style={{ color: "#fff" }}>DALL·E 3</strong>, or <strong style={{ color: "#fff" }}>Adobe Firefly</strong>. Each is designed as a <strong style={{ color: "#fff" }}>presentation-style visual with text overlay</strong> matching your brand.
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {result.imagePrompts.map((p, i) => (
                              <div key={i} style={{ background: "#10101a", border: `1px solid ${dc.accent}30`, borderLeft: `3px solid ${dc.accent}`, borderRadius: 6, padding: "16px 18px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ background: `${dc.accent}22`, border: `1px solid ${dc.accent}55`, borderRadius: 4, color: dc.accent, padding: "3px 10px", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", fontWeight: 700 }}>
                                      {["HERO", "CAROUSEL", "STORY", "MINIMAL"][i]}
                                    </span>
                                    <span style={{ color: "#888", fontSize: 12, fontFamily: "monospace" }}>{p.label}</span>
                                  </div>
                                  <CopyBtn text={p.prompt} color={dc.accent} />
                                </div>
                                <div style={{ color: "#d0d0d0", fontSize: 13, lineHeight: 1.8, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{p.prompt}</div>
                              </div>
                            ))}
                          </div>
                        </>
                      : <EmptyState color={ac.color} />}
                  </div>
                )}

              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 36, paddingBottom: 18, color: "#2a2a35", fontSize: 11, letterSpacing: "0.22em", fontFamily: "monospace" }}>
            SHROOMROOM.CA ✦ CONTENT STUDIO ✦ INSTAGRAM · BLOG · EMAIL · SEO
          </div>
        </div>
      </div>
    </>
  );
}
