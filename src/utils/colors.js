const HEX_REG = /^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i;
const HEXA_REG = /^#?[a-f\d]{8}$/i;
const RGBA_REG = /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d+|1(\.0)?)\)$/;
const RGB_REG = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;

function rgba2hex(rgba) {
    return `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
}

function hexaToRGBA(h, transparency) {
    let r = 0, g = 0, b = 0;

    if (!HEX_REG.test(h) || typeof transparency !== "number") {
        return '';
    }
  
    // 3 digits
    if (h.length === 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length === 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    //console.log(`h: ${h}, transparency: ${transparency}`);
    if (transparency === 100) {
        return `rgb(${+r}, ${+g}, ${+b})`;
    } else {
        return `rgba(${+r}, ${+g}, ${+b}, ${transparency/100})`;
    }
}

function createColorObj(colorCode) {
    /* Converts a RGBA, RGB, HEX, or HEXA color code into an object with a hex code and transparency.
        Returns an empty object if there's an invalid input. */
    if (typeof colorCode !== 'string' && !(colorCode instanceof String)) {
        return {};
    } 
    colorCode = colorCode.replace(/\s/g, '');
    
    if (HEX_REG.test(colorCode)) {
        return {
            hex: colorCode,
            transparency: 100
        }
    } else if (HEXA_REG.test(colorCode)) {
        return {};
    } else if (RGB_REG.test(colorCode)) {
        return {
            hex: rgba2hex(colorCode),
            transparency: 100
        }
    } else if (RGBA_REG.test(colorCode)) {
        let sep = colorCode.indexOf(",") > -1 ? "," : " ";
        const rgba = colorCode.substring(5).split(")")[0].split(sep);
        return {
            hex: rgba2hex(`rgb(${rgba[0]},${rgba[1]},${rgba[2]})`),
            transparency: parseFloat(rgba[3]) * 100
        }

    } else {
        return {};
    }
}

export { createColorObj, hexaToRGBA };