interface Props {
  title: string
  data: Record<string, number>
}

export function BarChart({ title, data }: Props) {
  const maxValue = Math.max(...Object.values(data))
  
  return (
    <div className="chart">
      <h3>{title}</h3>
      <div className="bars">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bar-group">
            <div 
              className="bar"
              style={{height: `${(value/maxValue) * 100}%`}}
            />
            <div className="label">{key}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 