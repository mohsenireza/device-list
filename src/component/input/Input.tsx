import {
    useState,
    useEffect,
    ChangeEventHandler,
    FocusEventHandler
} from 'react';

import './Input.css';

export type InputValue = string | number;

type InputProps = {
    type?: string;
    defaultValue?: string | number;
    isColorDark?: boolean;
    isTiny?: boolean;
    onBlur?: (value: InputValue) => void
}

export const Input = ({
    type = 'text',
    defaultValue = '',
    isColorDark,
    isTiny,
    onBlur = () => {}
}: InputProps) => {
    const [value, setValue] = useState<InputValue>(defaultValue);

    // Update the UI when a device gets updated
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        onBlur(value);
    }

    return (
        <input
          type={type}
          className={`input ${isColorDark ? '-isColorDark' : ''} ${isTiny ? '-isTiny' : ''}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
    )
}
