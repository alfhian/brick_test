import { React, useState } from 'react'
import styles from '../my-sass.scss'
import logo from '../assets/github.png'
import { Octokit, App } from "octokit"
import axios from 'axios';  

const octokit = new Octokit({
    auth: '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'
})

const GitHubSearch = () => {

    const [message, setMessage] = useState('');

    const handleChange = async event => {
        let user = await octokit.request('GET /users/{username}', {
            username: event.target.value,
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        let boxContainer = document.getElementById('boxContainer')
        boxContainer.innerHTML = '<div><img src="' + user.data.avatar_url + '" width="200px" /><p>Name : <b>' + user.data.name + '</b><br>Email : ' + user.data.email + '<br>Bio : ' + user.data.bio + '<br>Location : ' + user.data.location + '<br>Github URL : <a href="' + user.data.html_url + '">' + user.data.html_url + '</a></div>'
        console.log(user.data)
        
    };

    return (
        <div className='container' >
            <div className='githubLogo' >
                <img src={logo} width="50"/>
                <div>
                    <span className='title centerHorizontal'><b>Github Searcher</b></span>
                    <br/>
                    <span className='subtitle'>Search users or repositories below</span>
                </div>
            </div>
            <div className='searchContainer'>
                <input type='text' name='search' id="search" maxLength={100} onChange={handleChange} />
                <select name='type'>
                    <option value={'users'}>Users</option>
                    <option value={'repo'}>Repo</option>
                </select>
            </div>
            <div className='boxContainer' id='boxContainer'>
                
            </div>
        </div>
    )
}

export default GitHubSearch