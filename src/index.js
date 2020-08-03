// Data
import { 
    points40, 
    points200, 
    points500
} from '../data.json';

// Components
import Chart from './Chart';
import SideData from './SideData';

const routes = points40;
const root = document.getElementById('root');
const { el, vehicle } = new Chart(routes);

new SideData();

root.appendChild(el);

const buttonNext = document.getElementById('button-next');
buttonNext.addEventListener('click', vehicle.moveToNextPosition.bind(vehicle));

// Fade in the body
document.body.style = null;
