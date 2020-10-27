import React, {useState, useEffect} from 'react'
import './styles/main.css'


// TODO: Make the siterender the header and sidebar -> DONE!!!
function Header() {
    const [username, setUsername] = useState('')

    useEffect(() => {
        // Add HTTP request Later
        setUsername('Deyan')
    }, [])

    return (
        <header>
            <h3 className="header-left">Stored Word</h3>
            <h3 className="header-right">{username || 'Guest'}</h3>
        </header>
    )
}

export default Header
