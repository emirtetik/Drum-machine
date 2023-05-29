import React, { useState, useEffect, useCallback } from 'react';
import "../styles/styles.css";

const drumPadsBank1 = [
  { id: 'Heater-1', key: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', description: 'Heater 1' },
  { id: 'Heater-2', key: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', description: 'Heater 2' },
  { id: 'Heater-3', key: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', description: 'Heater 3' },
  { id: 'Heater-4_1', key: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', description: 'Heater 4' },
  { id: 'Clap', key: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', description: 'Clap' },
  { id: 'Open-HH', key: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', description: 'Open-HH' },
  { id: 'Kick-n-Hat', key: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', description: 'Kick-n-Hat' },
  { id: 'Kick', key: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', description: 'Kick' },
  { id: 'Closed-HH', key: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', description: 'Closed-HH' }
];

const drumPadsBank2 = [
  { id: 'Chord-1', key: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', description: 'Chord 1' },
  { id: 'Chord-2', key: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', description: 'Chord 2' },
  { id: 'Chord-3', key: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', description: 'Chord 3' },
  { id: 'Shaker', key: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', description: 'Shaker' },
  { id: 'Open-HH', key: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', description: 'Open-HH' },
  { id: 'Closed-HH', key: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', description: 'Closed-HH' },
  { id: 'Punchy-Kick', key: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', description: 'Punchy Kick' },
  { id: 'Side-Stick', key: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', description: 'Side Stick' },
  { id: 'Snare', key: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', description: 'Snare' }
];

const DrumPad = ({ pad, power, updateDisplay }) => {
  const [active, setActive] = useState(false);

  const playSound = useCallback(() => {
    if (power) {
      const audio = document.getElementById(pad.key);
      audio.currentTime = 0;
      audio.play();
      setActive(true);
      setTimeout(() => setActive(false), 100);
      updateDisplay(pad.description);
    }
  }, [pad.key, power, pad.description, updateDisplay]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (power && e.key.toUpperCase() === pad.key) {
        playSound();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [pad.key, power, playSound]);

  return (
    <div className={`drum-pad ${active ? 'active' : ''}`} onClick={playSound} tabIndex="0">
      {pad.key}
      <audio id={pad.key} className="clip" src={pad.src} />
    </div>
  );
};

const DrumMachine = () => {
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(1);
  const [displayText, setDisplayText] = useState('');

  const drumPads = bank === 1 ? drumPadsBank1 : drumPadsBank2;

  const updateDisplay = (text) => {
    setDisplayText(text);
  };

  const togglePower = () => {
    setPower(!power);
    updateDisplay(power ? '' : 'Power Off');
  };

  const toggleBank = () => {
    setBank(bank === 1 ? 2 : 1);
    updateDisplay('');
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <DrumPad key={pad.id} pad={pad} power={power} updateDisplay={updateDisplay} />
        ))}
      </div>
      <div className="controls">
        <button className={`btn-danger ${power ? 'on' : 'off'}`} onClick={togglePower}>
          {power ? 'Power On' : 'Power Off'}
        </button>
        <button className="btn" onClick={toggleBank}>
          Bank {bank}
        </button>
        
      </div>
    </div>
  );
};

export default DrumMachine;
