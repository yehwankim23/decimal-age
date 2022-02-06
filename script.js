const html = document.documentElement;
let width = html.clientWidth * 0.999;
let height = html.clientHeight * 0.999;

const viewport = document.getElementById("viewport");
viewport.setAttribute("style", `width: ${width}px; height: ${height}px;`);
viewport.width = width;
viewport.height = height;

if (width < height) {
  height = width * 1.333;
} else {
  width = height * 0.75;
}

const container = document.getElementById("container");
container.setAttribute("style", `width: ${width}px; height: ${height}px;`);
container.width = width;
container.height = height;
