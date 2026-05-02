import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function PostForm() {
    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [salary, setSalary] = useState<number>(0)
    const navigate = useNavigate()

    const CATEGORIES = ['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護']

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const jobData = { job: { title, category, salary } }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            })
            if (res.ok) {
                alert('求人が投稿されました！')
                navigate('/')
            } else {
                alert('求人の投稿に失敗しました。')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('エラーが発生しました。')
        }

    }

    return (
        <div className='max-w-2xl mx-auto py-10 px-4'>
            <h2 className='text-2xl font-bold mb-6 text-center text-slate-800'>新規求人投稿</h2>
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md space-y-6 border border-gray-100'>
                <div>
                    <label className='block font-bold mb-2 text-gray700'>求人タイトル</label>
                    <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)} 
                    className='w-full border p-2 focus:ring-2 focus:ring-slate-500 outline-none rounded'
                    />
                </div>
                <div>
                    <label className='block font-bold mb-2 text-gray700'>カテゴリ</label>
                    <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full border p-2 rounded bg-white'
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block font-bold mb-2 text-gray700'>年収（万円）</label>
                    <input 
                    type="text" 
                    value={salary} 
                    onChange={(e) => setSalary(Number(e.target.value) || 0)} 
                    className='w-full border p-2 focus:ring-2 focus:ring-slate-500 outline-none rounded'
                    />
                </div>
                <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                onClick={handleSubmit}
                >
                    投稿
                </button>
            </form>
        </div>
    )
}