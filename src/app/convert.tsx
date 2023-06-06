
import postcss from 'postcss'
import { createTailwindcssPlugin } from '@mhsdesign/jit-browser-tailwindcss';
const cssvariables = require("postcss-css-variables");
const UnityCssFixPre = require('./postcss-plugins/UnityCssFixPre.js');
const UnityCssFixPost = require('./postcss-plugins/UnityCssFixPost.js');
const colorConverter = require("postcss-color-converter")
const postCssInset = require("postcss-inset")

const ussOptions = {
  propertiesToRemove: ['animation', 'text-transform', 'pointer-events', 'line-height', 'font-weight', 'z-index', 'overflow-y', 'box-shadow'],// Specify the declarations you want to remove
  selectorsToRemove: ['body', 'html', 'hr', 'code', 'a', 'b', 'p'],
};




export const cssProcessor = postcss([
  createTailwindcssPlugin({tailwindConfig: {theme: {}}, content: []}),      
  UnityCssFixPre(ussOptions),
  cssvariables({preserve: false}),//Inlines variables so that for example rgba(--var) becomes rgba(0,0,0,0) and doesn't break unity
  postCssInset(),//Converts inset to top, right, bottom, left
  UnityCssFixPost(),
  colorConverter({outputColorFormat: 'rgb'})//hsl doesn't seem to work in Unity even though they say it does. So we convert it to rgb
]);