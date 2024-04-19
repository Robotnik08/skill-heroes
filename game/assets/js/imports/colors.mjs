export class Colors {
    static get game_colors () {
        return [
            'red',
            'blue',
            'green',
            'yellow',
            'cyan',
            'grey',
            'pink'
        ]
    }

    static get game_colors_from_string () {
        return {
            'red': 0,
            'blue': 1,
            'green': 2,
            'yellow': 3,
            'cyan': 4,
            'grey': 5,
            'pink': 6
        }
    }

    static get red () { return 0;}
    static get blue () { return 1;}
    static get green () { return 2;}
    static get yellow () { return 3;}
    static get cyan () { return 4;}
    static get grey () { return 5;}
    static get pink () { return 6;}
}