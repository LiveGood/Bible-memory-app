import React, {useEffect, useState} from 'react'
import SidebarButton from './SidebarButton'

// TODO: Make selected element 
// DONE!

function Sidebar() {
  const buttons = ['Learned', 'Learning', 'New']
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // console.error('Called Sidebar component');
  }, [])

  function handleClick(index) {
    // console.log(`Clicked: ${index}`);  
    setSelectedIndex(index)
  }

return (
  <ul id='sidebar'>
  {
    buttons.map((str, index) => {
      return <SidebarButton 
        content={str} 
        isVisible={selectedIndex === index ? 'selected': '' }
        key={index}
        num={index}
        handleClick={handleClick}
        />
    })
  }
  </ul>
)
}

export default Sidebar
