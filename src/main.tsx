import { createRoot } from 'react-dom/client';

import { DeviceList } from './component/deviceList/DeviceList';

window.onload = () => {
    main()
}

function main() {
    // Render React component
    const root = createRoot(document.getElementById('root'));
    root.render(<DeviceList />);
}
