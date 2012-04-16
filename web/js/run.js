require({
    baseUrl : 'js',
    packages : [
        { name : 'dojo', location : 'dojo/dojo' },
        { name : 'dijit', location : 'dojo/dijit' },
        { name : 'dojox', location : 'dojo/dojox' }
    ],
    cache : {}
}, [
    'dojo/domReady!'
], function () {
    $('#crime-toggler').css({ cursor:'pointer',textDecoration:'underline' }).bind('click', function () {
        $("#crime-title").hide();
        $('#crime-facts').toggle('slow');
        $("#cops-title").hide();
        $('#cops-facts').hide('slow');
    });
    $('#cops-toggler').css({ cursor:'pointer',textDecoration:'underline' }).bind('click', function () {
        $("#cops-title").hide();
        $('#cops-facts').toggle('slow');
        $("#crime-title").hide();
        $('#crime-facts').hide('slow');
    });
    $('#accidents-toggler').bind('click', function () {
        $('#accidents-facts').toggle('slow');
    });
});
