"use strict";

// calculate needs only one parameter to function - an array of values
// between 0 and 9 representing the 4 numbers to calculate 10 from.
// The function is called recursively, with equation storing the string
// of text to be returned.
function calculate(values) {
  var equation = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  // if we have only one value remaining in our list, and that value is
  // 10, then we are done and we can return the equation.
  if (values.length == 1) {
    if (values[0] == 10) {
      return equation;
    }
  } else {
    // iterate through all values of the array with all the _other_
    // values of the array (check that we never stop on the same ones)
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (i == j) {
          continue;
        }
        // grab out all the values from the array that arent the
        // two we're currently looking at.
        var vals = Array();
        for (var q = 0; q < values.length; q++) {
          if (q != i && q != j) {
            vals.push(values[q]);
          }
        }

        // iterate through each possible operator, and recurse.
        // We use a mapping of numbers to operators to make it easier.
        // 0 is + , 1 is -, 2 is *, 3 is /
        for (var q = 0; q < 4; q++) {
          var sum = 0;
          var eq = "";
          switch (q) {

            // case +
            case 0:
              sum = values[i] + values[j];
              eq = values[i] + " + " + values[j] + " = " + sum + " <br />";
              break;

            // case -
            case 1:
              sum = values[i] - values[j];
              eq = values[i] + " - " + values[j] + " = " + sum + " <br />";
              break;

            // case *
            case 2:
              sum = values[i] * values[j];
              eq = values[i] + " * " + values[j] + " = " + sum + " <br />";
              break;

            // case /
            case 3:
              // A little bit more complex because we deal with division
              // by zero and non-integer division.
              if (values[j] == 0 || values[i] % values[j] > 0) {
                sum = null;
              } else {
                sum = parseInt(values[i] / values[j]);
                eq = values[i] + " / " + values[j] + " = " + sum + " <br />";
              }
              break;
          }

          if (sum != null) {
            var newVals = vals.slice();
            newVals.unshift(sum)
            var result = calculate(newVals, equation + eq);
            if (result) {
              return result;
            }
          }
        }
      }
    }
  }
}

$('#n1').keyup(function() {
  var key = event.keyCode || event.chatCode;
  if (key != 8 && key != 46) {
    $('#n2').focus();
  }
});
$('#n2').keyup(function() {
  var key = event.keyCode || event.chatCode;
  if (key == 8 || key == 46) {
    $('#n1').focus();
  } else {
    $('#n3').focus();
  }
});
$('#n3').keyup(function() {
  var key = event.keyCode || event.chatCode;
  if (key == 8 || key == 46) {
    $('#n2').focus();
  } else {
    $('#n4').focus();
  }
});
$('#n4').keyup(function() {
  var key = event.keyCode || event.chatCode;
  if (key == 8 || key == 46) {
    $('#n3').focus();
  } else {
    $('#n4').change();
  }
});

$('input[type=number]').keyup(function() {
  if(this.value.length > 1) {
    this.value = this.value.slice(0,1);
  }
  if($('#n1').val() && $('#n2').val() && $('#n3').val() && $('#n4').val()) {
    var result = calculate(
       Array(
        parseInt($('#n1').val()),
        parseInt($('#n2').val()),
        parseInt($('#n3').val()),
        parseInt($('#n4').val())
      )
    );
    if (typeof result === 'undefined') {
      result = 'No combination found.';
    }
    $('.result').html(result);
  }
});
