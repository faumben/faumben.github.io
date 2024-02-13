window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    xc = canvas.width;
    yc = canvas.height/30;
    a = 2*Math.PI/canvas.height;
    b = 1.4
    scrollPosition = 0;
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
    })
    function updateCanvas() {
        
        var time = new Date().getTime();

        for (var x = 0; x < canvas.width; x += xc) { // Increment x for less dense drawing
            for (var y = 0; y < canvas.height; y += yc) { // Increment y for less dense drawing
                // Calculate color based on time and position
                var red = (Math.cos(time * 0.0006 + (y) * a + Math.PI/3 - 2*Math.PI*scrollPosition/screen.height) * 127 + 128)/b;
                var green = (Math.cos(time * 0.0006 + (y) * a + 2*Math.PI/3 - 2*Math.PI*scrollPosition/screen.height) * 127 + 128)/b;
                var blue = (Math.cos(time * 0.0006 + (y) * a + 3*Math.PI/3 + 2*Math.PI*scrollPosition/screen.height) * 127 + 128)/b;
                var color = 'rgb(' + Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue) + ')';
                
                // Draw a small rectangle at the current position with the calculated color
                ctx.fillStyle = color;
                ctx.fillRect(x, y, xc, yc); // Adjust rectangle size as needed
            }
        }

        // Convert canvas to an image and set as background
        var imageUrl = canvas.toDataURL("image/png");
        document.body.style.backgroundImage = 'url(' + imageUrl + ')';
    }

    // Update the canvas at a set interval
    setInterval(updateCanvas, 10); // Adjust interval for performance
};
