import React, { useState } from 'react';
import MacroBorad from './Components/Keys.js';
import Popup from './Components/Popup.js';
import SerialComponent from './Components/SerialComponent.js';

function App() {
  //Setting states
  const [keys, setKeys] = useState({
    'key1': "",
    'key2': "",
    'key3': "",
    'key4': "",
    'key5': "",
  }); // Final values to be uploaded to the device
  const [activatepopup, setActivatepopup] = useState(false); //to interact with the popup menu
  const [selectedKey, setSelectedKey] = useState(''); // select on of the keys to program

  const [recordedKeys, setRecordedKeys] = useState(
    {phrase: "", preset: ""}
  );

  

  //state functions
  const selectKey = (key) => {
    setActivatepopup(true);
    setSelectedKey(key);
  }

  const closePopup = () => {
    setActivatepopup(false);
    setRecordedKeys({phrase: "", preset: ""});
  }

  //refactor using chatgpt example
  const updateKeys = () => {
    if(recordedKeys.preset === ""){
      setKeys(prevKeys => ({
        ...prevKeys,
        [selectedKey]: recordedKeys.phrase,
      }));
    }else if(recordedKeys.phrase === ""){
      setKeys(prevKeys => ({
        ...prevKeys,
        [selectedKey]: recordedKeys.preset,
      }));
    }
  }


  return (
    <div className="App">
      <h1 className='title'>Set up the macro board</h1>
      <div className='active-area'>
        <MacroBorad keys={keys} selectKey={selectKey} />
        {activatepopup? (
          <Popup 
          selectedKey={selectedKey} 
          closePopup={closePopup}
          recordedKeys = {recordedKeys}
          setRecordedKeys = {setRecordedKeys}
          updateKeys = {updateKeys}
          />
        ) : ''}
      </div>
      <SerialComponent keys={keys} />
    </div>
  );
}


export default App;
