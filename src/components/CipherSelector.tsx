import React from 'react';

interface CipherSelectorProps {
  cipherType: string;
  onCipherChange: (cipherType: string) => void;
}

const CipherSelector: React.FC<CipherSelectorProps> = ({ cipherType, onCipherChange }) => {
  const ciphers = ['Caesar', 'Vigenere', 'Shift'];

  return (
    <div className="cipher-selector">
      <label>
        Select Cipher:
        <select
          value={cipherType}
          onChange={(e) => onCipherChange(e.target.value)}
        >
          {ciphers.map((cipher) => (
            <option key={cipher} value={cipher}>
              {cipher}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CipherSelector;
