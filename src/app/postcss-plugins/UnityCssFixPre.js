const selectorParser = require('postcss-selector-parser');

const FixRemEm = (root) => {
    root.walkDecls((decl) => {
        const value = decl.value;
        if (value.includes('rem') || value.includes('em')) {
        decl.value = value.replace(/(\d*\.?\d+)(rem|em)/g, (match, number, unit) => {
            const pxValue = parseFloat(number) * 16; // Convert rem to px (assuming 1rem = 16px)
            return pxValue.toFixed(2) + 'px';
        });
        }
    });
}
const ExtractMediaHoverRules = (root) => {
    const extractedRules = [];
    
    root.walkAtRules('media', (rule) => {
      if (rule.params === '(hover: hover)') {
        rule.walkRules((nestedRule) => {
          const clonedRule = nestedRule.clone(); // Create a clone of the rule
          extractedRules.push(clonedRule); // Add the cloned rule to the extractedRules array
        });
        rule.remove(); // Remove the @media rule
      }
    });
    
    if (extractedRules.length > 0) {
      root.append(extractedRules); // Append the extracted rules to the root
    }
}
const RemoveUncompatiblePseudos = (root) => {
    root.walkRules((rule) => {
      const parser = selectorParser((selectors) => {
        selectors.each((selector) => {
            let removeRule = false;
            selector.walkPseudos((pseudo) => {
                if (
                    pseudo.value === ':where' ||
                    pseudo.value === '::before' ||
                    pseudo.value === '::after' ||
                    pseudo.value === ':before' ||
                    pseudo.value === ':after' ||
                    pseudo.value === ':input' ||
                    pseudo.value === '::placeholder' ||
                    pseudo.value === ':focus-visible' ||
                    pseudo.value === ':nth-child' ||
                    pseudo.value === ':not' ||
                    pseudo.value === ':is' ||
                    pseudo.value.includes('-webkit') ||
                    pseudo.value.includes('-moz')
                ) {
                    removeRule = true;
                }
            });
            if (removeRule) {
                rule.remove();
            }
        });
      });

      rule.selector = parser.processSync(rule.selector);
      parser.processSync(rule.selector);
    });
}

const RemoveUncompatibleClasses = (root, options) => {
    root.walkRules((rule) => {
      const selectorsToRemove = [];
      rule.selectors.forEach((selector) => {
        if (options.selectorsToRemove.includes(selector)) {
          selectorsToRemove.push(selector);
        }
      });

      if (selectorsToRemove.length > 0) {
        selectorsToRemove.forEach((selector) => {
            if(rule.selector.includes(selector + ','))
                rule.selector = rule.selector.replace(selector + ',', '');
            else if(rule.selector.includes(',' + selector))
                rule.selector = rule.selector.replace(',' + selector, '');
            else
                rule.selector = rule.selector.replace(selector, '');
        });

        rule.selector = rule.selector.trim();

        if (rule.selector === '') {
          rule.remove();
        }
      }
    });
}

const FixDeclarations = (root, options) => {
    root.walkDecls((decl) => {
        if (options.propertiesToRemove.includes(decl.prop)) {
          decl.remove(); // Remove the declaration
          return;
        }

        if (decl.prop == 'text-align') {
            decl.prop = '-unity-text-align';
            if(decl.value === 'left')
                decl.value = 'middle-left'
            if(decl.value === 'right')
                decl.value = 'middle-right'
            if(decl.value === 'center')
                decl.value = 'middle-center'
                return;
        }
        
        if (decl.value.includes('0 0 #0000')) {
            decl.value = 'rgba(0,0,0,1)';
        } else if (decl.value === 'inline-block' || decl.value === 'contents'|| decl.value === 'inline-flex') {
            decl.value = 'flex';
        } else if (decl.value === 'transparent') {
            decl.value = 'rgba(0,0,0,0)';
        } else if (decl.prop === 'transition-property') {
            decl.value = decl.value.replace('transform', 'translate, scale, rotate')
        } else if (decl.prop === 'background') {
            decl.prop = 'background-color';//TODO: fix this in cases where it holds more than a color
        }
        
        if (decl.prop.includes('-moz') || decl.prop.includes('-webkit') || decl.prop.includes('-ms')) {
            decl.remove();
            return;
        }
    });
}

const UnityCssFixPre = (options) => {
    return {
        postcssPlugin: 'replace-invalids',
        Once (root, { result }) {
            FixDeclarations(root, options);
            FixRemEm(root);
            ExtractMediaHoverRules(root);
            RemoveUncompatiblePseudos(root);
            RemoveUncompatibleClasses(root, options);
        }
    }
};
module.exports = UnityCssFixPre;