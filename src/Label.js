import { ns, pointRadius } from './chart.config';

export default class Label {
    constructor(coords, idx) {
        this.el = this.createLabel(coords, idx);
    }
    createLabel({ x, y }, idx) {
        const el = document.createElementNS(ns, 'text');
        const newX = x - pointRadius;
        const newY = y - pointRadius * 3;

        el.setAttributeNS(null, 'x', newX);
        el.setAttributeNS(null, 'y', newY);
        el.innerHTML = idx + 1;
        return el;
    }
}