import React, { useRef } from 'react'
import './Slide1.css'

function Connector({ rows = 1, className = '' }) {
  return (
    <div className={`connector${className ? ` ${className}` : ''}`} style={{ '--rows': rows }}>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div className="connector-row" key={rowIdx}>
          <div className="connector-line" />
        </div>
      ))}
    </div>
  )
}

function fanCurve(x1, y1, x2, y2) {
  const midX = (x1 + x2) / 2
  return `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`
}

function SourceFanLines() {
  return (
    <svg className="connector-fan-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={fanCurve(0, 16.67, 100, 50)} className="connector-fan-line" />
      <path d={fanCurve(0, 50, 100, 50)} className="connector-fan-line" />
      <path d={fanCurve(0, 83.33, 100, 50)} className="connector-fan-line" />
    </svg>
  )
}

function NodeIcon({ kind, glyph }) {
  return (
    <span className={`node-icon ${kind}`}>
      <span className={`node-glyph ${glyph}`} />
    </span>
  )
}

function SourceBlock({ label, sub }) {
  return (
    <div className="block source-block">
      <NodeIcon kind="source-icon" glyph="glyph-diamond" />
      <span className="block-text">
        <span className="block-eyebrow">Source</span>
        <span className="block-label">{label}</span>
        <span className="block-sub">{sub}</span>
      </span>
    </div>
  )
}

function AgentBlock({ label }) {
  return (
    <div className="block agent-block">
      <NodeIcon kind="agent-icon" glyph="glyph-spark" />
      <span className="block-text">
        <span className="block-eyebrow">Agent</span>
        <span className="block-label">{label}</span>
        <span className="watsonx-badge">
          <span className="watsonx-dot" />
          powered by watsonx.orchestrate
        </span>
      </span>
    </div>
  )
}

export default function Slide1({ onKafkaClick, pushed }) {
  const kafkaRef = useRef(null)

  function handleClick() {
    const el = kafkaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    onKafkaClick(centerX, centerY)
  }

  return (
    <div className={`slide slide1${pushed ? ' push-out' : ''}`}>
      <div className="slide1-header">
        <span className="slide-title">Live Match Troll Pipeline</span>
        <span className="slide-eyebrow">architecture overview</span>
      </div>

      <div className="pipeline">
        <div className="source-fan">
          <div className="sources-col">
            <SourceBlock label="FIFA Game Feed" sub="match events" />
            <SourceBlock label="Live Commentary" sub="text stream" />
            <SourceBlock label="Match Momentum" sub="sentiment score" />
          </div>

          <SourceFanLines />
        </div>

        <div ref={kafkaRef} className="block kafka-block" onClick={handleClick} role="button" tabIndex={0}>
          <NodeIcon kind="broker-icon" glyph="glyph-dot" />
          <span className="block-text">
            <span className="kafka-tag">CONFLUENT</span>
            <span className="block-label kafka-label">Apache Kafka</span>
            <span className="block-sub">event streaming core</span>
          </span>
        </div>

        <Connector rows={1} />

        <AgentBlock label="Troll Worthiness Agent" />

        <Connector rows={1} />

        <AgentBlock label="Troll Creation Agent" />

        <Connector rows={1} />

        <div className="block sms-block">
          <NodeIcon kind="output-icon" glyph="glyph-grid" />
          <span className="block-text">
            <span className="block-eyebrow">Output</span>
            <span className="block-label">SMS</span>
          </span>
        </div>
      </div>
    </div>
  )
}
