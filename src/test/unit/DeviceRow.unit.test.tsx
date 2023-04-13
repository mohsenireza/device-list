import { render, screen } from '../util/util';
import { RDM_Device } from '../../RDM_Device';
import { DeviceRow } from '../../component/deviceRow/DeviceRow';

it('should show the data', () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    render(<DeviceRow data={data} index={index} style={style} />);

    const uid = screen.getByText(filteredDevices[0].uid);
    const label = screen.getByDisplayValue(filteredDevices[0].label)
    const manufacturer = screen.getByText(filteredDevices[0].manufacturer);
    const model = screen.getByText(filteredDevices[0].model);
    const mode = screen.getByText(`Mode #${filteredDevices[0].mode_index}`);
    const address = screen.getByDisplayValue(filteredDevices[0].address);

    expect(uid).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(manufacturer).toBeInTheDocument();
    expect(model).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
    expect(address).toBeInTheDocument();
});

it('should contain .mode_count number of options in the mode select input', async () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    const { user } = render(<DeviceRow data={data} index={index} style={style} />);

    // Open the select menu by clicking on it
    const modeSelect = screen.getByText(`Mode #${filteredDevices[0].mode_index}`);
    await user.click(modeSelect);

    // {mode_count} number options should be available
    for (let i = 0; i < filteredDevices[0].mode_count; i++) {
        const modeOption = screen.getAllByText(`Mode #${i}`)[0];
        expect(modeOption).toBeInTheDocument();
    }
});

it('status cell should have -online class', () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    render(<DeviceRow data={data} index={index} style={style} />);

    const statusCell = document.querySelector('.status-cell');

    expect(statusCell).toHaveClass('-online');
});

it('status cell should have -offline class', () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: false,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    render(<DeviceRow data={data} index={index} style={style} />);

    const statusCell = document.querySelector('.status-cell');

    expect(statusCell).toHaveClass('-offline');
});

it('should update label', async () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    const { user } = render(<DeviceRow data={data} index={index} style={style} />);

    // Type in label input and blur it by clicking outside of the input
    const input: HTMLInputElement = screen.getByDisplayValue(filteredDevices[0].label)
    const newLabelText = 'newLabelText';
    await user.clear(input);
    await user.type(input, newLabelText);
    await user.click(document.body);

    expect(updateDeviceField).toBeCalledTimes(1);
    expect(updateDeviceField).toBeCalledWith(filteredDevices[0].uid, 'label', newLabelText);
});

it('should update mode', async () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    const { user } = render(<DeviceRow data={data} index={index} style={style} />);

    // Open the select menu by clicking on it and select another mode
    const modeSelect = screen.getByText(`Mode #${filteredDevices[0].mode_index}`);
    await user.click(modeSelect);
    const modeOption = screen.getByText(`Mode #2`);
    await user.click(modeOption);

    expect(updateDeviceField).toBeCalledTimes(1);
    expect(updateDeviceField).toBeCalledWith(filteredDevices[0].uid, 'mode_index', 2);
});

it('should update address', async () => {
    const filteredDevices: RDM_Device[] = [
        {
            is_online: true,
            uid_integer: BigInt(0x4E4100000000),
            uid: '4E4100000001',
            label: 'Device 1',
            manufacturer: 'Manufacturer',
            model: 'Test Device',
            mode_index: 1,
            mode_count: 16,
            address: 1
        }
    ];
    const updateDeviceField = jest.fn();
    const data = { filteredDevices, updateDeviceField };
    const index = 0;
    const style = {};
    const { user } = render(<DeviceRow data={data} index={index} style={style} />);

    // Type in address input and blur it by clicking outside of the input
    const input: HTMLInputElement = screen.getByDisplayValue(filteredDevices[0].address)
    await user.type(input, '1');
    await user.click(document.body);

    expect(updateDeviceField).toBeCalledTimes(1);
    expect(updateDeviceField).toBeCalledWith(filteredDevices[0].uid, 'address', 11);
});
