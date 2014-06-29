(function() { //Immediately Invoked Function Expression
    if (Polymerase !== undefined) {
        if (Polymerase.addMod !== undefined) {
            printer.println(Polymerase.addMod("processing", {k:5}));
        }
        Polymerase.prototype.processing = {
            version: 0.2,
            author: "Max Zlotskiy",
            description: "Syntax checker for processing(java and javascript)",
            src: "mod.zlotskiy.com/EdMaxPrime/polymerase/processing.polymerase.js",
            isOutdated: function(instance) {
                if (instance.supports("")) {
                    return true;
                }
                return false;
            },
            pnames : new Array( /*Processing variables and names*/
                {name : "fill", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/double/color", "int/float/double", "int/float/double", "int/float/double"]},
                {name : "stroke", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/double/color", "int/float/double", "int/float/double", "int/float/double"]},
                {name : "strokeWeight", type : "void()", paramCombos : [1], params : ["int/float/double"]},
                {name : "colorMode", type : "void()", paramCombos : [1, 2, 4, 5], params : ["int", "int/float", "int/float", "int/float", "int/float"]},
                {name : "background", type : "void()", paramCombos : [1, 2, 3, 4], params : ["int/float/color", "int/float", "int/float", "int/float"]},
                {name : "color", type : "int()", paramCombos : [1, 2, 3, 4], params : ["int/float/double", "int/float/double", "int/float/double", "int/float/double"]},
                {name : "green", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "red", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "blue", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "hue", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "saturation", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "brightness", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "alpha", type : "int()", paramCombos : [1], params : ["int/color"]},
                {name : "noStroke", type : "void()", paramCombos : [0], params : [""]},
                {name : "noFill", type : "void()", paramCombos : [0], params : [""]},
                {name : "size", type : "void()", paramCombos : [2, 3], params: ["int", "int", "int"]},
                {name : "rectMode", type : "void()", paramCombos : [1], params: ["int"]},
                {name : "ellipseMode", type : "void()", paramCombos : [1], params : ["int"]},
                {name : "rect", type: "void()", paramCombos : [4], params : ["int/float/double", "int/float/double", "int/float/double", "int/float/double"]},
                {name : "ellipse", type : "void()", paramCombos : [4], params : ["int/float/double", "int/float/double", "int/float/double", "int/float/double"]},
                
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
                {name : "TWO_PI", type : "float", value : Math.PI*2},
                {name : "true", type : "boolean", value : true},
                {name : "false", type : "boolean", value : false}
            ),
            pclasses : { /*Processing classes*/
                _int : {name : "int", primitive : true, createdAsLiteral : true, paramCombos : [1], params : ["int"], parentClass : this._Object, interfaces : [], isabstract : false},
                _float : {name : "float", primitive : true, createdAsLiteral : true, paramCombos : [1], params: ["float"], parentClass : this._Object, interfaces : [], isabstract : false},
                _double : {name : "float", primitive : true, createAsLiteral : true, paramCombos : [1], params : ["double"], parentClass : this._Object, interfaces : [], isabstract : false},
                _boolean : {name : "float", primitive : true, createAsLiteral : true, paramCombos : [1], params : ["boolean"], parentClass : this._Object, interfaces : [], isabstract : false},
                _char : {name : "char", primtive : true, createAsLiteral : true, paramCombos : [1], params : ["char"], parentClass : this._Object, interfaces : [], isabstract : false},
                _byte : {name : "byte", primtive : true, createAsLiteral : true, paramCombos : [1], params : ["byte"], parentClass : this._Object, interfaces : [], isabstract : false},
                _Object : {name : "Object", primitive : false, createAsLiteral : true, paramCombos : [0], params : [""], parentClass : this._Object, interfaces : [], isabstract : false},
                _String : {name : "String", primitive : false, createAsLiteral : true, paramCombos : [1], params : ["String/char[]/byte[]"], parentClass : this._Object, interfaces : [], isabstract : false,
                    names : new Array(
                        {name : "charAt", type : "char()", paramCombos : [1], params : ["int"]},
                        {name : "compareTo", type : "int()", paramCombos : [1], params : ["String"]},
                        {name : "compareToIgnoreCase", type : "int()", paramCombos : [1], params : ["String"]},
                        {name : "concat", type : "String()", paramCombos : [1], params : ["String"]},
                        {name : "endsWith", type : "boolean()", paramCombos : [1], params : ["String"]},
                        {name : "equals", type : "boolean()", paramCombos : [1], params : ["Object"]},
                        {name : "equalsIgnoreCase", type : "boolean()", paramCombos : [1], params : ["String"]},
                        {name : "indexOf", type : "int()", paramCombos : [1, 2], params : ["int/String", "int"]},
                        {name : "lastIndexOf", type : "int()", paramCombos : [1, 2], params : ["int/String", "int"]},
                        {name : "length", type : "int()", paramCombos : [1], params : [""]}
                    )
                },
                _color : {name : "color", primitive : true, createdAsLiteral : false, paramCombos : [1, 2, 3, 4], params : ["color/int/float", "int/float", "int/float", "int/float"], parentClass : this._Object, interfaces : [], isAbstract : false},
                _PImage : {name : "PImage", primitive : false, createdAsLiteral : false, paramCombos : [2, 3], params : ["int", "int", "int"], parentClass : this._Object, interfaces : [], isabstract : false,
                    names : new Array(
                        {name : "width", type : "int", value : 0},
                        {name : "height", type : "int", value : 0},
                        {name : "pixels", type : "color[]", value : []}
                    )}
            },
            checkCode : function(code, params) {
                var globalnames = Polymerase.modules.processing.pnames;
                //var classes = new Array("int", "String", "float", "boolean", "char", "Object", "PShape", "PVector", "PFont", "PImage", "PGraphics", "color");
                var classes = Polymerase.modules.processing.pclasses;
                var inside = new Array("body");
                var blacklist = new Array();
                var expecting = new Array();
                var mode = "java";
                if (params !== undefined) {
                    if (params.length === 1) {
                        mode = params[0];
                    }
                }
                
                
                for(var ln = 0; ln < code.length; ln++) {
                    var line = code[ln].replace("\r", "").replace("\t", "").replace(/ {2,}/g, " ").trim(); //Replaces lots of spaces with just one space
                    //General check
                    if (line === "" || line === "\n" || line === "\r\n") {
                        continue;
                    } else if (line.indexOf("@pms(") > -1) { //this is a message to us
                        var syntaxparams = line.substring(line.indexOf("@pms(") + 5, line.indexOf(");", line.indexOf("@pms("))).split(" ");
                        
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
                                return {line: ln+1, column: i+1, reason : "Invalid escape character \'" + c + "\'", hint : "HINT: Valid escape sequences are \\n \\r \\t \\v \\\" \\' and \\\\ <br> <b>#--</b> If you were trying to write '\\" + c + "' literally then try '\\\\" + c + "' in your string.", error: "String syntax error", status : 1 };
                            }
                        } else if (c === "\"") {
                            inside.push("string");
                        }
                        else if (c === "*" && line.charAt(i - 1) === "/" && inside[inside.length-1] !== "multiline comment") {
                            inside.push("multiline comment");
                        }
                        else if (c === "/" && line.charAt(i - 1) === "/") {
                            inside.push("normal comment");
                        }
                        else if (c === '"' && expecting.indexOf("string") !== -1) {
                            
                        }
                    }
                }
                return {line: code.length, reason : "Your code is safe!", status: 0};
            }
        };
    } else {
        console.log(Polymerase);
        console.log(Polymerase.processing);
        console.log(Polymerase.prototype);
        console.log(Polymerase.modules);
    }
})();