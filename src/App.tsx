import { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'
import type { Job } from './types/job'
import PostForm from "./components/PostForm";

function App() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [minSalary, setMinsalary] = useState<number>(0)

  const fetchJob = async () => {
    const params = new URLSearchParams()
    categories.forEach(c => params.append('categories[]', c))
    if(minSalary > 0) params.append('min_salary', minSalary.toString())
    try{
      const res = await fetch (`http://localhost:3000/api/v1/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(data)
      console.log(`http://localhost:3000/api/v1/jobs?${params.toString()}`)
    }catch(err){
      console.error("通信エラー:", err)
    }  
  }

  useEffect(() => {
    fetchJob()
  },[categories, minSalary])

  const CATEGORIES = ['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング']

  const handleCategoryChange = (category:string) => {
    setCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  return(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">求人検索アプリ</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">求人検索</Link>
          <Link to="/post" className="hover:underline">求人投稿</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto flex py-8 px-4 gap-8">
            <aside className="font-bold mb-4 border-b pb-2 w-64">
              <section>
                <h2 className="font-bold mb-4 border-b pb-2">求人カテゴリ</h2>
                <div className="space-y-2">
                  {CATEGORIES.map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input className="accent-slate-700" type="checkbox" onChange={() => handleCategoryChange(c)} />
                      {c}
                    </label>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="font-bold mb-4 border-b pb-2">年収</h2>
                <select
                  className="w-full border rounded p-2" 
                  onChange={(e) => setMinsalary(Number(e.target.value))}
                >
                  <option value="0">全選択</option>
                  <option value="300">300万円</option>
                  <option value="500">500万円</option>
                  <option value="700">700万円</option>
                </select>
              </section>
            </aside>

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
        }/>
        <Route path="/post" element={<PostForm />} />
      </Routes>
    </div>
  )
}

export default App