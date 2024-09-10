import React from 'react'
import { CloseOutlined } from "@ant-design/icons";

interface MainMenuProps {
  onClose: () => void; 
}

const MainMenu: React.FC<MainMenuProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-[375px] bg-white z-50 shadow-lg">
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <CloseOutlined style={{ fontSize: '24px' }} />
        </button>
      </div>

      <ul className="p-4">
        <li className="p-4 border-b">Menu Item 1</li>
        <li className="p-4 border-b">Menu Item 2</li>
        <li className="p-4 border-b">Menu Item 3</li>
      </ul>
    </div>
  )
}

export default MainMenu
