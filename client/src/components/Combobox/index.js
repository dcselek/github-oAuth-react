import React,{useState} from 'react'

function Combobox({onClick}) {

    const [filter, setFilter] = useState("all");

    const data = ["all", "owner", "member"];

    const handleFilter = (e) => {
        setFilter(e.target.value);
        onClick(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div>
            <div className="relative w-full lg:max-w-sm">
            <select
                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                onChange={handleFilter}
            >
                {data.map((item, key) => (
                    <option key={key} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
        </div>
    )
}

export default Combobox