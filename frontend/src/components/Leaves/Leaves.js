import React from 'react'
import './Leaves.css';
import Leaf from '../Leaf/Leaf'

export default function Leaves() {
  return (
        <div className="leaves overlay">
            <div className="leaves-line space-between">
            <Leaf color={"yellow"}/>
            <Leaf color={"red"}/>
            <Leaf color={"red"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"yellow"}/>
            </div>
            <div className="leaves-line space-around">
            <Leaf color={"red"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"red"}/>
            <Leaf color={"red"}/>
            </div>
            <div className="leaves-line space-between">
            <Leaf color={"yellow"}/>
            <Leaf color={"red"}/>
            <Leaf color={"red"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"yellow"}/>
            </div>

            <div className="leaves-line space-around">
            <Leaf color={"red"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"yellow"}/>
            <Leaf color={"red"}/>
            <Leaf color={"red"}/>
            </div>
        </div>
  )
}
