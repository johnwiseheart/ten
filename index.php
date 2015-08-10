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
