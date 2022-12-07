import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import Pagination from '../../components/Pagination';
import RepoTable from '../../components/RepoTable';


function Dashboard() {

    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/user?token=${token}`);
            let data = await response.json();
            setUserData(data);

            if (response?.status === 200) {
                fetchRepos(data.login);
            }
        }

        const fetchRepos = async (login) => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/repos?token=${token}&username=${login}&per_page=10`);
            let data = await response.json();
            setRepos(data);
        }

        fetchUser();

    }, []);

    useEffect(() => {
        const fetchRepos = async (login) => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/repos?token=${token}&username=${login}&per_page=10&page=${currentPage}`);
            let data = await response.json();
            if(data.length > 0){
                setRepos(data);
            }
        }

        if (userData !== null || currentPage !== 1) {
            fetchRepos(userData.login);
        }
    }, [currentPage]);

    function setPaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    if (userData === null || repos === null) {
        return <div>Loading...</div>
    } else {
        return (
            <DashboardLayout>
                <div className="w-1/3">
                    <div className="flex items-center justify-center ml-[-1px] p-4 border-l-0 border border-[#c9510c] bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white">
                        <img src={userData.avatar_url} alt="avatar" className="w-40 h-40 rounded-full" />
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-bold">{userData.name}</h1>
                            <h2 className="text-xl font-semibold">{userData.login}</h2>
                            <p className="text-lg">followers: {userData.followers}</p>
                            <p className="text-lg">following: {userData.following}</p>
                            <p className="text-lg">public repos: {userData.public_repos}</p>
                            <p className="text-lg">priv repos: {userData.total_private_repos}</p>
                            <p className="text-lg">{userData.blog}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-16'>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">Repositories</h1>
                        <div className="flex flex-col items-center justify-center mt-6">
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Owner</th>
                                        <th className="px-4 py-2">Public / Priv</th>
                                        <th className="px-4 py-2">Last Release</th>
                                        <th className="px-4 py-2">Download</th>
                                    </tr>
                                </thead>
                                {repos.map((repo, key) =>
                                    <RepoTable key={key} data={repo} />
                                )}
                            </table>
                        </div>
                        <Pagination page={currentPage} onClick={setPaginate} />
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default Dashboard