import eventEmitter from './eventEmitter';

export default class Distances {
    constructor(routes) {
        this.routes = routes;
        this.directions = {};
        this.visited = new Set();
        this.getAllDistances(routes);
        this.startingPoint = routes[0];
    }
    getDistance(c = {}, n = {}) {
        const a = c.x - n.x;
        const b = c.y - n.y;
        return Math.sqrt(a * a + b * b);
    }
    getNextLocationFrom(index = 0) {
        const val = this.getNearest(index);
        return {
            current: {
                index: index,
                position: val.origin
            },
            destination: {
                index: parseInt(val.nearestIndex),
                distance: val.distance,
                position: val.destination
            }
        };
    }
    filterVisited(locations, idx) {
        
        // Possible next locations
        const entries = Object.entries(locations).map(([key, [distance]]) => [key, distance]); 
        return entries.filter(entry => {
            const [key, val] = entry;
            const numericKey = parseInt(key);
            if (!this.visited.has(numericKey) && idx !== numericKey) {
                return entry;
            }
        });
    }
    emitProgress(locations, filteredEntries) {
        const progress = 1 - (filteredEntries.length / Object.keys(locations).length);
        eventEmitter.emit('progress', progress);
    }
    /**
     * Get the coordinates of the nearest adjacent point, when given an index of origin
     * Probaly too many responsibilities going on here.
     * @param {Number} idx 
     */
    getNearest(idx = 0) {

        // Get the location object with all distances
        const locations = this.directions[idx]; 

        // Remove location entries that have been visited
        const filteredEntries = this.filterVisited(locations, idx); 

        // Emit progress
        this.emitProgress(locations, filteredEntries);

        // Return early if final location remaining
        if (filteredEntries.length === 1) {
            console.log(
                '%c Final stop ✈️', 
                'color: black; background: orange; font-weight: bold'
            );
        }

        if (filteredEntries.length < 1) {
            console.log(
                '%c Back home 🏠', 
                'color: black; background: lightblue; font-weight: bold'
            );
            // Clear the visits, to allow again
            this.visited.clear();

            // Sending back initial position, which is also the last move
            return { 
                destination: this.startingPoint,
                distance: locations[0][0],
                nearestIndex: 0,
                origin: this.startingPoint
            }
        }

        // Send a signal to reset
        if (filteredEntries.length === this.routes.length - 1) {
            eventEmitter.emit('restart');
        }

        // get the numeric value as "floating point" of all locations
        const distances = filteredEntries.map(([_, val]) => val); 

        // Find the minimum distance
        const minDistance = Math.min(...distances); 

        // Get the nearest index
        const [nearestIndex] = filteredEntries
            .filter(([key, val]) => (val === minDistance) && key)
            .flatMap(x => x);

        // From the locations dictionary, which contains all locations, get the nearest by index
        const [
            distance, 
            origin, 
            destination
        ] = locations[nearestIndex];

        // Return a payload
        return {
            nearestIndex,
            distance,
            origin,
            destination
        };
    }
    /**
     * Calculate the distance between all points
     * @param {Array} routes
     */
    getAllDistances(routes) {
        for (let i = 0; i < routes.length; i++) {
            this.directions[i] = {};
            for (let j = 0; j < routes.length; j++) {
                if (i !== j) {
                    const origin = routes[i];
                    const destination = routes[j];
                    const distance = this.getDistance(origin, destination);
                    this.directions[i][j] = [distance, origin, destination];
                }
            }
        }
    }
    /**
     * Keey track of locations visited
     * @param {Number} currIndex 
     */
    markVisitedLocation(currIndex) {
        this.visited.add(currIndex);
    }
}