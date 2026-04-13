/**
 * Brain De-rotter — Math Engine
 * Generates and validates math problems with difficulty scaling
 */

export function createMathEngine() {
    let level = 1;
  
    function generateProblem() {
      let a, b, question, answer;
  
      switch (level) {
        case 1:
          a = rand(1, 10);
          b = rand(1, 10);
          question = `${a} + ${b}`;
          answer = a + b;
          break;
  
        case 2:
          a = rand(2, 12);
          b = rand(2, 12);
          question = `${a} × ${b}`;
          answer = a * b;
          break;
  
        case 3:
          a = rand(10, 50);
          b = rand(1, 10);
          question = `${a} - ${b}`;
          answer = a - b;
          break;
  
        default:
          a = rand(1, 20);
          b = rand(1, 20);
          question = `${a} + ${b}`;
          answer = a + b;
      }
  
      return { question, answer };
    }
  
    function validate(input, answer) {
      return Number(input) === answer;
    }
  
    function levelUp() {
      level++;
      console.log("[Brain De-rotter] Level up →", level);
    }
  
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    return {
      generateProblem,
      validate,
      levelUp
    };
  }