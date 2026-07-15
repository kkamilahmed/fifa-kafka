import React, { useEffect, useRef, useState } from 'react'
import './Slide2.css'

const TOPICS = {
  MATCH: 'match.events',
  COMMENTARY: 'commentary',
  MOMENTUM: 'momentum',
}

const MATCH_FEED = [
  { topic: TOPICS.MATCH,      text: "Kick-off: Canada get the ball rolling. A good old noise in this indoor atmosphere-controlled Houston Stadium." },
  { topic: TOPICS.MATCH,      text: "1 min: False start, with Johnston haring into the Moroccan half too early. On the second attempt Canada immediately lose the ball. Bouaddi tries to release Diaz down the right, but the winger knew he was offside and didn't move." },
  { topic: TOPICS.MOMENTUM,   text: "3 min: Morocco stroke it around the back in the calm manner, establishing a bit of early authority." },
  { topic: TOPICS.MATCH,      text: "5 min: Laryea embarks on a power dribble down the left, winning the game's first corner. Eustaquio whips it in dangerously, forcing Bono to punch clear. David's shot on the rebound is turned behind for another corner." },
  { topic: TOPICS.MOMENTUM,   text: "6 min: Diop clears the second corner in the sequence, but Canada have found some rhythm, and a third is won down the right." },
  { topic: TOPICS.MOMENTUM,   text: "7 min: The presence of De Fougerolles discombobulates the Moroccan defence, but the corner is cleared. That burst of pressure will give Canada great heart. So much for Morocco's early authority!" },
  { topic: TOPICS.MOMENTUM,   text: "9 min: Morocco calm things down with some more of that passing around at the back. Much good it did them after that, so let's see how things develop." },
  { topic: TOPICS.MATCH,      text: "11 min: El Aynaoui plays a loose pass out from the back, intercepted by Ahmed, who slips a pass to Oluwaseyi. His shot is heading in, but stopped by Bono's outstretched leg. The keeper standing firm in these early exchanges." },
  { topic: TOPICS.MOMENTUM,   text: "13 min: Morocco have been strangely meek so far. Canada's fearsome press is too much for them at the moment. Eustaquio has time and space to shoot from the edge of the D but opts to pass instead. He should have taken a whack." },
  { topic: TOPICS.MATCH,      text: "15 min: Ounahi tries to release Hakimi down the right but Laryea blocks illegally. A long ball down the same flank nearly finds Diaz, but Crepeau races out to clear — the first Moroccan sortie into Canadian territory." },
  { topic: TOPICS.MATCH,      text: "17 min: Saibari is found in space down the right by Diop's long rake … but he was clearly offside and the flag pops up." },
  { topic: TOPICS.MATCH,      text: "19 min: A speculative long pass nearly sends Buchanan away. Halhal slides across to concede a corner. Eustaquio loops it in, Johnston connects, but the ball ricochets clear." },
  { topic: TOPICS.MATCH,      text: "20 min: Halhal is booked for clipping Oluwaseyi's heel out on the right touchline. A foul for sure; a yellow card seems a bit harsh." },
  { topic: TOPICS.MATCH,      text: "21 min: Before the free kick can be taken, Saibari goes down holding his leg. He's pulled something." },
  { topic: TOPICS.MATCH,      text: "22 min: Saibari can't continue. Bayern Munich's new signing is replaced by Rahimi — a big blow for Morocco, who already has three goals to his name this tournament." },
  { topic: TOPICS.MATCH,      text: "23 min: Eustaquio floats the free kick into the arms of Bono. Easy for the keeper." },
  { topic: TOPICS.COMMENTARY, text: "25 min: … and that's drinks! Riesling icewine, made from grapes harvested on icy winter nights, or mint green tea." },
  { topic: TOPICS.COMMENTARY, text: "27 min: Having watched most of this tournament, the reffing has been impressive — is Michael Oliver over-calling this one already?" },
  { topic: TOPICS.MATCH,      text: "29 min: Play restarts, and Morocco's replacement striker Rahimi has a dig from long range. Easy for Crepeau." },
  { topic: TOPICS.COMMENTARY, text: "30 min: Johnston flings long into the Morocco area from the right. De Fougerolles competes too energetically and the whistle goes. Fair to say this match hasn't quite taken off yet." },
  { topic: TOPICS.COMMENTARY, text: "32 min: Nothing much going on. The crowd entertain themselves with a Viking Row, the Mexican Wave de nos jours." },
  { topic: TOPICS.MATCH,      text: "34 min: Eustaquio floats a diagonal pass in from the left, hoping to find Buchanan in the Morocco box. But Morocco clear." },
  { topic: TOPICS.MATCH,      text: "35 min: Mazraoui's clearing header skims off his head and out for a corner. De Fougerolles falls over the stricken Bouaddi — no penalty claim, in fact a free kick to Morocco." },
  { topic: TOPICS.MOMENTUM,   text: "37 min: Another long Johnston throw-in that comes to nothing. This is in danger of turning into a bit of a non-event." },
  { topic: TOPICS.MATCH,      text: "39 min: Hakimi and Laryea square up over very little, and everyone else piles in. Referee Michael Oliver steps across to put a stop to the nonsense." },
  { topic: TOPICS.MATCH,      text: "41 min: Oliver books both Hakimi and Laryea. The former seemed more at fault, pushing his man in the back unnecessarily." },
  { topic: TOPICS.MOMENTUM,   text: "43 min: Morocco do their calming-things-down bit again. Pass, pass, pass around the back. The majority of the crowd give them a bit of gyp as a result." },
  { topic: TOPICS.MATCH,      text: "44 min: Some more hot Michael Oliver action as David is booked for cynically but pointlessly hauling back Diaz." },
  { topic: TOPICS.MATCH,      text: "45 min: Now it's a booking for Ounahi, who clips Ahmed." },
  { topic: TOPICS.COMMENTARY, text: "45+2 min: We're already a third of the way into six additional first-half minutes." },
  { topic: TOPICS.MATCH,      text: "45+4 min: Johnston throws long down the right touchline and nearly releases Oluwaseyi, but the striker can't jink past Mazraoui with Morocco otherwise light at the back." },
  { topic: TOPICS.MATCH,      text: "45+6 min: Yet another yellow card, this time to El Khannouss for running slap-bang into De Fougerolles. That's four Moroccans walking the disciplinary tightrope now." },
  { topic: TOPICS.MOMENTUM,   text: "HT: Canada 0-0 Morocco. Canada have stifled Morocco with their press, and Oluwaseyi carved out a chance for himself. Not much of a spectacle, but Canada will be miles happier of the two sides." },
  { topic: TOPICS.MATCH,      text: "46 min: Morocco get the second half started. No changes during the break." },
  { topic: TOPICS.MOMENTUM,   text: "47 min: The early signs suggest Morocco have been given the what-for during the break, and told to take it up a couple of notches." },
  { topic: TOPICS.MATCH,      text: "48 min: Ounahi gives the ball away then pulls Ahmed back — a gentle tug, but he's already on a yellow. Canada keep going, and Oluwaseyi wins a corner." },
  { topic: TOPICS.MATCH,      text: "49 min: The corner's worked left to right. De Fougerolles slices a wild volley over the bar, then slides in late on Rahimi up the other end. Another booking. This isn't going to end up 11 v 11." },
  { topic: TOPICS.MATCH,      text: "GOAL — Canada 0-1 Morocco (Ounahi 50). The free kick, pulled back by Hakimi, is met by Ounahi just inside the D — a powerful curler into the top right. A lovely counter." },
  { topic: TOPICS.COMMENTARY, text: "52 min: That was a wonderful set piece. Cut back crisply by Hakimi, dispatched calmly through a thicket of legs by Ounahi. A genuine moment of quality to break the deadlock." },
  { topic: TOPICS.MOMENTUM,   text: "54 min: Morocco don't have to force it now, so they drop the pace a bit and start passing it around the back again." },
  { topic: TOPICS.MATCH,      text: "55 min: They pick it up again, and Rahimi bursts down the right to win a corner off Buchanan." },
  { topic: TOPICS.MATCH,      text: "56 min: Hakimi's corner comes back to him, and he flays a wild second attempt at a cross over everyone's head and out for a goal kick." },
  { topic: TOPICS.MATCH,      text: "58 min: The corner's hit long, but De Fougerolles can't get any power on a header at the far post." },
  { topic: TOPICS.MATCH,      text: "59 min: Ahmed chases after a long pass down the left and wins a corner. Eustaquio to take." },
  { topic: TOPICS.MATCH,      text: "60 min: Buchanan bounds after a ball down the inside-right channel and is shoved in the back by Halhal, but there's no penalty as the flag goes up for offside." },
  { topic: TOPICS.MOMENTUM,   text: "65 min: Morocco seem pretty comfortable at the moment. Bono hasn't had anything to do since the restart." },
  { topic: TOPICS.MATCH,      text: "67 min: Bono's put to work now, though — Buchanan nearly latches onto a long ball down the middle, and moments later Larin clatters into the keeper. Another booking." },
  { topic: TOPICS.COMMENTARY, text: "68 min: … and that's drinks. And snacks. Fries topped with cheese curds and gravy, maple bacon corn snacks, or khobez flatbread with zaalouk." },
  { topic: TOPICS.COMMENTARY, text: "70 min: Postbag verdict — \"Morocco have looked like a team of footballers who can't run and Canada like a team of athletes who can't play football. Hence this thriller for the ages.\"" },
  { topic: TOPICS.MATCH,      text: "71 min: … and we begin again." },
  { topic: TOPICS.COMMENTARY, text: "73 min: Still no sign of Alphonso Davies. Jesse Marsch may need to break the emergency glass on that one sooner rather than later." },
  { topic: TOPICS.MOMENTUM,   text: "75 min: Canada pass it around patiently … they're not panicking yet." },
  { topic: TOPICS.MATCH,      text: "76 min: Sigur curls in from the right. Bono punches powerfully clear. Canada come back at Morocco, and Eustaquio is pulled back by Amrabat right on the edge of the box — free kick awarded." },
  { topic: TOPICS.MATCH,      text: "77 min: VAR's had a look, and the decision stands. Free kick right on the edge of the D, but just outside the box." },
  { topic: TOPICS.MATCH,      text: "78 min: David tries a cheeky flip into the top-left corner, hoping to catch Bono out of position. The ball floats harmlessly over the bar." },
  { topic: TOPICS.MATCH,      text: "79 min: Canada replace Laryea and Ahmed with Promise and Shaffelberg. Buchanan has a dig from distance — a low drive Bono tips around the post." },
  { topic: TOPICS.COMMENTARY, text: "81 min: That was better from Canada … but the subs were sent on, and there's still no Davies. Presumably a fitness setback." },
  { topic: TOPICS.MATCH,      text: "GOAL — Canada 0-2 Morocco (Ounahi 82). Talbi strides forward on the counter, four on two, feeding Diaz on the right. Diaz cuts back inside for Ounahi, who sidefoots a powerful curler into the top right. A lovely counter!" },
  { topic: TOPICS.MOMENTUM,   text: "84 min: Morocco haven't played particularly well. At all. But they've scored two delicious goals. They're pretty good at the old tournament football." },
  { topic: TOPICS.MATCH,      text: "86 min: Ounahi loops a perfect cross onto the head of Rahimi, ten yards out. The header crashes off the underside of the bar and stays out." },
  { topic: TOPICS.MATCH,      text: "87 min: Morocco make a double change — El Mourabet and Saadane on for Ounahi and Diop. Canada respond with Osorio and Nelson for Buchanan and Sigur." },
  { topic: TOPICS.MATCH,      text: "88 min: Bono takes a whack upside the head from Promise while dealing with a high free kick sent into the mixer. Time ticks down on Canada." },
  { topic: TOPICS.COMMENTARY, text: "90 min: There will be eight minutes of stoppage time." },
  { topic: TOPICS.MATCH,      text: "90+2 min: David goes down on the edge of the Moroccan box looking for a free kick he's never going to get." },
  { topic: TOPICS.MATCH,      text: "90+3 min: Nelson busies himself down the left and wins a corner, sent into the mixer, but Bono punches clear under pressure from Crepeau — who has decided it's Foxborough or bust." },
  { topic: TOPICS.MATCH,      text: "90+5 min: Shaffelberg wins a corner, then sends in a cross-cum-shot that's cleared. If there was any doubt, it's a done deal now." },
  { topic: TOPICS.MATCH,      text: "90+6 min: Schaffelberg draws a free kick from Hakimi. The set piece is shifted to Nelson, whose drive is off target." },
  { topic: TOPICS.MATCH,      text: "GOAL — Canada 0-3 Morocco (Rahimi 90+8). Morocco spring forward on a three-on-one break. Diaz slips Rahimi into the box, and he draws Crepeau and slots a left-footed shot into the bottom right." },
  { topic: TOPICS.MOMENTUM,   text: "FT: Canada 0-3 Morocco. Morocco are the first team to reach the quarters, and will face either France or Paraguay in Foxborough next Thursday. The co-hosts are out." },
]

