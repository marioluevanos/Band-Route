import eventEmitter from './eventEmitter';

export default class DataUi {
    constructor() {
        this.elData = this.createTravelData();
        document.getElementById('travel-distance').appendChild(this.elData);

        this.elProgress = this.createTravelProgress();
        document.getElementById('travel-progress').appendChild(this.elProgress);

        this.elProgressValue = this.createTravelProgressValue();
        document.getElementById('travel-progress').appendChild(this.elProgressValue);

        eventEmitter.on('next', this.updateTravelDistance.bind(this));
        eventEmitter.on('restart', this.onRestart.bind(this));
        eventEmitter.on('progress', this.onProgress.bind(this));
    }
    createTravelData() {
        const el = document.createElement('span');
        el.setAttribute('id', 'travel-total');
        el.innerHTML = '0';
        return el;
    }
    createTravelProgress() {
        const el = document.createElement('progress');
        el.setAttribute('value', '0.0');
        el.setAttribute('max', '100');
        el.setAttribute('id', 'travel-progress');
        return el;
    }
    createTravelProgressValue() {
        const el = document.createElement('span');
        el.setAttribute('id', 'travel-progress-value');
        el.innerHTML = '0.0%';
        return el;
    }
    updateTravelDistance({distance}) {
        const prev = Number(parseFloat(this.elData.innerHTML).toFixed(3));
        const total = (prev + distance).toFixed(1);
        this.elData.innerHTML = total;
    }
    onRestart() {
        this.elData.innerHTML = 0;
    }
    onProgress(progress) {
        const prog = progress * 100;
        this.elProgress.setAttribute('value', prog);
        this.elProgressValue.innerHTML = `${prog.toFixed(1)}%`;
    }
}
