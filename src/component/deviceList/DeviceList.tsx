import {
    ReactElement,
    useEffect,
    useState,
    useRef
} from 'react';

import { RDM_Device } from "../../RDM_Device";
import { Server } from "../../Server";
import { Input } from '../input/Input';
import { Select } from '../select/Select';

export const DeviceList = (): ReactElement => {
    const [devices, setDevices] = useState([]);
    const server = useRef<Server>(null);

    useEffect(() => {
        server.current = new Server({
            device_added_callback: (device_data: RDM_Device) => {
                // Called when a new RDM Device has been discovered.
                // Create an RDM Device entry in the RDM Device List with the values in device_data.
                console.log("Add Device", device_data);
                setDevices((devices) => [...devices, device_data])
            },
            device_updated_callback: (device_data: RDM_Device) => {
                // Called when an RDM Device parameter change is detected.
                // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
                console.log("Update Device", device_data)
                setDevices((devices) => {
                    return devices.map((device) => {
                        if (device.uid === device_data.uid) return device_data;
                        return device;
                    });
                });
            }
        })
    }, [])

    /**
     * Update device field and log the result to the console
     */
    const updateDeviceField = (uid: string, field: string, value: any) => {
        const device = devices.find(device => device.uid === uid);

        if (device[field] !== value) {
            server.current.updateDeviceField(uid, field, value);
            console.log(`uid: "${uid}" - ${field}: "${value}"`);
        }
    }

    return (
        <>
            <span>RDM Device List (${'FILTER_VISIBLE_COUNT'}/${'DEVICE_COUNT'} | ${'FILTER_MODE'} | ${'SORT_MODE'})</span>
            <div id="rdm_device_list">
                <table className="na-table" style={{ width: '100%' }}>
                    <thead>
                        <tr className="rdm-list-header na-table-header">
                            <th style={{ minWidth: '1rem', maxWidth: '1rem' }}></th>
                            <th style={{ minWidth: '6rem', maxWidth: '6rem' }}>UID</th>
                            <th style={{ minWidth: '12rem' }}>LABEL</th>
                            <th style={{ minWidth: '8rem' }}>MANUFACTURER</th>
                            <th style={{ minWidth: '12rem' }}>MODEL</th>
                            <th style={{ minWidth: '12rem' }}>MODE</th>
                            <th style={{ minWidth: '6rem' }}>ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.uid}>
                                <td
                                    style={{ minWidth: '1rem', maxWidth: '1rem' }}
                                    className={`rdm-list-status-cell ${device.is_online ? '-online' : '-offline'}`}
                                />
                                <td style={{ minWidth: '6rem', maxWidth: '6rem' }}>{device.uid}</td>
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
                                      onBlur={(value) => updateDeviceField(device.uid, 'address', value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};
