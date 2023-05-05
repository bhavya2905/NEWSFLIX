
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const UsersList = ({user}) => {
    
  return (
    <Card style={{ width: '10rem' }}>
        {/* <Card.Img variant="top" src={img} /> */}
        <div
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '50px',
        color: '#fff',
        margin: '30px'
      }}
    >
      {user.name[0]}
    </div>
        <Card.Body style ={{color:"black",display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'}}>
        <Card.Title>
            <OverlayTrigger 
            key="username" 
            placement='top'
            overlay={<Tooltip>{user.name}</Tooltip>}
            ><span>{user.name.split(" ")[0]} ...</span></OverlayTrigger>
        </Card.Title>
        <Button variant="primary" href={`/editadmin?id=${user._id}`} target='_blank'>edit</Button>
        </Card.Body>
  </Card>
  )
}
