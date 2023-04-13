import { memo, FC } from 'react';
import {
    ListChildComponentProps,
    areEqual
} from 'react-window';
import { toast } from 'react-toastify';

import { Input } from '../input/Input';
import { Select } from '../select/Select';

export const DeviceRow: FC<ListChildComponentProps> = memo(({ data, index, style }) => {
    const { filteredDevices, updateDeviceField } = data;
    const {
        is_online,
        uid,
        label,
        manufacturer,
        model,
        mode_index,
        mode_count,
        address
    } = filteredDevices[index];

    return (
        <div style={style} className="na-table-row" data-testid="tableRow">
            <span
                className={`body-cell status-cell ${is_online ? '-online' : '-offline'}`}
            />
            <span className="body-cell uid-cell">{uid}</span>
            <span className="body-cell label-cell">
                <Input
                  defaultValue={label}
                  isColorDark
                  onBlur={(value) => updateDeviceField(uid, 'label', value)}
                />
            </span>
            <span className="body-cell manufacturer-cell">{manufacturer}</span>
            <span className="body-cell model-cell">{model}</span>
            <span className="body-cell mode-cell">
                <Select
                  defaultValue={mode_index}
                  options={[...new Array(mode_count)].map((_, index) => ({
                    value: index,
                    label: `Mode #${index}`
                  }))}
                  onChange={(option) => updateDeviceField(uid, 'mode_index', option.value)}
                />
            </span>
            <span className="body-cell address-cell">
                <Input
                  type='number'
                  defaultValue={address}
                  isTiny
                  onBlur={(value) => {
                    const address = Number(value);

                    if (address < 1 || address > 512 || !Number.isInteger(address)) {
                      toast.error('Please use integers from 1 to 512', {
                        theme: "dark",
                        draggable: false
                      });
                      return;
                    }

                    updateDeviceField(uid, 'address', address);
                  }}
                />
            </span>
        </div>
    );
}, areEqual);
