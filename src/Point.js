import { ns, pointRadius } from './chart.config';
import eventEmitter from './eventEmitter';

export default class Point {
    constructor(coords, idx) {
        this.el = this.createPoint(coords, idx);
        eventEmitter.on('next', this.onNext.bind(this));
        eventEmitter.on('restart', this.onRestart.bind(this));
    }
    createPoint({x, y}, idx) {
        const el = document.createElementNS(ns, 'circle');
        el.setAttributeNS(null, 'cx', x);
        el.setAttributeNS(null, 'cy', y);
        el.setAttributeNS(null, 'r', pointRadius);
        el.classList.add('point');
        el.classList.add(`point-${idx}`);
        return el;
    }
    onNext({index}) {
        const activePoint = this.el.classList.contains(`point-${index}`) ? this.el : false;
        if (activePoint) {
            activePoint.classList.add('visited');
        }
    }
    onRestart() {
        this.el.classList.remove('visited');
    }
}
