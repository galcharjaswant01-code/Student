const c = require('tailwindcss/colors');
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
};
const dump = {};
for (const [name, shades] of Object.entries({indigo: c.indigo, blue: c.blue, emerald: c.emerald, rose: c.rose, amber: c.amber, purple: c.purple})) {
  dump[`bg-${name}-500`] = {};
  for (const [shade, val] of Object.entries(shades)) {
    if (val.startsWith('#')) dump[`bg-${name}-500`][shade] = hexToRgb(val);
  }
}
console.log(JSON.stringify(dump));
