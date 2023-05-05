import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CatCard( {img,title,count} ) {
 const link = `/articlelist?title=${title}`;
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body style ={{color:"black"}}>
        <Card.Title>{title.toUpperCase()}</Card.Title>
        <Button variant="primary" href={link} target='_blank'>Articles : {count}</Button>
      </Card.Body>
    </Card>
  );
}

export default CatCard;