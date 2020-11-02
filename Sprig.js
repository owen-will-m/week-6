     import Help from './Help.js';
     export default class Vine {

          constructor(x, y) {
               this.x = Help.btwn(x - 25, x + 25);
               this.y = Help.btwn(y - 25, y + 25);
               this.delay = Help.getRandomInt(20);
               this.height = Help.getRandomInt(5) * -1 - 3;
               this.side = Help.getRandomInt(2) == 0 ? -1 : 1;
               this.randoms = [1, 1, 1, 1, 1].map((x) => (x + Help.getRandomInt(50) * .01 - .25));
               this.color = Help.hexToRgb(Help.shadesOfGreen[Help.getRandomInt(Help.shadesOfGreen.length)]);
               this.color['a'] = 250;
               this.frame = 0;
               //console.log(this.color);
               // this.shadesOfGreen = [color("#3cb043"), "#b0fc38", "#3a5311", "#728c69", "#aef359", "#5dbb63", "#98bf64", "#028a0f", "#74b72e", "#466d1d", "#03ac13", "#3ded97"];
          }

          draw() {
               if (this.frame < 150 && this.frame > this.delay)
                    this.go();
               this.frame++;

          }

          go() {

               let sx = this.x;
               let sy = this.y;
               let stheta = 0 + this.frame * .001;
               let sheight = this.height * 2;
               let weight = 1;


               pop();
               push();


               for (let i = 0; i < this.frame - this.delay; i++) {
                    translate(sx, sy);

                    rotate(stheta * this.side);
                    strokeWeight(weight);
                    stroke(this.color.r, this.color.g, this.color.b, this.color.a);

                    line(0, 0, 0, sheight);
                    translate(0, sheight);
                    translate(sx * -1, sy * -1);
                    stheta += .01;
                    sheight *= .9;
               }
          }


     }