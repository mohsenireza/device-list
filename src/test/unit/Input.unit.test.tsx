import { render, screen } from '../util/util';
import { Input } from '../../component/input/Input';

it('should render the component', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
});

it('should run onBlur prop', async () => {
    const onBlur = jest.fn();
    const { user } = render(<Input onBlur={onBlur} />);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.click(document.body);

    expect(onBlur).toBeCalledTimes(1);
});

it('should have -isTiny class if isTiny prop is provided', () => {
    render(<Input isTiny />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('-isTiny');
});

it('should have -isColorDark class if isColorDark prop is provided', () => {
    render(<Input isColorDark />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('-isColorDark');
});

it('should have default value', () => {
    const defaultValue = 'defaultValue';
    render(<Input defaultValue={defaultValue} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(defaultValue);
});

it('should update value if defaultValue changes', () => {
    const defaultValue = 'defaultValue';
    const { rerender } = render(<Input defaultValue={defaultValue} />);

    const newDefaultValue = 'newDefaultValue';
    rerender(<Input defaultValue={newDefaultValue} />)

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(newDefaultValue);
});

it('should render input type number', () => {
    const type = 'number';
    render(<Input type={type} />);

    const input: HTMLInputElement = screen.getByRole('spinbutton');

    expect(input.type).toBe(type);
});
