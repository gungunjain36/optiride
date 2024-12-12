import { useEffect, useState } from 'react'
import './App.css'
import { CategoryPieChart } from './components/CategoryPieChart'
import { MonthlyBarChart } from './components/MonthlyBarChart'
import { DailyBarChart } from './components/DailyBarChart'
import { PurposeBarChart } from './components/PurposeBarChart'
import { MilesByTimeBarChart } from './components/MilesByTimeBarChart'
import { MonthlyStatsChart } from './components/MonthlyStatsChart'

interface DashboardData {
  category_distribution: Record<string, number>
  monthly_count: Record<string, number>
  daily_count: Record<string, number>
  purpose_by_category: {
    data: Array<{
      PURPOSE: string
      CATEGORY: string
      count: number
    }>
  }
  miles_by_time: Record<string, number>
  monthly_stats: {
    count: Record<string, number>
    miles: Record<string, number>
  }
}

function App() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard')
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="dashboard">
      <h1>OptiRide Dashboard</h1>
      
      <div className="charts-grid">
        <CategoryPieChart data={data.category_distribution} />
        <MonthlyBarChart data={data.monthly_count} />
        <MonthlyStatsChart data={data.monthly_stats} />
        <DailyBarChart data={data.daily_count} />
        <PurposeBarChart data={data.purpose_by_category.data} />
        <MilesByTimeBarChart data={data.miles_by_time} />
      </div>
    </div>
  )
}

export default App
