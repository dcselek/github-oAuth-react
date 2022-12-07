import React, { useEffect, useState } from 'react'
import LineChart from '../LineChart';
import { Transition } from "react-transition-group"
import moment from 'moment';
import Search from '../Search';

function RepoTable({ data }) {

    const [expanded, setExpanded] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [commits, setCommits] = useState(0);
    const [openPulls, setOpenPulls] = useState(0);
    const [closedPulls, setClosedPulls] = useState(0);

    useEffect(() => {
        const fetchCommits = async (repoData) => {
            setChartData([]);
            let token = localStorage.getItem('token');
            let response = await fetch(`http://localhost:5000/commits?token=${token}&owner=${repoData?.owner.login}&repo=${repoData?.name}`);
            let pullsResponse = await fetch(`http://localhost:5000/pulls?token=${token}&owner=${repoData?.owner.login}&repo=${repoData?.name}`);
            let pullsData = await pullsResponse.json();
            let data = await response.json();
            setCommits(data.length);
            //TODO: Pulls Data
            if (pullsResponse.status === 200 && pullsData.length > 0) {
                pullsData.map((pull) => {
                    if (pull.state === 'open') {
                        setOpenPulls(openPulls + 1)
                    } else {
                        setClosedPulls(closedPulls + 1)
                    }
                });
            }

            //TODO: Chart Data
            let dateArr = data.reverse().map((commit) => {
                return {
                    Date: commit.commit.author.date,
                }
            });

            for (let i = 0; i < dateArr.length; i++) {
                let date = moment(dateArr[i].Date).format('YYYY-MM-DD');
                if (i === 0 || date !== moment(dateArr[i - 1].Date).format('YYYY-MM-DD')) {
                    setChartData((prev) => [...prev, { Date: date, commits: 1 }]);
                } else {
                    setChartData((prev) => {
                        prev[prev.length - 1].commits += 1;
                        return prev;
                    });
                }
            }
        }

        if (expanded && data !== null) {
            fetchCommits(data);
        }

    }, [expanded]);

    let duration = 300;

    const defaultStyle = {
        transition: `height ${duration}ms ease-in-out`,
        height: "0px",
    };

    const transitionStyles = {
        entering: { height: "0px" },
        entered: { height: "400px" },
    };

    return (
        <tbody>
            <tr>
                <td className="border border-[#bd2c00] bg-gray-800 px-5 py-2">{data.name}</td>
                <td className="border border-[#bd2c00] bg-gray-800 px-5 py-2">{data.owner.login}</td>
                <td className="border border-[#bd2c00] bg-gray-800 px-5 py-2">{!data.private ? "public" : "private"}</td>
                <td className="border border-[#bd2c00] bg-gray-800 px-5 py-2">{moment(new Date(data.updated_at)).format("DD-MM-YYYY")}</td>
                <td className="border border-[#bd2c00] bg-gray-800 px-5 py-2">
                    <a href={data.downloads_url} target="_blank" rel="noreferrer">
                        <button className="bg-[#bd2c00] hover:bg-[#db5329] text-[#f5f5f5] p-2 rounded-sm">Download</button>
                    </a>
                </td>
                <td>
                    <button className={`text-[#f5f5f5] p-2 rounded-sm ${expanded ? "rotate-180" : "rotate-0"} transition-all duration-500`} onClick={() => (setExpanded(!expanded))}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='hover:fill-slate-50 fill-slate-300' version="1.1" width="20" height="20" viewBox="0 0 512 512">
                            <title />
                            <g id="icomoon-ignore">
                            </g>
                            <path d="M438.627 310.627l-160 160c-12.496 12.497-32.757 12.497-45.254 0l-160-160c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.498 45.255 0l105.372 105.373v-306.745c0-17.673 14.327-32 32-32s32 14.327 32 32v306.745l105.373-105.373c6.248-6.248 14.438-9.372 22.627-9.372s16.379 3.124 22.627 9.373c12.497 12.497 12.497 32.757 0 45.254z" />
                        </svg>
                    </button>
                </td>
            </tr>
            {expanded &&
                <tr>
                    <td colSpan={5} className="border border-[#bd2c00] bg-gray-800 px-5 py-2">
                        <table>
                            <thead>
                                <tr>
                                    <th className="border border-[#bd2c00] bg-gray-800 px-8 py-2">Commits</th>
                                    <th className="border border-[#bd2c00] bg-gray-800 px-8 py-2">Closed Pull</th>
                                    <th className="border border-[#bd2c00] bg-gray-800 px-8 py-2">Opened Pull</th>
                                    <th className="border border-[#bd2c00] bg-gray-800 px-8 py-2">Stars</th>
                                    <th className="border border-[#bd2c00] bg-gray-800 px-8 py-2">Search</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-[#bd2c00] bg-gray-800 px-8 py-2">{commits}</td>
                                    <td className="border border-[#bd2c00] bg-gray-800 px-8 py-2">{closedPulls}</td>
                                    <td className="border border-[#bd2c00] bg-gray-800 px-8 py-2">{openPulls}</td>
                                    <td className="border border-[#bd2c00] bg-gray-800 px-8 py-2">{data.stargazers_count}</td>
                                    <td className="border border-[#bd2c00] bg-gray-800 px-8 py-2">
                                        <Search owner={data.owner.login} name={data.name} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            }
            <Transition in={expanded} timeout={duration}>
                {state => (
                    <tr>
                        <td colSpan={5} className={`${expanded && state === "entered" ? "bg-white" : "bg-transparent"}`} style={{ ...defaultStyle, ...transitionStyles[state] }}>
                            {expanded && state === "entered" ? <LineChart data={chartData} /> : null}
                        </td>
                    </tr>
                )}
            </Transition>
        </tbody>
    )
}

export default RepoTable