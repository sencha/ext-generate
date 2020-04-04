import EwcBaseComponent from './ewc-base';
import HTMLParsedElement from './HTMLParsedElement.js';
import {
    doProp,
    filterProp,
    isMenu,
    isRenderercell,
    isParentGridAndChildColumn,
    isTooltip,
    isPlugin
} from './util.js';

export class ExtRouterComponent extends EwcBaseComponent {
    //prettier-ignore
    get hidden() {return this.getAttribute("hidden");}
    set hidden(hidden) {
        this.setAttribute("hidden", hidden);
    }

    static get observedAttributes() {
        var attrs = [];
        attrs.push("hidden");
        attrs.push("onready");
        return attrs;
    }

    constructor() {
        super (
            {},
            [],
            []
        )
        this.router = new Router(window.routes);
    }

    connectedCallback() {
        EwcBaseComponent.elementcount++;
        console.log('added: ' + this.tagName + ': elementcount is now ' + EwcBaseComponent.elementcount);
        EwcBaseComponent.elements.push(this);
        console.log(EwcBaseComponent.elements)

        this.base = EwcBaseComponent;
    }

    parsedCallback() {
        this.createProps()
    }

    createProps() {
        this.props = {};
        var div = document.createElement("DIV");
        div.setAttribute("id", "route");
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.padding = this.padding;
        div.style.display = "none";
        //mjg should not be hard coded
        div.style.backgroundSize = "20px 20px";
        //div.style.overflow='scroll';
        div.style.borderWidth = "0px";
        div.style.backgroundColor = "#e8e8e8";
        div.style.backgroundImage =
            "linear-gradient( 0deg, #f5f5f5 1.1px, transparent 0)," +
            "linear-gradient(90deg, #f5f5f5 1.1px, transparent 0)";
        var el = Ext.get(div);
        this.props["hidden"] = this["hidden"];
        this.props.listeners = {};
        this.setEvent("onready", this.props, this);
        this.props.xtype = "widget";
        this.props.ewc = "router";
        this.props.element = el;

        var me = this;
        me.A = {};
        me.A.CHILDREN = [];
        me.A.ITEMS = [];
        me.A.o = {};

        Ext.onReady(function () {
            me.A.ext = Ext.create(me.props)

            if (me.parentNode.nodeName.substring(0, 4) === 'EXT-') {
                if (me.parentNode.A.ext !== undefined) {
                    me.addTheChild(me.parentNode.A.ext,me.A.ext);
                }
                else {
                    me.parentNode.A.CHILDREN.push(me.A.ext);
                }
            }
            EwcBaseComponent.elementcount--;
            console.log('reduced: ' + me.tagName + ' elementcount reduced to ' + EwcBaseComponent.elementcount)
        })
    }

    addTheChild(parentCmp, childCmp, location) {
        var parentxtype = parentCmp.xtype;
        var childxtype = childCmp.xtype;
        //console.log('addTheChild: ' + parentxtype + '(' + parentCmp.ext + ')' + ' - ' + childxtype + '(' + childCmp.ext + ')');
        //if (childxtype == 'widget')
        if (this.A.ext.initialConfig.align != undefined) {
            if (parentxtype != 'tooltip' && parentxtype != 'titlebar' && parentxtype != 'grid' && parentxtype != 'lockedgrid' && parentxtype != 'button') {
                console.error('Can only use align property if parent is a Titlebar or Grid or Button');
                return;
            }
        }

        switch (true) {
            case isMenu(childxtype):
                parentCmp.setMenu(childCmp);
                break;
            case isRenderercell(childxtype):
                parentCmp.setCell(childCmp);
                break;
            case isParentGridAndChildColumn(parentxtype,childxtype):
                if (location == null) {
                    parentCmp.addColumn(childCmp);
                }
                else {
                    var regCols = 0;
                    if (parentCmp.registeredColumns != undefined) {
                        regCols = parentCmp.registeredColumns.length;
                    }
                    if (parentxtype == 'grid') {
                        parentCmp.insertColumn(location + regCols, childCmp);
                    }
                    else {
                        parentCmp.insert(location + regCols, childCmp);
                    }
                }
                break;
            case isTooltip(childxtype):
                parentCmp.setTooltip(childCmp);
                break;
            case isPlugin(childxtype):
                parentCmp.setPlugin(childCmp);
                break;
            default:
                if (location == null) {
                    parentCmp.add(childCmp);
                }
                else {
                    parentCmp.insert(location, childCmp);
                }
        }
    }


