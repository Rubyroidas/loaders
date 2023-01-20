// PaintSize
type Size = {
    width: number;
    height: number;
}

// StylePropertyMapReadOnly
interface Properties {
    get(string): string | null;
}

const interpolate = (value, from, to) => (to - from) * value + from;

export class Loader1 {
    static get inputProperties() {
        return [
            '--size',
            '--animation-position',
        ];
    }
    static get contextOptions() {
        return {
            alpha: true
        };
    }

    paint(ctx: CanvasRenderingContext2D, size: Size, props: Properties /* , args */) {
        const animationPosition = parseFloat((props.get('--animation-position') ?? '0').toString());
        const count = parseInt((props.get('--size') ?? '1').toString());

        const fromHSL = {h: 254, s: 85, l: 4};
        const toHSL = {h: 244, s: 33, l: 82};
        const baseCornerRadius = [size.width / 40, size.height / 40];

        for (let i = 0; i < count; i++) {
            const v = i / (count - 1);
            const scale = 1 - v * 0.8;
            const rectWidth = size.width * scale;
            const rectHeight = size.height * scale;
            const h = interpolate(v, fromHSL.h, toHSL.h);
            const s = interpolate(v, fromHSL.s, toHSL.s);
            const l = interpolate(v, fromHSL.l, toHSL.l);
            ctx.save();
            ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.translate(size.width / 2, size.height / 2);
            const angle = 90 + 10 * i;
            const cornerRadius = [
                interpolate(animationPosition, rectWidth / 2, baseCornerRadius[0]),
                interpolate(animationPosition, rectHeight / 2, baseCornerRadius[1]),
            ];
            ctx.rotate(animationPosition * Math.PI * angle / 180);
            ctx.beginPath();
            ctx.roundRect(-rectWidth / 2,-rectHeight / 2, rectWidth, rectHeight, cornerRadius);
            ctx.fill();
            ctx.restore();
        }
    }
}

registerPaint('loader1', Loader1);
