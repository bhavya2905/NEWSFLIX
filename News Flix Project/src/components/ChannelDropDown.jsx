import Dropdown from 'react-bootstrap/Dropdown';

function ChannelDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        More Channels
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item href="/newsvideo/NDTV" style={{color: 'black'}}>NDTV</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/India_Today" style={{color: 'black'}}>India Today</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/Aaj_Tak" style={{color: 'black'}}>Aaj Tak</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/News18_Kannada" style={{color: 'black'}}>News18 Kannada</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/tv9_Kannada" style={{color: 'black'}}>Tv9 Kannada</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/BBC_News" style={{color: 'black'}}>BBC_News</Dropdown.Item>
        <Dropdown.Item href="/newsvideo/NBC_News" style={{color: 'black'}}>NBC News</Dropdown.Item>
        <Dropdown.Item href="https://newsflix-videotube.netlify.app/" target="_blank" style={{color: 'black'}}>NEWSFLIX videotube </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ChannelDropdown;