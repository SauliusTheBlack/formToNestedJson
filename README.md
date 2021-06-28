# formToNestedJson
javascript "library" to convert a list of objects to a nested json output format, depending on the names in the list

# Basic usage
Given a form in html you can serialize it to flat json rather easily using jquery
```JavaScript
var json = jQuery("myForm").serializeArray()
```
This will produce an object of the form
```JavaScript
json = [ 
	{"name":"player.firstName", "value":"Saulius"},
	{"name":"player.lastName", "value":"TheBlack"},
];
```
In the provided example, the form has 2 text inputs with the names player.firstName and player.lastName

if you want to create json that is less flat, and somewhat more verbose you can manually go around and do it everytime yourself.
you can also use this library, that will create the following json for you:
```JavaScript
json = parseJsonFromForm(jQuery(formId).serializeArray());
json = { 
	"player" : {
		"firstName":"Saulius",
		"lastName":"TheBlack",
	}
};
```

if there are numbers included in the naming, the parser will convert it to a list:
```JavaScript
json = [ 
	{"name":"players.0.firstName", "value":"Saulius"},
	{"name":"players.0.lastName", "value":"TheBlack"},
	{"name":"players.1.firstName", "value":"Gandalf"},
	{"name":"players.1.lastName", "value":"TheWhite"},
];
```

```JavaScript
json = parseJsonFromForm(jQuery(formId).serializeArray());
json = { 
	"players" : [
		{
			"firstName":"Saulius",
			"lastName":"TheBlack",
		},
		{
			"firstName":"Gandalf",
			"lastName":"TheWhite",
		}
	
	]
};
```