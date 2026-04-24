import { Routes, Route, Link } from 'react-router-dom'
import PostForm from "./components/PostForm";
import JobList from "./components/JobList";
import JobSerch from "./components/JobSerch";

function App() {
  return(
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">求人検索アプリ</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">求人一覧</Link>
          <Link to="/post" className="hover:underline">求人投稿</Link>
        </nav>
      </header>
      <main className='container mx-auto p-4'>
        <Routes>
          <Route path="/" element={
            <div className='flex items-start gap-8'>
              <aside className="font-bold mb-4 border-b pb-2 w-32">
                <JobSerch />
              </aside>
              <JobList />
            </div>
          } />
          <Route path="/post" element={<PostForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App