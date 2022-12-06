import React from 'react'

function RepoTable({name, owner, isPrivate, lastRelease, downloadUrl}) {
  return (
    <div className="flex flex-col items-center justify-center">
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Owner</th>
                    <th className="px-4 py-2">Public / Priv</th>
                    <th className="px-4 py-2">Last Release</th>
                    <th className="px-4 py-2">Download Url</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border px-4 py-2">{name}</td>
                    <td className="border px-4 py-2">{owner}</td>
                    <td className="border px-4 py-2">{!isPrivate ? "public" : "private"}</td>
                    <td className="border px-4 py-2">{lastRelease}</td>
                    <td className="border px-4 py-2">{downloadUrl}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RepoTable