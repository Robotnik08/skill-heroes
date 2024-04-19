export class RandomHelper {
    static randomRange (a, b) {
        return Math.floor(Math.random() * (b-a)) + a;
    }
}