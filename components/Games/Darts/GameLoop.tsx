import { Constants } from '../Constants';

const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

export const GameLoop = (entities: any, { events }: any) => {
    let aim = entities.aim;
    let points = entities.points;
    let dart = entities.dart;

    let state = entities.state;

    if (events.length) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "next-state") {
                aim.state += 1;
            }
        }
    }
    if (dart.elements.length != 3) {
        if (aim.state === 0) {
            if (aim.xDirection) {
                aim.position[0] += aim.speed;
                if (aim.position[0] === 50) {
                    aim.xDirection = false;
                }
            } else {
                aim.position[0] -= aim.speed;
                if (aim.position[0] === 0) {
                    aim.xDirection = true;
                }
            }
        } else if (aim.state === 1) {
            if (aim.yDirection) {
                aim.position[1] += aim.speed;
                if (aim.position[1] === 50) {
                    aim.yDirection = false;
                }
            } else {
                aim.position[1] -= aim.speed;
                if (aim.position[1] === 0) {
                    aim.yDirection = true;
                }
            }
        } else if (aim.state === 2) {

            dart.elements = [[aim.position[0], aim.position[1]]].concat(dart.elements);
            let dis = distance(aim.position[0], aim.position[1], Constants.CENTER, Constants.CENTER);

            if (dis >= 25) {
                points.score += 0;
            } else if (dis > 20) {
                points.score += 1;
            } else if (dis > 15) {
                points.score += 2;
            } else if (dis > 10) {
                points.score += 3;
            } else if (dis > 5) {
                points.score += 4;
            } else if (dis > 1) {
                points.score += 5;
            } else {
                points.score += 10;
            }

            aim.state = 0;
            aim.position[0] = 25;
            aim.position[1] = 25;


        }

        if (dart.elements.length == 3) {
            state.win = true;
            state.update(points.score);
        }
    }

    return entities;
}
