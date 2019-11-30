// Given the following CSV file called "mammals.csv"
// located in the project's "assets" folder:
//
// id,species,name
// 0,Capra hircus,Goat
// 1,Panthera pardus,Leopard
// 2,Equus zebra,Zebra

let table;
let bars = [];
let header;
let numbers = [];

function preload() {
  print("Hello there");
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable('assets/happiness_data.csv', 'csv');
  //table = loadTable('assets/happiness_data.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 1500);

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

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
  print(`Total of ${bars.length}`);
  bars.sort(function (a, b) {
    let av = a.value;
    let bv = b.value;
    return bv - av;
  });
  print(bars);
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
    bars[i].display(20, i * 4 + 20);
  }
}

class Bar {
  constructor(data) {
    this.data = data;
    this.selectValue(0);
    this.length = 20;
  }

  selectValue(n) {
    this.value = this.data[n];
  }

  display(x, y) {
    push();
    translate(x, y);
    rectMode(CORNER);
    rect(0, 0, 200 * this.length, 3);
    pop();
  }

}
