chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    // TODO: figure out the typeahead part here
    // suggest([
    //   {content: text + " one", description: "the first one"},
    //   {content: text + " number two", description: "the second entry"}
    // ]);
});

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

chrome.omnibox.onInputEntered.addListener(function(text) {
    navigate("https://zen-audio-player.github.io?v=" + encodeURIComponent(text) )
});