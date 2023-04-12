import { createRoot } from 'react-dom/client';

import { DynamicList } from "./DynamicList";
import { DeviceList } from './component/deviceList/DeviceList';

window.onload = () => {
    main()
}

var g_DeviceList: DynamicList;

function main() {
    g_DeviceList = new DynamicList(document.getElementById("rdm_device_list"))

    // Render React component
    const root = createRoot(document.getElementById('root'));
    root.render(<DeviceList />);
}
