const postcss = require('postcss');

const FixTransforms = (root) => {
    root.walkDecls((decl) => {
      if (decl.prop === 'transform') {
        const value = decl.value;
        const transforms = value.match(/(\w+\([^)]+\))/g);
        var scaleX = null;
        var scaleY = null;
        if (transforms) {

          transforms.forEach((transform) => {
            const [name, values] = transform.split('(');
            const trimmedName = name.trim();
            const trimmedValues = values.slice(0, -1).trim();

            if (trimmedName === 'translate' || trimmedName === 'rotate' || trimmedName === 'scale') {
                const transformedDecl = postcss.decl({
                  prop: trimmedName,
                  value: trimmedValues.replace(/,/g, ' '),
                });
  
                decl.parent.insertBefore(decl, transformedDecl);
              }
              if (trimmedName === 'scaleX' || trimmedName === 'scaleY') {
                if(trimmedName === 'scaleX')
                    scaleX = trimmedValues;
                else
                    scaleY = trimmedValues;
                
                if(scaleX && scaleY) {
                    const transformedDecl = postcss.decl({
                      prop: 'scale',
                      value: scaleX + ' ' + scaleY
                    });
      
                    decl.parent.insertBefore(decl, transformedDecl);
                }
              }
          });

          decl.remove();
        }
      }
    });
}

const UnityCssFixPost = () => {
    const fixHsl = (value) => {
        const pattern = /hsl\((hsl\([^\)]+\))([^\)]*)\)/;
        return value.replace(pattern, '$1');
    };
    return {
        postcssPlugin: 'fix-hsl',
        Once (root, { result }) {
            FixTransforms(root);
            root.walkDecls((decl) => {
                
                if (decl.value != undefined && decl.value.includes('hsl(hsl(')) {
                    decl.value = fixHsl(decl.value);
                }
            });
            root.walkDecls((decl) => {
                if (decl.value != undefined && decl.value.includes('hsl(')) {
                    const pattern = /hsl\((.*?)\s*,\s*(.*?)\s*,\s*(.*?)\)\s*\/\s*\d*\.?\d*/g;
                    decl.value = decl.value.replace(pattern, 'hsl($1, $2, $3)');
                }
            });
        }
    }
};

module.exports = UnityCssFixPost;