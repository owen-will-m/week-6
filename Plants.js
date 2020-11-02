     import Sprout from './Sprout.js';
     import Fern from './Fern.js';
     import Help from './Help.js';
     import Vine from './Vine.js';
     import BG from './BG.js';

     export default class Plants {


          constructor() {
               this.shapes = [];
               this.bg = [];
          }

          add(x, y) {


               for (let i = 0; i < 40; i++) {
                    this.bg.push(new BG(
                         Help.btwn(x - 25, x + 25),
                         Help.btwn(y - 10, y + 10),
                         25,
                         10));
                    if (i < 3) {
                         this.shapes.push(new Sprout(x, y));
                         this.shapes.push(new Fern(x, y));
                    }
                    if (i < 8) {
                         this.shapes.push(new Vine(x, y));

                    }
               }

               this.shapes.sort(Help.sortShapes);


          }



          //called to move the plant animation forward
          draw() {
               this.bg.forEach((a) => a.draw());
               this.shapes.forEach((a) => a.draw());
               Help.clean(this.shapes);
          }

     }