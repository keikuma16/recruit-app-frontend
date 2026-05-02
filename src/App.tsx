import { Routes, Route, Link } from 'react-router-dom'
import PostForm from "./components/PostForm";
import JobList from "./components/JobList";
import JobSerch from "./components/JobSerch";
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const [categories, setCategories] = useState<string[]>([])
  const [minSalary, setMinSalary] = useState<number>(0)
  return(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">求人検索アプリ</h1>
        <nav className="space-x-4">
          {location.pathname === '/post' ? (
            <Link to="/" className="hover:underline text-sm">
              求人一覧
            </Link>
          ) : (
            <Link to="/post" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-bold transition-colors text-sm">
              求人投稿
            </Link>
          )}
        </nav>
      </header>
      <main className='container mx-auto p-4'>
        <Routes>
          <Route path="/" element={
            <div className='flex items-start gap-8'>
              <aside className="font-bold mb-4 border-b pb-2 flex-shrink-0 w-[120px]">
                <JobSerch setCategories={setCategories} setMinSalary={setMinSalary} />
              </aside>
              <div className="flex-1 min-w-0">
                <JobList categories={categories} minSalary={minSalary} />
              </div>
            </div>
          } />
          <Route path="/post" element={<PostForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App