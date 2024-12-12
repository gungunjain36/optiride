import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  data: Array<{
    PURPOSE: string
    CATEGORY: string
    count: number
  }>
}

export function PurposeBarChart({ data }: Props) {
  // Group data by PURPOSE
  const chartData = data.reduce((acc, curr) => {
    const existingPurpose = acc.find(item => item.PURPOSE === curr.PURPOSE)
    if (existingPurpose) {
      existingPurpose[curr.CATEGORY] = curr.count
    } else {
      acc.push({
        PURPOSE: curr.PURPOSE,
        [curr.CATEGORY]: curr.count
      })
    }
    return acc
  }, [] as any[])

  return (
    <div className="chart-container">
      <h3>Count of PURPOSE by PURPOSE and CATEGORY</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="PURPOSE" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Business" fill="#1E88E5" stackId="stack" />
          <Bar dataKey="Personal" fill="#FFA726" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 