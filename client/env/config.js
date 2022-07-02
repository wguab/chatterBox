// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', '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');
});

// Put your campus prefix here
window.CAMPUS = 'RFC';
