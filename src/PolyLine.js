import { ns, color, strokeWidth } from './chart.config';
import eventEmitter from './eventEmitter';

export default class PolyLine {
    constructor(routes) {
        this.routes = routes;
        this.points = this.createPolyLinePoints(routes.slice(0, 1));
        this.el = this.createPolyLineElement();
        eventEmitter.on('next', this.onNextStop.bind(this));
        eventEmitter.on('restart', this.onFinished.bind(this));
    }
    onNextStop(destination) {
        const {x, y} = destination.position;
        this.points += ` ${x},${y}`;
        this.el.setAttributeNS(null, 'points', this.points);
    }
    onFinished() {
        // Taking the path points and extrating the first two values
        const [initial, firstStop] = this.points.split(' ');
        
        // If firstStop falsy, then it hasn't made a round trip
        if (!firstStop) return;
        this.points = `${initial} ${firstStop}`;
    }
    createPolyLineElement() {
        const el = document.createElementNS(ns, 'polyline');
        el.setAttributeNS(null, 'fill', 'none');
        el.setAttributeNS(null, 'stroke', color.line);
        el.setAttributeNS(null, 'stroke-width', strokeWidth);
        el.setAttributeNS(null, 'points', this.points);
        return el;
    }
    createPolyLinePoints(routes) {
        return routes.reduce((all, { x, y }) => (all += `${x},${y} `), '').trim();
    }
}