//This is a project to get to know nueral networks in their most basic form - the perceptron
//Ill be using a cartesian point as an input to the processor, and itll give a guess on which side
//of a given line it lies on

//random number function
function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Point{
    constructor(){
        this.x = Math.floor(random(0, 100));
        this.y = Math.floor(random(0, 100));
        if(this.x>this.y){
            this.label = 1;
        }else{
            this.label = -1;
        }
    }
}

class Perceptron{
    constructor(n){
        //initialize weights and inputs
        this.LR = 0.01;
        this.weights = new Array(n);
        for(let i=0; i<this.weights.length; i++){
            this.weights[i] = random(-1, 1);
        }
    }

    //This is activation function
    sign(val){
        if(val>=0){
            return 1;
        }else{
            return -1;
        }
    }

    guess(inputs){
        let sum = 0;
        for(let i=0; i<this.weights.length; i++){
            sum+=inputs[i] * this.weights[i];
        }
        let output = this.sign(sum);
        return output;
    }

    //tune weights for more accurate guesses using known answers
    train(inputs, target){
        let guess = this.guess(inputs);
        let error = target-guess;

        for(let i=0; i<this.weights.length; i++){
            this.weights[i] = error * inputs[i] * this.LR;
        }
    }
}

brain = new Perceptron(2);

//var inputs = [-1, 0.5];
//console.log(p.guess(inputs))

var points = []
let iterations = 20000;
for(let i=0; i<iterations; i++){
    points.push(new Point())
}
let correct = 0;
for(point of points){
    let inputs = [point.x, point.y];
    let target = point.label;
    brain.train(inputs, target);

    let guess = brain.guess(inputs);
    if(guess == target){
        console.log("Correct guess!")
        correct++;
    }else{
        console.log("Wrong guess")
    }
}
console.log(brain.weights)
console.log("Percent correct: " + (correct/iterations)*100 + '%')