import { memo, FC } from 'react';
import {
    ListChildComponentProps,
    areEqual
} from 'react-window';

import { Input } from '../input/Input';
import { Select } from '../select/Select';

export const DeviceRow: FC<ListChildComponentProps> = memo(({ data, index, style }) => {
    const { filteredDevices, updateDeviceField } = data;
    const device = filteredDevices[index];

    return (
        <tr style={style}>
            <td
                style={{ minWidth: '1rem', maxWidth: '1rem' }}
                className={`rdm-list-status-cell ${device.is_online ? '-online' : '-offline'}`}
            />
            <td style={{ minWidth: '8rem' }}>{device.uid}</td>
            <td style={{ minWidth: '12rem' }}>
                <Input
                  defaultValue={device.label}
                  isColorDark
                  onBlur={(value) => updateDeviceField(device.uid, 'label', value)}
                />
            </td>
            <td style={{ minWidth: '8rem' }}>{device.manufacturer}</td>
            <td style={{ minWidth: '12rem' }}>{device.model}</td>
            <td style={{ minWidth: '12rem' }}>
                <Select
                  defaultValue={device.mode_index}
                  options={[...new Array(device.mode_count)].map((_, index) => ({
                    value: index,
                    label: `Mode #${index}`
                  }))}
                  onChange={(option) => updateDeviceField(device.uid, 'mode_index', option.value)}
                />
            </td>
            <td style={{ minWidth: '6rem' }}>
                <Input
                  type='number'
                  defaultValue={device.address}
                  isTiny
                  spyValue={(value, prevValue) => {
                    // Only accepts integer numbers from 1 to 512
                    if (value === '') return 1;
                    if (Number(value) < 1 || Number(value) > 512 || String(value).match(/[^\d]/)) return prevValue;
                    return value;
                  }}
                  onBlur={(value) => updateDeviceField(device.uid, 'address', Number(value))}
                />
            </td>
        </tr>
    );
}, areEqual);
