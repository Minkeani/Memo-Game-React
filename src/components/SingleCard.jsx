import React from "react";
import './SingleCard.css';


const SingleCard = function({card, handleChoice, flipped, disabled}) {
    function handeleClick() {
        if(!disabled) {
            handleChoice(card)

        }
    }

   return (
    <div className="card" key={card.id}>
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src}/>
            <img 
            className='back' 
            src="/img/free-icon-pay-per-click-1335853.png"
            onClick={handeleClick}
            />
        </div>
    </div>
   )
}

export default SingleCard;