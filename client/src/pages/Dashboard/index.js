import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import RepoTable from '../../components/RepoTable';


function Dashboard() {

    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState(null);



    useEffect(() => {
        const fetchUser = async () => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/user?token=${token}`);
            let data = await response.json();
            setUserData(data);

            fetchRepos(data.login);
        }

        const fetchRepos = async (login) => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/repos?token=${token}&username=${login}&per_page=10`);
            let data = await response.json();
            setRepos(data);
        }

        fetchUser();

    }, []);

    if (userData === null || repos === null) {
        return <div>Loading...</div>
    } else {
        return (
            <DashboardLayout>
                <div className="w-1/3">
                    <div className="flex items-center justify-center ml-[-1px] p-4 border-l-0 border border-[#c9510c] bg-[#bd2c00]">
                        <img src={userData.avatar_url} alt="avatar" className="w-40 h-40 rounded-full" />
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-bold">{userData.name}</h1>
                            <h2 className="text-xl font-semibold">{userData.login}</h2>
                            <p className="text-lg">followers: {userData.followers}</p>
                            <p className="text-lg">following: {userData.following}</p>
                            <p className="text-lg">public repos: {userData.public_repos}</p>
                            <p className="text-lg">priv repos: </p>
                            <p className="text-lg">{userData.blog}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">Repositories</h1>
                        {repos.map((repo) => 
                            <RepoTable name={repo.name} owner={repo.owner.login} isPrivate={repo.private} lastRelease={new Date(repo.updated_at).toString()} downloadUrl={repo.downloads_url} />
                        )}
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default Dashboard