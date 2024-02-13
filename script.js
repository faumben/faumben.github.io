window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function updateCanvas() {
        var time = new Date().getTime();

        for (var x = 0; x < canvas.width; x += 10) { // Increment x for less dense drawing
            for (var y = 0; y < canvas.height; y += 10) { // Increment y for less dense drawing
                // Calculate color based on time and position
                var red = Math.sin(time * 0.0005 + x * 0.005) * 127 + 128;
                var green = Math.sin(time * 0.0006 + y * 0.005) * 127 + 128;
                var blue = Math.sin(time * 0.0007 + x * 0.005 + y * 0.005) * 127 + 128;
                var color = 'rgb(' + Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue) + ')';
                
                // Draw a small rectangle at the current position with the calculated color
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 10, 10); // Adjust rectangle size as needed
            }
        }

        // Convert canvas to an image and set as background
        var imageUrl = canvas.toDataURL("image/png");
        document.body.style.backgroundImage = 'url(' + imageUrl + ')';
    }

    // Update the canvas at a set interval
    setInterval(updateCanvas, 100); // Adjust interval for performance
};
