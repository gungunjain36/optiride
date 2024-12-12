import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface Props {
  data: Record<string, number>
}

export function MonthlyBarChart({ data }: Props) {
  const chartData = Object.entries(data).map(([month, count]) => ({
    month,
    count
  }))

  return (
    <div className="chart-container">
      <h3>Count of month by month</h3>
      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  )
} 