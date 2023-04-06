import { DynamicList } from "./DynamicList";
import { RDM_Device } from "./RDM_Device";
import { Server } from "./Server";

window.onload = () => {
    main()
}

var g_Server: Server;
var g_DeviceList: DynamicList;

function main() {
    g_Server = new Server({
        device_added_callback: (device_data: RDM_Device) => {
            // Called when a new RDM Device has been discovered.
            // Create an RDM Device entry in the RDM Device List with the values in device_data.
            console.log("Add Device", device_data)
        },
        device_updated_callback: (device_data: RDM_Device) => {
            // Called when an RDM Device parameter change is detected.
            // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.
            console.log("Update Device", device_data)
        }
    })

    // Use Server.GetDeviceCount() to get number of devices in backend device list
    console.log("Current Device Count: ", g_Server.GetDeviceCount())
    // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)
    console.log("First Device: ", g_Server.GetDeviceByIndex(0))

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
}