    attributeChangedCallback(attr, oldVal, newVal) {
        var route = document.getElementById("route");
        if (route != null) {
            if (attr == "hidden") {
                if (newVal == "true") {
                    route.style.display = "none";
                } else {
                    route.style.display = "block";
                }
            }
        } else {
            //console.log('route null: ' + attr + ' - ' + newVal)
        }

        if (attr == "onready") {
            if (newVal) {
                //mjg check if this event exists for this component
                this.addEventListener(attr.slice(2), function(event) {
                    eval(newVal + "(event)");
                });
            } else {
                //delete this[attr];
                //this.removeEventListener(attr.slice(2), this);
            }
        }
    }
}
window.customElements.define('ext-router', HTMLParsedElement.withParsedCallback(ExtRouterComponent))

export function getRoutes(items) {
    //mjg clean this up
    window._routes = [];
    var routes = _getRoutes(items);
    window._routes = [];
    return routes;
}

function _getRoutes(items) {
    items.forEach(function(item) {
        item.leaf = !item.hasOwnProperty("children");
        item.hash = item.text.replace(/ /g, "");
        item.hashlower = item.hash.toLowerCase();
        if (item.children == undefined) {
            window._routes.push(
                new Route(
                    item.hash,
                    item.hashlower,
                    item.component,
                    item.default
                )
            );
        } else {
            _getRoutes(item.children);
        }
    });
    return window._routes;
}

export class Route {
    constructor(hash, hashlower, component, defaultRoute) {
        try {
            if (!hash) {
                throw "error: hash param is required";
            }
        } catch (e) {
            console.error(e);
        }
        this.hash = hash;
        this.hashlower = hashlower;
        this.component = component;
        if (defaultRoute != undefined) {
            this.default = defaultRoute;
        }
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace("#", "") === this.hash;
    }
}

export class Router {
    constructor(routes) {
        window.router = this;
        try {
            if (!routes) {
                throw "error: routes param is mandatory";
            }
            this.routes = routes;
        } catch (e) {
            console.error(e);
        }
    }

    routeMe() {
        console.log('routeMe')
        this.hasChanged(this, this.routes);
    }


    init() {
        //var routes = this.routes;
        //(function(scope, routes) {
            // window.addEventListener("hashchange", function(e) {
            //     //console.log('hashChange')
            //     scope.hasChanged(scope, routes);
            // });
        //})(this, routes);
        //this.hasChanged(this, routes);
    }

    hasChanged(scope, routes) {
        console.log('hasChanged: ' + window.location.hash)
        if (window.location.hash.length > 0) {
            var currentHash = "";
            var currentHashLower = "";
            var currentComponent = null;
            for (var i = 0, length = routes.length; i < length; i++) {
                var route = routes[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    currentHash = route.hash;
                    currentHashLower = route.hashlower;
                    currentComponent = route.component;
                }
            }
            scope.rootElem = document.getElementById("route");
            scope.rootElem.style.display = "block";
            window[currentHashLower] = new currentComponent();
            var componentHtml = currentHash + "Component.html";
            var code = window._code[currentHashLower][componentHtml];
            //console.log(code)
            console.log('hash > 0, setting innerHTML')
            //console.log(scope.rootElem.innerHTML)
            scope.rootElem.innerHTML = code;
        } else {
            var currentHash = "";
            var currentHashLower = "";
            var currentComponent = null;
            for (var i = 0, length = routes.length; i < length; i++) {
                var route = routes[i];
                if (route.default == true) {
                    currentHash = route.hash;
                    currentHashLower = route.hashlower;
                    currentComponent = route.component;
                }
            }
            if (currentHash == "") {
                //console.log('no default route specified')
            } else {
                //console.log(scope)
                console.log('the else')
                scope.rootElem = document.getElementById("route"); //mjg
                scope.rootElem.style.display = "block";
                window[currentHashLower] = new currentComponent();
                var componentHtml = currentHash + "Component.html";
                //scope.rootElem.innerHTML = window._code[currentHashLower][componentHtml];
            }
        }
    }
}
