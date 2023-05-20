**Maximum score for the task: 180 points**

### Basic scope +40

- [+] layout, design, responsive UI: `+10`
- [+] at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default: `+10`
- [+] when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine: `+10`
- [+] the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game: `+10`

### Advanced scope +80

- [+] mines are placed after the first move, so that user cannot lose on the first move. `+20`
- [+] user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags: `+10`
- [+] the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell: `+10`
- [+] the game can be restarted without reloading the page: `+10`
- [+] game duration and number of clicks are displayed: `+15`
- [+] when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers: `+15`

### Hacker scope +60

- [+] sound accompaniment (on/off) when clicking on cell and at the end of the game: `+10`
- [+] implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99): `+20`
- [+] implemented saving the latest 10 results using LocalStorage: `+10`
- [+] implemented saving the state of the game: `+10`
- [+] option to choose different themes for the game board (dark/light themes): `+10`

### Penalties

- using JQuery - 0 points for the task
- using Angular / React / Vue / Typescript - 0 points for the task
- `body` in the index.html is not empty - 0 points for the task

## Cross-check instructions:

- You can check _index.html_ with DevTools -> Sources -> (index.html).
- If you check an application on cross-check and the `body` in the index.html is not empty - please fill in [this form](https://docs.google.com/forms/d/1WbuUQhq_J7TrrfxIInyTDjMsHsrVMpKF74jwoEsx19g/).
- **_Pay attention:_** You have to check an application anyway (even if the `body` in the index.html is not empty) and rate it according to _Criteria for evaluation point_.

## Useful links

- [Eslint](https://eslint.org/)
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Local storage](https://learn.javascript.ru/localstorage)
- [How-to play in minesweeper](https://www.youtube.com/watch?v=7B85WbEiYf4)

[The form for students questions](https://docs.google.com/forms/d/1rl3fHYRJLAKpYo4T5t6wRrixxMChunSX6KnEkBSd170)  
[Please, provide the best apps from cross-check in the following form](https://docs.google.com/forms/d/1HR5K7fsIbLNCC0UNcJ_67OkOBptkEsIl4ndtzL63yvM/edit)