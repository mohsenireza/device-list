import { createRoot } from 'react-dom/client';

import { DynamicList } from "./DynamicList";
import { DeviceList } from './component/deviceList/DeviceList';

window.onload = () => {
    main()
}

var g_DeviceList: DynamicList;

function main() {

    document.getElementById("filter_none").onclick = () => {
        console.log("Set DynamicList filter to show all devices")
    }

    document.getElementById("filter_na").onclick = () => {
        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "Company NA"')
    }

    document.getElementById("filter_tmb").onclick = () => {
        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == "TMB"')
    }

    document.getElementById("sort_uid").onclick = () => {
        console.log("Set DynamicList sort mode to RDM_Device.uid_value")
    }

    document.getElementById("sort_address").onclick = () => {
        console.log("Set DynamicList sort mode to RDM_Device.address")
    }

    document.getElementById("sort_manufacturer").onclick = () => {
        console.log("Set DynamicList sort mode to RDM_Device.manufacturer")
    }

    g_DeviceList = new DynamicList(document.getElementById("rdm_device_list"))

    // Render React component
    const domNode = document.getElementById('list_frame');
    const root = createRoot(domNode);
    root.render(<DeviceList />);
}
