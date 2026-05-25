import Button from './Button';

const getClassName = (label) => {
  if (['AC', 'C', '±'].includes(label)) return 'button btn-gray';
  if (['÷', '×', '-', '+', '='].includes(label)) return 'button btn-orange';
  return 'button';
};

const buttons = [
    'AC', 'C', '±', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
];

function ButtonPad({ onButtonClick }) {
    return (
        <div className='button-pad'>
            {buttons.map((label) => (
                <Button key={label} label={label} onClick={() => onButtonClick(label)} className={getClassName(label)} />
            ))}
        </div>
    );
}

export default ButtonPad;