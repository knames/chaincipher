import React from 'react';

interface OutputDisplayProps {
  result: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  return (
    <div className="output-display">
      <h3>Result</h3>
      <p>{result}</p>
    </div>
  );
};

export default OutputDisplay;
