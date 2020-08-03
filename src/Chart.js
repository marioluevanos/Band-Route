import Point from './Point';
import Label from './Label';
import Vehicle from './Vehicle';
import PolyLine from './PolyLine';
import { ns } from './chart.config';

export default class Chart {
    constructor(routes) {
        this.routes = routes;
        this.el = this.createChart(routes);
    }
    createChart(routes) {
        const { width, height } = this.getChartDimensions();

        // Create SVG
        const el = document.createElementNS(ns, 'svg');
        el.setAttribute('xmlns', ns);
        el.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        el.setAttributeNS(null, 'viewbox', `0 0 ${width} ${height}`);
        el.setAttributeNS(null, 'width', width);
        el.setAttributeNS(null, 'height', height);

        // Create & Append Points and Labels
        for (let idx = 0; idx < routes.length; idx++) {
            const pos = routes[idx];
            const point = new Point(pos, idx);
            const label = new Label(pos, idx);

            idx === 0 && point.el.classList.add('visited');
            el.appendChild(point.el);
            el.appendChild(label.el);
        }

        this.polyLine = new PolyLine(routes);
        el.appendChild(this.polyLine.el);

        this.vehicle = new Vehicle(routes);
        el.appendChild(this.vehicle.el);

        return el;
    }
    sortPoints(axis) {
        return this.routes.slice().sort((c, n) => c[axis] - n[axis]);
    }
    getChartDimensions() {
        return {
            width: this.sortPoints('x').pop().x,
            height: this.sortPoints('y').pop().y
        };
    }
}
