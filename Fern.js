     import Help from './Help.js';
     export default class Fern {

          constructor(x, y) {
               this.x = Help.btwn(x - 25, x + 25);
               this.y = Help.btwn(y - 10, y + 10);
               this.delay = Help.getRandomInt(20);
               this.randoms = [1, 1, 1, 1, 1].map((x) => (x + Help.getRandomInt(50) * .01 - .25));
               // this.color = Help.hexToRgb(Help.shadesOfGreen[Help.getRandomInt(Help.shadesOfGreen.length)]);
               this.color = Help.hexToRgb("#2b5329");

               this.color['a'] = 250;
               this.frame = 0;
               //console.log(this.color);
               // this.shadesOfGreen = [color("#3cb043"), "#b0fc38", "#3a5311", "#728c69", "#aef359", "#5dbb63", "#98bf64", "#028a0f", "#74b72e", "#466d1d", "#03ac13", "#3ded97"];
          }

          draw() {
               if (this.frame < 150 && this.frame > this.delay)
                    for (let i = 1; i < 6; i++) {
                         // if (frame >= i) {
                         this.blade((this.frame - this.delay) - i * 5, ((i % 2 == 0 ? -1 : 1) * (i * 1.6) + .1) * this.randoms[i], (2 / (i + 1) / 10 + 1) * this.randoms[i], 1, 100);
                         // }
                    }
               this.frame++;

          }

          blade(frame, rotationFactor, heightFactor, widthFactor, deathFrame) {

               frame = frame / 1.5;
               let sx = this.x;
               let sy = this.y;
               let stheta = .03 + frame / 10000;
               let sheight = -5 * heightFactor;
               // let leaves = 0;
               pop();
               push();

               if (deathFrame - frame <= 75) {
                    this.color.r += (100 - this.color.r) / 75;
                    this.color.g += (100 - this.color.g) / 75;
                    this.color.b += (100 - this.color.b) / 75;
                    this.color.a -= .75;
               }

               for (let i = 0; i < frame; i++) {



                    translate(sx, sy);

                    rotate(stheta * rotationFactor);
                    let weight = Math.pow(frame, 2.1) * 7 / (i * i * .5 + frame) / deathFrame * widthFactor * -1 * Math.pow(frame - deathFrame, 3) / 500000;
                    if (deathFrame - frame <= 40) {
                         weight = (deathFrame - frame) / 40;
                    }

                    stroke(this.color.r, this.color.g, this.color.b, this.color.a);

                    strokeWeight(weight);
                    if (i < 15) {
                         line(0, 0, 0, sheight);
                         if (i > 1) {
                              line(0, 0, sheight, sheight);
                              line(0, 0, sheight * -1, sheight);
                         }
                    }


                    translate(0, sheight);
                    translate(sx * -1, sy * -1);
                    stheta -= .001;
                    sheight *= .9;


               }

          }
     }