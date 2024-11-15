import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Question {
  questionText: string;
  options: { text: string; value: number }[]; // Cada opción tiene un texto y un valor numérico
}
interface Result {
  image: string;
  name: string;
}
@Component({
  selector: 'app-test-personalidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-personalidad.component.html',
  styleUrl: './test-personalidad.component.css'
})
export class TestPersonalidadComponent {
  
  questions: Question[] = [
    { questionText: 'What is your favorite color?', options: [
      { text: 'Red', value: 1 }, { text: 'Blue', value: 2 }, { text: 'Green', value: 3 }, { text: 'Yellow', value: 4 }, { text: 'Purple', value: 5 }
    ]},
    { questionText: 'What is your favorite animal?', options: [
      { text: 'Cat', value: 1 }, { text: 'Dog', value: 2 }, { text: 'Bird', value: 3 }, { text: 'Fish', value: 4 }, { text: 'Horse', value: 5 }
    ]},
    // Agrega más preguntas según sea necesario
  ];

  currentQuestionIndex = 0;
  selectedAnswers: number[] = [];
  quizCompleted = false;
  finalResult: Result | null = null;

  // Contadores individuales para cada respuesta
  answerCounter1 = 0;
  answerCounter2 = 0;
  answerCounter3 = 0;
  answerCounter4 = 0;
  answerCounter5 = 0;

  nextQuestion() {
    // Suma al contador correspondiente según la respuesta seleccionada
    const selectedAnswer = this.selectedAnswers[this.currentQuestionIndex];
    if (selectedAnswer) {
      switch (selectedAnswer) {
        case 1:
          this.answerCounter1++;
          break;
        case 2:
          this.answerCounter2++;
          break;
        case 3:
          this.answerCounter3++;
          break;
        case 4:
          this.answerCounter4++;
          break;
        case 5:
          this.answerCounter5++;
          break;
      }
    }

    // Mueve a la siguiente pregunta o calcula el resultado si es la última
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.calculateResult();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectAnswer(optionValue: number) {
    // Almacena la respuesta seleccionada, pero no suma al contador
    this.selectedAnswers[this.currentQuestionIndex] = optionValue;
  }

  getSelectedAnswer(): number | null {
    return this.selectedAnswers[this.currentQuestionIndex] || null;
  }

  calculateResult() {
    this.quizCompleted = true;
    this.finalResult = this.getResult();
  }

  getResult(): Result {
    const counters = [
      { counter: this.answerCounter1, result: { image: '/assets/images/damian-imgs/damian.png', name: 'Damian' } },
      { counter: this.answerCounter2, result: { image: '/assets/images/paz-imgs/paz-va.png', name: 'Paz' } },
      { counter: this.answerCounter3, result: { image: '/assets/images/gabriel-imgs/gabi-va.png', name: 'Gabriel' } },
      { counter: this.answerCounter4, result: { image: '/assets/images/manuel-imgs/manu-va.png', name: 'Manuel' } },
      { counter: this.answerCounter5, result: { image: '/assets/images/figura-imgs/figura-misteriosa.png', name: 'Figura Misteriosa' } }
    ];

    // Encuentra el máximo valor de contador
    const maxCount = Math.max(
      this.answerCounter1,
      this.answerCounter2,
      this.answerCounter3,
      this.answerCounter4,
      this.answerCounter5
    );

    // Filtra los contadores que tienen el valor máximo (en caso de empate)
    const topResults = counters.filter(c => c.counter === maxCount);

    // Si hay empate, selecciona un resultado al azar entre las opciones empatadas
    if (topResults.length > 1) {
      const randomIndex = Math.floor(Math.random() * topResults.length);
      return topResults[randomIndex].result;
    }

    // Si no hay empate, devuelve el resultado correspondiente al mayor contador
    return topResults[0].result;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = [];
    this.quizCompleted = false;
    this.finalResult = null;
    this.answerCounter1 = 0;
    this.answerCounter2 = 0;
    this.answerCounter3 = 0;
    this.answerCounter4 = 0;
    this.answerCounter5 = 0;
  }
}