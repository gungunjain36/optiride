import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: Record<string, number>
}

const COLORS = ['#1E88E5', '#FFA726'] // Blue for Business, Orange for Personal

export function CategoryPieChart({ data }: Props) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / Object.values(data).reduce((a, b) => a + b, 0)) * 100).toFixed(2)
  }))

  // Custom label to show percentage
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name
  }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    )
  }

  return (
    <div className="chart-container">
      <h3>Count of CATEGORY by CATEGORY</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string, props: any) => [
              `${value} (${props.payload.percentage}%)`,
              name
            ]}
          />
          <Legend 
            formatter={(value: string) => {
              const item = chartData.find(d => d.name === value)
              return `${value} (${item?.value} - ${item?.percentage}%)`
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}