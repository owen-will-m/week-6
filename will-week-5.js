     import Plants from './Plants.js';
     import Trees from './Trees.js';
     import Help from './Help.js';
     let canvas;
     let img;
     let pages = [];
     let container;
     let plant;
     let trees;
     let counter = 0;

     window.setup = function() {
          plant = new Plants();
          canvas = createCanvas(windowWidth, windowHeight);
          canvas.position(0, 0);
          canvas.style("z-index: -1;");
          frameRate(20);
          img = loadImage("background.png");
          pages.push($("#page1").detach());
          pages.push($("#page2").detach());
          pages.push($("#page3").detach());
          pages.push($("#page4").detach());
          pages[0].appendTo("#contain");
          trees = new Trees();
          let y = Help.btwn(450, 500);



          container = $("#contain");

     }

     window.draw = function() {
          if (counter % 40 == 0) {
               let y = Help.btwn(100, 300);

               trees.addTree(Help.btwn(0, windowWidth), y, Help.btwn(50, 100), y / 150);

          }
          background("#C5D4BE");
          image(img, -100, -100, (windowWidth + 150) * img.width / img.height, windowHeight + 150);
          trees.draw();
          plant.draw();

          counter++;
     }

     window.butt = function(n, el) {
          $("#contain").empty();
          pages[n - 1].appendTo("#contain");
          console.log($(el));
          plant.add($(el).offset().left + $(el).width() / 2, $(el).offset().top + $(el).height() / 2)
          $(el).css('opacity', '0');
          setTimeout(function() {
               $(el).css('opacity', '1');
          }, 7500);
     };

     window.mousePressed = function() {}