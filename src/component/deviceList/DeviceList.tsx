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
import { ToastContainer, toast } from 'react-toastify';

import { RDM_Device } from "../../RDM_Device";
import { Server } from "../../Server";
import { DeviceRow } from '../deviceRow/DeviceRow';

import 'react-toastify/dist/ReactToastify.min.css';

// Create a memoized object for react-window's List component
const createItemData = memoize((filteredDevices, updateDeviceField) => ({
    filteredDevices,
    updateDeviceField,
}));

export const DeviceList = (): ReactElement => {
    const [devices, setDevices] = useState<RDM_Device[]>([]);
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

        if (device[field as keyof RDM_Device] !== value) {
            server.current.updateDeviceField(uid, field, value);
            console.log(`uid: ${uid} - ${field}: ${value}`);
            toast.success(`${field} has been updated to ${value}`, {
                theme: "dark",
                draggable: false
            });
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
            <div id="test_frame" className="frame">
                <span>Test Functions</span>
                <div id="test_buttons_a">
                    <button id="add_1" className="na-button na-button-red">Add 1</button>
                    <button id="add_10" className="na-button na-button-red">Add 10</button>
                    <button id="add_100" className="na-button na-button-red">Add 100</button>
                    <button id="add_1000" className="na-button na-button-red">Add 1000</button>
                    <div className="na-button-separator"/>
                    <button id="all_online" className="na-button">All Online</button>
                    <button id="all_offline" className="na-button">All Offline</button>
                    <button id="random_online" className="na-button">Random Online/Offline</button>
                    <div className="na-button-separator"/>
                    <button id="filter_none" className="na-button na-button-green">Filter: None</button>
                    <button id="filter_na" className="na-button na-button-green">Filter: NA</button>
                    <button id="filter_tmb" className="na-button na-button-green">Filter: TMB</button>
                </div>
                <div id="test_buttons_b">
                    <button id="all_update" className="na-button">Update All</button>
                    <button id="first_10_update" className="na-button">Update First 10</button>
                    <button id="first_100_update" className="na-button">Update First 100</button>
                    <button id="random_update_50" className="na-button">Update Random 50%</button>
                    <button id="random_update_2" className="na-button">Update Random 2%</button>
                    <div className="na-button-separator"/>
                    <button id="sort_uid" className="na-button na-button-green">Sort By UID</button>
                    <button id="sort_address" className="na-button na-button-green">Sort By Address</button>
                    <button id="sort_manufacturer" className="na-button na-button-green">Sort By Manufacturer</button>
                </div>
            </div>
            <div id="list_frame" className="frame">
                <span>RDM Device List ({filteredDevices.length}/{devices.length} | {filterBy} | {sortBy})</span>
                <div id="rdm_device_list">
                    <div className="na-table">
                        <div className="rdm-list-header na-table-header na-table-row">
                            <span className="header-cell status-cell" />
                            <span className="header-cell uid-cell">UID</span>
                            <span className="header-cell label-cell">LABEL</span>
                            <span className="header-cell manufacturer-cell">MANUFACTURER</span>
                            <span className="header-cell model-cell">MODEL</span>
                            <span className="header-cell mode-cell">MODE</span>
                            <span className="header-cell address-cell">ADDRESS</span>
                        </div>
                        <div className="auto-sizer-wrapper">
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                    height={height || 100}
                                    itemCount={filteredDevices.length}
                                    itemData={itemData}
                                    itemSize={27}
                                    width={width || 100}
                                    outerRef={outerRef}
                                    >
                                        {DeviceRow}
                                    </List>
                                )}
                            </AutoSizer>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
};
