// Given the following CSV file called "mammals.csv"
// located in the project's "assets" folder:

let table;
let header;
let bars = [];
let selectedBar = undefined;

function preload() {
  print("Hello there");
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("assets/happiness_data.csv", "csv");
  //table = loadTable('assets/happiness_data.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 1500);

  // count the columns
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  header = table.getRow(0);

  // cycle through the table
  for (let r = 1; r < table.getRowCount(); r++) {
    let row = table.getRow(r);
    var data = [];
    for (let i = 2; i < table.getColumnCount(); i++) {
      data[i - 2] = row.getNum(i);
    }
    // let bar = new Bar(row.getNum(2) * 30);
    let bar = new Bar(data);
    bars[r - 1] = bar;
  }

  bars.sort(function(a, b) {
    let av = a.value;
    let bv = b.value;
    return bv - av;
  });

  bars.forEach(bar => {
    let factor = bar.value / bars[0].value;
    bar.length = factor * 1;
  });
}

function draw() {
  background(240);
  stroke(0);
  fill(200, 250, 150, 100);
  ellipse(mouseX, mouseY, 30, 30);
  for (let i = 0; i < bars.length; i++) {
    let bar = bars[i];
    if (!bar.selected) {
      bars[i].display(20, i * 4 + 20);
    } else {
      push();
      strokeWeight(15);
      stroke(200, 100, 100, 100);
      let size = bars[i].length * bars[i].scaleFactor * Bar.DEFAULT_LENGTH;
      translate(20, i * 4 + 21);
      line(0, 0, size, 0);
      pop();
    }
  }
}

function mouseMoved() {
  for (let i = 0; i < bars.length; i++) {
    let bar = bars[i];
    let barPos = i * 4 + 20;
    if (mouseY < barPos + 2 && mouseY > barPos - 2) {
      bar.selected = true;
    } else {
      bar.selected = false;
    }
  }
}

class Bar {
  static DEFAULT_LENGTH = 200;
  constructor(data) {
    this.data = data;
    this.selectValue(0);
    this.length = 20;
    this.height = 2;
    this.selected = false;
    this.scaleFactor = 1;
  }

  selectValue(n) {
    this.value = this.data[n];
  }

  display(x, y) {
    let size = this.length * this.scaleFactor;
    push();
    translate(x, y);
    strokeWeight(1);
    stroke(10);
    rectMode(CORNER);
    rect(0, 0, Bar.DEFAULT_LENGTH * size, this.height);
    pop();
  }
}
