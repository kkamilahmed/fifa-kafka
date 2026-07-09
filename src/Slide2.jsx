import React, { useEffect, useRef, useState } from 'react'
import './Slide2.css'

const TOPICS = {
  MATCH: 'match.events',
  COMMENTARY: 'commentary',
  MOMENTUM: 'momentum',
}

const MATCH_FEED = [
  { topic: TOPICS.MATCH,      text: "1 min: Shocking giveaway on the US backline, with Freeman's pass eluding Richards. Touré shoots from a wide angle, and Freese makes an easy save." },
  { topic: TOPICS.MATCH,      text: "2 min: US attackers are pressing all the way up the field. It works, and Australia back off while the USA knock the ball around." },
  { topic: TOPICS.MATCH,      text: "4 min: Our first foul is against Weston McKennie." },
  { topic: TOPICS.MATCH,      text: "6 min: Good cross from McKennie on the right, but Balogun is whistled for a foul." },
  { topic: TOPICS.MATCH,      text: "7 min: Australia press and gain possession. They lose it, then regain it, then play ahead to Touré, who is sandwiched by US defenders. The red-and-white team is looking a little shaky at the moment." },
  { topic: TOPICS.MATCH,      text: "8 min: Mathew Leckie comes in very late in a tackle and lands a hard kick to Tyler Adams' leg. Very difficult to understand why that's not a yellow card." },
  { topic: TOPICS.MATCH,      text: "9 min: Good chance for the USA as Dest finds a diagonal seam in the box. His shot is blocked." },
  { topic: TOPICS.MATCH,      text: "10 min: USA in possession, but I don't think Australia really mind. As I say that, they ramp up the press." },
  { topic: TOPICS.MATCH,      text: "11 min: GOAL — USA 1-0 Australia (Burgess og). Balogun is having a massive World Cup. He beats his man on the flank, drives into the box and taps it over to Pepi. The unfortunate Burgess desperately intercepts, but he's three yards from his own goal, and it is in fact an own goal." },
  { topic: TOPICS.MATCH,      text: "12 min: Nearly an immediate answer from Australia. Leckie makes a clever off-the-ball run across the top of the box, the ball is dinked to him, and he rips a shot with the outside of his boot that doesn't miss by much." },
  { topic: TOPICS.MATCH,      text: "13 min: Corner kick for the USA. We have a wrestling match between Richards and Okon-Engstler, and the referee gives them a few words before resuming. McKennie rises above the crowd and heads the ball down with power, but Bos blocks it, and the rebound goes off McKennie's arm for an Australian free-kick." },
  { topic: TOPICS.MATCH,      text: "16 min: That's a second hard foul on Adams, this time by Velupillay. Pochettino is furious, and it's hard to blame him. McKennie takes the ball up the wing and gets a solid hand to the face from Bos, who gets the yellow card that probably should've gone to Velupillay." },
  { topic: TOPICS.MATCH,      text: "17 min: Free kick played into the ubiquitous McKennie, who tries an ambitious flick with his back to goal. Looked cool but maybe not the best choice." },
  { topic: TOPICS.MATCH,      text: "19 min: Free kick for Australia just shy of midfield, but they don't show any significant interest in moving forward. Seems they're going to pick their spots very carefully – which, given the troubles they've faced when the USA get the ball in space, may be the best approach." },
  { topic: TOPICS.MATCH,      text: "20 min: Good pressure from the USA deep, but the pass eludes Adams. And now Australia attack with a long ball down the flank to Touré. Matt Freese races out of his goal to clear, and it's a nervy moment as his clearance stays in play, albeit in the other half of the field." },
  { topic: TOPICS.MATCH,      text: "21 min: Long ball to Balogun, but he can't control it immediately and the young Australian goalkeeper Beach alertly comes out to claim the ball." },
  { topic: TOPICS.MATCH,      text: "22 min: Australia with their longest spell of possession now, as the USA drop back a bit. Leckie ends up with the ball on the right, and his excellent cross forces Freeman to slide for a vital intervention. Corner kick for Australia." },
  { topic: TOPICS.MATCH,      text: "24 min: Australia loft the corner kick for the towering Souttar, who flicks it on. The US defense tap it over the line for another corner, and this time, there's a foul as a player bundles into Freese, who rolls into his own goal. With that, we'll hydrate." },
  { topic: TOPICS.MATCH,      text: "29 min: Robinson is a menace on the left flank. He beats the defense again and sends in a cross, but it goes out of play. Question: Can Australia take advantage when the USA's left back is 100 yards from his own end line?" },
  { topic: TOPICS.COMMENTARY, text: "30 min: I've been remiss in not mentioning the weather. It's gorgeous. Currently 24 degrees Celsius." },
  { topic: TOPICS.MATCH,      text: "31 min: USA with a corner, attacking the goal in front of a sea of yellow-clad Australian fans. Tillman takes it, Richards goes up but can't get it. Alex Freeman is way up the field and manages to earn a deep throw-in." },
  { topic: TOPICS.MATCH,      text: "32 min: Circati is late to a tackle on Tillman and gets a boot on the US midfielder's calf. Yellow card and a free kick 30 yards out." },
  { topic: TOPICS.MATCH,      text: "33 min: US foul amid the tangle of bodies in the mixer." },
  { topic: TOPICS.COMMENTARY, text: "34 min: Camera finds Kasey Keller, Alex Morgan and Jill Ellis in nice seats at the game. Morgan is in a couple of ads in frequent rotation in the US, including one making fun of the “international media” for playing up her “tea” celebration against England in the World Cup." },
  { topic: TOPICS.MATCH,      text: "35 min: Dest draws some ooooohs with a backheel to McKennie." },
  { topic: TOPICS.MATCH,      text: "36 min: USA patiently working against the tightly packed Australian defense. Until they get impatient and turn it over." },
  { topic: TOPICS.MATCH,      text: "37 min: Awkward time at the back for Australia after Souttar convincingly wins an aerial duel with the much shorter Pepi. They clear it out for a throw-in, but the USA immediately turn it back over. We have a collision between Alex Freeman and Okon-Engstler, and both players are down. Physios are on the field." },
  { topic: TOPICS.MATCH,      text: "40 min: Okon-Engstler is getting treatment for something on the back of his head. Freeman is being checked out just a couple of yards from the sideline – not sure why they haven't moved off the field yet. They both stay in the game." },
  { topic: TOPICS.COMMENTARY, text: "42 min: Fun stat - we've had exactly one shot on goal, and it was about a minute into the game. By Australia. The US goal technically wasn't a shot on goal because they didn't shoot." },
  { topic: TOPICS.MATCH,      text: "43 min: McKennie draws a gaggle of yellow-shirted defenders. Some wrestling ensures later, and … never mind …" },
  { topic: TOPICS.MATCH,      text: "44 min: Dest blasted a shot from 22 yards out. Freeman ran on to the deflection and headed it in. There were two US players in an offside position … but Freeman wasn't one of them!" },
  { topic: TOPICS.MATCH,      text: "45 min: GOAL — USA 2-0 Australia (Freeman). VAR check, and the crowd drowns out the ref. He pauses. The crowd goes quiet to hear. “After review, the player was NOT in an offside position …” US subs race to run in celebration alongside Freeman." },
  { topic: TOPICS.COMMENTARY, text: "45+2 min: Seven minutes of stoppage, and that is a dagger for Australia, who had defended with firm resolve but have now given up two goals, with deflections playing a role in each one." },
  { topic: TOPICS.MATCH,      text: "45+4 min: The fancy tech graphic shows Freeman wasn't even close to being in an offside position. VAR to the rescue. Richards fouls on a USA corner. Australia in possession. Bos probably should've won a foul there, but he's called for a handball." },
  { topic: TOPICS.MATCH,      text: "45+5 min: Minimal Australian pressure, but it's almost enough to win a free kick. I'll say again – this will not be a clean sheet for the USA." },
  { topic: TOPICS.MATCH,      text: "45+6 min: Balogun accidentally backs his own head into Souttar's chin, and the US forward falls down. He gets up, though, and seems OK. Perfectly clean play from Souttar – Balogun just backed into him." },
  { topic: TOPICS.MATCH,      text: "45+7 min: Dest is having a game. He takes a pass from Freeman and blasts a shot that forces a save from Beach." },
  { topic: TOPICS.COMMENTARY, text: "HT: Another excellent half for the US attack. But Australia have shown themselves more than capable of pressing the US defense into a few mistakes. Can they capitalize on two of them?" },
  { topic: TOPICS.MATCH,      text: "48 min: Foul on Australia just past midfield. USA bump the ball around." },
  { topic: TOPICS.MATCH,      text: "49 min: Another late tackle and a US free kick. Just a split-second late on so many of these." },
  { topic: TOPICS.MATCH,      text: "51 min: Australia get a sniff of the the ball for the first time in a while BUT they leave Balogun open in his own half, so the through ball to him is not offside! He isn't able to get a clean shot, though – despite Balogun having a firm grasp on Bos' shirt. Balogun won't want to see that on the game film." },
  { topic: TOPICS.MATCH,      text: "53 min: McKennie plays in to Balogun, who wins a corner that they take quickly. Patient buildup, and Tillman's cross is deflected for another corner." },
  { topic: TOPICS.COMMENTARY, text: "54 min: Balogun takes another knock – you wonder if they might sub him out at some point. Play restarts while the broadcast feed remains fixated on former Seattle Seahawk Marshawn Lynch in the luxury boxes (he can afford it)." },
  { topic: TOPICS.COMMENTARY, text: "55 min: More former Seattle Seahawks players shown on the feed. That explains who was able to afford tickets." },
  { topic: TOPICS.MATCH,      text: "56 min: Robinson is late on a tackle and trips Italiano. The referee plays advantage, then goes back and shows yellow to Robinson. Not a controversial call." },
  { topic: TOPICS.MATCH,      text: "58 min: A half-chance for Australia and a half-decent cross, initially awarded as a corner kick. VAR can now check such things, and it does. Goal kick. Leckie is down, and after a few moments, physios come in. The referee is trying to get everyone to please leave the field, and they do not." },
  { topic: TOPICS.MATCH,      text: "61 min: Leckie won't continue – Volpato is in. That's four of five subs for Australia." },
  { topic: TOPICS.MATCH,      text: "62 min: Another great ball from McKennie to Balogun, but again, the striker misplays it. Australia counter, and Ream switched off long enough for Irankunda to race behind him. He centers, and Volpato shoots way high. An Australian player tumbled in the area, and VAR checks it, but there's nothing to it." },
  { topic: TOPICS.MATCH,      text: "64 min: Tillman sends a long throw-in to Balogun, who nearly manages to make a neat turn and play for Pepi, but the Australian defense recover well." },
  { topic: TOPICS.MATCH,      text: "65 min: Pochettino needs to get a sub ready. Soon. The defense nearly give up another breakaway. Australia maintain possession, pounced on an errant clearance, and Freese has to save a shot from Metcalfe." },
  { topic: TOPICS.MATCH,      text: "66 min: Long play forward to Irankunda, and Freese very awkwardly plays it outside of his own area. Richards makes contact with Irankunda, VAR checks, but nothing is called." },
  { topic: TOPICS.MATCH,      text: "67 min: USA pass around a bit and drop it back to Freese, who blasts it upfield. USA win possession." },
  { topic: TOPICS.MATCH,      text: "68 min: USA complete about 40 passes, but Ream's effort to find Robinson racing down the flank goes out of play." },
  { topic: TOPICS.COMMENTARY, text: "72 min: We're back. I should mention that Chris Richards is once again playing an outstanding game." },
  { topic: TOPICS.MATCH,      text: "73 min: It's messy now, with bodies flying. The referee could've blown the whistle a few times in a short time, but the tipping point is Irankunda knocking over Ream. Finally, a US sub – and it's Pepi going off in favor of Sebastian Berhalter. Midfielder in for forward. Practical." },
  { topic: TOPICS.MATCH,      text: "75 min: Comical scene as Balogun is held tightly near midfield. Foul is called, but Balogun is frustrated now." },
  { topic: TOPICS.MATCH,      text: "76 min: Volpato turns on Robinson and gets in a cross that should've led to a shot but does not." },
  { topic: TOPICS.MATCH,      text: "78 min: The last Australian sub will be Irvine for Okon-Engstler. And then Volpato tries to draw a second yellow on Robinson, but it's a rather silly effort." },
  { topic: TOPICS.MATCH,      text: "79 min: Circati comes in, preparing to take a long throw-in. He takes it short. Australia win a corner – and this is where I think they can be dangerous." },
  { topic: TOPICS.MATCH,      text: "80 min: Freeman wins an aerial duel -- improbably, given the height difference – and he's down. USA had subs ready but was waiting to see if Freeman was OK. Some confusion now as the referee seems to be threatening the USA for failing to get their subbed players out, but they end up not penalized. Trusty and Scally are in for Dest and Robinson. That's officially calling off the attack." },
  { topic: TOPICS.MATCH,      text: "82 min: An Australian cross sails over and out for a goal kick." },
  { topic: TOPICS.MATCH,      text: "84 min: Sweet nutmeg keys a dangerous Australian attack. The USA can't clear. There's a shout for a penalty – surely VAR is checking. Nothing in it, but Australia win a corner." },
  { topic: TOPICS.MATCH,      text: "85 min: CHANCES FOR AUSTRALIA! The corner goes over the box. One player – I think it was Souttar – whiffs on an 8-yard shot. Another shot is blocked by Adams. But there's a foul, anyway – Souttar on Richards." },
  { topic: TOPICS.MATCH,      text: "86 min: Free kick near midfield for Australia, and they'll send everyone up except Beach. Richards clears, but Australia maintain possession." },
  { topic: TOPICS.MATCH,      text: "87 min: Sloppy giveaway on the US backline, and Australian can cross. Shot goes well over the bar." },
  { topic: TOPICS.MATCH,      text: "88 min: Tillman draws a foul, but attention goes immediately to Balogun, who has finally lost his patience with Souttar. Balogun initiated contact, and then Souttar, inspired by the UFC event at the White House, gets him in a rear naked choke. Multiple yellows are shown – Souttar, Balogun and Italiano." },
  { topic: TOPICS.MATCH,      text: "90 min: Irankunda slams into Scally with the ball in the air. Free kick for the USA. Trusty wins a corner." },
  { topic: TOPICS.MATCH,      text: "90+1 min: The USA play the corner kick short and then try to shield it in the corner, but an Australian player gets around the defender and knocks the ball off his shin to get a throw-in." },
  { topic: TOPICS.MATCH,      text: "90+2 min: Australia building from the back. Broken up, and the USA play ahead to Balogun. He dumps it over to Tillman, who tries to return the favor with Balogun wide open, but the pass misses." },
  { topic: TOPICS.MATCH,      text: "90+3 min: This could be costly down the road – Richards is forced to foul Irankunda and gets a yellow. And now … the referee is down with a cramp. O'Neill sportingly helps him stretch it out." },
  { topic: TOPICS.MATCH,      text: "90+5 min: Oh yeah - we had a free kick for Australia. It's cleared." },
  { topic: TOPICS.MATCH,      text: "90+6 min: A wayward pass forward goes out for a US goal kick and gives the USA time to bring in Haji Wright and Gio Reyna for Balogun and McKennie, who get rousing ovations as they leave." },
  { topic: TOPICS.MATCH,      text: "90+7 min: Berhalter intercepts. USA off to the races and play for Wright, but he's a couple of yards offside." },
  { topic: TOPICS.MATCH,      text: "90+8 min: Australia slam the ball forward but lose possession. That should just about do it." },
  { topic: TOPICS.COMMENTARY, text: "FT: Full time: USA 2-0 Australia (USA advance to knockout round). For the first time since 1930, the US men have won two consecutive World Cup games. More importantly, they're through to the next round. It would take a strange combination of results to keep the USA from winning the group, so they have the luxury of resting players in the game against Turkiye. Australia never got a consistent attack going, even though they had a few good scrambling chances." },
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
          <div className={`feed-row${e.goalNumber === 2 ? ' feed-row-goal' : ''}`} key={e.id}>
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
