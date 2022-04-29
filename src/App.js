import { useEffect, useRef, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [value, setValue] = useState('')
  const [numbers, setNumbers] = useState()

  const [disabled, setDisabled] = useState(false)

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  const cardImges = [
    {"src" : "/img/free-sticker-bee-4383819.png", matched: false},
    {"src" : "/img/free-sticker-flamingo-4193247.png", matched: false},
    {"src" : "/img/free-sticker-giraffe-4193354.png", matched: false},
    {"src" : "/img/free-sticker-hedgehog-4193263.png", matched: false},
    {"src" : "/img/free-sticker-panda-bear-4193288.png", matched: false},
    {"src" : "/img/free-sticker-tiger-4193303.png", matched: false},
    {"src" : "/img/free-sticker-cow-4193256.png", matched: false},
    {"src" : "/img/free-sticker-crocodile-4193310.png", matched: false},
    {"src" : "/img/free-sticker-fox-4193266.png", matched: false},
    {"src" : "/img/free-sticker-pig-4193260.png", matched: false}


  ]
useEffect(() => {
    setNumbers(value)}) 

  const PlaceCard = () => {
    // console.log(1);
    
    
    
    const PlaceCards = [...cardImges.slice(0, numbers), ...cardImges.slice(0, numbers)]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(PlaceCards)
    setTurns(0)
  }

  useEffect(() => {PlaceCard()}, [])

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      } else {

        setTimeout(() => {
          resetTurn()
        }, 1000)
        
      }
    }
  }, [choiceOne, choiceTwo])
  function resetTurn()  {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  function HandlerOnChange(e) {
    return setValue(e.target.value)
  }

  // console.log(cards, turns);

  return (
    <div className='App'>
    <a href='https://github.com/Minkeani'>Мой GitHub </a>
    <h1>Игра в пары</h1>
    <input
    value={value}
    onChange={HandlerOnChange}
    />
    <button onClick={PlaceCard}>Начать</button>
    <div className='card-grid'>
      {cards.map(card => (
        <SingleCard 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
      ))}
    </div>
    <p>Turns {turns}</p>
    </div>
  )
 
}

export default App;
