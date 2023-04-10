import {
    ReactElement,
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import AutoSizer from "react-virtualized-auto-sizer";

import { RDM_Device } from "../../RDM_Device";
import { Server } from "../../Server";
import { DeviceRow } from '../deviceRow/DeviceRow';

// Create a memoized object for react-window's List component
const createItemData = memoize((filteredDevices, updateDeviceField) => ({
    filteredDevices,
    updateDeviceField,
}));

export const DeviceList = (): ReactElement => {
    const [devices, setDevices] = useState([]);
    const [filterBy, setFilterBy] = useState<'none' | 'Company NA' | 'TMB'>('none');
    const [sortBy, setSortBy] = useState<'none' | 'uid_integer' | 'address' | 'manufacturer'>('none');
    const server = useRef<Server>(null);
    // Disable horizontal scroll of react-window outer element
    const outerRef = useCallback((node: HTMLElement) => {
        if (node !== null) {
          node.style.overflowX = 'hidden';
        }
    }, []);

    useEffect(() => {
        // Init server
        server.current = new Server({
            device_added_callback: (device_data: RDM_Device) => {
                // Called when a new RDM Device has been discovered.
                // Create an RDM Device entry in the RDM Device List with the values in device_data.
                setDevices((devices) => [...devices, device_data])
            },
            device_updated_callback: (device_data: RDM_Device) => {
                // Called when an RDM Device parameter change is detected.
                // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
                setDevices((devices) => {
                    return devices.map((device) => {
                        if (device.uid === device_data.uid) return device_data;
                        return device;
                    });
                });
            }
        });

        // Add filter event handlers
        document.getElementById("filter_none").onclick = () => {
            setFilterBy('none');
        }

        document.getElementById("filter_na").onclick = () => {
            setFilterBy('Company NA');
        }

        document.getElementById("filter_tmb").onclick = () => {
            setFilterBy('TMB');
        }

        // Add sort event listeners
        document.getElementById("sort_uid").onclick = () => {
            setSortBy('uid_integer');
        }

        document.getElementById("sort_address").onclick = () => {
            setSortBy('address');
        }

        document.getElementById("sort_manufacturer").onclick = () => {
            setSortBy('manufacturer');
        }
    }, [])

    // Update device field and log the result to the console
    const updateDeviceField = (uid: string, field: string, value: any) => {
        const device = devices.find(device => device.uid === uid);

        if (device[field] !== value) {
            server.current.updateDeviceField(uid, field, value);
            console.log(`uid: "${uid}" - ${field}: "${value}"`);
        }
    }

    // Apply filter and sort to the devices
    const filteredDevices = devices
        .filter((device) => {
            if (filterBy === 'none') return true;
            return device.manufacturer === filterBy;
        })
        .sort((a, b) => {
            if (sortBy === 'none') {
                return 0;
            }

            if (a[sortBy] === b[sortBy]) {
                return a.uid_integer > b.uid_integer ? 1 : -1;
            }

            if (sortBy === 'uid_integer') {
                return a.uid_integer > b.uid_integer ? 1 : -1;
            }

            if (sortBy === 'address') {
                return a.address - b.address;
            }

            if (sortBy === 'manufacturer') {
                return a.manufacturer.localeCompare(b.manufacturer);
            }
        });

    const itemData = createItemData(filteredDevices, updateDeviceField);

    return (
        <>
            <span>RDM Device List ({filteredDevices.length}/{devices.length} | {filterBy} | {sortBy})</span>
            <div id="rdm_device_list">
                <table className="na-table" style={{ width: '100%', height: '100%' }}>
                    <thead>
                        <tr className="rdm-list-header na-table-header">
                            <th style={{ minWidth: '1rem', maxWidth: '1rem' }}></th>
                            <th style={{ minWidth: '8rem' }}>UID</th>
                            <th style={{ minWidth: '12rem' }}>LABEL</th>
                            <th style={{ minWidth: '8rem' }}>MANUFACTURER</th>
                            <th style={{ minWidth: '12rem' }}>MODEL</th>
                            <th style={{ minWidth: '12rem' }}>MODE</th>
                            <th style={{ minWidth: '6rem' }}>ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                  height={height}
                                  itemCount={filteredDevices.length}
                                  itemData={itemData}
                                  itemSize={27}
                                  width={width}
                                  outerRef={outerRef}
                                >
                                    {DeviceRow}
                                </List>
                            )}
                        </AutoSizer>
                    </tbody>
                </table>
            </div>
        </>
    )
};
