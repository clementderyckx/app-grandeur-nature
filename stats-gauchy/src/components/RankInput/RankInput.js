import React from 'react'
import { Fragment } from 'react';
import './RankInput.css';
export default function RankInput({htmlFor, stat}) {
  const handleClick = (e) => {
    console.log(stat);
    const elements = document.querySelectorAll(`#${htmlFor} .rank-input-elem`);
    for(let element of elements) {
      if(element.classList.contains('active')) element.classList.remove('active');
    } 
    const nameElem = e.target.getAttribute('name');
    document.querySelector(`#${htmlFor} .rank-input-elem[name="${nameElem}"]`).classList.add('active');
  }

  const values = [1, 2, 3, 4, 5];

  return (
    
    <div className='rank-input' id={htmlFor}>
      {values.map(value => <RankElement value={value} stat={stat} handleClick={handleClick} />)}
    </div>
  )
}
function RankElement({value, stat, handleClick}){
  console.log(stat);
  const emojis = [getEmoji('😣', 'emoji sad') , getEmoji('🙁', 'emoji neutral'), getEmoji('😐', 'emoji not bad'), getEmoji('🙂', 'emjoi smiling'), getEmoji('😄', 'emoji happy')];
  return (
      <div className="answer-answers rank-question">

        <div className="rank-input-elem" name={`rank-input-${value}`} value={`${value}`} onClick={handleClick}> 
          <div className="rank-input-emoji" name={`rank-input-${value}`} >
            <span role="img" aria-label={emojis[value - 1].description}>{emojis[value - 1].emoji}</span>
          </div>
        </div>
        <div className="rank-element-statistic">
          <span>{stat[value].percentage}%</span>
        </div>

      </div>


  )
}
function getEmoji(emoji, description){
  return {emoji: emoji, description: description}
}