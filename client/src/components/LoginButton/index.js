import React from 'react'

function LoginButton() {

    function SignInWithGithub() {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=b2fa34376e313b7517ec';
    }

    return (
        <div>
            <button className='border p-6 rounded-sm bg-[#6e5494] text-[#f5f5f5]' onClick={SignInWithGithub}>SignIn with Github</button>
        </div>
    )
}

export default LoginButton