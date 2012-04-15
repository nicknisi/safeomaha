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
    $('#crime-toggler').bind('click', function () {
        $('#crime-facts').toggle('slow');
    });
    $('#cops-toggler').bind('click', function () {
        $('#cops-facts').toggle('slow');
    });
    $('#accidents-toggler').bind('click', function () {
        $('#accidents-facts').toggle('slow');
    });
});
