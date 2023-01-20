const children = document.querySelectorAll('.loader-pulsing-circles > .layer');
const len = children.length;
for (let i = 0; i < len; i++) {
    (children[i] as HTMLElement).style.setProperty('--num', `${i}`);
    (children[i] as HTMLElement).style.setProperty('--max-num', `${len - 1}`);
}

declare namespace CSS {
    namespace paintWorklet {
        export function addModule(url: URL | string): void;
    }
}

const main = async () => {
    await CSS.paintWorklet.addModule('paint-api-worklet.js');
};

main();
