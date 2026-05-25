import { useState } from 'react';
import Button from './Components/Button';
import ButtonPad from './Components/ButtonPad';
import Display from './Components/Display';
import './App.css';


function App() {
  const [display, setDisplay] = useState('0');
  const [firstNymber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const handleButtonClick = (label) => {
    if (label === 'AC') {
      setDisplay('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
    } else if (label === 'C') {
      if (waitingForSecondNumber) {
        setDisplay(String(firstNymber));
        setWaitingForSecondNumber(false);
      } else {
        setDisplay('0');
      }
    } else if (label === '±') {
      setDisplay(String(parseFloat(display) * -1));
    } else if (label === '÷' || label === '×' || label === '-' || label === '+') {
      setFirstNumber(parseFloat(display));
      setOperator(label);
      setWaitingForSecondNumber(true);
    } else if (label === '=') {
      if (firstNymber !== null && operator) {
        const secondNumber = parseFloat(display);
        let result;
        switch (operator) {
          case '÷':
            result = firstNymber / secondNumber;
            break;
          case '×':
            result = firstNymber * secondNumber;
            break;
          case '-':
            result = firstNymber - secondNumber;
            break;
          case '+':
            result = firstNymber + secondNumber;
            break;
          default:
            return;
        }
        if (result > 99999999 || result < -99999999) {
          setDisplay('ERR');
        } else {
          setDisplay(String(parseFloat(result.toFixed(10))));
        }
        setFirstNumber(null);
        setOperator(null);
        setWaitingForSecondNumber(false);
      }
    } else {
      if (waitingForSecondNumber) {
        setDisplay(label);
        setWaitingForSecondNumber(false);
      } else {
        if (label === '.') {
          if (display.includes('.')) return;
          const decimals = display.split('.')[1];
          if (decimals && decimals.length >= 3) return;
        }
        if (display.length >= 8) return;
        setDisplay(display === '0' && label !== '.' ? label : display + label);
      }
    }
  };

  return (
    <div className='calculator'>
      <div className='calculator-header'>
        <span className='calculator-title'>Calculator</span>
        <span className='calculator-author'>by Apostolos Peiniris</span>
      </div>
      <Display value={display} operator={operator} firstNumber={firstNymber} />
      <ButtonPad onButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
