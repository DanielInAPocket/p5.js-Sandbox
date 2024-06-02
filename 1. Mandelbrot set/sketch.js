function setup()
{
  createCanvas(850,850);
  pixelDensity(1);
}

function draw()
{
  var maxIterations = 100;

  loadPixels();

  for(var x = 0; x < width; x++)
  {
    for (var y = 0; y < height; y++)
    {
      var a = map(x, 0, width, -1.5, 1.5);
      var b = map(y, 0, height, -1.5, 1.5);

      var n = 0;
      var ca = a;
      var cb = b;

      while (n < maxIterations)
      {
        var aa = a * a - b * b;
        var bb = 2 * a *b;

        a = aa + ca;
        b = bb + cb;

        if(abs(aa + bb) > 36)
        {
          break;
        }

        n++;
      }

      var bright = map(n, 0, maxIterations, 0, 255);

      if (n == maxIterations)
      {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}
