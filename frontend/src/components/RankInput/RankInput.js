import React from 'react'
import './RankInput.css';
export default function RankInput({question, htmlFor}) {

  const handleClick = (e) => {
    const elements = document.querySelectorAll(`#${htmlFor} .rank-input-elem`);
    for(let element of elements) {
      if(element.classList.contains('active')) element.classList.remove('active');
    } 
    const nameElem = e.target.getAttribute('name');
    document.querySelector(`#${htmlFor} .rank-input-elem[name="${nameElem}"]`).classList.add('active');
  }


  return (
    <div className='rank-input' id={htmlFor}>
      <div className="rank-input-elem" name={`${htmlFor}-1`} value="1" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-1`}>😣</div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-2`} value="2" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-2`}>🙁</div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-3`} value="3" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-3`}>😐</div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-4`} value="4" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-4`}>🙂</div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-5`} value="5" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-5`}>😄</div>
      </div>
    </div>
  )
}
