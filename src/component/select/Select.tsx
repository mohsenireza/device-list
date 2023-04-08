import { ReactElement, useState } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';

type OptionType = {
    value: string;
    label: string;
};

type SelectProps = {
    defaultValue?: string;
    options?: OptionType[]
};

export const Select = ({
    defaultValue = '',
    options = []
}: SelectProps): ReactElement => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (option: OptionType) => {
        setValue(option.value);
    };

    const styles: StylesConfig = {
        container: (baseStyles) => ({
            ...baseStyles,
            height: '1.35rem'
        }),
        control: (baseStyles) => ({
            ...baseStyles,
            height: '100%',
            minHeight: 'unset',
            backgroundColor: 'var(--input_background)',
            borderColor: 'var(--button_light_bg)',
            borderRadius: 0,
            boxShadow: '2px 0px 3px 0px var(--black)',
            cursor: 'pointer'
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
            height: '100%',
            paddingBlock: 0
        }),
        indicatorsContainer: (baseStyles) => ({
            ...baseStyles,
            height: '100%'
        }),
        indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            display: 'none'
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            marginBlock: 0,
            paddingBlock: 0
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: 'var(--white)'
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'var(--white)'
        }),
        dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            padding: 0,
            'svg': {
                fill: 'var(--text_dark)'
            }
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: 'var(--button_ol)',
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? 'var(--lighter_bg)' : state.isFocused ? 'var(--button_disabled)' : 'transparent',
            cursor: 'pointer'
        })
    };

    return (
        <ReactSelect
          value={options.filter(option => option.value === value)}
          onChange={handleChange}
          options={options}
          styles={styles}
          isSearchable={false}
        />
    )
}
