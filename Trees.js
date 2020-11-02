     //global variables
     let trees = [];
     let randos = [];
     let circles = [];
     let drawingPath = false;
     let clear = false;
     const TREECOLORS = [
          [1, 10, 11],
          [6, 17, 18],
          [5, 19, 20],
     ];
     const DEPTH = 6;

     //      36,12,0
     //
     // 55,19,0
     //
     // 50,21,0
     // 42,17,1
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     //global functions

     function shuffleArray(a) {
          for (let i = a.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
     }

     function btwn(a, b) {
          return getRandomInt(b - a) + a;
     }


     function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
     }

     function probability(n) {
          return !!n && Math.random() <= n;
     }

     function degreesToRadians(degrees) {
          var pi = Math.PI;
          return degrees * (pi / 180);
     }

     function drawLine(pt1, pt2) {
          resetMatrix();
          line(pt1[0], pt1[1], pt2[0], pt2[1]);
     }

     function depth() {
          return getRandomInt(4) + 3;
     }

     function cartesian2Polar(c) {
          let distance = Math.sqrt(c.x * c.x + c.y * c.y)
          let radians = Math.atan2(c.y, c.x) //This takes y first
          polarCoor = {
               d: distance,
               r: radians,
               center: c
          }
          return polarCoor
     }

     function toCartesian({
          r,
          theta
     }, [cx, cy]) {
          return [cx + r * Math.cos(theta), cy + r * Math.sin(theta)];
     }

     //takes 2 polar points
     function drawPolarLine(point1, point2) {
          let p1 = polar2Cartesian(point1);
          let p2 = polar2Cartesian(point2);
          line(p1.x, p1.y, p2.x, p2.y);
     }

     function randoms(depth) {
          let randoms = [];
          for (let i = 0; i < depth; i++) {
               let rand2 = [];
               for (let j = 0; j < 8; j++) {
                    rand2.push(getRandomInt(100) / 500.0 + .6);
               }
               randoms.push([...rand2]);
          }
          return randoms;
     }

     function between(a, b) {
          return getRandomInt((b - a) * 100) / 100.0 + a;
     }

     function setLimb(limb, newPoint, dtheta, dr, n) {
          const newLimb = {
               ...limb
          };

          newLimb.pointx = newPoint[0];
          newLimb.pointy = newPoint[1];
          newLimb.theta += dtheta;
          newLimb.r *= dr;
          newLimb.n = n;
          return newLimb;
     }

     //adds a tree to the array of trees
     //but that tree is just an array of lines!
     function newTree(x, y, depth, height, size, color) {
          let tree = [];
          tree[0] = size;
          tree[1] = color;
          tree[2] = 0;
          branch(tree, {
               pointx: x,
               pointy: y,
               r: height,
               theta: 3 * Math.PI / 2 * between(.99, 1.02)

          }, depth);
          return tree; //add our new tree to the trees array
     }

     function along(limb, factor) {
          return toCartesian({
               r: limb.r * factor,
               theta: limb.theta
          }, [limb.pointx, limb.pointy]);
     }


     //tree is array of lines
     //b is the previous branch
     //n is depth counter
     function branch(tree, limb, n) {
          //base case
          if (n <= 0) {
               return;
          }

          let limbs = [];

          //draw this branch

          let newPoint = along(limb, 1);

          //add this line to the tree array
          tree.push([
               [limb.pointx, limb.pointy],
               [...newPoint],
               n
          ]);

          //if it's the first one, just make 4 branching off
          if (n == DEPTH) {
               let arr = [];
               let l = between(2, 5);
               for (let i = 0; i < l; i++) {
                    //TRYING TO MAKE IT SO THAT THE FOUR BRANCHES APPEAR IN RANDOM ORDER NOT SEQUENTIAL ORDER
                    arr.push(i);
               }
               shuffleArray(arr);
               for (let i = 0; i < l; i++) {
                    limbs.push(new setLimb(limb, newPoint, between(-.4, -.6) + arr[i] * between(.4, .6), between(.6, .8), n));
               }
          } else {
               //otherwise, branches can spontaneously become n=2 and appear at various points
               //most of the time, branching into 2, but sometimes just one

               //make either order equiprobable
               if (probability(.5)) {
                    limbs.push(new setLimb(limb, newPoint, between(.4, .6), between(.6, .8), n));
                    limbs.push(new setLimb(limb, newPoint, between(-.4, -.6), between(.6, .8), n));
               } else {
                    limbs.push(new setLimb(limb, newPoint, between(-.4, -.6), between(.6, .8), n));
                    limbs.push(new setLimb(limb, newPoint, between(.4, .6), between(.6, .8), n));
               }



               if (probability(.2 * n)) {
                    limbs.push(new setLimb(limb, along(limb, between(.3, 1)), (probability(.5) ? -1 : 1) * between(.3, .5), between(.5, .6), 2));
               }



          }


          //branch
          for (let i = 0; i < limbs.length; i++) {
               branch(tree, limbs[i], (limbs[i].n - 1));

          }

     }

     function sortTrees(a, b) {
          if (a.length < 10) {
               return -1;
          }

          if (a[3][0][1] > b[3][0][1]) {
               return 1
          } else {
               return -1
          }
          return 0;
     }

     function drawTrees(trees) {
          for (let i = 0; i < trees.length; i++) {
               for (let k = 3; k < trees[i][2]; k++) {
                    if (trees[i].length > 5) {
                         strokeWeight(trees[i][k][2] * trees[i][0]);
                    } else {
                         strokeWeight(trees[i][0]);

                    }
                    stroke(trees[i][1])
                    line(trees[i][k][0][0], trees[i][k][0][1], trees[i][k][1][0], trees[i][k][1][1]);
               }
               if (trees[i][2] < trees[i].length) {
                    trees[i][2]++;
               }
          }
     }

     function makeCircles(n, h, w, wd) {
          for (let i = 0; i < n; i++) {
               let y = btwn(h, 400);
               circles.push({
                    x: btwn(0, 600),
                    y: y,
                    w: btwn(w - wd, w + wd) * y / 200.0,
                    color: {
                         r: btwn(70, 80),
                         g: btwn(30, 40),
                         b: btwn(20, 30),
                         a: btwn(150, 200)
                    }
               });
          }
     }

     function drawCircles() {
          for (let i = 0; i < circles.length; i++) {
               noStroke();
               fill(circles[i].color.r, circles[i].color.g, circles[i].color.b, circles[i].color.a);
               ellipse(circles[i].x, circles[i].y, circles[i].w, circles[i].w)
          }
     }

     function clearTrees() {

          trees = [];
     }

     function path() {
          drawingPath = !drawingPath;
     }


     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////
     ///////////////////////////////////

     export default class Trees {
          constructor() {
               this.list = [];
          }
          addTree(x, y, h, w) {
               this.list.push(newTree(x, y, DEPTH, h, w, TREECOLORS[getRandomInt(TREECOLORS.length)]));
               this.list.sort(sortTrees);
          }

          draw() {
               drawTrees(this.list);
          }

     }