import './Statistics.css';
import { appConfig } from '../../config';

import React from 'react'
import { useEffect, useState } from 'react';

export default function Statistics({type, title}) {

  
  const apiUrl = (type && type === 'subscribers') ? `${appConfig.apiUrl}/salon/contacts/all/` : `${appConfig.apiUrl}/salon/pass/all/presents/`;

  const [stats, updateStats] = useState({awaiting: 500, subscribers: 0, gauge: "0%" ,mySector: 0});

  /**
   * Use contacts reponse to generates stats and update it
   */
  const getStats = (contacts) => {
    const awaiting = 500;
      const subscribers = contacts.length;
      updateStats({subscribers: subscribers, gauge: ((subscribers / awaiting) * 100), mySector: 0});
  }

  const fetchStats = async () => {
    fetch(apiUrl, {method: 'GET'})
    .then(results => results.json())
    .then(contacts => getStats(contacts))
  }

  useEffect(() => { fetchStats() }, [])

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
                <h3 className="stats-item-title">{(type && type === 'subscribers') ? "Inscrits" : "Présents"}</h3>
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
