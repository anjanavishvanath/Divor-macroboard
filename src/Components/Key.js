const Key = ({keyNo, value, handleClick}) => {
    return (
        <img src="https://picsum.photos/id/147/300/300" className="macro-key" onClick={() => handleClick(keyNo)} alt="replace with a div" />
    )
}

export default Key;