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
    { questionText: 'Priorizas y planificas las tareas con eficacia, y sueles terminarlas mucho antes de la fecha límite.', options: [
      { text: 'No, soy una persona que le gusta improvisar', value: 1 }, { text: 'Tengo mi propia agenda con colores y recordatorios', value: 2 }, { text: 'Siempre encuento a alguien que lo haga por mi', value: 3 }, { text: 'Me organizo tanto a mi como a los que trabajan conmigo', value: 4 }, { text: 'Aprendi y soy una persona meticulosa', value: 5 }
    ]},
    { questionText: 'Haces nuevos amigos con frecuencia.', options: [
      { text: 'Como me traten a mi es como los tratare a ellos', value: 1 }, { text: 'Siempre estoy disponible para ayudar a alguien a sentirse incluido', value: 2 }, { text: 'No necesito amigos.', value: 3 }, { text: 'No tengo amigos, solo compañeros', value: 4 }, { text: 'Para amigos como los que tengo, prefiero enemigos', value: 5 }
    ]},
    { questionText: 'Después de tu muerte, ¿qué desearías que las personas hagan cuando escuchen tu nombre?', options: [
      { text: 'Piensen en mis logros', value: 1 }, { text: 'Me recuerden como una buena compañera y amiga', value: 2 }, { text: 'TIEMBLEN.', value: 3 }, { text: 'Nada. Sigan con su vida', value: 4 }, { text: 'Dudo que alguien recuerde mi nombre', value: 5 }
    ]},
    { questionText: 'Estas en medio de un examen y ves como alguien se esta copiando ¿Que haces?', options: [
      { text: 'Yo soy el que se esta copiando', value: 1 }, { text: 'Intendo convencerlo de hacer lo correcto', value: 2 }, { text: 'Los obligo a que me pasen las respuestas a cambio de mi silencio ', value: 3 }, { text: 'Le aviso al docente a cargo', value: 4 }, { text: 'Finjo un incendio para evadir el examen', value: 5 }
    ]},
    { questionText: 'Si me invitan a una fiesta, yo...', options: [
      { text: 'Voy y le pongo toda la onda', value: 1 }, { text: 'Yo soy quien la organiza', value: 2 }, { text: 'Me encierro en el baño y rompo todo', value: 3 }, { text: 'Usaria mi tiempo en una actividad mas productiva', value: 4 }, { text: 'Observo todo encapuchado desde el pasillo', value: 5 }
    ]},
    { questionText: 'Vas manejando y el auto de adelante va a un ritmo muy lento', options: [
      { text: 'Toco la bocina hasta que se apure o se mueva', value: 1 }, { text: 'Me siento mal por acelerar y rebasar el maximo permitido', value: 2 }, { text: 'No se, yo tengo chofer propio', value: 3 }, { text: 'En el proximo semaforo, bajo y respetuosamente le ofrezco darle clases de manejo', value: 4 }, { text: 'Le choco la rueda de atras para que despiste', value: 5 }
    ]},
    { questionText: 'Mi color favorito es...', options: [
      { text: 'Rojo', value: 1 }, { text: 'Rosa', value: 2 }, { text: 'Azul', value: 3 }, { text: 'Verde', value: 4 }, { text: 'Negro', value: 5 }
    ]},
    { questionText: 'A una primera cita la/o invito a... ', options: [
      { text: 'A una ComicCon', value: 1 }, { text: 'A merendar a un cafe re aestethic', value: 2 }, { text: 'Investigo sus gustos, para que piense que somos compatibles', value: 3 }, { text: 'A un restaurante lujoso con un buen vino ', value: 4 }, { text: 'Ya no recuerdo lo que es una cita', value: 5 }
    ]},
    { questionText: 'Mi comida favorita es...', options: [
      { text: 'Milansesa Napolitana', value: 1 }, { text: 'Sushi', value: 2 }, { text: 'Salchicas con pure', value: 3 }, { text: 'Asado', value: 4 }, { text: 'Lo que haya', value: 5 }
    ]},
    { questionText: 'Si pudieras elegir un poder, ¿Cual seria?', options: [
      { text: 'Frenar el tiempo', value: 1 }, { text: 'Poder volar', value: 2 }, { text: 'Control Mental', value: 3 }, { text: 'Estamos grandes para esas cosas', value: 4 }, { text: 'Poder dormir', value: 5 }
    ]},
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
