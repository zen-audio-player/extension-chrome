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

var SERVICE_URL = "https://zenplayer.audio/";

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (typeof details && details.hasOwnProperty("url")) {
            if (details.url.indexOf("&zen") !== -1 || details.url.indexOf("/zen") !== -1) {
                var zenUrl = details.url;

                // Try to remove zen from the URL, because we can...
                // &zen case
                zenUrl = removeURLParameter(details.url, "zen");
                // /zen case
                zenUrl = zenUrl.replace("/zen", "");

                // Build the Zen Audio Player link
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

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if (command === "zap-play-pause") {
        // TODO: figure out how to find the tab with zenplayer.audio running, then invoke ZenPlayer.pause() or ZenPlayer.play()
    }
});