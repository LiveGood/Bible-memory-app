import React, {useState, useEffect} from 'react'
import './styles/main.css'
import Versions from './Versions'
import InputBible from './InputBible'

// TODO: Make the siterender the header and sidebar -> DONE!!!
function Main() {
  useEffect(() => {

  }, [])

  return (
    <main>
      <form id='input-form'>
        <InputBible />
        <Versions />
        <button>Search</button>
      </form>
  </main>
    )
}

export default Main
