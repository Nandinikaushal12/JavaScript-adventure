import React, { useState } from "react";
import {useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import "./intro.css"
const ArrayQuest = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);

  const updateArray = (newArr) => {
    setArr([...newArr]); // Ensure React re-renders with a new reference
  };

  const pushElement = () => updateArray([...arr, 6]);
  const popElement = () => updateArray(arr.slice(0, -1));
  const shiftElement = () => updateArray(arr.slice(1));
  const unshiftElement = () => updateArray([0, ...arr]);
  const spliceElement = () => {
    const newArr = [...arr];
    newArr.splice(1, 1); // Remove second element
    updateArray(newArr);
  };
  const sliceElement = () => console.log("Sliced Array: ", arr.slice(0, 3));
  const mapElement = () => updateArray(arr.map((num) => num * 2));
  const forEachElement = () => updateArray(arr.map((num) => num + 1));

  return (
    <div className="container">
      <h1>Array Quest</h1>
      <p>Perform JavaScript Array Operations</p>
      <div className="array-display">{JSON.stringify(arr)}</div>
      <div className="interactive">
        <p onClick={pushElement}><strong>push:</strong> Adds an element to the end of the array.</p>
        <p onClick={popElement}><strong>pop:</strong> Removes the last element from the array.</p>
        <p onClick={shiftElement}><strong>shift:</strong> Removes the first element from the array.</p>
        <p onClick={unshiftElement}><strong>unshift:</strong> Adds an element to the beginning of the array.</p>
        <p onClick={spliceElement}><strong>splice:</strong> Removes the second element from the array.</p>
        <p onClick={sliceElement}><strong>slice:</strong> Extracts a section of an array and logs it to the console.</p>
        <p onClick={mapElement}><strong>map:</strong> Doubles each element in the array.</p>
        <p onClick={forEachElement}><strong>forEach:</strong> Increases each element by 1.</p>
      </div>
      <Link to="/Array/Level1" className="nextLink">Start Level 1</Link>
    </div>
  );
};

export default ArrayQuest;
