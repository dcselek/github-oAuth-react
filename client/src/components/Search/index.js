import React, {useEffect, useState} from 'react'

function Search({owner, name}) {

    const [search, setSearch] = useState('')
    const [files, setFiles] = useState([])
    

    async function getFiles() {
        let token = localStorage.getItem('token');
        let filesResponse = await fetch(`http://localhost:5000/files?token=${token}&owner=${owner}&repo=${name}&path=${search}`);
        let filesData = await filesResponse.json();
        setFiles(filesData);
    }


  return (
    <div className="flex items-center relative">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="e.g. src/components etc."
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setFiles([])}}
                />
                <button className="px-4 text-white bg-gray-600 rounded-full" onClick={getFiles}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            <ul className="absolute w-full mt-2 top-10 bg-white rounded-md shadow-lg z-50">
                {files !== [] && files.map((file,key) => (
                    <li key={key} className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                        <a href={`${file.html_url}`} target="blank_">{file.name}</a>
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default Search