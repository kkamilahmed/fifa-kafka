import React, { useEffect, useRef, useState } from 'react'
import './Slide2.css'

const TOPICS = {
  MATCH: 'match.events',
  COMMENTARY: 'commentary',
  MOMENTUM: 'momentum',
}

const TEAMS = ['Argentina', 'France', 'Brazil', 'England', 'Germany', 'Spain', 'Portugal', 'Netherlands']
const PLAYERS = ['Messi', 'Mbappé', 'Neymar', 'Kane', 'Müller', 'Pedri', 'Bergwijn', 'Bellingham', 'Griezmann', 'Saka']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeMatchState() {
  const teamA = pick(TEAMS)
  let teamB = pick(TEAMS)
  while (teamB === teamA) teamB = pick(TEAMS)
  return { teamA, teamB, scoreA: 0, scoreB: 0, minute: 1 }
}

function buildEvent(id, state) {
  state.minute = Math.min(90, state.minute + Math.floor(Math.random() * 3) + 1)
  const roll = Math.random()
  const player = pick(PLAYERS)

  if (roll < 0.22) {
    const scoringTeamA = Math.random() < 0.5
    if (scoringTeamA) state.scoreA += 1
    else state.scoreB += 1
    return {
      id,
      topic: TOPICS.MATCH,
      icon: '⚽',
      text: `GOAL — ${state.teamA} ${state.scoreA}-${state.scoreB} ${state.teamB} (${player} ${state.minute}')`,
    }
  }
  if (roll < 0.34) {
    return {
      id,
      topic: TOPICS.MATCH,
      icon: '🟨',
      text: `Yellow card — ${player} (${pick([state.teamA, state.teamB])}) ${state.minute}'`,
    }
  }
  if (roll < 0.42) {
    return {
      id,
      topic: TOPICS.MATCH,
      icon: '🔁',
      text: `Substitution — ${pick([state.teamA, state.teamB])} brings on ${player} ${state.minute}'`,
    }
  }
  if (roll < 0.7) {
    const lines = [
      `"${player} is causing problems down the wing" ${state.minute}'`,
      `"That was so close to the post!" ${state.minute}'`,
      `"${state.teamA} pressing high up the pitch" ${state.minute}'`,
      `"${player} with a brilliant piece of skill" ${state.minute}'`,
      `"The crowd is on their feet here" ${state.minute}'`,
    ]
    return { id, topic: TOPICS.COMMENTARY, icon: '🎙', text: pick(lines) }
  }
  const swing = (Math.random() * 24 - 12).toFixed(0)
  const towards = swing >= 0 ? state.teamA : state.teamB
  return {
    id,
    topic: TOPICS.MOMENTUM,
    icon: '📈',
    text: `Momentum shift ${swing >= 0 ? '+' : ''}${swing}% toward ${towards} ${state.minute}'`,
  }
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false })
}

function FeedPanel() {
  const scrollRef = useRef(null)
  const matchStateRef = useRef(makeMatchState())
  const idRef = useRef(0)
  const [events, setEvents] = useState(() => {
    const seeded = []
    for (let i = 0; i < 30; i++) {
      idRef.current += 1
      const event = buildEvent(idRef.current, matchStateRef.current)
      event.time = formatTime(new Date())
      seeded.push(event)
    }
    return seeded
  })

  useEffect(() => {
    let timeoutId
    function tick() {
      idRef.current += 1
      const event = buildEvent(idRef.current, matchStateRef.current)
      event.time = formatTime(new Date())
      setEvents((prev) => {
        const next = [...prev, event]
        return next.length > 40 ? next.slice(next.length - 40) : next
      })
      timeoutId = setTimeout(tick, 1000 + Math.random() * 1000)
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
          <div className="feed-row" key={e.id}>
            <span className="feed-time">{e.time}</span>
            <span className="feed-topic">{e.topic}</span>
            <span className="feed-icon">{e.icon}</span>
            <span className="feed-text">{e.text}</span>
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
