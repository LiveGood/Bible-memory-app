import React, {useState, useEffect} from 'react';
import axios from 'axios'


function Versions() {
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        axios.get('https://api.scripture.api.bible/v1/bibles', {
            headers: {
                'api-key': 'ead0fdf65000e527c15d3bf409d92800',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                let versions = response.data.data.map((obj) => {
                    return `${obj.name}(${obj.abbreviation})`     
                })
                setVersions(versions)
            })
            .catch(console.error)
    }, [])

    return (
        <select id='versions'>
            {versions.map((version, index) => <option key={index} value={version}>{version}</option>)}
        </select>
    )
}

export default Versions
