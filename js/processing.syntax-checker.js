window.onload = function() {
    if (Polymerase) {
        Polymerase.prototype.processing = function(code) {
            var globalnames = new Array();
            globalnames.push(
                    {name : "fill", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/double/color", "int/float/double", "int/float/double", "int/float/double"]},
                    {name : "stroke", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/double/color", "int/float/double", "int/float/double", "int/float/double"]},
                    {name : "strokeWeight", type : "void()", paramCombos : [1], params : ["int/float/double"]},
                    {name : "colorMode", type : "void()", paramCombos : [1, 2, 4, 5], params : ["int", "int/float", "int/float", "int/float", "int/float"]},
                    {name : "background", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/color", "int/float", "int/float", "int/float"]},
                    
                    //VARS
                    {name : "RGB", type : "int", value : 1},
                    {name : "HSB", type : "int", value : 3},
                    {name : "CORNER", type : "int", value : 0},
                    {name : "CORNERS", type : "int", value : 1},
                    {name : "CENTER", type : "int", value : 3},
                    {name : "RADIUS", type : "int", value : 2},
                    {name : "PI", type : "float", value : Math.PI},
                    {name : "HALF_PI", type : "float", value : Math.PI/2},
                    {name : "QUARTER_PI", type : "float", value : Math.PI/4},
                    {name : "TWO_PI", type : "float", value : Math.PI*2}
                    );
            var classes = new Array("int", "String", "float", "boolean", "char", "Object", "PShape", "PVector", "PFont", "PImage", "PGraphics", "color");
            var inside = new Array("body");
            
            
            for(var ln = 0; ln < code.length; ln++) {
                var line = code[ln].replace("\r", "").replace("\t", "").replace(/ {2,}/g, " ").trim(); //Replaces lots of spaces with just one space
                //General check
                if (line === "" || line === "\n" || line === "\r\n") {
                    printer.warn("Empty line on line " + (ln + 1));
                    continue;
                } else if (line.indexOf("@syntax-checker") > -1) { //this is a message to us
                    var syntaxparams = line.substring(line.indexOf("@syntax-checker") + 16, line.length).split(" ");
                    
                }
                
                //Detailed check
                for(var i = 0; i < line.length; i++) {
                    var c = line.charAt(i);
                    if (inside[inside.length-1] === "multiline comment") {
                        if (c !== '/') {
                            continue; //Continue to next char
                        } else if (c === '/' && line.charAt(i-1) === '*') {
                            inside.pop();
                            continue; // No need to further interpret this, continue to next char
                        }
                    }
                    else if (inside[inside.length - 1] === "normal comment") {
                        break; //this line is not important, go back to the first loop
                    }
                    else if (inside[inside.length-1] === "string") {
                        if (c === '"') {
                            inside.pop();
                            continue; //Exited the string, continue to next char
                        } else if (c === "\\" && line.charAt(i-1) != "\\") {
                            inside.push("string escape");
                        }
                    } else if (inside[inside.length-1] === "string escape") {
                        if (c === "\\" || c === "n" || c === "t" || c === "r" || c === "v" || c === "\"" || c === "\'") {
                            inside.pop();
                            continue;
                        } else {
                            return {line: ln+1, column: i+1, reason : "Invalid escape character \'" + c + "\'", hint : "HINT: Valid escape sequences are \\n \\r \\t \\v \\\" \\' and \\\\ <br> <b>#--</b> If you were trying to write '\\" + c + "' literally then try '\\\\" + c + "' in your string.", error: "String syntax error" };
                        }
                    } else if (c === "\"") {
                        inside.push("string");
                    }
                    else if (c === "*" && line.charAt(i - 1) === "/") {
                        inside.push("multiline comment");
                    }
                    else if (c === "/" && line.charAt(i - 1) === "/") {
                        inside.push("normal comment");
                    }
                }
            }
            return {line: code.length, reason : "Default:Defaulted to this", status: 0};
        }
    } else {
        //Add code that attaches main script to document
    }
}