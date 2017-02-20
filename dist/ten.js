/// <reference path="node_modules/@types/jquery/index.d.ts" />
var operations = [
    {
        string: '+',
        operation: function (a, b) { return a + b; }
    },
    {
        string: '-',
        operation: function (a, b) { return a - b; }
    },
    {
        string: '*',
        operation: function (a, b) { return a * b; }
    },
    {
        string: '/',
        operation: function (a, b) {
            if (b == 0 || a % b > 0) {
                return null;
            }
            else {
                return a / b;
            }
        }
    }
];
var unshift = function (item, arr) {
    var newArray = arr.slice();
    newArray.unshift(item);
    return newArray;
};
var calculate = function (values, equation) {
    if (equation === void 0) { equation = ''; }
    if (values.length === 1) {
        if (values[0] === 10) {
            return equation;
        }
    }
    else {
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < values.length; j++) {
                if (i === j) {
                    continue;
                }
                var vals = Array();
                for (var q = 0; q < values.length; q++) {
                    if (q !== i && q != j) {
                        vals.push(values[q]);
                    }
                }
                for (var q = 0; q < operations.length; q++) {
                    var sum = operations[q].operation(values[i], values[j]);
                    var eq = values[i] + " " + operations[q].string + " " + values[j] + " = " + operations[q].operation(values[i], values[j]) + " <br />";
                    if (sum != null) {
                        return calculate(unshift(sum, vals), equation + eq);
                    }
                }
            }
        }
    }
};
var boxIsSelected = function (box) { return box.id[0] === 'n'; };
var getSelectedBoxID = function (box) { return parseInt(box.id[1]); };
var isDeletePressed = function (event) { return (event.key === 'Backspace' || event.key === 'Delete'); };
var setFocusedBox = function (box) { return document.getElementById('n' + box).focus(); };
var getElements = function () { return [0, 1, 2, 3].map(function (i) { return document.getElementById('n' + i); }); };
window.onkeyup = function (event) {
    if (boxIsSelected(event.target)) {
        var selectedBox = getSelectedBoxID(event.target);
        if (isDeletePressed(event)) {
            selectedBox = (selectedBox - 1) > 0 ? selectedBox - 1 : 0;
        }
        else {
            selectedBox = selectedBox + 1 < 3 ? selectedBox + 1 : 3;
        }
        setFocusedBox(selectedBox);
        if (event.target.value.length > 1) {
            event.target.value = event.target.value.slice(0, 1);
        }
        var elements = getElements();
        if (elements.filter(function (element) { return element.value; }).length > 0) {
            var result = calculate(Array.apply(void 0, elements.map(function (element) { return parseInt(element.value); })));
            if (typeof result === 'undefined') {
                result = 'No combination found.';
            }
            document.getElementById('result').innerHTML = result;
        }
    }
};
