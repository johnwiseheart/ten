<?php
$numOne = $_GET['n1'];
$numTwo = $_GET['n2'];
$numThree = $_GET['n3'];
$numFour = $_GET['n4'];

// equ and max_sum are global variables
// equ is the concatenated string of 3 equations that produce 10
// max_sum is the sum of the results of each of those 3 equations

$equ = '';
$max_sum = 0;

// determine only needs one parameter to function
// $values is an array of (up to) 4 numbers
// to initiate the function, all 4 should be >= 1, <= 9
// as the function recurses, the numbers can be anything, including negative
// $size is the number of elements in $values
// $sum is the sum of the results thus far in the recursion
// $equation is the string of equations that make up the result

function determine( $values, $size = 4, $sum = 0, $equation = '' ) {
    global $equ;
    global $max_sum;
    switch ( $size ) {

    case 1:
    if ( $values[0] == 10 ) {
        // determine if the current summed result is the largest
        if ( $sum > $max_sum ) {
            $max_sum = $sum;
            $equ = $equation;
        }
    }
    break;

    default:
    // iterate through all values of the array with all the values of the array
    // except the case where they are the same

    for ( $i = 0; $i < $size; $i += 1 ) {
        for ( $j = 0; $j < $size; $j += 1 ) {
            if ( $i != $j ) {
                // $vals are the extra numbers that are not used in the current result
                $vals = array();
                for ( $q = 0; $q < $size; $q += 1 ) {
                    if ( $q != $i && $q != $j ) {
                        $vals[] = $values[$q];
                    }
                }

                // iterate through 4 possible operators, as numbers to make looping easier
                // 0 is +, 1 is -, 2 is *, 3 is /
                for ( $q = 0; $q < 4; $q += 1 ) {
                    // $b is the value of the operator
                    // $eq is the equation of the result
                    $b = 0;
                    $eq = '';
                    switch ( $q ) {

                    case 0:
                        $b = $values[$i] + $values[$j];
                        $eq = "{$values[$i]} + {$values[$j]} = {$b}<br />";
                        break;

                    case 1:
                        $b = $values[$i] - $values[$j];
                        $eq = "{$values[$i]} - {$values[$j]} = {$b}<br />";
                        break;

                    case 2:
                        $b = $values[$i] * $values[$j];
                        $eq = "{$values[$i]} * {$values[$j]} = {$b}<br />";
                        break;

                    case 3:
                        // check for division by 0 or non-integer division
                        if ( $values[$j] == 0 || ( $values[$i] % $values[$j] > 0 ) ) {
                            $b = null;
                        } else {
                            $b = intval( $values[$i] / $values[$j] );
                            $eq = "{$values[$i]} / {$values[$j]} = {$b}<br />";
                        }
                        break;
                    }

                    // if it's +, -, *, or integer division, recurse with a new array
                    if ( $b != null ) {
                        determine( array_merge( array( $b ), $vals ), $size - 1, $sum + $b, $equation . $eq );
                    }
                }
            }
        }
    }
    break;
    }
}

// example usage, determine only needs one parameter to start, which is an array of 4 numbers (for the game)
// you can probably pass any number corresponding to the size of the array and it will still work
// the results are stored in global variables because passing the result set through the recursive call is /very/ nasty

determine( array( $numOne, $numTwo, $numThree, $numFour ) );
?>


<html>
    <head>
        <style>
            body {
                width: 100%;
                height: 100%;
            }
            div.wrapper {
                position:absolute; height:100%; width:100%;
                display: table;
            }
            div.inner {
                display: table-cell;
                vertical-align: middle;
                text-align:center;
            }
            input[type=text]  {
                width: 100px;
                height: 200px;
                font-size: 100px; 
                text-align:center;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="inner">
            <?php if($equ) { ?>
                <?php echo $equ; ?><br />
                <a href="/index.php">Clear</a>
                <br />
            <?php } else { ?>
                Enter the four digits to "make ten".
                <br />
            <?php } ?>
            <br />
            <form autocomplete="off">

                <input type="text" name="n1" maxlength="1" autocomplete="off"/>
                <input type="text" name="n2" maxlength="1" autocomplete="off"/>
                <input type="text" name="n3" maxlength="1" autocomplete="off"/>
                <input type="text" name="n4" maxlength="1" autocomplete="off"/>
                <br />
                <br />
                <input type="submit">
            </form>
            </div>
        </div>
    </body>
</html>
