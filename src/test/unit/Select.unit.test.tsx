import {render, screen} from '../util/util';
import { Select } from '../../component/select/Select';

it('should render the component', () => {
    render(<Select />);

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
});

it('should select the defaultValue by default', () => {
    const options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ]
    const defaultOption = options[1];
    render(<Select options={options} defaultValue={defaultOption.value} />);

    const element = screen.getByText(defaultOption.label);

    expect(element).toBeInTheDocument();
});

it('should run onChange prop', async () => {
    const options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ]
    const onChange = jest.fn();
    const optionToSelect = options[1];
    const {user} = render(<Select options={options} onChange={onChange} />);

    // Open the select menu by clicking on it
    const select = screen.getByRole('combobox');
    await user.click(select);

    // Select the second option
    const option = screen.getByText(optionToSelect.label);
    await user.click(option);

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(optionToSelect);
});

it('should change value', async () => {
    const options = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
    ]
    const optionToSelect = options[1];
    const {user} = render(<Select options={options} />);

    // Open the select menu by clicking on it
    const select = screen.getByRole('combobox');
    await user.click(select);

    // Select the second option
    const option = screen.getByText(optionToSelect.label);
    await user.click(option);

    // The selected value should be in the document
    const element = screen.getByText(optionToSelect.label);

    expect(element).toBeInTheDocument();
});
