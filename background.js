/**
 * For laziness' sake, copy/pasted this util function
 * from http://stackoverflow.com/a/1634841/2785681
 */

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');   
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var parts = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = parts.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (parts[i].lastIndexOf(prefix, 0) !== -1) {  
                parts.splice(i, 1);
            }
        }

        url = urlparts[0] + '?' + parts.join('&');
        return url;
    }
    else {
        return url;
    }
}

var SERVICE_URL = "http://shakeelmohamed.com/zen-youtube-audio-player";

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (typeof details && details.hasOwnProperty("url")) {
            if (details.url.indexOf("&zen") !== -1 || details.url.indexOf("/zen") !== -1) {
                var zenUrl = details.url;

                // Try to remove zen from the URL, it doesn't really need to happen though
                zenUrl = removeURLParameter(details.url, "zen");
                zenUrl = zenUrl.replace("/zen", "");

                // Setup the zen-youtube-audio-player link
                zenUrl = SERVICE_URL + "?v=" + zenUrl;
                return {redirectUrl: zenUrl};
            }
        }
        return details;
    },
    {
        urls : ["*://*.youtube.com/*"]
    },
    ["blocking"]
);