import React, {useEffect} from 'react'
import chapters from '../jsons/chapters'

function InputBible() {

    useEffect(() => {
        console.log(chapters);
    }, [])

    return (
        // <input type='text'></input>
        <span>
            <input list='chapters-list' name='chapters' id='chapters'></input>
            <datalist id='chapters-list'>
                {chapters.books.map(bookName => <option value={bookName} />)}
            </datalist>
        </span>
    )
}

export default InputBible
