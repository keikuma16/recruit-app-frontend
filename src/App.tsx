import { Routes, Route, Link } from 'react-router-dom'
import PostForm from "./components/PostForm";
import JobList from "./components/JobList";

function App() {
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
        <Route path="/" element={<JobList />} />
        <Route path="/post" element={<PostForm />} />
      </Routes>
    </div>
  )
}

export default App