import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


const SearchBar = ({ filter, refreshList }) => {
  const [item, setItem] = useState(filter[0].item);
  const [eventKey, setEventKey] = useState(filter[0].eventKey);
  const [input, setInput] = useState("");

  //엔터를 칠시 검색이 되게
  const onKeyPress = (e) => {
    if (e.code === 'Enter') return refreshList(eventKey, input);
  }
  
  return ( 
    <>
      <InputGroup className="search_bar">
        <DropdownButton
        variant="outline-secondary"
        title={item}
        id="filter_dropdown"
        onSelect={(e) => setEventKey(e)}
        >
          {filter.map((el, idx) => 
            <DropdownItem 
              key={idx} 
              onClick={()=>{setItem(el.item)}} 
              eventKey={el.eventKey}
            >
              {el.item}
            </DropdownItem>
          )}
        </DropdownButton>
        <Form.Control
          // placeholder=""
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          autoFocus
        />
        <Button 
          className="searchBar_button"
          variant="outline-secondary" 
          onClick={()=>refreshList(eventKey, input)}
        >
          검색
        </Button>
      </InputGroup>
    </>
  );
}

export default SearchBar;