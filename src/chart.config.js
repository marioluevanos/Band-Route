
export const ns = 'http://www.w3.org/2000/svg';
export const strokeWidth = 1;
export const pointRadius = 3;
  
export const  color ={
    line:  getProp('--color-primary'),
    label: getProp('--color-secondary'),
    point: getProp('--color-bg-alt'),
    pointStroke: getProp('--color-primary')
};
    
function getProp(prop) {
    return getComputedStyle(document.body).getPropertyValue(prop);
}