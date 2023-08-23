import React,{useState} from "react";

const SerialComponent = ({keys}) => {
    const [serialPort, setSerialPort] = useState(null);

    const requestSerialPort = async () => {
        if ('serial' in navigator) {
            try {
                //Ask for a list of available serial ports
                const port = await navigator.serial.requestPort();
                setSerialPort(port);
            } catch (error) {
                console.log(`error requesting serial port: ${error}`);
            }
        } else {
            console.log('This browser does not support web serial');
        }
    }

    const sendData = async () => {
        if (serialPort) {
          try {
            await serialPort.open({ baudRate: 115200 });
            const writer = serialPort.writable.getWriter();
      
            // Convert the keys object to a JSON string
            const keysJson = JSON.stringify(keys);
      
            // Convert the JSON string to an array of bytes (Uint8Array)
            const encoder = new TextEncoder();
            const data = encoder.encode(keysJson);
      
            await writer.write(data);
            writer.releaseLock();
          } catch (error) {
            console.log(`Error sending data: ${error}`);
          }
        } else {
          console.log('No serial port is opened.');
        }
      }
      

    return (
        <div className="usb-interaction">
            <h1 className="grid-col-span-2">Connect to the Macro Board</h1>
            <button className="requestSerialDevice button-styles" onClick={requestSerialPort}>Request Serial Device</button>
            <button className="sendData button-styles" onClick={sendData} disabled={!serialPort}>Send Data</button>
        </div>
    )
}

export default SerialComponent;