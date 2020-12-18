/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AAppGprspp from './AppGprs';
import {name as appName} from './app.json';
import Identitas from './components/screen/Identitas';

AppRegistry.registerComponent(appName, () => Identitas);
