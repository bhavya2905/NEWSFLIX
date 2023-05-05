import React from 'react';
import { Card } from 'react-bootstrap';
import { FaComment, FaNewspaper, FaEye, FaListAlt } from 'react-icons/fa';
const iconArr = {
    'FaComment' : <FaComment/>,
    'FaNewspaper' : <FaNewspaper/>,
    'FaListAlt' : <FaListAlt/>

}
const Summary = ({header, title, icon, variant}) => {
  return (
    <Card
    bg={variant.toLowerCase()}
    key={variant}
    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
    style={{ width: '18rem', textAlign:"center" }}
    className="mb-2"
  >
    <Card.Header>{header}</Card.Header>
    <Card.Body>
      <Card.Title> {title} {iconArr[icon]}</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default Summary