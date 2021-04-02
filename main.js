// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates a P. aequor Organism
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    
    // simulates P. aequor mutation
    mutate () {
      let randIndex = Math.floor(Math.random() * 15);
      let randBase = this.dna[randIndex];
      let newRandBase = returnRandBase();
      while (this.dna[randIndex] === randBase) {
        if (newRandBase === randBase) {
          newRandBase = returnRandBase();
        } else {
          this.dna[randIndex] = newRandBase;
        }
      }
      return this.dna;
    },

    // compares percentage similarity of two P. aequors' DNA
    compareDNA (pAequorObj) {
      let count = 0;
      let dnaLen = this.dna.length;
      for (let i = 0; i < dnaLen; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) {
          count += 1;
        }
      }
      let percentSimilar = count / dnaLen * 100;
      console.log(`Specimen # ${this.specimenNum} and specimen # ${pAequorObj.specimenNum} have ${percentSimilar}% DNA in common`);
      return percentSimilar;
    },

    // Determines whether the P. aequor will likely survive based on it's DNA
    willLikelySurvive () {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          count += 1;
        }
      }
      let percentCG = count / this.dna.length * 100;
      return percentCG >= 60;
    },

    // Finds a complement DNA strand for the P. Aequor, G-C, T-A etc.
    complementStrand () {
      let newStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          newStrand[i] = 'G';
        } else if (this.dna[i] === 'G'){
          newStrand[i] = 'C';
        } else if (this.dna[i] === 'T') {
          newStrand[i] = 'A';
        } else if (this.dna[i] === 'A') {
          newStrand[i] = 'T'
        }
      }
      return newStrand;
    }
  }
}

const instancesArr = [];

// Creating an array of 30 P. aequors
for (i = 0; i < 30; i++) {
  let newStrand = mockUpStrand();
  let newPAequor = pAequorFactory(i + 1, newStrand);
  while (newPAequor.willLikelySurvive() === false) {
    newStrand = mockUpStrand();
    newPAequor = pAequorFactory(i + 1, newStrand);
  }
  instancesArr.push(newPAequor);
}

// Finds the two most similar P. aequors from a list, based on their DNA
const findMostRelated = (arr) => {
  let maxPercent = 0;
  let mostRelatedArr = [];
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      if (i !== j) {
        let percent = arr[i].compareDNA(arr[j]);
        if (percent > maxPercent) {
          maxPercent = percent;
          mostRelatedArr = [arr[i], arr[j]];
        }
      }
    }
  }
  console.log('\n');
  mostRelatedArr[0].compareDNA(mostRelatedArr[1]);
  return mostRelatedArr;
}

let strand1 = mockUpStrand();
let strand2 = mockUpStrand();
let strand3 = ['C', 'G', 'C', 'G', 'C', 'G', 'C', 'G', 'C', 'G', 'A', 'C', 'T', 'A', 'T', 'A'];
let factory1 = pAequorFactory(1, strand1);
let factory2 = pAequorFactory(2, strand2);
let factory3 = pAequorFactory(3, strand3);

console.log('\nRandomly generated organism #1: ', factory1);

console.log('\nOrganism #1 mutated: ');
factory1.mutate();
console.log(factory1);

console.log('\nRandomly generated organism #2: ', factory2);

console.log('\n');
factory1.compareDNA(factory2);

console.log('\nOrganism #3, made with DNA likely to survive: ', factory3);

console.log("\nSpecimens are likely to survive if 60% or more of their DNA are C's or G's.");
console.log('Will specimen 2 likely survive?', factory2.willLikelySurvive());
console.log('Will specimen 3 likely survive?', factory3.willLikelySurvive());

console.log('\nThe compliment base for G is C and for T is A. Here is Specimen 1 and its compliment DNA: ')
console.log(factory1);
console.log(factory1.complementStrand());

/* console.log('\nAn array of 30 randomly generated organisms: ')
console.log(instancesArr); */

console.log('\nFinding the two organisms from the 30 randomly generated with the most similar DNA:\n')
console.log(findMostRelated(instancesArr));



