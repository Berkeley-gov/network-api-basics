import dns from 'dns';
import operatingSystem from 'os';
import networkSpeedDiagnostics from 'network-speed';

const localNetworkList = operatingSystem.networkInterfaces();
const networkSpeed = new networkSpeedDiagnostics();

export default class Network {
    constructor() {}

    // Runs a general network diagnostics on the local machine.    
    runNetworkGeneralDiagnostics()  {
        const networkList = localNetworkList.bridge0[0];

        console.log(`\n--- NETWORK DIAGNOSTICS ---`);
        console.table(networkList);
    }

    async runNetworkDiagnostics() {
       // Checks internet connectivity by running lookup service on google dns server.
       try {
        dns.lookupService('8.8.8.8', 53, async (error, hostname, service) => {
            if(error) {
                console.log('Internet connection is not active: ', error);
            }

            console.log(`\n--- SYSTEMS CHECK ---`);
            const operatingSystemDetails = {
                internetConnectivityStatus: 'Connection Status Online',
                systemHostName: operatingSystem.hostname(),
                cpuArchType: operatingSystem.arch(),
                operatingSystem: operatingSystem.type(),
                serviceType: service
            };
            console.table(operatingSystemDetails);
        }); 
       } catch(error) {
            console.log(`Network diganostic failed: ${error}`);
       }
    }

    // Runs a network speed diagnostics on download speeds.
    async runNetworkDownloadSpeedDiagnostics() {
        const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
        const fileSizeInBytes = 500000;
        const speed = await networkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);

        console.log(`\n--- DOWNLOAD SPEED DIAGNOSTICS ---`);
        console.table(speed);
    };

    // Runs a network speed diagnistics on upload speeds.
    async runNetworkUploadSpeed() { 
        const options = {
            hostname: 'www.google.com',
            port: 80,
            path: '/catchers/544b09b4599c1d0200000289',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fileSizeInBytes = 2000000;
        const speed = await networkSpeed.checkUploadSpeed(options, fileSizeInBytes).catch(error => console.log(error));
        
        console.log(`\n--- UPLOAD SPEED DIAGNOSTICS ---`);
        console.table(speed);
    }
}

