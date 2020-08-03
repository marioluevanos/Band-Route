import { ns } from './chart.config';
import Distances from './Distances';
import vehicle from './assets/vehicle.png';
import eventEmitter from './eventEmitter';

const size = 82;

export default class Vehicle {
    constructor(routes) {
        this.currentIndex = 0;
        this.el = this.createVehicle();
        this.routes = routes;
        this.manifest = new Distances(routes);
        this.manifest.markVisitedLocation(this.currentIndex);
        this.updateCoords(routes[this.currentIndex]);
    }
    createVehicle() {
        const el = document.createElementNS(ns, 'image');
        el.setAttributeNS(null, 'width', size);
        el.setAttributeNS(null, 'height', size);
        el.setAttributeNS(null, 'href', vehicle);
        el.setAttributeNS(null, 'id', 'vehicle');
        return el;
    }
    updateCoords({ x, y } = { x: 0, y: 0 }) {
        this.el.setAttributeNS(null, 'x', x - size / 2);
        this.el.setAttributeNS(null, 'y', y - size / 2);
    }
    moveToNextPosition() {
        const { destination = {} } = this.manifest.getNextLocationFrom(this.currentIndex);
        this.currentIndex = destination.index;
        this.updateCoords(destination.position);
        this.manifest.markVisitedLocation(destination.index);
        eventEmitter.emit('next', destination);
    }
}
