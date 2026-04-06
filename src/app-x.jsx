import { useState } from "react";

const D = "Débutant";
const I = "Intermédiaire";
const colorD = { bg: "#E1F5EE", border: "#5DCAA5", text: "#085041" };
const colorI = { bg: "#EEEDFE", border: "#AFA9EC", text: "#26215C" };

const programmes = {
  "Morning Flow": {
    level: D, tag: "Réveil musculaire", tagBg: "#FAC775", tagTxt: "#633806",
    series: [
      { phase: "Réveil articulaire", dur: "10 min", exercises: [
        "Respiration latérale — réactiver le souffle avant tout mouvement",
        "Mobilisation de la colonne — pelvic curl lent ×8, vertèbre par vertèbre",
        "Rotation du buste assis — délier les tensions de la nuit ×6 par côté",
      ]},
      { phase: "Footwork en douceur", dur: "15 min", exercises: [
        "Talons parallèles ×10 — pousser sans forcer, réveiller les jambes",
        "Position en V ×10 — serrer l'intérieur des cuisses",
        "Relevés de mollets ×10 — descendre le talon jusqu'au bout",
        "Prances ×10 par pied — alterner doucement, bassin immobile",
      ]},
      { phase: "Activation légère du centre", dur: "12 min", exercises: [
        "Chest lift ×10 — soulever le thorax, tenir 2 sec",
        "Single leg stretch ×8 par jambe — rythme lent, expiration à chaque changement",
        "Leg circle petit ×5 par sens — bassin ne bouge pas",
      ]},
      { phase: "Mobilité & étirements", dur: "8 min", exercises: [
        "Mermaid stretch ×3 par côté — sentir l'espace entre les côtes s'ouvrir",
        "Hip flexor stretch 30 sec par côté — pour les clientes raides le matin",
      ]},
      { phase: "Retour au calme", dur: "5 min", exercises: [
        "Spine stretch assis ×5 — allonger, pas arrondir",
        "5 respirations profondes — prendre le temps avant de se lever",
      ]},
    ]
  },
  "Foundations": {
    level: D, tag: "Alignement & Respiration", tagBg: "#C0DD97", tagTxt: "#27500A",
    series: [
      { phase: "Maîtrise de la machine", dur: "10 min", exercises: [
        "Neutral spine — trouver la courbe naturelle, ni trop creusé ni trop plat",
        "Respiration latérale ×8 — les côtes s'écartent, les épaules ne bougent pas",
        "Placement du bassin — tester imprint vs neutral, choisir et y rester",
      ]},
      { phase: "Footwork — fondation de tout", dur: "15 min", exercises: [
        "6 positions ×10 chaque — talons, orteils, V, large, mollets, prances",
        "Correction en temps réel : genou dans l'axe, dos neutre, cheville stable",
      ]},
      { phase: "Centre & respiration", dur: "12 min", exercises: [
        "Hundred niveau 1 — jambes à 90°, ne descendre que si le dos ne décolle pas",
        "Single leg stretch ×10 — expiration à chaque changement de jambe",
        "Chest lift avec obliques ×8 par côté — rotation thoracique pure",
      ]},
      { phase: "Stabilité du dos", dur: "8 min", exercises: [
        "Swan prep ×8 — allongement de la colonne, pas hauteur",
        "Bridge tenu 5 sec ×6 — épaule, hanche, genou alignés",
        "Clam ×12 par côté — muscles profonds des fessiers",
      ]},
      { phase: "Étirements", dur: "5 min", exercises: [
        "Spine stretch ×5 — pour repartir avec le dos allongé",
        "Supine twist 30 sec par côté — relâcher les lombaires",
      ]},
    ]
  },
  "Core Strength": {
    level: D, tag: "Ventre plat & Dos fort", tagBg: "#B5D4F4", tagTxt: "#0C447C",
    series: [
      { phase: "Connexion au centre", dur: "8 min", exercises: [
        "Activation du transverse — rentrer le nombril sans bloquer la respiration ×10",
        "Pelvic tilt ×8 — sentir les lombaires avant de les travailler",
        "Respiration + contraction plancher pelvien — tenir 5 sec ×6",
      ]},
      { phase: "Powerhouse", dur: "18 min", exercises: [
        "Hundred — jambes à 45°, si le dos décolle remonter immédiatement",
        "Single leg stretch ×10 par jambe",
        "Double leg stretch ×12 — dos collé pendant toute l'extension",
        "Leg lower & lift ×8 — amplitude selon le niveau de chaque cliente",
      ]},
      { phase: "Lombaires & plancher pelvien", dur: "12 min", exercises: [
        "Dead bug ×8 par côté — dos collé, règle absolue",
        "Bridge pulsé ×20 — fessiers serrés à chaque pulsion",
        "Side plank sur les genoux 20 sec × 2 par côté",
      ]},
      { phase: "Stretch & récupération", dur: "7 min", exercises: [
        "Child's pose 30 sec — relâcher tout le dos",
        "Supine twist 30 sec par côté",
        "Respiration finale — sentir le ventre après le travail",
      ]},
    ]
  },
  "Lower Body Sculpt": {
    level: D, tag: "Jambes · Fessiers · Galbe", tagBg: "#F4C0D1", tagTxt: "#72243E",
    series: [
      { phase: "Échauffement ciblé", dur: "8 min", exercises: [
        "Footwork talons + V + large enchaînés ×10 chaque — activation de toute la chaîne",
        "Prances rapides ×15 par pied",
      ]},
      { phase: "Travail des fessiers", dur: "15 min", exercises: [
        "Bridge unilatéral ×12 par côté — garder le bassin de niveau",
        "Bridge pulsé ×20 — serrer les fessiers à chaque pulsion",
        "Arabesque préparation ×10 par côté — bassin immobile pendant toute l'extension",
      ]},
      { phase: "Sculpture des cuisses", dur: "12 min", exercises: [
        "Squat reformer unilatéral ×12 par côté — genou dans l'axe de l'orteil",
        "Side-lying leg lift ×15 par côté + cercles + battements",
        "Inner thigh squeeze ×20 — serrer et tenir 2 sec",
      ]},
      { phase: "Face interne", dur: "8 min", exercises: [
        "Clam 3 variantes ×12 chaque — muscles profonds de la hanche",
        "Lying adductor squeeze avec ballon ×15",
      ]},
      { phase: "Étirements ciblés", dur: "7 min", exercises: [
        "Figure 4 stretch 30 sec par côté — fessiers",
        "Hamstring stretch aux straps 20 sec par jambe",
        "Hip flexor lunge 20 sec par côté",
      ]},
    ]
  },
  "Power Flow": {
    level: I, tag: "Enchaînements & Endurance", tagBg: "#FAC775", tagTxt: "#633806",
    series: [
      { phase: "Entrée directe", dur: "7 min", exercises: [
        "Respiration + footwork enchaîné tempo soutenu — sans pause entre les positions",
        "Pelvic curl rapide ×8 — on active, on n'étire pas encore",
      ]},
      { phase: "Série fluidité", dur: "18 min", exercises: [
        "Hundred 100 counts — jambes à 45°, bras constants",
        "Rolling like a ball ×10 — ne pas toucher le sol avec les pieds",
        "Open leg rocker ×8 — contrôle à la remontée",
        "Criss-cross ×10 par côté — rotation thoracique, pas du bassin",
        "Teaser préparation ×5 — tenir 3 sec au sommet",
      ]},
      { phase: "Reformer en flux", dur: "15 min", exercises: [
        "Long stretch → Down stretch → Up stretch enchaînés ×5 chaque",
        "Elephant ×10 — V inversé, ischios actifs",
        "Short box series complète — round, flat, latéral, rotation sans s'arrêter",
      ]},
      { phase: "Bras & épaules", dur: "5 min", exercises: [
        "Rowing series 3 variantes ×8 — épaules loin des oreilles",
        "Chest expansion ×8 — ouvrir le buste, corriger la posture bureau",
      ]},
      { phase: "Récupération", dur: "5 min", exercises: [
        "Mermaid longue ×3 par côté",
        "Hamstring stretch 30 sec par jambe",
      ]},
    ]
  },
  "Evolution": {
    level: I, tag: "Complexité & Coordination", tagBg: "#C0DD97", tagTxt: "#27500A",
    series: [
      { phase: "Activation avancée", dur: "8 min", exercises: [
        "Footwork enchaîné — 6 positions sans pause, amplitude maximale",
        "Pelvic curl unilatéral ×8 par côté — une jambe levée au sommet",
      ]},
      { phase: "Abdominaux avancés", dur: "15 min", exercises: [
        "Roll-up complet ×8 — si ça bloque, fléchir légèrement les genoux",
        "Double leg stretch ×12 — jambes à 45°, expiration complète",
        "Teaser I et II ×5 chaque — tenir 3 sec, dos en C",
        "Corkscrew ×6 — cercles contrôlés, bassin qui initie le mouvement",
      ]},
      { phase: "Machine niveau supérieur", dur: "15 min", exercises: [
        "Long box pulling straps ×10 — extension thoracique complète",
        "Kneeling thigh stretch ×6 — corps en bloc, ne pas plier à la hanche",
        "Side split debout ×8 par côté — adducteurs résistent au retour",
      ]},
      { phase: "Équilibre & instabilité", dur: "7 min", exercises: [
        "Arabesque debout ×6 par côté — regard fixe, bassin carré",
        "Standing knee stretch ×8 — genou qui monte, dos arrondi actif",
      ]},
      { phase: "Récupération", dur: "5 min", exercises: [
        "Hamstring + hip flexor 30 sec chaque par côté",
        "Spine twist assis ×5 par côté — respirer dans la rotation",
      ]},
    ]
  },
  "Deep Core": {
    level: I, tag: "Muscles profonds & Dos", tagBg: "#B5D4F4", tagTxt: "#0C447C",
    series: [
      { phase: "Connexion profonde", dur: "10 min", exercises: [
        "Respiration 360° — sentir le dos ET les côtés se remplir ×8",
        "Activation transverse + plancher pelvien — tenir 5 sec en respirant ×8",
        "Dead bug ×8 par côté — dos au chariot, règle absolue",
      ]},
      { phase: "Stabilisation de la colonne", dur: "15 min", exercises: [
        "Hundred — jambes à 45°, remonter si le moindre décollement du dos",
        "Criss-cross lent — 3 sec par rotation ×8 par côté",
        "Short spine ×5 — décompression vertébrale, dérouler lentement",
      ]},
      { phase: "Centre en profondeur", dur: "12 min", exercises: [
        "Teaser I ×5 — tenir 3 sec, descendre en contrôlant chaque vertèbre",
        "Leg pull front prep ×8 par jambe — bassin de niveau",
        "Pike sur box ×6 — abdominaux initialisent le mouvement",
      ]},
      { phase: "Chaîne postérieure", dur: "8 min", exercises: [
        "Swan dive prep ×8 — allonger, pas monter",
        "Swimming ×20 counts — respiration continue, ne jamais retenir son souffle",
        "Prone heel beats ×20 — fessiers et ischios",
      ]},
      { phase: "Restore", dur: "5 min", exercises: [
        "Child's pose active 30 sec",
        "Supine twist 30 sec par côté — finir en relâchant tout le dos",
      ]},
    ]
  },
  "Night Sculpt": {
    level: I, tag: "Haute intensité & Sculpture", tagBg: "#F4C0D1", tagTxt: "#72243E",
    series: [
      { phase: "Activation totale", dur: "8 min", exercises: [
        "Footwork tempo maximal — le chariot ne s'arrête pas entre les positions",
        "Planche tenue 30 sec × 2 — corps en ligne, respirer normalement",
        "Scapular push-up ×15 — épaules stables avant tout",
      ]},
      { phase: "Full body reformer", dur: "15 min", exercises: [
        "Long stretch → Down → Up → Elephant enchaînés — 5 reps chaque, 30 sec de pause max",
        "Short box express — round, flat, rotation ×5 chaque à rythme soutenu",
      ]},
      { phase: "Sculpture bas du corps", dur: "12 min", exercises: [
        "Squat unilatéral pulsé ×20 par jambe — rester dans le bas du squat",
        "Arabesque debout + bras opposé ×10 par côté",
        "Bridge unilatéral pulsé ×20 par côté — fessiers à chaque pulsion",
      ]},
      { phase: "Sculpture haut du corps", dur: "8 min", exercises: [
        "Rowing series ×10 chaque variante — résistance maximale",
        "Planche latérale 20 sec × 2 par côté — bassin haut, pas de chute",
      ]},
      { phase: "Récupération active", dur: "7 min", exercises: [
        "Hamstring stretch 30 sec par jambe",
        "Hip flexor lunge 30 sec par côté",
        "Mermaid ×3 par côté — laisser les clientes reprendre leur souffle",
      ]},
    ]
  },
};

