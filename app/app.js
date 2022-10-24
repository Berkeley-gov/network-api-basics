import Network from './network/Network.js';
import Weather from './weather/Weather.js';

const localNetwork = new Network();
const localWeather = new Weather();

localNetwork.runNetworkDiagnostics();
localNetwork.runNetworkGeneralDiagnostics();
localNetwork.runNetworkDownloadSpeedDiagnostics();
localNetwork.runNetworkUploadSpeed();
localWeather.runWeatherDiagnostics();

