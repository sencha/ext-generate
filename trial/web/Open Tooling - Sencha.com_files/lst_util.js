/**
 *  LeadSourceTrackingUtil.js
 *  lst_util
 *
 *  v0.0.2
 */
(function(root, settings) {

    "use strict";

    // requirments
    if (!(settings && typeof settings == 'object' && (function(k, o) {
            for (var i = 0, r = 1; r && i < k.length; r = k[i++] in o);
            return r;
        })(['ajaxurl', 'cookiename'], settings))) {
        return;
    }

    // constants
    const AJAXURL = settings.ajaxurl;
    const COOKIENAME = settings.cookiename;
    const SOURCE = settings.source;
    const CONTENT = settings.content;
    const CAMPAIGN = settings.campaign;
    const TERM = settings.term;
    const MEDIUM = settings.medium;

    // methods
    var ProcessLeadSourceTracking = function() {
        var urlReferrer = "";
        if (document.referrer != null) {
            urlReferrer = document.referrer;
        }
        if (!urlReferrer.replace("http://", "").replace("https://", "").startsWith(window.location.hostname)) {
            SetTrackingParams(new QueryStrings(), getCookie(COOKIENAME), urlReferrer);
        }
    }

    var SetTrackingParams = function(qs, cookie, referrer) {
        var Util = new LeadSourceTrackingUtil({
            referrer: referrer,
            source: "",
            ppc: false,
            cookieUsed: false
        });
        var host = Util.GetHost();
        var searchEngineName = Util.GetSearchEngineName(host);
        var source = Util.GetSource(qs, cookie, host, searchEngineName);
        var medium = Util.GetMedium(qs, cookie, host, searchEngineName);
        var content = Util.GetContent(qs, cookie);
        var campaign = Util.GetCampaign(qs, cookie);
        var searchTerm = Util.GetSearchTerm(qs, cookie, searchEngineName);
        if (!Util.cookieUsed && !Util.ppc) {
            var freshCookie = new Cookie(COOKIENAME);
            freshCookie.Add(SOURCE, source);
            freshCookie.Add(CONTENT, content);
            freshCookie.Add(CAMPAIGN, campaign);
            freshCookie.Add(TERM, searchTerm);
            freshCookie.Add(MEDIUM, medium);
            freshCookie.expires = 30;
            freshCookie.Set();
        }
        RequestSession( /*function(XHR){console.log(XHR,Util)}*/ );
    }

    var RequestSession = function(callback) {
        var XHR = new XMLHttpRequest();
        XHR.addEventListener('load', function() {
            console.log(this.response);
            if (callback && typeof callback == 'function') {
                return callback(this.response);
            }
        });
        XHR.open('POST', AJAXURL);
        XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        XHR.send("action=lst-session");
    }

    // prototypes
    function QueryStrings() {
        try {
            const a = window.location.search.split(/\?/).pop();
            const b = deserialize(a);
            for (var c in b) {
                this[c] = b[c];
            }
        } catch (e) {
            console.log(e);
        }
    }

    function Cookies() {
        var i, x, y, c = document.cookie.split(";"),
            o = {},
            name;
        if (arguments && arguments.length == 1 && typeof arguments[0] == 'string') {
            name = arguments[0];
        }
        try {
            for (i = 0; i < c.length; i++) {
                x = c[i].substr(0, c[i].indexOf("="));
                y = deserialize(unescape(c[i].substr(c[i].indexOf("=") + 1)));
                x = x.replace(/^\s+|\s+$/g, "");
                if (name) {
                    if (x == name) {
                        o[x] = y;
                        break;
                    }
                } else {
                    o[x] = y;
                }
            }
            for (var k in o) {
                this[k] = o[k];
            }
        } catch (e) {
            console.log(e);
        }
    }

    function Cookie(name) {
        Cookies.call(this, name);
        this.name = name;
        this.expires = -1;
        this.Add = function add() {
            switch (arguments.length) {
                case 2:
                    this[this.name] = typeof this[this.name] != 'object' ? {} : this[this.name];
                    this[this.name][arguments[0]] = arguments[1];
                    break;
                case 1:
                default:
                    this[this.name] = arguments[0];
                    break;
            }
        }
        this.Set = function set() {
            try {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + this.expires);
                var value = escape(serialize(this[this.name])) + ((this.expires == -1) ? '' : '; expires=' + exdate.toUTCString());
                document.cookie = this.name + '=' + value + '; path=/;';
            } catch (e) {
                console.log(e);
            }
        }
    }
    Cookie.prototype = Object.create(Cookies.prototype);

    function LeadSourceTrackingUtil(options) {
        this.referrer = document.referrer;
        this.source = "";
        this.ppc = false;
        this.cookieUsed = false;
        if (typeof options == 'object') {
            for (var k in options) {
                if (this.hasOwnProperty(k)) {
                    this[k] = options[k];
                }
            }
        }
        this.GetHost = function GetHost() {
            // Remove the protocol and trailing values from the referrer
            var host = this.referrer.replace("http://", "").replace("https://", "").toLowerCase();
            var index = host.indexOf("/");
            if (index > 0) {
                host = host.substr(0, index);
            }
            return host;
        }
        this.GetSearchEngineName = function GetSearchEngineName(host) {
            // Remove the subdomain from the host
            var domain = "";
            if (host.indexOf(".") != host.lastIndexOf(".")) {
                var segments = host.split('.');
                var n = segments.length - 1;
                domain = segments[n - 1] + "." + segments[n];
            } else {
                domain = host;
            }
            var searchEngineName = "";
            if (domain.toLowerCase().indexOf("google") > -1) {
                searchEngineName = "Google";
            } else if (domain.toLowerCase().indexOf("bing") > -1) {
                searchEngineName = "Bing";
            } else if (domain.toLowerCase().indexOf("yahoo") > -1) {
                searchEngineName = "Yahoo";
            } else {
                var qsParams = this.referrer.split('&');
                var n = qsParams.Length;
                for (var i = 1; i < n; i++) {
                    if ((qsParams[i].startsWith("p=")) || (qsParams[i].startsWith("q="))) {
                        searchEngineName = "SearchEng";
                        break;
                    }
                }
            }
            return searchEngineName;
        }
        this.GetSource = function GetSource(qs, cookie, host, searchEngineName) {
            // If (utm_source, S, utm_content and utm_campaign are passed) or (utm_source is passed but S is not) then
            var source = "";
            if ((((qs["utm_source"] != null) && (qs["S"] != null) && (qs["utm_content"] != null) && (qs["utm_campaign"] != null))) || (((qs["utm_source"] != null) && (qs["S"] == null)))) {
                source = qs["utm_source"];
            }
            // Else if utm_source and S are not passed then
            else if ((qs["utm_source"] == null) && (qs["S"] == null)) {
                // If a search engine was used then
                if (searchEngineName != "") {
                    // Use the search engine name
                    source = searchEngineName;
                }
                // Else if an HTTP referrer was found then
                else if (host != "") {
                    // Use the referrer, leading www.
                    source = host.replace("www.", "");
                }
                // Else if the cookie is not 30 days old then
                else if (cookie != false) {
                    this.cookieUsed = true;
                    source = cookie[SOURCE];
                } else {
                    // Return WI as this is a walk-in
                    source = "WI";
                }
            } else {
                // If this is a PPC link then
                if ((qs["S"].indexOf("PPC_") > -1) || (qs["S"].indexOf("GW_") > -1)) {
                    this.ppc = true;
                    source = "Google";
                } else {
                    // Split the S parameter and return the middle value
                    var splits = qs["S"].split('_');
                    source = splits[1];
                }
            }
            this.source = source;
            return this.source;
        }
        this.GetMedium = function GetMedium(qs, cookie, host, searchEngineName) {
            var medium = "";
            // If utm_medium is passed then
            if (qs["utm_medium"] != null) {
                medium = qs["utm_medium"];
            }
            // Else if S is passed then
            else if (qs["S"] != null) {
                if (this.ppc) {
                    medium = "cpc";
                }
            }
            // Else if search engine was used then
            else if (searchEngineName != "") {
                medium = "organic";
            }
            // Else if referrer used then
            else if (host != "") {
                if (host.toLowerCase().indexOf("google") > -1) {
                    medium = "organic";
                } else {
                    medium = "referral";
                }
            }
            // Else if the cookie is not 30 days old then
            else if (cookie != false) {
                medium = cookie[MEDIUM];
            } else {
                medium = "direct";
            }
            return medium;
        }
        this.GetContent = function GetContent(qs, cookie) {
            var content = "";
            // If (utm_source, S, utm_content and utm_campaign are passed) or (utm_content is passed but S is not) then
            if ((((qs["utm_source"] != null) && (qs["S"] != null) && (qs["utm_content"] != null) && (qs["utm_campaign"] != null))) || (((qs["utm_content"] != null) && (qs["S"] == null)))) {
                content = qs["utm_content"];
            }
            // Else if utm_content and S are not passed then
            else if ((qs["utm_content"] == null) && (qs["S"] == null)) {
                // If the cookie is not 30 days old and was used to retrieve the source then
                if ((cookie != false) && (this.cookieUsed)) {
                    content = cookie[CONTENT];
                } else {
                    content = "";
                }
            } else {
                if (qs["S"] != null) {
                    // Split the S parameter and return the first value
                    var splits = qs["S"].split('_');
                    content = splits[0];
                }
            }
            return content;
        }
        this.GetCampaign = function GetCampaign(qs, cookie) {
            var campaign = "";
            // If (utm_source, S, utm_content and utm_campaign are passed) or (utm_campaign is passed but S is not) then
            if ((((qs["utm_source"] != null) && (qs["S"] != null) && (qs["utm_content"] != null) && (qs["utm_campaign"] != null))) || (((qs["utm_campaign"] != null) && (qs["S"] == null)))) {
                campaign = qs["utm_campaign"];
            }
            // Else if utm_campaign and S are not passed then
            else if ((qs["utm_campaign"] == null) && (qs["S"] == null)) {
                // If the cookie is not 30 days old and was used to retrieve the source then
                if ((cookie != false) && (this.cookieUsed)) {
                    campaign = cookie[CAMPAIGN];
                } else {
                    campaign = "";
                }
            } else {
                if (qs["S"] != null) {
                    // Split the S parameter and return the third value
                    var splits = qs["S"].split('_');
                    campaign = splits[2];
                }
            }
            return campaign;
        }
        this.GetSearchTerm = function GetSearchTerm(qs, cookie, searchEngineName) {
            var searchTerm = "";
            // If utm_term is passed then
            if (qs["utm_term"] != null) {
                searchTerm = qs["utm_term"];
            }
            // Else if S is passed then
            else if (qs["S"] != null) {
                searchTerm = "";
            }
            // Else if a search engine is used then
            else if (searchEngineName != "") {
                // If there is a keyword parameter then
                var qsParams = this.referrer.split('&');
                var n = qsParams.length;
                for (var i = 1; i < n; i++) {
                    if ((qsParams[i].startsWith("p=")) || (qsParams[i].startsWith("q="))) {
                        // Get the keyword(s)
                        var param = qsParams[i].split('=');
                        searchTerm = param[1];
                        break;
                    }
                }
            }
            // Else if the cookie is not 30 days old and was used to retrieve the source then
            else if ((cookie != false) && (this.cookieUsed)) {
                searchTerm = cookie[TERM];
            } else {
                searchTerm = "";
            }
            return searchTerm;
        }
    }

    // helper functions
    function getCookie(name) {
        var c = new Cookies(name);
        return (name in c && c[name]);
    }

    function serialize(obj, prefix) {
        if (typeof obj == "string") {
            return obj;
        }
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push((v !== null && typeof v === "object") ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v !== null ? v : ""));
            }
        }
        return str.join("&");
    }

    function deserialize(str) {
        var qso = {};
        // Check for an empty querystring
        if (str == "") {
            return qso;
        }
        // Normalize the querystring
        str = str.replace(/(^\?)/, '').replace(/;/g, '&');
        while (str.indexOf("&&") != -1) {
            str = str.replace(/&&/g, '&');
        }
        str = str.replace(/([\&]+$)/, '');
        // Break the querystring into parts
        var qs = str.split("&");
        // Build the querystring object
        for (var i = 0; i < qs.length; i++) {
            var qi = qs[i].split("=");
            qi = [decodeURIComponent(qi[0]), decodeURIComponent(qi[1])];
            if (qso[qi[0]] != undefined) {
                // If a key already exists then make this an object
                if (typeof qso[qi[0]] == "string") {
                    var qt = qso[qi[0]];
                    if (qi[1] == "" || qi[1] == "undefined") {
                        qi[1] = null;
                    }
                    qso[qi[0]] = [];
                    qso[qi[0]].push(qt);
                    qso[qi[0]].push(qi[1]);
                } else if (typeof qso[qi[0]] == "object") {
                    if (qi[1] == "" || qi[1] == "undefined") {
                        qi[1] = null;
                    }
                    qso[qi[0]].push(qi[1]);
                }
            } else {
                // If no key exists just set it as a string
                if (qi[1] == "" || qi[1] == "undefined") {
                    qi[1] = null;
                }
                qso[qi[0]] = qi[1];
            }
        }
        var nqso = {},
            a, j, k, o, p, q;
        for (var i in qso) {
            a = i.match(/([^\[\]]+)(\[[^\[\]]+[^\]])*?/g);
            p = qso[i];
            j = a && a.length;
            while (j--) {
                q = {};
                q[a[j]] = p;
                p = q;
            }
            // merge object
            k = Object.keys(p)[0];
            o = nqso;
            while (k in o) {
                p = p[k];
                o = o[k];
                k = Object.keys(p)[0];
            }
            o[k] = p[k];
        }
        if (Object.keys(nqso).length === 1 && nqso[Object.keys(nqso)[0]] === "undefined") {
            return Object.keys(nqso)[0];
        }
        return nqso;
    }

    // localize proccess method
    root.ProcessLeadSourceTrackingUtil = { RequestSession: RequestSession, ProcessLeadSourceTracking: ProcessLeadSourceTracking };

    ProcessLeadSourceTracking();

})(this, lst_util);