require({
    baseUrl : 'js',
    packages : [
        { name : 'dojo', location : 'dojo/dojo' },
        { name : 'dijit', location : 'dojo/dijit' },
        { name : 'dojox', location : 'dojo/dojox' }
    ],
    cache : {}
}, [
    'dojo/on',
    'dojo/dom',
    'dijit/layout/AccordionContainer',
    'dijit/layout/ContentPane',
    'dojo/domReady!'
], function (on, dom, Button, AccordionContainer, ContentPane) {
});
