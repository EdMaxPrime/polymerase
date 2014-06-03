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
You may add your own with the `prototype`

__IMPORTANT: WINDOW.CONSOLE IS DIFFERENT FROM THIS__

## Commands

In order to avoid collisions with any other scripts that may be using the same Console object, all of the commands this library uses are prefixed with “empsc”. Eg: `empsc param1 param2 param3`