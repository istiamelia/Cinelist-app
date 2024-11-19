import React from "react";

function StarIcon({ rating }: { rating: number }) {
  let newRating = Math.ceil((rating / 10) * 5);
  let starList = [];
  for (let i = 0; i < 5; i++) {
    starList.push(<span className={`fa fa-star`}></span>);
  }
  starList.splice(0, newRating);
  for (let i = 0; i < newRating; i++) {
    starList.unshift(<span className={`fa fa-star checked`}></span>);
  }
  return starList;
}

export default StarIcon;
