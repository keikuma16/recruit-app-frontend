import { useState, useEffect } from "react"
import type { Job } from '../types/job'
export default function JobList() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [minSalary, setMinsalary] = useState<number>(0)

    const fetchJob = async () => {
        const params = new URLSearchParams()
        categories.forEach(c => params.append('categories[]', c))
        if(minSalary > 0) params.append('min_salary', minSalary.toString())
        try{
        const res = await fetch (`${import.meta.env.VITE_API_URL}/api/v1/jobs?${params.toString()}`)
        const data = await res.json()
        setJobs(data)
        console.log(`${import.meta.env.VITE_API_URL}/api/v1/jobs?${params.toString()}`)
        }catch(err){
        console.error("通信エラー:", err)
        }  
    }

    useEffect(() => {
        fetchJob()
    },[categories, minSalary])

    

    return (
        <div className="container mx-auto flex py-8 px-4 gap-8">
            <main className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold">求人一覧</h2>
                <p className="text-gray-600">該当件数:{jobs.length}</p>
              </div>

              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>カテゴリ:{job.category}</p>
                      <p>年収:{job.salary}万円</p>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
    )
}