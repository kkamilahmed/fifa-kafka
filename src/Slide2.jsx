import React, { useEffect, useRef, useState } from 'react'
import './Slide2.css'

const TOPICS = {
  MATCH: 'match.events',
  COMMENTARY: 'commentary',
  MOMENTUM: 'momentum',
}

const MATCH_FEED = [
  { topic: TOPICS.MATCH,      text: "2 min: England try to play out calmly from the back. Stones gets jittery. A misplaced pass or two later, and it's the first corner of the match." },
  { topic: TOPICS.MATCH,      text: "3 min: Perisic hits the corner long. Sutalo is in a bit of space on the left-hand corner of the six-yard box. He can't keep his volley down, and it sails harmlessly wide right and high. The England defence all over the shop there." },
  { topic: TOPICS.MOMENTUM,   text: "3 min: possession% Croatia 58 England 42 — Croatia forcing the early tempo" },
  { topic: TOPICS.MATCH,      text: "4 min: Perisic comes barrelling down the left, but his low cross is intercepted by Rice. The 2018 finalists and 2022 semi-finalists starting strongly." },
  { topic: TOPICS.MATCH,      text: "5 min: Kane drops deep to get his first touch of the ball, but his pass down the middle for Gordon is easily intercepted. Pickford comes out of his box to blooter clear, then gives his team-mates the benefit of his opinion. England haven't got going yet." },
  { topic: TOPICS.MOMENTUM,   text: "5 min: possession% Croatia 61 England 39 — England yet to settle" },
  { topic: TOPICS.MATCH,      text: "7 min: Gordon makes a run down the left, hoping to be released by Rice, but the midfielder doesn't spot the pass." },
  { topic: TOPICS.MATCH,      text: "8 min: A poor touch by Modric, of all people, allows Madueke the chance to race down the right. The ball's fed inside for Kane, who spins and shoots from the edge of the box. The ball's deflected wide right, and that's England's first corner of the game." },
  { topic: TOPICS.MATCH,      text: "9 min: PENALTY ENGLAND — The corner comes in. Madueke gets to a dropping ball first. Modric doesn't see him, and in attempting to hook clear, kicks the England player. He's just given the ball away, and now he's given away a penalty. What a terrible 60 seconds for Croatia's captain!" },
  { topic: TOPICS.MOMENTUM,   text: "9 min: xT swing +0.31 England — penalty awarded after Modric foul" },
  { topic: TOPICS.MATCH,      text: "10 min: Kane performs the tippy toes … and scuffs a dismal penalty towards the bottom right. Livakovic saves, and the ball's cleared. But Gvardiol has encroached, so Kane will get a second chance!" },
  { topic: TOPICS.MATCH,      text: "12 min: GOAL — England 1-0 Croatia (Kane pen). Kane doesn't tippy-toe his run-up this time. He slams the spot kick into the right-hand portion of the net, the keeper going the wrong way, and England lead!" },
  { topic: TOPICS.COMMENTARY, text: "14 min: That's a huge let-off for Kane. The initial stuttered run-up was a disaster waiting to happen, and sure enough it was an awful penalty. But take two was magnificent, a no-nonsense skelp into the bottom right. Pity poor Livakovic, who will be cursing Gvardiol." },
  { topic: TOPICS.MOMENTUM,   text: "14 min: momentum score England 67 Croatia 33 — penalty goal shifts the game" },
  { topic: TOPICS.MATCH,      text: "15 min: Perisic advances down the right and crosses low. Musa can't quite get the ball under control on the penalty spot. James has a grab at Musa but misses. It's just as well, because it would have been a penalty had he got hands on. The small margins all going England's way at the moment." },
  { topic: TOPICS.MATCH,      text: "16 min: Madueke is sent scampering down the right by Kane. A shot's blocked and deflected wide right for a corner. The set piece is cut back for Anderson, and there's another blocked effort. Croatia clear this time. A breathless start to this game!" },
  { topic: TOPICS.COMMENTARY, text: "18 min: Maybe Livakovic can't complain about Gvardiol's encroachment too much. Replays suggest the keeper was off his line before Kane took the kick as well. Either way, the retake was the correct decision." },
  { topic: TOPICS.MATCH,      text: "20 min: Anderson nips in to steal a loose ball in the middle of the park. Suddenly England are on the attack. But Anderson holds onto possession for too long, and when he eventually looks for Kane to his right, there's no room to thread the pass." },
  { topic: TOPICS.MATCH,      text: "21 min: Bellingham barges his way down the left, sent away by Kane, dropping deep. But he runs out of space by the time he reaches the edge of the box, and the ball breaks through to Livakovic, who gathers. England were second best until the penalty; now they look dangerous every time they break forward." },
  { topic: TOPICS.MOMENTUM,   text: "23 min: possession% England 54 Croatia 46 — England growing into the game" },
  { topic: TOPICS.MATCH,      text: "23 min: Hydration break." },
  { topic: TOPICS.MATCH,      text: "26 min: Play restarts. It's been officially confirmed that the retake was awarded for both Gvardiol's encroachment and Livakovic coming off his line." },
  { topic: TOPICS.COMMENTARY, text: "27 min: That break appears to have allowed Croatia to rethink and regroup. They're seeing more of the ball now." },
  { topic: TOPICS.MATCH,      text: "28 min: Kane miscontrols 30 yards from his own goal, and allows Musa to dribble off with the ball. But Musa dithers when he should drive, and eventually loses control himself. Not for the first time today, England's captain gets away with one." },
  { topic: TOPICS.MATCH,      text: "31 min: Kane releases Madueke down the right. Madueke curls a delicious low cross into the centre. Bellingham very nearly gets in ahead of Vuskovic, but trips over his own feet in his attempt to poke goalwards. Madueke looks dangerous every time he gets involved." },
  { topic: TOPICS.MOMENTUM,   text: "33 min: shots on target England 3 Croatia 1 — England edging the chances" },
  { topic: TOPICS.MATCH,      text: "33 min: Stanisic spins O'Reilly out on the Croatian right, and is hauled back. O'Reilly is perhaps fortunate to avoid a booking." },
  { topic: TOPICS.MATCH,      text: "35 min: James hooks in from the right. Kane wins a header at the far stick, but not convincingly, as he's under pressure from Sutalo. Croatia clear their lines." },
  { topic: TOPICS.MATCH,      text: "36 min: GOAL — England 1-1 Croatia (Baturina). Croatia suddenly snap into life! Sucic advances down the right and cuts back for Baturina, romping in from the flank. A first-time rising shot flies across Pickford and into the top left! That's an absolute belter!" },
  { topic: TOPICS.COMMENTARY, text: "38 min: Pickford got a finger to that, but was in no position to stop it. And no wonder, because Baturina's shot has been recorded as flying in at 120 kilometers per hour." },
  { topic: TOPICS.MOMENTUM,   text: "38 min: momentum score England 51 Croatia 49 — Baturina goal levels the match and the momentum" },
  { topic: TOPICS.COMMENTARY, text: "40 min: Bellingham shipped possession in the build-up to the equaliser. First Modric, now Bellingham — opening-match World Cup nerves can affect the best of them." },
  { topic: TOPICS.MATCH,      text: "41 min: Madueke's presence down the right forces Vuskovic into the concession of a corner. Rice ambles over to take it." },
  { topic: TOPICS.MATCH,      text: "42 min: GOAL — England 2-1 Croatia (Kane). Rice sends the corner long. Kane steals in on the penalty spot, and powers a downward header into the bottom left. Pow! Easy as that, and Livakovic had no chance whatsoever!" },
  { topic: TOPICS.COMMENTARY, text: "43 min: A brilliant delivery from Rice, with a finish to suit! That's Kane's tenth goal at a World Cup finals, and he equals a record Gary Lineker set at Mexico 86 and Italia 90." },
  { topic: TOPICS.MOMENTUM,   text: "43 min: momentum score England 64 Croatia 36 — Kane header swings it back" },
  { topic: TOPICS.MATCH,      text: "45 min: Bellingham is brushed by Pasalic, 30 yards from the Croatia goal. He goes over and wins a soft free kick in a very dangerous position. There will be five additional first-half minutes." },
  { topic: TOPICS.MATCH,      text: "45+1 min: James batters the free kick straight at Modric. He's hit better." },
  { topic: TOPICS.MATCH,      text: "45+3 min: Croatia pass and probe, only for Perisic to needlessly run the ball out of play on the left flank." },
  { topic: TOPICS.MATCH,      text: "45+4 min: Pasalic has a crack from 25 yards, looking for the top right. Always wide, always high." },
  { topic: TOPICS.MATCH,      text: "45+5 min: GOAL — England 2-2 Croatia (Musa). The half looks to be petering out. Then suddenly Croatia snap into life. Pasalic dinks forwards. Perisic cushions a header down for Musa, who opens his body and sidefoots across Pickford and into the bottom right!" },
  { topic: TOPICS.MOMENTUM,   text: "HT: momentum score England 52 Croatia 48 — Croatia drag it level right on the whistle" },
  { topic: TOPICS.COMMENTARY, text: "HT: Anthony Barry, England's assistant coach, has told ITV that the team 'fell back into fearful patterns … confused … complicated.' Talk of nervous energy not doing England any favours." },
  { topic: TOPICS.MATCH,      text: "47 min: GOAL — England 3-2 Croatia (Bellingham). Bellingham latches onto a long Anderson pass down the right. But Bellingham takes charge, and barrels off down the flank, powering infield, and lashing a low shot across Livakovic and into the bottom left! What a start to the second half!" },
  { topic: TOPICS.COMMENTARY, text: "47 min: If England's stars have been given the what-for, it's certainly worked!" },
  { topic: TOPICS.MOMENTUM,   text: "47 min: momentum score England 78 Croatia 22 — Bellingham two minutes in, England dominant" },
  { topic: TOPICS.MATCH,      text: "48 min: Bellingham picks up possession again, and from the left-hand edge of the Croatia D, whacks a shot straight at Livakovic. Either side of the keeper, and that was two goals in as many minutes. As things stand, it's just a corner." },
  { topic: TOPICS.MATCH,      text: "49 min: Rice sends the corner long from the left. O'Reilly, unmarked six yards out at the far post, heads wide right. One way or another, England should be 4-2 up." },
  { topic: TOPICS.MATCH,      text: "51 min: Baturina buys them some time with a dribble down the right, buying a cheap free kick when finally surrounded by white shirts. Modric sends the free kick into the mixer, but Kane clears." },
  { topic: TOPICS.MATCH,      text: "52 min: Rice swans in from the left flank, opens his body, and sends a power curler towards the top right. Livakovic is able to turn around the post. Another England corner, and Croatia are hanging on a bit here." },
  { topic: TOPICS.MATCH,      text: "55 min: O'Reilly meets Rice's delivery and powers a header goalwards. Livakovic sticks up a hand to stop. Gordon has another go. The keeper parries again! What a double save!" },
  { topic: TOPICS.MOMENTUM,   text: "55 min: shots England 9 Croatia 2 — England suffocating Croatia" },
  { topic: TOPICS.MATCH,      text: "56 min: Livakovic punches the corner clear. Hard. But the ball comes into the box again. Kane tries to force home. Livakovic makes another save. Livakovic with a one-man supershow!" },
  { topic: TOPICS.MATCH,      text: "58 min: Modric, who has looked his age tonight, is replaced by Kovacic. Croatia had to do something. England are all over them." },
  { topic: TOPICS.COMMENTARY, text: "61 min: Thomas Tuchel has been hovering on the touchline since the restart. His mere presence seems to be encouraging England into action. They've been super-intense in this second half." },
  { topic: TOPICS.MATCH,      text: "63 min: Croatia have calmed it down a bit since Kovacic's arrival. More possession as they attempt to settle. England are still pressing hard, though, and all of the play is in the Croatian half." },
  { topic: TOPICS.MOMENTUM,   text: "63 min: possession% England 61 Croatia 39 — England pressing high, Croatia barely out of their half" },
  { topic: TOPICS.MATCH,      text: "66 min: Croatia make a double change, replacing Musa and Vuskovic with Matanovic and Marco Pasalic." },
  { topic: TOPICS.MATCH,      text: "70 min: Hydration break." },
  { topic: TOPICS.MATCH,      text: "71 min: Rashford nearly latches onto Stanisic's weak back-header down the England left. Livakovic comes to the edge of his area to block-clear, just in time." },
  { topic: TOPICS.MATCH,      text: "72 min: England make their first changes. Rogers comes on for Rice, Saka replaces Madueke, and Gordon makes way for Rashford." },
  { topic: TOPICS.MATCH,      text: "74 min: Rogers jinks down the right but upon entering the Croatia box can't link up with Saka." },
  { topic: TOPICS.MATCH,      text: "76 min: Marco Pasalic scampers down the right, enters the box, and makes enough space to shoot from a tight angle. Pickford, who has had little to do in this second half, parries well." },
  { topic: TOPICS.MOMENTUM,   text: "76 min: xG England 1.87 Croatia 0.31 — Croatia chances drying up completely" },
  { topic: TOPICS.MATCH,      text: "77 min: Matanovic has a whack from distance. It's heading into the bottom left, but not at enough pace to beat Pickford." },
  { topic: TOPICS.MATCH,      text: "79 min: Croatia make a double switch, replacing Mario Pasalic and Baturina with Kramaric and Vlasic." },
  { topic: TOPICS.MATCH,      text: "80 min: Bellingham, tonight's difference maker, is replaced by Spence. England perhaps looking to shore things up and keep hold of what they have." },
  { topic: TOPICS.COMMENTARY, text: "81 min: England are on 2.36 xG while Croatia lag behind on 0.38." },
  { topic: TOPICS.MATCH,      text: "82 min: Spence hares after a pass down the inside-right channel but can't force a shot past Livakovic, who has conceded three times despite playing like a superstar. Who'd be a goalie?" },
  { topic: TOPICS.MATCH,      text: "85 min: GOAL — England 4-2 Croatia (Rashford). Saka skips down the right touchline and regains the ball and rolls infield for Rashford, who is free on the edge of the box. Rashford chops inside, gives Livakovic the eyes, and curls a low shot into the bottom right. Lovely England move!" },
  { topic: TOPICS.COMMENTARY, text: "85 min: Saka magnificent, with a finish to match." },
  { topic: TOPICS.MOMENTUM,   text: "85 min: momentum score England 84 Croatia 16 — Rashford wraps it up" },
  { topic: TOPICS.MATCH,      text: "87 min: Stones is replaced by Guehi, England's final swap tonight." },
  { topic: TOPICS.MATCH,      text: "90 min: There will be six additional minutes." },
  { topic: TOPICS.MATCH,      text: "90+2 min: Marco Pasalic diddles his way down the right but can't get past O'Reilly. Otherwise, Croatia look dejected, their race run." },
  { topic: TOPICS.MATCH,      text: "90+4 min: Perisic heads down for Kramaric, who has a go from the edge of the England box. Blocked. Perisic comes again, and wins a corner off Spence." },
  { topic: TOPICS.MATCH,      text: "90+5 min: The corner drops to Gvardiol, six yards out. He must score … but Kane throws himself the road of the shot to block! No hat-trick for Kane today, but that's as good as a goal." },
  { topic: TOPICS.COMMENTARY, text: "90+5 min: England thoroughly deserve this for their high-octane second-half display. Two superb goals. Some questions remain in defence, perhaps, but that's for later. Enjoy the moment." },
  { topic: TOPICS.MOMENTUM,   text: "FT: xG England 2.36 Croatia 0.38 | possession England 56 Croatia 44 | shots on target England 11 Croatia 3" },
]

