export function extnameToProperty(cmpObj, me, suffix) {
//export function extnameToProperty(event, me, suffix) {
//  var cmpObj = event.detail.cmpObj
  if (suffix == undefined) {
    suffix = 'Cmp'
  }
  for (var prop in cmpObj) {
      me[prop+suffix] = cmpObj[prop];
  }
}

export function doProp(me, prop) {
    try {
        Object.defineProperty(me, prop, {
            get: function(){return doGet(me,prop)},
            set: function(val){doSet(me,prop,val)}
        });
    }
    catch(e) {
        //console.log('doProp error: ' + prop)
        //console.dir(me)
        //console.dir(e)
    }
}

function doSet(me,prop,val) {




    if (val) {
        var val2;
        var valExt;
        if (typeof val == 'object' || typeof val == 'function') {
            me.attributeObjects[prop] = val
            val2 = typeof val
            valExt = val
        }
        else {
            val2 = val
            valExt = val
        }
        var method = 'set' + prop[0].toUpperCase() + prop.substring(1)
        try {
          me.A.ext[method](valExt)
        }
        catch(e) {
        }
        me.setAttribute(prop, val2)
    }
    else {
        me.removeAttribute(prop)
    }
}
function doGet(me,prop) {
    //console.log('doGet: ' + prop)
    if (me.getAttribute(prop) == 'object' || me.getAttribute(prop) == 'function') {
        return me.attributeObjects[prop]
    }
    else if (me.getAttribute(prop) != null) {
        return me.getAttribute(prop)
    }
    else {
        return null
    }
}

export function filterProp(propertyValue, property, me) {
    try {
         if (propertyValue == 'error') {
             return me.attributeObjects[property]
         }
        const parsedProp = JSON.parse(propertyValue);

        if (parsedProp === null ||
            parsedProp === undefined ||
            parsedProp === true ||
            parsedProp === false ||
            parsedProp === Object(parsedProp) ||
            (!isNaN(parsedProp) && parsedProp !== 0)
        ) {
            return parsedProp;
        } else {
            return propertyValue;
        }
    }
    catch(e) {
        return propertyValue;
    }
}

export function isMenu(childxtype) {
    if (childxtype === 'menu') {
        return true
    }
    else {
        return false
    }
}

export function isRenderercell(childxtype) {
    if (childxtype === 'renderercell') {
        return true
    }
    else {
        return false
    }
}

export function isParentGridAndChildColumn(parentxtype,childxtype) {
    if (parentxtype === 'grid' && childxtype.includes("column")) {
        return true
    }
    else {
        return false
    }
}

export function isTooltip(childxtype) {
    if (childxtype === 'tooltip') {
        return true
    }
    else {
        return false
    }
}

export function isPlugin(childxtype) {
    if (childxtype === 'plugin') {
        return true
    }
    else {
        return false
    }
}
