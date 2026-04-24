export default function JobSearch({ setCategories, setMinSalary }: { setCategories: React.Dispatch<React.SetStateAction<string[]>>; setMinSalary: React.Dispatch<React.SetStateAction<number>> }) {  
    const CATEGORIES = ['事務', 'エンジニア', '営業', 'デザイン', 'マーケティング', '財務・経理', '人事', 'カスタマーサポート', '製造', '医療・介護']

    const handleCategoryChange = (category:string) => {
        setCategories(prev => 
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }
    
    return (
        <div>            
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
                onChange={(e) => setMinSalary(Number(e.target.value))}
                >
                <option value="0">全選択</option>
                <option value="300">300万円以上</option>
                <option value="500">500万円以上</option>
                <option value="700">700万円以上</option>
                </select>
            </section>
        
        </div>
    )
}