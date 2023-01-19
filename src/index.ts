console.debug('hello');
const children = document.querySelectorAll('.loader-pulsing-circles > .layer');
const len = children.length;
for (let i = 0; i < len; i++) {
    (children[i] as HTMLElement).style.setProperty('--num', `${i}`);
    (children[i] as HTMLElement).style.setProperty('--max-num', `${len - 1}`);
}
