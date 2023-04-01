import React from "react";
import '/src/App.css'

function App() {

  const [display, setDisplay] = React.useState(0)
  const [answer, setAnswer] = React.useState(0)
  const [currentNumber, setCurrentNumber] = React.useState([])
  const [firstNumber, setFirstNumber] = React.useState(0)
  const [secondNumber,setSecondNumber] = React.useState(0)
  const [operation, setOperation] = React.useState([])
  const [initial, setInitial] = React.useState(false)
  console.log(display, firstNumber, secondNumber, answer, currentNumber)

  React.useEffect(() => {

    if (operation.length == 0) {
      setFirstNumber(
       isNaN(parseFloat(currentNumber.join("")))
        ? 0
        : parseFloat(currentNumber.join(""))
      )
      setDisplay(currentNumber.join(""))
    } else {
      setSecondNumber(
        isNaN(parseFloat(currentNumber.join("")))
         ? 0 
         : parseFloat(currentNumber.join(""))
      )
      setDisplay(currentNumber.join(""))
    }

  }, [currentNumber])

  React.useEffect(() => {
    
    if (secondNumber == 0) {
      setDisplay(firstNumber)
    } else {
      setDisplay(answer)
    }


  }, [operation])

  React.useEffect(() => {

    setFirstNumber(answer)
    setDisplay(answer)

  }, [answer])

  function insertNumber(event) {

    const {value} = event.target

    if (currentNumber.length == 0 && value == 0) {

      return

    } else {

      if (currentNumber.includes(".") == false) {
        setCurrentNumber(prevNumber => {
          return [...prevNumber, value]
        })

      } else {

        if (value != ".") {
          setCurrentNumber(prevNumber => {
            return [...prevNumber, value]
          })
        }

      }

    }

  }

  function cancelOperation() {

    if (answer != 0) {
      cancel()
    } else {
      if (secondNumber != 0) {
        setSecondNumber(0)
        setOperation([])
        setCurrentNumber([`${firstNumber}`])
        setDisplay(firstNumber)
      } else {
        cancel()
      }
    }

  }

  function cancel() {

    setDisplay(0)
    setAnswer(0)
    setCurrentNumber([])
    setFirstNumber(0)
    setSecondNumber(0)
    setOperation([])
    setInitial(false)

  }

  function compute() {

    if (operation[0] == "+") {
      setAnswer(firstNumber + secondNumber)
    } else if (operation[0] == "-") {
      setAnswer(firstNumber - secondNumber)
    } else if (operation[0] == "*") {
      setAnswer(firstNumber * secondNumber)
    } else if (operation[0] == "/") {
      setAnswer(firstNumber / secondNumber)
    }

    setInitial(true)

  }

  function insertOperation(event) {

    const {value} = event.target
    setOperation([value])

    if (initial == true) {
      setSecondNumber(0)
      setInitial(false)
    } else {
      if (secondNumber != 0) {
        compute()
        setInitial(false)
      }
    }

    setCurrentNumber([])
    
  }

  function displayOperation() {

    return 

  }
  
  return(

    <main>
      <div className="calcContainer">
        <div className="app--display">
          <input
            className="app--display" 
            type="text" 
            readOnly="true" 
            value={display}
            placeholder="0">
          </input>
        </div>
        <div className="inputs">
          <button className="app--inputButton" value={1} onClick={insertNumber}>1</button>
          <button className="app--inputButton" value={4} onClick={insertNumber}>4</button>
          <button className="app--inputButton" value={7} onClick={insertNumber}>7</button>
          <button className="app--inputButton" value={'.'} onClick={insertNumber}>.</button>
          <button className="app--inputButton" value={2} onClick={insertNumber}>2</button>
          <button className="app--inputButton" value={5} onClick={insertNumber}>5</button>
          <button className="app--inputButton" value={8} onClick={insertNumber}>8</button>
          <button className="app--inputButton" value={0} onClick={insertNumber}>0</button>
          <button className="app--inputButton" value={3} onClick={insertNumber}>3</button>
          <button className="app--inputButton" value={6} onClick={insertNumber}>6</button>
          <button className="app--inputButton" value={9} onClick={insertNumber}>9</button>
          <button className="app--operation" onClick={cancelOperation}>C/CE</button>
          <button className="app--operation" value={"+"} onClick={insertOperation}>+</button>
          <button className="app--operation" value={"-"} onClick={insertOperation}>-</button>
          <button className="app--operation" value={"*"} onClick={insertOperation}>*</button>
          <button className="app--operation" value={"/"} onClick={insertOperation}>/</button>
          <button className="app--operation app--equals" onClick={compute}>=</button>
        </div>
      </div>
    </main>

  )
}

export default App;