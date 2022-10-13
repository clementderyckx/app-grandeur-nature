import './Statistics.css';

import React from 'react'
import { useEffect, useState } from 'react';

export default function Statistics({type, title}) {

  // const showApi = (type && type === 'subscribers') ? 'https://salon-gauchy.herokuapp.com/salon/contacts/all/' : 'https://salon-gauchy.herokuapp.com/salon/pass/all/presents/';
  const showApi = (type && type === 'subscribers') ? 'http://localhost:4009/salon/contacts/all/' : 'http://localhost:4009/salon/pass/all/presents/';

  const [stats, updateStats] = useState({awaiting: 500, subscribers: 0, gauge: "0%" ,mySector: 0});
  const getStats = async () => {
    fetch(showApi, {method: 'GET'})
    .then(results => results.json())
    .then(contacts => {
      const awaiting = 500;
      const subscribers = contacts.length;
      updateStats({subscribers: subscribers, gauge: ((subscribers / awaiting) * 100), mySector: 0});
    })
  }

  useEffect(() => {
    getStats()
    setTimeout(() => console.log(stats), 3000)
  }, [])

  const gaugeStyle = {width: `${stats.gauge}%`}
  return (
    <div className="stats">
        <h2>{title}</h2>
        <div className="stats-container">

            <div className="stats-item" id="awaiting-people">
              <div className="stats-item-container">
                <h3 className="stats-item-title">Affluence attendue</h3>
                <p className="stats-item-result">500</p>
                <div className="stats-item-mention"></div>
              </div>
            </div>

              
            <div className="stats-item" id="subscribers">
              <div className="stats-item-container">
                <h3 className="stats-item-title">Inscrits</h3>
                <p className="stats-item-result">{stats.subscribers}</p>
                <div className="stats-item-mention">
                  <div className="gauge">
                    <div className="gauge-fill" style={gaugeStyle}>
                      {stats.gauge}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-item" id="awaiting-people">
              <div className="stats-item-container">
                <h3 className="stats-item-title">Mon secteur</h3>
                <p className="stats-item-result">{stats.mySector}</p>
                <div className="stats-item-mention"></div>
              </div>
            </div>
        </div>
    </div>
  )
}
