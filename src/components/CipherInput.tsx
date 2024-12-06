import React from 'react';

interface CipherInputProps {
  keyInput: string;
  text: string;
  shifts: number;
  onInputChange: (field: string, value: string | number) => void;
}

const CipherInput: React.FC<CipherInputProps> = ({ keyInput, text, shifts, onInputChange }) => {
  return (
    <div className="cipher-input">
      <label>
        Key:
        <input
          type="text"
          value={keyInput}
          onChange={(e) => onInputChange('keyInput', e.target.value)}
        />
      </label>
      <label>
        Text:
        <input
          type="text"
          value={text}
          onChange={(e) => onInputChange('text', e.target.value)}
        />
      </label>
      <label>
        Shifts:
        <input
          type="number"
          value={shifts}
          onChange={(e) => onInputChange('shifts', parseInt(e.target.value, 10))}
        />
      </label>
    </div>
  );
};

export default CipherInput;
