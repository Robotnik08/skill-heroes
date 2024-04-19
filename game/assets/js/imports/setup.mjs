export function setup (size) {

    const game_container = document.createElement('div');
    game_container.id = 'game-container';
    

    for (let y = 0; y < size; y++) {
        const row = document.createElement('div');
        row.classList.add('row');
        game_container.appendChild(row);
        for (let x = 0; x < size; x++) {
            const color_box = document.createElement('div');
            color_box.classList.add('color-box');
            color_box.setAttribute("id", x + y*size);
            color_box.setAttribute("color", 0);
            row.appendChild(color_box);
        }
    }
    
    document.body.appendChild(game_container);

    return document.getElementsByClassName('color-box');
}