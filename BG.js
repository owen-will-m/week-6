     export default class BG {
          constructor(x, y, w, h) {
               this.x = x;
               this.y = y;
               this.w = w;
               this.h = h;
               this.color = {
                    r: 87,
                    g: 53,
                    b: 23,
                    a: 0
               };
               this.frame = 0;
          }
          draw() {
               if (this.frame < 75) {
                    this.color.a += .5;
               } else {
                    this.color.a -= .5;
               }
               noStroke();
               fill(this.color.r, this.color.g, this.color.b, this.color.a);
               ellipse(this.x, this.y, this.w, this.h);
               this.frame++;
          }
     }