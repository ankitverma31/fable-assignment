let index = 1;
let textbox = document.getElementById("textbox");
let setCoords = true;

let radius = 20;
let canvas = document.getElementById("responsive-canvas");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");
var firstCircle = true;
var treeArray = [];

var currentXPosLeft = width / 2;
var currentYPosLeft = radius + 1;
var currentXPosRight = width / 2;
var currentYPosRight = radius + 1;

var currentXPos;
var currentYPos;

var XPosMoveToLineOffset = 16;
var YPosMoveToLineOffset = 13;
var XPosLineToLineOffset = 75;
var YPosLineToLineOffset = 54;

var XPosCircleOffset = 89;
var YPosCircleOffset = 69;

var button = document.getElementById("node");
button.addEventListener("click", () => {
    if (firstCircle == true) {
        // add the first circle to the tree.
        ctx.beginPath();
        ctx.arc(currentXPosRight, currentYPosRight, radius, 0, 2 * Math.PI); //you can use x/y posright or left, doesn't matter which one you use.
        ctx.stroke(); // Create the first circle
        ctx.strokestyle = "black";
        ctx.font = "arial";
        ctx.fillText(textbox.value, currentXPosRight - 5, currentYPosRight + 4); // create the text in the circle
        firstCircle = false; //bool that checks if you are creating the first circle or not.
        treeArray[1] = parseInt(textbox.value); //array that stores the tree values.
    } else {
        addTheNumber(treeArray, parseInt(textbox.value), 1); // else jump to that index and repeat the process
    }
});

var addTheNumber = (array, numberToAdd, ind) => { // function that builds the array-based tree.     
    if (setCoords == true) {
        currentXPos = width / 2;
        currentYPos = radius + 1;
        setCoords = false;
    }

    if (array[ind] < numberToAdd) {
        //if the number is greater than the root
        console.log(array[ind]);
        console.log(numberToAdd);
        ind = ind * 2 + 1;
        if (array[ind] == undefined) {
            currentXPos = currentXPos + XPosMoveToLineOffset;
            currentYPos = currentYPos + YPosMoveToLineOffset;
            array[ind] = numberToAdd; //add to right child in array-based tree
            addLineAndCircleRight(currentXPos, currentYPos);
            currentXPos = currentXPos + XPosCircleOffset; // change position to add the next line 
            currentYPos = currentYPos + YPosCircleOffset;
            setCoords = true;
        } else {
            currentXPos = currentXPos + XPosMoveToLineOffset + XPosCircleOffset;
            currentYPos = currentYPos + YPosMoveToLineOffset + YPosCircleOffset;
            addTheNumber(array, numberToAdd, ind); // else jump to that index and repeat the process


        }
    }
    if (array[ind] > numberToAdd) {
        // if the number is less than the root
        ind = ind * 2;
        if (array[ind] == undefined) {
            currentXPos = currentXPos - XPosMoveToLineOffset;
            currentYPos = currentYPos + YPosMoveToLineOffset;
            array[ind] = numberToAdd; // add that number to left child in array-based tree
            addLineandCircleLeft(currentXPos, currentYPos);
            currentXPos = currentXPos - XPosCircleOffset; // changs position to the next line
            currentYPos = currentYPos + YPosCircleOffset;
            setCoords = true;
        } else {
            currentXPos = currentXPos - XPosMoveToLineOffset - XPosCircleOffset;
            currentYPos = currentYPos + YPosMoveToLineOffset + YPosCircleOffset;
            addTheNumber(array, numberToAdd, ind); // else jump to that index and repeat the process

        }
    }
};

function addLineAndCircleRight(currentXPosRight, currentYPosRight) {
    ctx.moveTo(currentXPosRight, currentYPosRight); // line on the right side 368 34
    ctx.lineTo(
        currentXPosRight + XPosLineToLineOffset,
        currentYPosRight + YPosLineToLineOffset
    ); // 427 75
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        currentXPosRight + XPosCircleOffset,
        currentYPosRight + YPosCircleOffset,
        radius,
        0,
        2 * Math.PI
    ); //circle on the right side

    ctx.stroke(); // Circle

    ctx.strokestyle = "black";
    ctx.font = "arial";
    ctx.fillText(
        textbox.value,
        currentXPosRight + XPosCircleOffset - 5,
        currentYPosRight + YPosCircleOffset + 4
    );
}

function addLineandCircleLeft(currentXPosLeft, currentYPosLeft) {
    ctx.moveTo(currentXPosLeft, currentYPosLeft); // line on the right side 368 34
    ctx.lineTo(
        currentXPosLeft - XPosLineToLineOffset,
        currentYPosLeft + YPosLineToLineOffset
    ); // 427 75
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        currentXPosLeft - XPosCircleOffset,
        currentYPosLeft + YPosCircleOffset,
        radius,
        0,
        2 * Math.PI
    ); //circle on the right side
    ctx.stroke(); // Circle

    ctx.strokestyle = "black";
    ctx.font = "arial";
    ctx.fillText(
        textbox.value,
        currentXPosLeft - XPosCircleOffset - 5,
        currentYPosLeft + YPosCircleOffset + 4
    );
}