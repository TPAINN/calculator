const Display = ({ value, operator, firstNumber }) => {
  return (
    <div className="display-wrapper">
      <div className="display-expression">
        {firstNumber !== null && (
          <>
            <span className="expression-number">{firstNumber}</span>
            <span className="expression-operator">{operator}</span>
          </>
        )}
      </div>
      <div className={`display ${value === 'ERR' ? 'display-err' : ''}`}>
        {value}
      </div>
    </div>
  );
}

export default Display;
