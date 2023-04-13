import { render, screen } from '../util/util';
import { DeviceList } from '../../component/deviceList/DeviceList';

it('add 1 button should work', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 1 button
    const addButton = screen.getByRole('button', {name: 'Add 1'});
    await user.click(addButton);

    // Check the new data
    const rows = document.querySelectorAll('.na-table-row');
    expect(rows.length).toBeGreaterThan(1);
});

it('add 10 button should work', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 10 button
    const addButton = screen.getByRole('button', {name: 'Add 10'});
    await user.click(addButton);

    // Check the new data
    const rows = document.querySelectorAll('.na-table-row');
    expect(rows.length).toBeGreaterThan(1);
});

it('add 100 button should work', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 100 button
    const addButton = screen.getByRole('button', {name: 'Add 100'});
    await user.click(addButton);

    // Check the new data
    const rows = document.querySelectorAll('.na-table-row');
    expect(rows.length).toBeGreaterThan(1);
});

it('should update label', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 1 button
    const addButton = screen.getByRole('button', {name: 'Add 1'});
    await user.click(addButton);

    // Edit input value
    const input = screen.getByDisplayValue('Device 1');
    await user.clear(input);
    await user.type(input, 'new text');
    await user.click(document.body);

    const toast = screen.getByText('label has been updated to new text');
    expect(toast).toBeInTheDocument();
});

it('should update mode', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 1 button
    const addButton = screen.getByRole('button', {name: 'Add 1'});
    await user.click(addButton);

    // Open the select menu by clicking on it
    const select = screen.getByRole('combobox');
    await user.click(select);

    // Select the second option
    const option = screen.getByText('Mode #2');
    await user.click(option);

    const toast = screen.getByText('mode_index has been updated to 2');
    expect(toast).toBeInTheDocument();
});

it('should update address', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 1 button
    const addButton = screen.getByRole('button', {name: 'Add 1'});
    await user.click(addButton);

    // Edit input value
    const input = screen.getByDisplayValue('1');
    await user.clear(input);
    await user.type(input, '2');
    await user.click(document.body);

    const toast = screen.getByText('address has been updated to 2');
    expect(toast).toBeInTheDocument();
});

it('should validate address value', async () => {
    const { user } = render(<DeviceList />)

    // Click on Add 1 button
    const addButton = screen.getByRole('button', {name: 'Add 1'});
    await user.click(addButton);

    // Edit input value
    const input = screen.getByDisplayValue('1');
    await user.clear(input);
    await user.type(input, '513');
    await user.click(document.body);

    const toast = screen.getByText('Please use integers from 1 to 512');
    expect(toast).toBeInTheDocument();
});
