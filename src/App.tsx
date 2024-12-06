import React, { useState, useEffect } from 'react';

// Vigenère Cipher Function
const vigenereCipher = (text: string, key: string, encrypt: boolean = true): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const textUpper = text.toUpperCase();
  const keyUpper = key.toUpperCase();
  const keyLength = keyUpper.length;

  if (keyLength === 0) {
    return text; // If key is empty, return the original text
  }

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < textUpper.length; i++) {
    const char = textUpper[i];

    if (alphabet.includes(char)) {
      const charIndex = alphabet.indexOf(char);
      const shift = alphabet.indexOf(keyUpper[keyIndex]);
      const newIndex = encrypt
        ? (charIndex + shift) % alphabet.length
        : (charIndex - shift + alphabet.length) % alphabet.length;

      result += alphabet[newIndex];
      keyIndex = (keyIndex + 1) % keyLength;
    } else {
      result += char;
    }
  }

  return result;
};

// Caesar Cipher Function
const caesarCipher = (
  text: string,
  shift: number,
  letters: string,
  encrypt: boolean = true
): string => {
  if (letters.length === 0) {
    return text; // If no letters are provided, return the original text
  }

  const effectiveShift = encrypt ? shift : -shift;
  const length = letters.length;

  return text
    .split('')
    .map((char) => {
      const index = letters.indexOf(char);
      if (index === -1) return char; // Keep characters not in `letters` unchanged

      const newIndex = (index + effectiveShift + length) % length;
      return letters[newIndex];
    })
    .join('');
};

// React Component
const App: React.FC = () => {
  const [text, setText] = useState('HELLO WORLD');
  const [cipherType, setCipherType] = useState<'vigenere' | 'caesar'>('vigenere');
  const [key, setKey] = useState('KEY'); // For Vigenère cipher
  const [shift, setShift] = useState(3); // For Caesar cipher
  const [letters, setLetters] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // For Caesar cipher
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [ciphers, setCiphers] = useState<
    { type: 'vigenere' | 'caesar'; config: any }[]
  >([]);
  const [results, setResults] = useState<string[]>([]);

  // Add a new cipher to the chain
  const addCipher = () => {
    const config =
      cipherType === 'vigenere'
        ? { key, mode }
        : { shift, letters, mode };

    setCiphers((prev) => [
      ...prev,
      {
        type: cipherType,
        config,
      },
    ]);
  };

  // Remove a specific cipher from the chain
  const removeCipher = (index: number) => {
    setCiphers((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset all settings
  const resetAll = () => {
    setText('');
    setCipherType('vigenere');
    setKey('');
    setShift(3);
    setLetters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    setMode('encode');
    setCiphers([]);
    setResults([]);
  };

  // Apply the chain of ciphers dynamically
  useEffect(() => {
    let currentText = text;
    const newResults: string[] = [];

    ciphers.forEach((cipher) => {
      const { type, config } = cipher;

      if (type === 'vigenere') {
        currentText = vigenereCipher(
          currentText,
          config.key,
          config.mode === 'encode'
        );
      } else if (type === 'caesar') {
        currentText = caesarCipher(
          currentText,
          config.shift,
          config.letters,
          config.mode === 'encode'
        );
      }

      newResults.push(currentText);
    });

    setResults(newResults);
  }, [text, ciphers]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cipher Tool</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Initial Text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginLeft: '10px', width: '300px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Cipher Type:
          <select
            value={cipherType}
            onChange={(e) => setCipherType(e.target.value as 'vigenere' | 'caesar')}
          >
            <option value="vigenere">Vigenère Cipher</option>
            <option value="caesar">Caesar Cipher</option>
          </select>
        </label>
      </div>

      {cipherType === 'vigenere' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            Key:
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
      )}

      {cipherType === 'caesar' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Shift:
              <input
                type="number"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value, 10))}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Letters:
              <input
                type="text"
                value={letters}
                onChange={(e) => setLetters(e.target.value)}
                style={{ marginLeft: '10px', width: '300px' }}
              />
            </label>
          </div>
        </>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label>
          Mode:
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
            style={{ marginLeft: '10px' }}
          >
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
        </label>
      </div>

      <button onClick={addCipher} style={{ padding: '10px 20px', marginRight: '10px' }}>
        Add Cipher
      </button>

      <button onClick={resetAll} style={{ padding: '10px 20px', marginRight: '10px' }}>
        Reset All
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Cipher Chain:</h3>
        <ul>
          {ciphers.map((cipher, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{cipher.type.toUpperCase()}:</strong> {JSON.stringify(cipher.config)} <br />
              <button
                onClick={() => removeCipher(index)}
                style={{ marginTop: '5px', padding: '5px 10px' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Results at Each Step:</h3>
        <ul>
          <li>
            <strong>Original Text:</strong> {text}
          </li>
          {results.map((result, index) => (
            <li key={index}>
              <strong>Step {index + 1}:</strong> {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
