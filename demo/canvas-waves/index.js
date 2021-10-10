//波浪canvas
(function () {
  var pi = Math.PI;
  var pi2 = 2 * Math.PI;

  this.Waves = function (holder, options) {
    var w = this;

    // 選項設定
    w.options = extend(options || {}, {
      resize: false,
      rotation: 0,
      waves: 6, // 波浪數量
      width: 100,
      hue: [11, 14], // 色相
      amplitude: 0.3, // 振幅
      background: false,
      preload: true,
      speed: [0.004, 0.008],
      debug: false,
      fps: false,
    });

    w.waves = [];

    // 選取 div，在裡面加上 canvas 標籤
    w.holder = document.querySelector(holder);
    w.canvas = document.createElement("canvas");

    // 取得一個 2D 的渲染環境及其繪圖函數(function)，才能作畫
    w.ctx = w.canvas.getContext("2d");
    w.holder.appendChild(w.canvas);

    w.hue = w.options.hue[0]; // 取得色相
    w.hueFw = true;
    w.stats = new Stats();

    w.resize();

    // 初始化
    w.init(w.options.preload);

    // 當視窗縮放，更新畫布
    if (w.options.resize)
      window.addEventListener(
        "resize",
        function () {
          w.resize();
        },
        false
      );
  };

  Waves.prototype.init = function (preload) {
    var Waves = this;
    var options = Waves.options;

    for (var i = 0; i < options.waves; i++) Waves.waves[i] = new Wave(Waves);

    if (preload) Waves.preload();
  };

  Waves.prototype.preload = function () {
    var Waves = this;
    var options = Waves.options;

    for (var i = 0; i < options.waves; i++) {
      Waves.updateColor();
      for (var j = 0; j < options.width; j++) {
        Waves.waves[i].update();
      }
    }
  };

  Waves.prototype.render = function () {
    var Waves = this;
    var ctx = Waves.ctx;
    var options = Waves.options;

    Waves.updateColor();
    Waves.clear();

    // 除錯模式
    if (Waves.options.debug) {
      ctx.beginPath();
      ctx.strokeStyle = "#f00";
      ctx.arc(Waves.centerX, Waves.centerY, Waves.radius, 0, pi2);
      ctx.stroke();
    }

    if (Waves.options.background) {
      Waves.background();
    }

    each(Waves.waves, function (wave, i) {
      wave.update();
      wave.draw();
    });
  };

  Waves.prototype.animate = function () {
    var Waves = this;

    Waves.render();

    if (Waves.options.fps) {
      Waves.stats.log();
      Waves.ctx.font = "12px Arial";
      Waves.ctx.fillStyle = "#fff";
      // Waves.ctx.fillText(Waves.stats.fps() + ' FPS', 10, 22);
    }

    window.requestAnimationFrame(Waves.animate.bind(Waves));
  };

  Waves.prototype.clear = function () {
    var Waves = this;
    Waves.ctx.clearRect(0, 0, Waves.width, Waves.height);
  };

  Waves.prototype.background = function () {
    var Waves = this;
    var ctx = Waves.ctx;

    // createLinearGradient 方法：沿著給定的兩個座標形成的直線，繪製漸層
    // 參數：createLinearGradient(x0, y0, x1, y1)
    // (x0, y0) 為起始點座標，(x1, y1) 為終點座標
    var gradient = Waves.ctx.createLinearGradient(0, 0, 0, Waves.height); // 從上到下的垂直漸層
    gradient.addColorStop(0, "#000");
    gradient.addColorStop(1, Waves.color);

    ctx.fillStyle = gradient;

    // 繪製矩形，在此矩形應用漸層背景
    ctx.fillRect(0, 0, Waves.width, Waves.height);
  };

  Waves.prototype.resize = function () {
    var Waves = this;
    var width = Waves.holder.offsetWidth;
    var height = Waves.holder.offsetHeight;
    Waves.scale = window.devicePixelRatio || 1;
    Waves.width = width * Waves.scale;
    Waves.height = height * Waves.scale;
    Waves.canvas.width = Waves.width;
    Waves.canvas.height = Waves.height;
    Waves.canvas.style.width = width + "px";
    Waves.canvas.style.height = height + "px";
    Waves.radius =
      Math.sqrt(Math.pow(Waves.width, 2) + Math.pow(Waves.height, 2)) / 2;
    Waves.centerX = Waves.width / 2;
    Waves.centerY = Waves.height / 2;
    //Waves.radius /= 2; // REMOVE FOR FULLSREEN
  };

  Waves.prototype.updateColor = function () {
    var Waves = this;

    Waves.hue += Waves.hueFw ? 0.01 : -0.01;

    if (Waves.hue > Waves.options.hue[1] && Waves.hueFw) {
      Waves.hue = Waves.options.hue[1];
      Waves.Waves = false;
    } else if (Waves.hue < Waves.options.hue[0] && !Waves.hueFw) {
      Waves.hue = Waves.options.hue[0];
      Waves.Waves = true;
    }

    var a = Math.floor(127 * Math.sin(0.3 * Waves.hue + 0) + 128);
    var b = Math.floor(127 * Math.sin(0.3 * Waves.hue + 2) + 128);
    var c = Math.floor(127 * Math.sin(0.3 * Waves.hue + 4) + 128);

    Waves.color = "rgba(232, 232, 232, 0.46)";
  };

  function Wave(Waves) {
    var Wave = this;
    var speed = Waves.options.speed;

    Wave.Waves = Waves;
    Wave.Lines = [];

    Wave.angle = [rnd(pi2), rnd(pi2), rnd(pi2), rnd(pi2)];

    Wave.speed = [
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
      rnd(speed[0], speed[1]) * rnd_sign(),
    ];

    return Wave;
  }

  Wave.prototype.update = function () {
    var Wave = this;
    var Lines = Wave.Lines;
    var color = Wave.Waves.color;

    Lines.push(new Line(Wave, color));

    if (Lines.length > Wave.Waves.options.width) {
      Lines.shift();
    }
  };

  Wave.prototype.draw = function () {
    var Wave = this;
    var Waves = Wave.Waves;

    var ctx = Waves.ctx;
    var radius = Waves.radius;
    var radius3 = radius / 3;
    var x = Waves.centerX;
    var y = Waves.centerY;
    var rotation = dtr(Waves.options.rotation);
    var amplitude = Waves.options.amplitude;
    var debug = Waves.options.debug;

    var Lines = Wave.Lines;

    each(Lines, function (line, i) {
      if (debug && i > 0) return;

      var angle = line.angle;

      var x1 = x - radius * Math.cos(angle[0] * amplitude + rotation);
      var y1 = y - radius * Math.sin(angle[0] * amplitude + rotation);
      var x2 = x + radius * Math.cos(angle[3] * amplitude + rotation);
      var y2 = y + radius * Math.sin(angle[3] * amplitude + rotation);
      var cpx1 = x - radius3 * Math.cos(angle[1] * amplitude * 2);
      var cpy1 = y - radius3 * Math.sin(angle[1] * amplitude * 2);
      var cpx2 = x + radius3 * Math.cos(angle[2] * amplitude * 2);
      var cpy2 = y + radius3 * Math.sin(angle[2] * amplitude * 2);

      ctx.strokeStyle = debug ? "#fff" : line.color;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
      ctx.stroke();

      if (debug) {
        ctx.strokeStyle = "#fff";
        ctx.globalAlpha = 0.3;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(cpx1, cpy1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(cpx2, cpy2);
        ctx.stroke();

        ctx.globalAlpha = 1;
      }
    });
  };

  function Line(Wave, color) {
    var Line = this;

    var angle = Wave.angle;
    var speed = Wave.speed;

    Line.angle = [
      Math.sin((angle[0] += speed[0])),
      Math.sin((angle[1] += speed[1])),
      Math.sin((angle[2] += speed[2])),
      Math.sin((angle[3] += speed[3])),
    ];

    Line.color = color;
  }

  function Stats() {
    this.data = [];
  }

  Stats.prototype.time = function () {
    return (performance || Date).now();
  };

  Stats.prototype.log = function () {
    if (!this.last) {
      this.last = this.time();
      return 0;
    }

    this.new = this.time();
    this.delta = this.new - this.last;
    this.last = this.new;

    this.data.push(this.delta);
    if (this.data.length > 10) this.data.shift();
  };

  Stats.prototype.fps = function () {
    var fps = 0;
    each(this.data, function (data, i) {
      fps += data;
    });

    return Math.round(1000 / (fps / this.data.length));
  };

  function each(items, callback) {
    for (var i = 0; i < items.length; i++) {
      callback(items[i], i);
    }
  }

  function extend(options, defaults) {
    for (var key in options)
      if (defaults.hasOwnProperty(key)) defaults[key] = options[key];
    return defaults;
  }

  function dtr(deg) {
    return (deg * pi) / 180;
  }

  function rtd(rad) {
    return (rad * 180) / pi;
  }

  function diagonal_angle(w, h) {
    var a = Math.atan2(h, w) * 1.27325;
    return a;
  }

  function rnd(a, b) {
    if (arguments.length == 1) return Math.random() * a;
    return a + Math.random() * (b - a);
  }

  function rnd_sign() {
    return Math.random() > 0.5 ? 1 : -1;
  }
})();
var waves1 = new Waves("#holder", {
  fps: true,
  waves: 3,
  width: 200,
});

waves1.animate();