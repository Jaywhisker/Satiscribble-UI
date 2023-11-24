import React from 'react';
import Agenda from './agenda';
import Outline from './outline';
import ContainerWithBorder from './containerwithborder';

class LeftSidebar extends React.Component {
  render() {
    const sidebarStyle: React.CSSProperties = {
      width: '15vw',
      backgroundColor: 'var(--Dark_Grey)',
      height: '100vh', // Full height of the viewport
      margin: 0,
      padding: '10px', 
      boxSizing: 'border-box', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center', 
    };

    return (
      <div style={sidebarStyle}>
        <ContainerWithBorder text="HCI MEETING ON 23/10" />
        <Agenda />
        <div style={{ width: '100%', marginTop: '20px' }}>
        <Outline />
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
