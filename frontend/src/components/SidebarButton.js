import React, {useState, useEffect} from 'react'

// TODO: make OnClick to change button color
function SidebarButton({content, isVisible, num, handleClick}) {

    useEffect(()  => {
        // console.log(`Rendering button: ${num}`);
    }, [])

    // useEffect(() => {
    //     console.log('Changed Selected in :' + num);
    // }, [isVisible])

    return (
        <li className={isVisible} onClick={() => handleClick(num)}>
            <a href='#'>{content}</a>
        </li>   
    )
}

export default SidebarButton
