import Base from './base'
import StaticMixin from './mixins/static'
import UtilityMixin from './mixins/utility'
import SelectorMixin from './mixins/selector'
import ClassMixin from './mixins/class'
import DOMMixin from './mixins/dom'
import AttrMixin from './mixins/attr'

((window) => {
    let ns,Ns;
    const extendsClass = UtilityMixin(SelectorMixin(ClassMixin(DOMMixin(AttrMixin(StaticMixin(Base))))));

    Ns = class extends extendsClass {
        init(selector) {
            if (!selector) return this;

            if (selector.nodeType == 9 || selector.nodeType == 1){
                this[0] = selector;
                this.length = 1;
                return this;
            }

            if (typeof selector == "string"){
                if (Ns.isHtml(selector)) {
                    return Ns.parseHtml(selector);
                }else {
                    return this.element(selector)
                }
            }

            if (typeof selector == "function"){
                window.onload = selector;
                return this;
            }
        }
    };

    ns = (selector) => new Ns().init(selector);
    window.ns = ns;

})(window);
