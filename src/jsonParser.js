function parseJsonFromForm(flatJsonArray){
    let json = {};
    // console.log(flatJsonArray[0]);
	flatJsonArray.forEach(function(elementInArray) {
		json = parseNestedJson(elementInArray.name, elementInArray.value, json);
	});
    
    // console.log(json);   
    return json;
}


function parseNestedJson(childNameString, value, parentJson){
    if(childNameString.indexOf('.') == -1){
        parentJson[childNameString] = value;
    } else {
        var nestedNames = childNameString.split(/\.(.*)/, 2);
        // console.log(nestedNames);
        if(!parentJson[nestedNames[0]]){
            if(isNaN(nestedNames[0])){
                parentJson[nestedNames[0]] = {};
            } else {
                if(!Array.isArray(parentJson)){
                    parentJson = [];
                }
            }
        }

        if(parentJson[nestedNames[0]]){
            parentJson[nestedNames[0]] = parseNestedJson(nestedNames[1], value, parentJson[nestedNames[0]]);
        } else {
            parentJson.push(parseNestedJson(nestedNames[1], value, {}));
        }
        // console.log(parentJson);
    }    
    return parentJson;
}

module.exports = {
    parseJsonFromForm: parseJsonFromForm,
}
