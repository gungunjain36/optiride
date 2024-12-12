import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Props {
  data: Record<string, number>
}

export function MilesByTimeBarChart({ data }: Props) {
  const chartData = Object.entries(data).map(([time, miles]) => ({
    time,
    miles: Math.round(miles * 10) / 10 // Round to 1 decimal place
  }))

  // Sort by time of day: Morning, Afternoon, Evening, Night
  const timeOrder = ['Morning', 'Afternoon', 'Evening', 'Night']
  chartData.sort((a, b) => timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time))

  return (
    <div className="chart-container">
      <h3>Sum of MILES by day_time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} miles`} />
          <Bar dataKey="miles" fill="#1E88E5">
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={index % 2 === 0 ? '#1E88E5' : '#64B5F6'}  // Alternating shades of blue
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 