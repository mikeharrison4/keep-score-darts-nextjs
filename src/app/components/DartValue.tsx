import React from 'react';

type DartValueProps = {
  value: number;
  onClick: (value: number) => void;
  disabled: boolean;
};

function DartValue({ value, onClick, disabled }: DartValueProps) {
  return (
    <button
      key={value}
      value={value}
      onClick={() => onClick(value)}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default DartValue;
