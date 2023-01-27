import React from "react";

export default function Card(props){
  return(
    <div className="card">
      <h1>{props.item.name}</h1>
      <p>Region: {props.item.region}</p>
      <p>Area: {props.item.area / 1000}km2</p>
    </div>
  )
}
