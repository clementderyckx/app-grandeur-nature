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
        <div className="rank-input-emoji" name={`${htmlFor}-1`}>
          <span role="img" aria-label='emoji-sad'>😣</span>
        </div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-2`} value="2" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-2`}>
          <span role="img" aria-label='emoji not-good'>🙁</span>
        </div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-3`} value="3" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-3`}>
          <span role="img" aria-label='emoji neutral'>😐</span>
        </div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-4`} value="4" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-4`}>
          <span role="img" aria-label='emoji happy'>🙂</span>
        </div>
      </div>
      <div className="rank-input-elem" name={`${htmlFor}-5`} value="5" onClick={handleClick}>
        <div className="rank-input-emoji" name={`${htmlFor}-5`}>
          <span role="img" aria-label='emoji big smile'>😄</span>
        </div>
      </div>
    </div>
  )
}
