import React, { useEffect, useState } from 'react'
import Combobox from '../../components/Combobox';
import DashboardLayout from '../../components/DashboardLayout';
import Pagination from '../../components/Pagination';
import ProfileCard from '../../components/ProfileCard';
import RepoTable from '../../components/RepoTable';


function Dashboard() {

    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState("all");

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
            if (data.length > 0) {
                setRepos(data);
            }else{
                setCurrentPage(1);
                alert("No more repos to show. We are redirecting you to page 1.");
            }
        }

        if (userData !== null || currentPage !== 1) {
            fetchRepos(userData.login);
        }
    }, [currentPage]);

    useEffect(() => {
        const fetchRepos = async (login) => {
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/repos?token=${token}&username=${login}&per_page=10&type=${type}`);
            let data = await response.json();
            setRepos(data);
        }

        if (userData !== null || type !== "all") {
            fetchRepos(userData.login);
        }
    }, [type]);

    function setPaginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function setTypesFromCombobox(type) {
        setType(type);
    }

    if (userData === null || repos === null) {
        return <div>Loading...</div>
    } else {
        return (
            <DashboardLayout>
                <div className="w-1/3">
                    <ProfileCard data={userData} />
                </div>
                <div className='mt-16'>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">Repositories</h1>
                        <Combobox onClick={setTypesFromCombobox} />
                        {repos.length === 0 ? <h1 className="text-2xl font-bold p-20">No Repositories</h1> :
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
                        }
                        <Pagination disabled={repos.length === 0} currentPage={currentPage} onClick={setPaginate} />
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default Dashboard