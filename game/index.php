<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JS square game</title>
        <link rel="stylesheet" href="assets/css/main.css">
        <script src="assets/js/main.mjs" defer type="module"></script>
    </head>
    <body>
        <div class="GUI">
            <button id="start-btn">Start game!</button>
            <div class="titles">
                <p id="info">Welcome!</p><p id="timer"></p>
            </div>
            <div class="options">
                <label for="size-btn">Choose size:</label>
                <select name="size-btn" id="size-btn">
                  <option value="0">6 by 6</option>
                  <option value="1">8 by 8</option>
                </select>

                <label for="dif-btn">Choose amount of colors:</label>
                <select name="dif-btn" id="dif-btn">
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6" selected>6</option>
                    <option value="7">7</option>
                </select>

                Choose username:
                <input type="text" id="user-name" value="User"/>
            </div>
        </div>

        <dialog id="winner-dialog">
            <h2>You won!</h2>
            <h3><span id="score-span"></span></h3>

            <h3>Best Scores (time):</h3>
            <p id="score-time-box"></p>

            <h3>Best Scores (moves):</h3>
            <p id="score-moves-box"></p>

            <h3>Press escape to try again for a better score!</h3>
        </dialog>

        <dialog id="loser-dialog">
            <h2>Game over!</h2>

            <h3>Press escape to try again!</h3>
        </dialog>
    </body>
</html>