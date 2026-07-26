import { useState, useEffect } from 'react';
import ButtonPad from './Components/ButtonPad';
import Display from './Components/Display';
import './App.css';


const OPERATORS = ['÷', '×', '-', '+'];
const MAX_MAGNITUDE = 99999999;

// Επιστρέφει το αποτέλεσμα ως string, ή 'ERR' για ό,τι δεν μπορεί να δείξει η
// οθόνη: διαίρεση με το μηδέν (Infinity), 0/0 (NaN), ή υπερχείλιση.
function compute(a, operator, b) {
  let result;
  switch (operator) {
    case '÷': result = a / b; break;
    case '×': result = a * b; break;
    case '-': result = a - b; break;
    case '+': result = a + b; break;
    default: return null;
  }
  if (!Number.isFinite(result) || Math.abs(result) > MAX_MAGNITUDE) return 'ERR';
  return String(parseFloat(result.toFixed(10)));
}

function App() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
  // true αμέσως μετά το '=' — το επόμενο ψηφίο ξεκινά νέο αριθμό αντί να
  // κολλήσει πάνω στο αποτέλεσμα
  const [justEvaluated, setJustEvaluated] = useState(false);

  const reset = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
    setJustEvaluated(false);
  };

  const handleButtonClick = (label) => {
    // κάθε πλήκτρο εκτός του AC είναι ανενεργό όσο δείχνουμε σφάλμα
    if (display === 'ERR' && label !== 'AC') return;

    if (label === 'AC') {
      reset();
      return;
    }

    if (label === 'C') {
      if (waitingForSecondNumber) {
        setDisplay(String(firstNumber));
        setWaitingForSecondNumber(false);
      } else {
        setDisplay('0');
      }
      setJustEvaluated(false);
      return;
    }

    if (label === '±') {
      setDisplay((d) => (d.startsWith('-') ? d.slice(1) : `-${d}`));
      return;
    }

    if (OPERATORS.includes(label)) {
      // αλυσίδα: 2 + 3 + → υπολόγισε το 2+3 πριν κρατήσεις τον νέο τελεστή
      if (operator !== null && firstNumber !== null && !waitingForSecondNumber) {
        const result = compute(firstNumber, operator, parseFloat(display));
        setDisplay(result);
        setFirstNumber(result === 'ERR' ? null : parseFloat(result));
        setOperator(result === 'ERR' ? null : label);
        setWaitingForSecondNumber(result !== 'ERR');
      } else {
        setFirstNumber(parseFloat(display));
        setOperator(label);
        setWaitingForSecondNumber(true);
      }
      setJustEvaluated(false);
      return;
    }

    if (label === '=') {
      if (firstNumber === null || !operator) return;
      setDisplay(compute(firstNumber, operator, parseFloat(display)));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      setJustEvaluated(true);
      return;
    }

    // ψηφίο ή υποδιαστολή
    if (waitingForSecondNumber || justEvaluated) {
      setDisplay(label === '.' ? '0.' : label);
      setWaitingForSecondNumber(false);
      setJustEvaluated(false);
      return;
    }

    if (label === '.') {
      if (display.includes('.')) return;
    } else {
      const decimals = display.split('.')[1];
      if (decimals && decimals.length >= 3) return;
    }
    if (display.replace('-', '').length >= 8) return;
    setDisplay(display === '0' && label !== '.' ? label : display + label);
  };

  // Το πληκτρολόγιο οδηγεί τα ίδια πλήκτρα με το ποντίκι.
  useEffect(() => {
    const KEYS = {
      '/': '÷', '*': '×', '-': '-', '+': '+',
      Enter: '=', '=': '=', '.': '.', ',': '.',
      Escape: 'AC', Backspace: 'C', Delete: 'C',
    };
    const onKeyDown = (e) => {
      const key = /^[0-9]$/.test(e.key) ? e.key : KEYS[e.key];
      if (!key) return;
      e.preventDefault();
      handleButtonClick(key);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className='calculator'>
      <div className='calculator-header'>
        <span className='calculator-title'>Calculator</span>
        <span className='calculator-author'>by Apostolos Peiniris</span>
      </div>
      <Display value={display} operator={operator} firstNumber={firstNumber} />
      <ButtonPad onButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