const week = [
  { day: "Lundi", short: "Lun", off: true },
  { day: "Mardi", short: "Mar", hours: "17h – 20h", classes: [
    { time: "17h00", name: "Foundations" },
    { time: "18h00", name: "Power Flow" },
    { time: "19h00", name: "Evolution" },
  ]},
  { day: "Mercredi", short: "Mer", hours: "8h–13h · 18h–20h", slots: [
    { label: "Matin", classes: [
      { time: "08h00", name: "Morning Flow" },
      { time: "09h00", name: "Foundations" },
      { time: "10h00", name: "Power Flow" },
      { time: "11h00", name: "Core Strength" },
      { time: "12h00", name: "Lower Body Sculpt" },
    ]},
    { label: "Soir", classes: [
      { time: "18h00", name: "Evolution" },
      { time: "19h00", name: "Night Sculpt" },
    ]},
  ]},
  { day: "Jeudi", short: "Jeu", hours: "9h – 12h", classes: [
    { time: "09h00", name: "Morning Flow" },
    { time: "10h00", name: "Foundations" },
    { time: "11h00", name: "Deep Core" },
  ]},
  { day: "Vendredi", short: "Ven", hours: "9h – 13h", classes: [
    { time: "09h00", name: "Morning Flow" },
    { time: "10h00", name: "Foundations" },
    { time: "11h00", name: "Power Flow" },
    { time: "12h00", name: "Lower Body Sculpt" },
  ]},
  { day: "Samedi", short: "Sam", hours: "9h – 13h", classes: [
    { time: "09h00", name: "Morning Flow" },
    { time: "10h00", name: "Lower Body Sculpt" },
    { time: "11h00", name: "Power Flow" },
    { time: "12h00", name: "Night Sculpt" },
  ]},
  { day: "Dimanche", short: "Dim", hours: "9h – 13h", classes: [
    { time: "09h00", name: "Deep Core" },
    { time: "10h00", name: "Foundations" },
    { time: "11h00", name: "Night Sculpt" },
    { time: "12h00", name: "Core Strength" },
  ]},
];

