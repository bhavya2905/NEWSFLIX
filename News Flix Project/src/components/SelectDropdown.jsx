import Dropdown from 'react-bootstrap/Dropdown';

function SelectDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        More Category
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item href="/entertainment" style={{color: 'black'}}>Entertainment</Dropdown.Item>
        <Dropdown.Item href="/health" style={{color: 'black'}}>Health</Dropdown.Item>
        <Dropdown.Item href="/science" style={{color: 'black'}}>Science</Dropdown.Item>
        <Dropdown.Item href="/business" style={{color: 'black'}}>Business</Dropdown.Item>
        <Dropdown.Item href="/general" style={{color: 'black'}}>General</Dropdown.Item>
        <Dropdown.Item href="/sports" style={{color: 'black'}}>Sports</Dropdown.Item>
        <Dropdown.Item href="/technology" style={{color: 'black'}}>Technology</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SelectDropdown;