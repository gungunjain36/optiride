import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: Record<string, number>
}

export function DailyBarChart({ data }: Props) {
  const chartData = Object.entries(data).map(([day, count]) => ({
    day,
    count
  }))

  return (
    <div className="chart-container">
      <h3>Count of day by day</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1E88E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 