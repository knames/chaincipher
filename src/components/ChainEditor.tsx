import React from 'react';
import CipherSelector from './CipherSelector';

interface ChainEditorProps {
  chain: { type: string; key: string; shifts: number }[];
  addCipher: () => void;
  removeCipher: (index: number) => void;
  updateCipher: (index: number, field: string, value: string | number) => void;
}

const ChainEditor: React.FC<ChainEditorProps> = ({ chain, addCipher, removeCipher, updateCipher }) => {
  return (
    <div className="chain-editor">
      <h3>Cipher Chain</h3>
      {chain.map((cipher, index) => (
        <div key={index} className="cipher-step">
          <CipherSelector
            cipherType={cipher.type}
            onCipherChange={(value) => updateCipher(index, 'type', value)}
          />
          <label>
            Key:
            <input
              type="text"
              value={cipher.key}
              onChange={(e) => updateCipher(index, 'key', e.target.value)}
            />
          </label>
          <label>
            Shifts:
            <input
              type="number"
              value={cipher.shifts}
              onChange={(e) => updateCipher(index, 'shifts', parseInt(e.target.value, 10))}
            />
          </label>
          <button onClick={() => removeCipher(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addCipher}>Add Cipher</button>
    </div>
  );
};

export default ChainEditor;
