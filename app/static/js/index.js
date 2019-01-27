var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var MAX_AGE = 80;
var LEAF_DISTANCE = 12;
var DIAMETER = 10;
var LEAFE_SIZE = 6;
var TREE_VARIANCE = 4;
var BRANCH_VARIANCE = 60;
var DRAW_DISTANCE = 6;

var modal = document.getElementById('myModal');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d', { alpha: false });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ~~~~~ */var

PerlinNoise = function () {


  function PerlinNoise() {_classCallCheck(this, PerlinNoise);
    this.p = [];
    for (var i = 0; i < 256; i++) {
      this.p[i] = ~~(Math.random() * 256);
    }

    this.perm = [];
    for (var _i = 0; _i < 512; _i++) {
      this.perm[_i] = this.p[_i & 255];
    }
  }_createClass(PerlinNoise, [{ key: 'at', value: function at()


    {var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var X = ~~x;
      var Y = ~~y;
      var Z = ~~z;

      x = x - X;
      y = y - Y;
      z = z - Z;

      X = X & 255;
      Y = Y & 255;
      Z = Z & 255;

      var gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
      var gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
      var gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
      var gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
      var gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
      var gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
      var gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
      var gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;

      var n000 = PerlinNoise.dot(PerlinNoise.grad3[gi000], x, y, z);
      var n100 = PerlinNoise.dot(PerlinNoise.grad3[gi100], x - 1, y, z);
      var n010 = PerlinNoise.dot(PerlinNoise.grad3[gi010], x, y - 1, z);
      var n110 = PerlinNoise.dot(PerlinNoise.grad3[gi110], x - 1, y - 1, z);
      var n001 = PerlinNoise.dot(PerlinNoise.grad3[gi001], x, y, z - 1);
      var n101 = PerlinNoise.dot(PerlinNoise.grad3[gi101], x - 1, y, z - 1);
      var n011 = PerlinNoise.dot(PerlinNoise.grad3[gi011], x, y - 1, z - 1);
      var n111 = PerlinNoise.dot(PerlinNoise.grad3[gi111], x - 1, y - 1, z - 1);

      var u = PerlinNoise.fade(x);
      var v = PerlinNoise.fade(y);
      var w = PerlinNoise.fade(z);

      var nx00 = PerlinNoise.mix(n000, n100, u);
      var nx01 = PerlinNoise.mix(n001, n101, u);
      var nx10 = PerlinNoise.mix(n010, n110, u);
      var nx11 = PerlinNoise.mix(n011, n111, u);
      var nxy0 = PerlinNoise.mix(nx00, nx10, v);
      var nxy1 = PerlinNoise.mix(nx01, nx11, v);
      var nxyz = PerlinNoise.mix(nxy0, nxy1, w);

      return nxyz;
    } }], [{ key: 'dot', value: function dot(g, x, y, z) {return g[0] * x + g[1] * y + g[2] * z;} }, { key: 'mix', value: function mix(a, b, t) {return (1.0 - t) * a + t * b;} }, { key: 'fade', value: function fade(t) {return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);} }]);return PerlinNoise;}();


/* ~~~~~ */PerlinNoise.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];

var radians = function radians(degrees) {return degrees * Math.PI / 180;};
var noise = new PerlinNoise();
var trees = [];var

Point =
function Point(x, y, colour) {var age = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;var degrees = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;var variance = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;_classCallCheck(this, Point);
  this.x = x;
  this.y = y;
  this.opacity = (MAX_AGE - age) / MAX_AGE;
  this.colour = colour;
  this.radius = DIAMETER;
  this.age = age;
  this.degrees = degrees;
  this.variance = variance;
};


var addLeaf = function addLeaf(tree, point) {
  var leaf = new Point(
  point.x + (-LEAF_DISTANCE + Math.random() * (LEAF_DISTANCE * 2)),
  point.y + (-LEAF_DISTANCE + Math.random() * (LEAF_DISTANCE * 2)),
  [point.colour[0] + 25, point.colour[1], point.colour[2]]);


  leaf.opacity = 0;
  leaf.spawned = true;
  leaf.radius = LEAFE_SIZE + Math.random() * (LEAFE_SIZE * 2);

  tree.leaves.push(leaf);
};var

Tree =
function Tree() {var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var colour = arguments[2];_classCallCheck(this, Tree);
  this.x = x;
  this.y = y;
  this.points = [
  new Point(x, y, colour, 0, -90, TREE_VARIANCE)];

  this.leaves = [];
};


var update = function update(tree) {
  if (tree.done) return;

  var done = true;

  tree.points.forEach(function (point) {
    if (point.spawned || point.age >= MAX_AGE) {
      return;
    }

    done = false;

    ++point.age;

    var branch = function branch(variance) {
      var reduce = 0.01;
      var n = (noise.at((point.x + point.age) * reduce, (point.y + point.age) * reduce) - 0.5) * 4 * Math.PI;
      var mag = noise.at((point.y + point.age) * reduce, (point.x + point.age) * reduce);
      var dirX = Math.cos(n) * mag;
      var dirY = Math.sin(n) * mag;

      var diff = variance * point.opacity;
      var degrees = point.degrees + (-diff + Math.random() * diff * 2);

      var randX = Math.cos(radians(degrees)) * DRAW_DISTANCE;
      var randY = Math.sin(radians(degrees)) * DRAW_DISTANCE;

      var x = point.x + dirX + randX;
      var y = point.y + dirY + randY;

      tree.points.push(new Point(
      x,
      y,
      point.colour,
      point.age,
      degrees,
      variance));

    };

    if (point.age > MAX_AGE * 0.2 &&
    point.age < MAX_AGE * 0.8 &&
    Math.random() < 0.07 * (1 - point.opacity * 0.4)) {
      branch(point.variance + BRANCH_VARIANCE);
    }

    if (Math.random() < 0.2 && point.age > MAX_AGE * 0.8) {
      addLeaf(tree, point);
      addLeaf(tree, point);
      addLeaf(tree, point);
    }

    branch(point.variance);

    point.spawned = true;
  });

  tree.done = done;
};

var addTree = function addTree(x, y) {
  // ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  var colour = [
  Math.random() * 360,
  80,
  80];


  trees.push(new Tree(x, y, colour));
};

var drawPoint = function drawPoint(point, radius) {var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius || point.radius * point.opacity, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(' + point.colour[0] + ', ' + point.colour[1] + '%, ' + (point.colour[2] + 20 * point.opacity) + '%, ' + opacity + ')';
  ctx.fill();
};

var draw = function draw(tree) {
  var done = true;
  tree.points.forEach(function (point) {
    if (point.drawn) return;

    done = false;
    drawPoint(point);
    point.drawn = true;
  });

  done && tree.leaves.forEach(function (point) {
    if (point.drawn) return;

    done = false;
    drawPoint(point, point.radius, 0.15);
    point.drawn = true;
  });

  done && trees.splice(trees.indexOf(tree), 1);
};

var loop = function loop() {
  trees.forEach(update);
  trees.forEach(draw);
  window.requestAnimationFrame(loop);
};

var modal = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");

function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

var grd = ctx.createLinearGradient(0,100,200,10);
grd.addColorStop(0, "#34e89e");
grd.addColorStop(1,"#0f3443");

ctx.fillStyle = grd;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = 'normal normal 100 30px Muli';
ctx.textAlign = 'center';
ctx.textSize = 40;
ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
ctx.fillText('Plant a thought.', canvas.width / 2, canvas.height / 2);

loop();

canvas.onmousedown = function (e) {
  // modal.style.display = "block";
  addTree(e.offsetX, e.offsetY, 1);
};