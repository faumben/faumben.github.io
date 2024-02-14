

window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;
    f=10
    xc = canvas.width/(f*1.9);
    yc = canvas.height/f;
    a = Math.PI/canvas.height;
    b = 1.4
    c = 10
    d = 128
    e = 1
    scrollPosition = 0;
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
    })
    function updateCanvas() {
        var time = new Date().getTime();
        for (var x = 0; x < canvas.width; x += xc) { // Increment x for less dense drawing
            for (var y = 0; y < canvas.height; y += yc) { // Increment y for less dense drawing
                // Calculate color based on time and position
                /*
                var red = (Math.cos(time * 0.0006 + (y) * a + Math.PI/3 - 2*Math.PI*scrollPosition/screen.height) * c + d)/b;
                var green = (Math.cos(time * 0.0006 + (y) * a + 2*Math.PI/3 - 2*Math.PI*scrollPosition/screen.height) * c + d)/b;
                var blue = (Math.cos(time * 0.0006 + (y) * a + 3*Math.PI/3 + 2*Math.PI*scrollPosition/screen.height) * c + d)/b;
                var color = 'rgb(' + Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue) + ')';
                */
               
               var h = (x/canvas.width/5 + time * 0.0001) + (Math.random()*.06);
               var s = ((x-10)/canvas.width) * (Math.random()*.1 + .9);
               var v = ((((Math.cos(time * 0.001 + (x) * a) + 1)*0.5)+.4)*.714 * (1-(x-100)/canvas.width)) * (Math.random()*.1 + .9);


               rgb = HSVtoRGB(h,s,v);
               var color = 'rgb(' + Math.round(rgb.r) + ',' + Math.round(rgb.g) + ',' + Math.round(rgb.b) + ')';

                // Draw a small rectangle at the current position with the calculated color
                ctx.fillStyle = color;
                // Set up the circle parameters
                var centerX = x + (Math.random() - 0.5) * 80;
                var centerY = y + (Math.random() - 0.5) * 80;
                var radius = Math.min(xc, yc) * 0.6; // Assuming xc and yc determine size, adjust as needed
                var startAngle = 0//Math.random()*2*Math.PI;; // Starting point on circle (0 for a full circle)
                var endAngle = 2*Math.PI*Math.random(); // End point on circle (2*PI for a full circle)
                
                // Begin path to draw the circle
                ctx.beginPath();
                // Draw the circle
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                // Fill the circle with the current fill style
                ctx.fill();
            }
        }

        // Convert canvas to an image and set as background
        var imageUrl = canvas.toDataURL("image/png");
        var sections = document.querySelectorAll("section"); // This selects all <section> elements
        
        sections.forEach(function(section) {
          section.style.backgroundImage = 'url(' + imageUrl + ')';
        });
    }

    // Update the canvas at a set interval
    setInterval(updateCanvas, 2); // Adjust interval for performance
};

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}