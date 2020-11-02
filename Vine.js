     import Help from './Help.js';
     export default class Vine {

          constructor(x, y) {
               this.x = Help.btwn(x - 25, x + 25);
               this.y = Help.btwn(y - 10, y + 10);
               this.delay = Help.getRandomInt(20);
               this.height = -.9;
               // this.color = Help.hexToRgb(Help.shadesOfGreen[Help.getRandomInt(Help.shadesOfGreen.length)]);
               this.color = Help.hexToRgb("#649568");

               this.color['a'] = 250;
               this.frame = 0;
               this.angle = Help.between(.9, 1.3);
               this.side = Help.getRandomInt(2) == 0 ? -1 : 1;
               this.deathFrame = 100;
               this.width = Help.btwn(1, 4);
               this.random = Help.between(.01, .09);
          }

          draw() {
               if (this.frame < 150 && this.frame > this.delay)
                    this.go(this.frame - this.delay);
               this.frame++;

          }

          go(frame) {



               let sx = this.x;
               let sy = this.y;
               let stheta = frame / 50;
               let sheight = this.height;
               let weight = this.width;


               pop();
               push();
               if (frame >= 50) {
                    this.color.r += (100 - this.color.r) / 25;
                    this.color.g += (100 - this.color.g) / 25;
                    this.color.b += (100 - this.color.b) / 25;
                    this.color.a -= 5;
               }
               for (let i = 0; i < frame; i++) {
                    translate(sx, sy);

                    rotate(Math.sin(i / 10 - this.angle) * this.random * this.side * stheta);
                    strokeWeight(weight);
                    stroke(this.color.r, this.color.g, this.color.b, this.color.a);
                    if (i < 50)
                         line(0, 0, 0, sheight);
                    translate(0, sheight);
                    translate(sx * -1, sy * -1);
                    stheta += .01 * this.side;

               }
          }


     }