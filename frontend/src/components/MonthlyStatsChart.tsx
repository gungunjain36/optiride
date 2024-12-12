import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface Props {
  data: {
    count: Record<string, number>
    miles: Record<string, number>
  }
}

export function MonthlyStatsChart({ data }: Props) {
  const chartData = Object.keys(data.count).map(month => ({
    month,
    count: data.count[month],
    miles: data.miles[month]
  }))

  return (
    <div className="chart-container">
      <h3>Count of month and Sum of MILES by month</h3>
      <LineChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" />
        <Line yAxisId="right" type="monotone" dataKey="miles" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
} 