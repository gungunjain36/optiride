interface Props {
  title: string
  value: string
}

export function StatsCard({ title, value }: Props) {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
    </div>
  )
} 