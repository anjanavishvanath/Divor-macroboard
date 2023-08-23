import Key from "./Key";

const MacroBoard = ({keys,selectKey}) => {

    //convert the object to an Array
    const keysArray = Object.entries(keys);

    return (
    <div className="macro-board">
        {
            keysArray.map( ([key,value]) => {
                return <Key key={key} keyNo={key} value={value}  handleClick={selectKey} />
            })
        }
    </div>
    )
}

export default MacroBoard;