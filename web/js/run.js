require({
    baseUrl : 'js',
    packages : [
        { name : 'dojo', location : 'dojo/dojo' },
        { name : 'dijit', location : 'dojo/dijit' },
        { name : 'dojox', location : 'dojo/dojox' }
    ],
    cache : {}
}, [
    'dijit/form/Button',
    'dijit/layout/AccordionContainer',
    'dijit/layout/ContentPane',
    'dojo/domReady!'
], function (Button, AccordionContainer, ContentPane) {
    var accordion = new AccordionContainer({
        height: '400px'
    }, "facts-widget");
    accordion.addChild(new ContentPane({
        title : 'Crime Facts',
        content : 'foo'
    }));
    accordion.addChild(new ContentPane({
        title : 'Police Facts',
        content : 'bar'
    }));
    accordion.addChild(new ContentPane({
        title : 'Accidents Facts',
        content : 'baz'
    }));
    accordion.startup();
});
