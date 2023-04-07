import { useState, ChangeEventHandler } from 'react';
import './Input.css';

type InputValue = string | number;

type InputProps = {
    type?: string;
    defaultValue?: string | number;
    isColorDark?: boolean;
    isTiny?: boolean;
    spyValue?: (value?: InputValue, prevValue?: InputValue) => InputValue;
}

export const Input = ({
    type = 'text',
    defaultValue = '',
    isColorDark,
    isTiny,
    spyValue = (value) => value
}: InputProps) => {
    const [value, setValue] = useState<InputValue>(defaultValue);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newValue = spyValue(e.target.value, value);

        if(newValue === value) return;

        setValue(newValue);
    }

    return (
        <input
          type={type}
          className={`input ${isColorDark ? '-isColorDark' : ''} ${isTiny ? '-isTiny' : ''}`}
          value={value}
          onChange={handleOnChange}
        />
    )
}