function ClassCard({ c, isOpen, onToggle }) {
  const prog = programmes[c.name];
  const col = prog.level === D ? colorD : colorI;
  return (
    <div style={{ border: `0.5px solid ${isOpen ? col.border : "var(--color-border-tertiary)"}`, borderRadius: 12, overflow: "hidden", background: isOpen ? col.bg : "var(--color-background-secondary)" }}>
      <div onClick={onToggle} style={{ padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ minWidth: 44, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: isOpen ? col.text : "var(--color-text-secondary)" }}>{c.time}</div>
            <div style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>50 min</div>
          </div>
          <div style={{ width: 1, height: 30, background: isOpen ? col.border : "var(--color-border-tertiary)", opacity: 0.5 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: isOpen ? col.text : "var(--color-text-primary)" }}>{c.name}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
              <span style={{ fontSize: 10, background: prog.tagBg, color: prog.tagTxt, borderRadius: 20, padding: "1px 7px" }}>{prog.tag}</span>
              <span style={{ fontSize: 10, background: "rgba(0,0,0,0.05)", color: col.text, borderRadius: 20, padding: "1px 7px" }}>{prog.level}</span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 13, color: col.border, marginLeft: 8 }}>{isOpen ? "↑" : "↓"}</span>
      </div>

      {isOpen && (
        <div style={{ borderTop: `0.5px solid ${col.border}`, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          {prog.series.map((s, i) => (
            <div key={i} style={{ background: "var(--color-background-primary)", borderRadius: 8, border: `0.5px solid ${col.border}`, overflow: "hidden" }}>
              <div style={{ background: col.bg, padding: "6px 12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: col.text }}>{s.phase}</span>
                <span style={{ fontSize: 10, color: col.text, opacity: 0.7 }}>{s.dur}</span>
              </div>
              <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
                {s.exercises.map((ex, j) => (
                  <div key={j} style={{ display: "flex", gap: 7, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: col.border, flexShrink: 0 }}>▸</span>
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(1);
  const [openCard, setOpenCard] = useState(null);
  const day = week[active];

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "0.75rem 0", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", overflowX: "auto", gap: 5, marginBottom: 16, scrollbarWidth: "none" }}>
        {week.map((d, i) => (
          <button key={i} onClick={() => { setActive(i); setOpenCard(null); }}
            style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer", fontWeight: active === i ? 500 : 400, background: active === i ? "var(--color-text-primary)" : "var(--color-background-secondary)", color: active === i ? "var(--color-background-primary)" : d.off ? "var(--color-text-tertiary)" : "var(--color-text-secondary)", border: "0.5px solid var(--color-border-tertiary)", opacity: d.off && active !== i ? 0.5 : 1 }}>
            {d.short}
            {!d.off && <span style={{ fontSize: 10, marginLeft: 5, opacity: 0.7 }}>{(d.slots ? d.slots.flatMap(s=>s.classes) : d.classes||[]).length}c</span>}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, margin: 0 }}>{day.day}</h2>
        <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "3px 0 0" }}>{day.off ? "Repos" : day.hours}</p>
      </div>

      {day.off && (
        <div style={{ background: "var(--color-background-secondary)", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>☽</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Repos actif — marche, mobilité douce ou récupération.<br/>Le corps progresse pendant le repos.</div>
        </div>
      )}

      {!day.off && day.slots && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {day.slots.map((slot, si) => (
            <div key={si}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 20, padding: "3px 10px" }}>{slot.label === "Matin" ? "🌅 Matin" : "🌙 Soir"}</span>
                <div style={{ flex: 1, height: 1, background: "var(--color-border-tertiary)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {slot.classes.map((c, ci) => {
                  const key = `${si}-${ci}`;
                  return <ClassCard key={key} c={c} isOpen={openCard === key} onToggle={() => setOpenCard(openCard === key ? null : key)} />;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {!day.off && !day.slots && (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {(day.classes||[]).map((c, i) => (
            <ClassCard key={i} c={c} isOpen={openCard === i} onToggle={() => setOpenCard(openCard === i ? null : i)} />
          ))}
        </div>
      )}
    </div>
  );
}