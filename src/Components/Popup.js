import { useState } from "react";

const Popup = ({selectedKey, closePopup, recordedKeys, setRecordedKeys, updateKeys}) => {

    const [mode, setMode] = useState('none');
    

    const handleChange = (event) => {
        setRecordedKeys(prevRecord => {
            return {
                ...prevRecord,
                [event.target.name] : event.target.value
            }
        })
    }

    const showCustomInput = () => {
        if(mode === 'keyboard'){
            return (
                <>
                    <h3 className="grid-col-span-2">Keyboard</h3>
                    <input
                        className='grid-col-span-2' 
                        type="text"
                        onChange={handleChange}
                        name="phrase"
                        value = {recordedKeys.phrase}
                    />
                </>
            );
        }else if(mode === 'pre-defined'){
            return (
                <fieldset className="grid-col-span-2 radiogroup">
                    <legend>Select an action</legend>
                    <div className="wrapper">
                        <input className="state" type="radio" id="copy" name="preset" value="copy" onChange={handleChange}/>
                        <label htmlFor="copy">
                            <div className="indicator"></div>
                            <span className="text">Copy</span>
                        </label>
                    </div>
                    <div className="wrapper">
                        <input className="state" type="radio" id="cut" name="preset" value="cut" onChange={handleChange}/>
                        <label htmlFor="cut">
                            <div className="indicator"></div>
                            <span className="text">Cut</span>
                        </label>
                    </div>
                    <div className="wrapper">
                        <input className="state" type="radio" id="paste" name="preset" value="paste" onChange={handleChange}/>
                        <label htmlFor="paste">
                            <div className="indicator"></div>
                            <span className="text">Paste</span>
                        </label>
                    </div>
                    <div className="wrapper">
                        <input className="state" type="radio" id="alt-tab" name="preset" value="alt-tab" onChange={handleChange}/>
                        <label htmlFor="alt-tab">
                            <div className="indicator"></div>
                            <span className="text">Alt-tab</span>
                        </label>
                    </div>
                </fieldset>
            )
        }else{
            return ''
        }
    };

    const saveBtn = () => {
        if(mode === 'keyboard' || mode === 'pre-defined'){
            return <div className='button-styles' onClick={() => {
                updateKeys();
                setMode('none');
                setRecordedKeys({phrase: "", preset: ""});
            }}>Save</div>
        }
    }

    const backBtn = () => {
        setMode('none');
        setRecordedKeys({phrase: "", preset: ""});
    }

    return (
        <form className='popup'>
            <div className="close-popup" onClick={closePopup}>x</div>
            <div className="contents">
                <h2 className="grid-col-span-2">{selectedKey}</h2>
                {mode === 'none' ? <div className="mode-btn button-styles" onClick={() => setMode('keyboard')}>Keyboard</div>: ''}
                {mode === 'none' ? <div className="mode-btn button-styles" onClick={() => setMode('pre-defined')}>Pre defined</div>: ''}
                {showCustomInput()}
                {saveBtn()}
                {mode !== 'none' ? <div className="button-styles" onClick={backBtn}>Back</div> : ''}
            </div>
        </form>
    )
}

export default Popup;