console.debug('hello');
const children = document.querySelectorAll('.loader-pulsing-circles > .layer');
for (let i = 0; i < children.length; i++) {
    (children[i] as HTMLElement).style.setProperty('--num', `${i}`);
}
