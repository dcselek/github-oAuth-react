import React, { useEffect, useState } from 'react'


function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        async function fetchUser() {
            let response = await fetch(`http://localhost:5000/user?token=${token}`);
            let data = await response.json();
            setData(data);                   
        }

        fetchUser();
    }, []);
  return (
    <div>{data.bio}</div>
  )
}

export default Dashboard