const isGoalEvent = (text) => /GOAL/.test(text)

function FeedPanel() {
  const scrollRef = useRef(null)
  const idRef = useRef(0)
  const idxRef = useRef(25)
  const goalCountRef = useRef(0)

  const [events, setEvents] = useState(() => {
    const initial = MATCH_FEED.slice(0, 25).map((e) => {
      const event = { ...e, id: ++idRef.current }
      if (isGoalEvent(e.text)) {
        goalCountRef.current += 1
        event.goalNumber = goalCountRef.current
      }
      return event
    })
    return initial
  })

  useEffect(() => {
    let timeoutId
    function tick() {
      const entry = MATCH_FEED[idxRef.current % MATCH_FEED.length]
      idxRef.current += 1
      const event = { ...entry, id: ++idRef.current }
      if (isGoalEvent(entry.text)) {
        goalCountRef.current += 1
        event.goalNumber = goalCountRef.current
      }
      setEvents((prev) => {
        const next = [...prev, event]
        return next.length > 40 ? next.slice(next.length - 40) : next
      })
      timeoutId = setTimeout(tick, 700 + Math.random() * 600)
    }
    timeoutId = setTimeout(tick, 500)
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
          <div className={`feed-row${e.goalNumber === 3 ? ' feed-row-goal' : ''}`} key={e.id}>
            <span className="feed-topic">{e.topic}</span>
            <span className="feed-text">{e.text.replace(/^\d[\d+]*\s*(min|')\s*:\s*|^(HT|FT|Kick-off):\s*/i, '')}</span>
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
