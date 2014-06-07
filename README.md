# Syntax-checker #
1. Summary
2. Console
3. Commands
4. Modules
    1. Processing
5. Credits

## Summary

There are many utilities for web developers to check their code or look at the console. The Google Chrome browser has built-in developer tools that are simplistic but extensive in their functionality. There is also firebug, which adapts to most browsers. 

But not all of these are easily accessible or very detailed. Sometimes you spend more time figuring out what exactly the problem was rather than fixing the bug. Sometimes it isn’t even the developer tools’ fault, sometimes it is just the parser instead.

Well think of this as a “second opinion” so to speak. This tool was created for us on the [openprocessing.org](http://openprocessing.org) site. Many people that use it are beginners with programming that might not even know *where* to find the error log. This tool was created to solve that problem by giving them an upfront console that prints descriptive errors without going into advanced details. After all, why should a computer see more in an error that a human?

Humans should be able to know more about their bug than the computer, because most parsers go from word to word. So seeing a complex jumble of text and traces will confuse some people not accustomed to reading error logs(we’ve all been there).

## Console

The console is an essential part of the library, but it can actually run by itself. Provided that you include the __two__ required elements in your HTML with their respective id’s. In the future this may be changed, and the elements will be generated when the Console object is created.

In the style.css there is a class called `consoleBottom` which really is just for aesthetics. It also makes the div stay at the bottom of the page and size it according to the window. There is a second class called `consoleInput` which is also, just for sleek design.

The two required elements are a div and a paragraph. The index.html has some other things in there, but here is the bare minimum required for now:

    <div id=“console”>
        <p id=“filler”></p>
    </div>

Make sure that they have the same id’s, otherwise it won’t work. If you want to change the id’s in the html, make sure to change them in the code too. In most text editors you can do a search with “command + f” or “control + f” to see all occurrences of these ids in the code.

The Console supports `onCommand` events which you may fire at any time. In the example index.html I used a listener on a textfield in the div console for the “enter” key. Then you simply pass the command as a string as the only parameter.

You can manually override the default functionality in your code:

    Console c = new Console(document.getElementById(“console”));
    c.onCommand = function(command) {
        // do something here
    }

Wait, there is a better way. Simply pass your function to be executed to the array in the console object like this:

    c.commandTasks.push( function(command) {
        // do something here
    }

The Console class has a few methods:
* println(message)
* warn(message)
* error(message)

You may add your own methods with the `Console.prototype`

It is important to know that window.console is *not* the same thing as any Console object.

## Commands

In order to avoid collisions with any other scripts that may be using the same Console object, all of the commands this library uses are prefixed with “empsc”. Eg: `empsc param1 param2 param3`

Commands are not yet present, but they will be added soon. If you are wondering how to check your code for now, look at the “check code” button in the example index.html.

## Modules

Modules are an important part of the syntax-checker because they make it extendable. And in fact most of it is up to you, because you are attaching a function to the Polymerase class. Polymerase is a type of enzyme in human cells that checks for DNA errors among other things.

    Polymerase.prototype.exampleLanguage = function(code) {
        // Add your checking code here
    }

The Polymerase class will pass an array as the code parameter. The array is the code that is to be checked, but split by line breaks. Every element is a String containing one line of code.

When you ask to check code you pass an array of strings, which are the names of methods. If you pass more than one, everything after the first becomes a fallback. If the first language returns an error it will log it to the console and then the second language will resume from the point where the first one left off, and so on.

While this works, it has not yet been fully implemented as languages must transfer a list of defined variables and functions to each other, which thankfully is a universal concept in most languages that are not markup based.

### Processing

[Processing](http://processing.org) is a great visualization language for beginners and advanced users. It is available on several languages including java and javascript. However, do not let the names fool you. Java and javascript can have different syntax at times and have no libraries in common.

The solution: the Processing team has made processing syntax the same on all language ports. The javascript version [processing.js](http://processingjs.org) uses the same syntax as the java version. So checking the code should be easy, right?

Well as is the case with multiple language porting, you can use native code. So while there is a standard processing syntax, javascript mode allows you to use javascript syntax and java mode allows you to use java syntax. This makes things a bit more challenging.

Thankfully there are fallback languages as described above. There are also annotations. On each line the processing syntax checker looks for this annotation:

    @syntax-checker(args);

It must end with a ); because arguments are space delimited.

## Credits

More will be added.
* EdMaxPrime for creating Console.js, the main syntax-checker, and the processing module
* [Craig](http://craig.is) for creating the key binding library used in the example html file
* [jquery](http://jquery.org) for use in the example html file