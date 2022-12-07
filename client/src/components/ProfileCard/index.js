import React from 'react'

function ProfileCard({data}) {
    return (
        <div className="flex items-center justify-center ml-[-1px] p-4 border-l-0 border gap-6 border-[#c9510c] bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">
            <img src={data.avatar_url} alt="avatar" className="w-32 h-32 rounded-full" />
            <div className='flex flex-col items-start'>
                <h1 className="text-2xl font-bold">{data.name}</h1>
                <h2 className="text-xl font-semibold">{data.login}</h2>
                <p className="text-lg">followers: {data.followers}</p>
                <p className="text-lg">following: {data.following}</p>
                <p className="text-lg">public repos: {data.public_repos}</p>
                <p className="text-lg">priv repos: {data.total_private_repos}</p>
                <p className="text-lg">{data.blog}</p>
            </div>
        </div>
    )
}

export default ProfileCard