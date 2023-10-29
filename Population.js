function Population(){
  this.rockets=[];
  this.popsize=25;
  this.matingpool=[];

  for(var i = 0;i<this.popsize;i++){
      this.rockets[i] = new Rocket();
  }

  this.evaluate = function(){

      var maxfit=0;
      for(var i =0;i<this.popsize;i++){
          this.rockets[i].calcFitness();
          if(this.rockets[i].fitness>maxfit){
              maxfit= this.rockets[i].fitness;
          }
      }
      createP(maxfit);

      for(var i =0;i<this.popsize;i++){
          this.rockets[i].fitness /= maxfit; //normalize it
      }

      this.matingpool=[];
      for(var i =0;i<this.popsize;i++){
          var n = this.rockets[i].fitness * 100;
          for(var j = 0;j < n;j++){
              this.matingpool.push(this.rockets[i]);
          }
      }
  }
      

      this.selection = function(){
          var newRockets=[];
          for(var i = 0;i<this.rockets.length;i++){
          var parentA = random(this.matingpool).dna; //give random element from the array (feature in p5?)
          var parentB = random(this.matingpool).dna;
          var child = parentA.crossover(parentB);
          newRockets[i]=new Rocket(child);
          }
          this.rockets = newRockets;
      }

  this.run = function(){
      for(var i = 0;i<this.popsize;i++){
          this.rockets[i].update();
          this.rockets[i].show();
      }
  }
}