function FeedPanel() {
  const scrollRef = useRef(null)
  const idRef = useRef(0)
  const idxRef = useRef(25)

  const [events, setEvents] = useState(() =>
    MATCH_FEED.slice(0, 25).map(e => ({ ...e, id: ++idRef.current }))
  )

  useEffect(() => {
    let timeoutId
    function tick() {
      const entry = MATCH_FEED[idxRef.current % MATCH_FEED.length]
      idxRef.current += 1
      const event = { ...entry, id: ++idRef.current }
      setEvents((prev) => {
        const next = [...prev, event]
        return next.length > 40 ? next.slice(next.length - 40) : next
      })
      timeoutId = setTimeout(tick, 1200 + Math.random() * 1000)
    }
    timeoutId = setTimeout(tick, 800)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [events])

  return (
    <div className="feed-panel">
      <div className="panel-heading">
        <span className="panel-title">Live Topic Feed</span>
      </div>
      <div className="feed-scroll" ref={scrollRef}>
        {events.map((e) => (
          <div className="feed-row" key={e.id}>
            <span className="feed-topic">{e.topic}</span>
            <span className="feed-text">{e.text.replace(/^\d[\d+]*\s*(min|')\s*:\s*|^(HT|FT):\s*/i, '')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopicIcon() {
  return (
    <span className="lineage-icon topic-icon">
      <span className="icon-grid">
        <span />
        <span />
        <span />
        <span />
      </span>
    </span>
  )
}

function BrokerIcon() {
  return (
    <span className="lineage-icon broker-icon">
      <span className="icon-diamond" />
    </span>
  )
}

function ProducerIcon() {
  return (
    <span className="lineage-icon producer-icon">
      <span className="icon-chevrons">
        <span />
        <span />
      </span>
    </span>
  )
}

const ICONS = {
  'producer-node': ProducerIcon,
  'broker-node': BrokerIcon,
  'topic-node': TopicIcon,
}

function LineageNode({ x, y, label, category, kind }) {
  const Icon = ICONS[kind]
  return (
    <div className={`lineage-node ${kind}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <Icon />
      <span className="lineage-text">
        <span className="lineage-category">{category}</span>
        <span className="lineage-label">{label}</span>
      </span>
    </div>
  )
}

function lineageLine(x1, y1, x2, y2) {
  return `M ${x1},${y1} L ${x2},${y2}`
}

function lineageCurve(x1, y1, x2, y2) {
  const midX = (x1 + x2) / 2
  return `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`
}

const PRODUCERS = [
  { x: 10, y: 18, label: 'FIFA Game Feed' },
  { x: 10, y: 50, label: 'Live Commentary' },
  { x: 10, y: 82, label: 'Match Momentum' },
]
const INPUTS = [
  { x: 34, y: 18, label: 'match.events' },
  { x: 34, y: 50, label: 'commentary' },
  { x: 34, y: 82, label: 'momentum' },
]
const BROKER = { x: 60, y: 50, label: 'Kafka Broker' }
const OUTPUTS = [{ x: 88, y: 50, label: 'troll.events' }]

function LineagePanel() {
  return (
    <div className="lineage-panel">
      <div className="panel-heading">
        <span className="panel-title">Stream Lineage</span>
      </div>
      <div className="lineage-canvas">
        <svg className="lineage-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker
              id="lineage-arrow"
              markerWidth="5"
              markerHeight="3"
              refX="4.4"
              refY="1.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L5,1.5 L0,3 Z" className="lineage-arrowhead" />
            </marker>
          </defs>
          {PRODUCERS.map((p, i) => (
            <path
              key={`prod-${i}`}
              d={lineageLine(p.x + 8, p.y, INPUTS[i].x - 5, INPUTS[i].y)}
              className="lineage-line"
              markerEnd="url(#lineage-arrow)"
            />
          ))}
          {INPUTS.map((n, i) => (
            <path
              key={`in-${i}`}
              d={lineageCurve(n.x + 8, n.y, BROKER.x - 6, BROKER.y)}
              className="lineage-line"
              markerEnd="url(#lineage-arrow)"
            />
          ))}
          {OUTPUTS.map((n, i) => (
            <path
              key={`out-${i}`}
              d={lineageLine(BROKER.x + 6, BROKER.y, n.x - 5, n.y)}
              className="lineage-line"
              markerEnd="url(#lineage-arrow)"
            />
          ))}
        </svg>

        {PRODUCERS.map((p) => (
          <LineageNode key={p.label} x={p.x} y={p.y} label={p.label} category="Producer" kind="producer-node" />
        ))}
        {INPUTS.map((n) => (
          <LineageNode key={n.label} x={n.x} y={n.y} label={n.label} category="Topic" kind="topic-node" />
        ))}
        <LineageNode x={BROKER.x} y={BROKER.y} label={BROKER.label} category="Broker" kind="broker-node" />
        {OUTPUTS.map((n) => (
          <LineageNode key={n.label} x={n.x} y={n.y} label={n.label} category="Topic" kind="topic-node" />
        ))}
      </div>
    </div>
  )
}

export default function Slide2({ entering, pushing, originX = '50%', originY = '50%' }) {
  const modeRef = useRef(pushing ? 'push' : 'iris')
  const [visible, setVisible] = useState(!entering && !pushing)

  useEffect(() => {
    if (entering || pushing) {
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className={`slide slide2${modeRef.current === 'push' ? ' push-mode' : ''}${visible ? ' visible' : ''}`}
      style={{ '--origin-x': originX, '--origin-y': originY }}
    >
      <FeedPanel />
      <LineagePanel />
    </div>
  )
}
