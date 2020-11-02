     export default class Help {

          // static shadesOfGreen = ["#3cb043", "#b0fc38", "#3a5311", "#728c69", "#aef359", "#5dbb63", "#98bf64", "#028a0f", "#74b72e", "#466d1d", "#03ac13", "#3ded97"];

          static sortShapes(a, b) {
               if (a.y > b.y) {
                    return 1;
               } else if (a.y < b.y) {
                    return -1;
               } else {
                    return 0;
               }
          }

          static clean(shapes) {
               for (let i = 0; i < shapes.length; i++) {
                    if (shapes[i].frame > 150) {
                         shapes.splice(i, 1);
                    } else
                    if (typeof shapes[i].counter !== 'undefined') {
                         if (shapes[i].counter.length > 150) {
                              shapes.splice(i, 1);

                         }
                    }
               }
          }

          static hexToRgb(hex) {
               var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
               return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
               } : null;
          }
          static componentToHex(c) {
               var hex = c.toString(16);
               return hex.length == 1 ? "0" + hex : hex;
          }

          static rgbToHex(r, g, b) {
               return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
          }

          static toCartesian({
               r,
               theta
          }, [cx, cy]) {
               return [cx + r * Math.cos(theta), cy + r * Math.sin(theta)];
          }
          static btwn(a, b) {
               return this.getRandomInt(b - a) + a;
          }

          static along(limb, factor) {
               return this.toCartesian({
                    r: limb.r * factor,
                    theta: limb.theta
               }, [limb.pointx, limb.pointy]);
          }

          static getRandomInt(max) {
               return Math.floor(Math.random() * Math.floor(max));
          }

          static between(a, b) {
               return this.getRandomInt((b - a) * 100) / 100.0 + a;
          }
          static checkRectOverlap(rect1, rect2) {
               /*
                * Each array in parameter is one rectangle
                * in each array, there is an array showing the co-ordinates of two opposite corners of the rectangle
                * Example:
                * [[x1, y1], [x2, y2]], [[x3, y3], [x4, y4]]
                */

               //Check whether there is an x overlap
               if ((rect1[0][0] < rect2[0][0] && rect2[0][0] < rect1[1][0]) //Event that x3 is inbetween x1 and x2
                    ||
                    (rect1[0][0] < rect2[1][0] && rect2[1][0] < rect1[1][0]) //Event that x4 is inbetween x1 and x2
                    ||
                    (rect2[0][0] < rect1[0][0] && rect1[1][0] < rect2[1][0])) { //Event that x1 and x2 are inbetween x3 and x4
                    //Check whether there is a y overlap using the same procedure
                    if ((rect1[0][1] < rect2[0][1] && rect2[0][1] < rect1[1][1]) //Event that y3 is between y1 and y2
                         ||
                         (rect1[0][1] < rect2[1][1] && rect2[1][1] < rect1[1][1]) //Event that y4 is between y1 and y2
                         ||
                         (rect2[0][1] < rect1[0][1] && rect1[1][1] < rect2[1][1])) { //Event that y1 and y2 are between y3 and y4
                         return true;
                    }
               }
               return false;
          }


     }