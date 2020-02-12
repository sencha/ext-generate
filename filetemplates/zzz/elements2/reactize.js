import React from 'react';
import ReactDOM from 'react-dom';
//https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

function syncEvent(node, eventName, newEventHandler, me) {
    const eventname = eventName[0].toLowerCase() + eventName.substring(1);
    const eventStore = node.__events || (node.__events = {});
    const oldEventHandler = eventStore[eventname];
    if (oldEventHandler) {
        node.removeEventListener(eventname, oldEventHandler);
    }
    if (newEventHandler) {
        node.addEventListener(eventname, eventStore[eventname] = function handler(e) {
          //console.log('eventHandler')
          //console.log(eventname)
          //console.dir(e)
          if (eventname == 'ready') {
            //console.dir(me)
            me.cmp = event.detail.cmp
            me.ext = event.detail.cmp
            //console.dir(me)
          }

          newEventHandler.call(this, e);
        });
    }
}

export default function (CustomElement) {
    if (typeof CustomElement !== 'function') {
        throw new Error('Given element is not a valid constructor');
    }
    const tagName = (new CustomElement()).tagName;

    function toPascalCase(s) {
        return s.match(/[a-z]+/gi)
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
            })
            .join('')
    }
    const displayName = toPascalCase(tagName)

    class ReactComponent extends React.Component {
        constructor(props) {
            super(props)
            this.componentRef = React.createRef();
        }

        static get displayName() {
            return displayName;
        }

        componentDidMount() {
            this.componentRef.current.text = this.props.text;

            const node = ReactDOM.findDOMNode(this);

            Object.keys(this.props).forEach(name => {
                //console.log(name)
                if (name === 'children' || name === 'style') {
                    return;
                }
                if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
                    syncEvent(node, name.substring(2), this.props[name], this);
                }
                else {
                    //console.log(name)
                    node[name] = this.props[name];
                }
            });

            // if (this.props.onTap) {
            //     this.componentRef.current.addEventListener('tap', (e) => this.props.onTap(e));
            // }

        }

        componentDidUpdate(prevProps, prevState) {
            //console.log('componentDidUpdate: ' + tagName)
            //console.log(prevProps)
             //var r = React.isValidElement(this.element)
            var me = this;
            for (var prop in prevProps) {
              if (!/^on/.test(prop)) {
                //console.log(prop)
                //console.log(prevProps[prop])
                //console.log(me.buttonRef.current[prop])
                if (me.props[prop] !== prevProps[prop] && prop != 'children') {
                    //console.log(prop)
                    //console.dir(me.props[prop])

                    var node = ReactDOM.findDOMNode(this);
                    var t = typeof me.props[prop]
                    //console.log(t)
                    if (t == 'object') {
                      me.componentRef.current[prop] = me.props[prop];
                      node.attributeObjects[prop] = me.props[prop]
                      node[prop] = t
                    }
                    else {
                      me.componentRef.current[prop] = me.props[prop];
                      node[prop] = me.props[prop]
                    }







                    //me.componentRef.current[prop] = me.props[prop];
                }
              }
            }
        }

        render() {
            //console.log('*****render: ' + tagName)
            //console.log(this.props)

            //this.element = React.createElement(tagName, { style: this.props.style }, this.props.children);
            this.element = React.createElement(
                tagName,
                {
                    ...this.props,
                    style: this.props.style,
                    ref: this.componentRef
                },
                this.props.children
            )
            return this.element;
        }
    }

    const proto = CustomElement.prototype;
    Object.getOwnPropertyNames(proto).forEach(prop => {
       Object.defineProperty(ReactComponent.prototype, prop, Object.getOwnPropertyDescriptor(proto, prop));
    });

    return ReactComponent;
}
