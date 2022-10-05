var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var radius = 20;
var px, py, cx, cy;
var dx, dy, dd, a, b, t, ta, tb;

window.onmousemove = function(e) {
    px = canvas.width * .5;
    py = canvas.height * .5;
    cx = e.clientX;
    cy = e.clientY;

    // clear canvas
    ctx.clearRect (0, 0, canvas.width, canvas.height);

    // draw point
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    ctx.closePath();

    // draw circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#666';
    ctx.stroke();
    ctx.closePath();

    // find tangents
    dx = cx - px;
    dy = cy - py;
    dd = Math.sqrt(dx * dx + dy * dy);
    a = Math.asin(radius / dd);
    b = Math.atan2(dy, dx);

    t = b - a
    ta = { x:radius * Math.sin(t), y:radius * -Math.cos(t) };

    t = b + a
    tb = { x:radius * -Math.sin(t), y:radius * Math.cos(t) };

    // draw points
    ctx.beginPath();
    ctx.arc(cx + ta.x, cy + ta.y, 2, 0, Math.PI * 2);
    ctx.arc(cx + tb.x, cy + tb.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.closePath();

    // draw lines
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(cx + ta.x, cy + ta.y);
    ctx.moveTo(px, py);
    ctx.lineTo(cx + tb.x, cy + tb.y);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    ctx.closePath();
}

<canvas id="canvas" width="400" height="300"></canvas>

// https://stackoverflow.com/questions/1351746/find-a-tangent-point-on-circle
// http://jsfiddle.net/zxqCw/1/

// radius = radius of the circle. ta = an object with properties x and y (basically a point). To answer your question, x:radius doesn't represent much on its own. The code is defining the value of ta.x where x = radius * Math.sin(t). Please make sure you refer to the jsfiddle to see a working example.

// @Tony actually you may be right, at least in the case you only need the length of the tangent, it doesn't matter the origin of your point, you can set it manually, the only thing that matters is distance, if you choose x = 0.0, and y = distance from circle for your point P, then atan2(y, x) = pi/2 as atan2(inf) = pi/2, since 1/0 = infinity. – opa Mar 14 '18 at 5:05
