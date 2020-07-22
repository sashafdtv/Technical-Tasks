const fs = require("fs");
const colors = require("colors");

const launchParameteres = process.argv[2];
const pathStateJSON = process.argv[3];

const gridObj = {
        col: 0,
        row: 0,
        state: [],
        generateRandomState: function() {
            this.state = [];
            this.col = Math.floor((Math.random() * 9) + 1);
            this.row = Math.floor((Math.random() * 9) + 1);
            for (let i = 0; i < this.col * this.row; i++) {
                this.state.push(Math.floor(Math.random() * 2));
            }
        },
        getState: function (path) {
            var contents = fs.readFileSync(path);
            var jsonContent = JSON.parse(contents);
            this.col = jsonContent.col;
            this.row = jsonContent.row;
            this.state = jsonContent.state;
        },
        showGrid: function () {
            var tempArr = [];
            var indexStartRow = 0;
            var indexEndRow = this.col;
            for (var i = 0; i < this.row; i++) {
                tempArr.push(this.state.slice(indexStartRow, indexEndRow));
            indexStartRow += this.col;
            indexEndRow += this.col;
        }

        tempArr.forEach((element, index) => {
            console.log(element.join(" ").green);
        });
        },
        updateState: function () {
        var liveElemenstAround = [];

        this.state.forEach((el, index) => {
            let liveCount = 0;

            if ((index + 1) % this.col === 0) {  //Проверка на последний элемент в строке
                liveCount += this.state[index - 1] ? this.state[index - 1] : 0;
                liveCount += this.state[index - this.col - 1] ? this.state[index - this.col - 1] : 0;
                liveCount += this.state[index - this.col] ? this.state[index - this.col] : 0;
                liveCount += this.state[index + this.col - 1] ? this.state[index + this.col - 1] : 0;
                liveCount += this.state[index + this.col] ? this.state[index + this.col] : 0;

            } else if (index % this.col === 0 || index === 0) { //Проверка на первый элемент в строке
                liveCount += this.state[index + 1] ? this.state[index + 1] : 0;
                liveCount += this.state[index + this.col] ? this.state[index + this.col] : 0;
                liveCount += this.state[index - this.col] ? this.state[index - this.col] : 0;
                liveCount += this.state[index + this.col + 1] ? this.state[index + this.col + 1] : 0;
                liveCount += this.state[index - this.col + 1] ? this.state[index - this.col + 1] : 0;

            } else {
                liveCount += this.state[index - 1] ? this.state[index - 1] : 0;
                liveCount += this.state[index + 1] ? this.state[index + 1] : 0;
                liveCount += this.state[index - this.col - 1] ? this.state[index - this.col - 1] : 0;
                liveCount += this.state[index - this.col] ? this.state[index - this.col] : 0;
                liveCount += this.state[index - this.col + 1] ? this.state[index - this.col + 1] : 0;
                liveCount += this.state[index + this.col - 1] ? this.state[index + this.col - 1] : 0;
                liveCount += this.state[index + this.col] ? this.state[index + this.col] : 0;
                liveCount += this.state[index + this.col + 1] ? this.state[index + this.col + 1] : 0;
            }

            liveElemenstAround.push(liveCount);
        });


        this.state.forEach((el, index) => {
            if (el === 1 && liveElemenstAround[index] < 2) {
                this.state[index] = 0;

            } else if (el === 1 && liveElemenstAround[index] > 3) {
                this.state[index] = 0;

            } else if (el === 0 && liveElemenstAround[index] === 3) {
                this.state[index] = 1;
            }
        });
        },
        start: function() {
            if (launchParameteres === "random" || launchParameteres === undefined) {
                this.generateRandomState();
            } else if (launchParameteres === "path") {
                this.getState(pathStateJSON);
            }
            
            setInterval(()=>{
                this.showGrid();
                this.updateState();
                console.log();
            }, 1000);
        }
};

gridObj.start();
