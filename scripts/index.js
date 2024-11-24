// Seleção de elementos do DOM
var GameDiv = document.getElementById("MainDiv");
var ResultDiv = document.getElementById("CompleteQuizDiv");
var TbNick = document.getElementById("Tb_NickName");
var QuestionH3 = document.getElementById("QuestionH3");
var Btn1 = document.getElementById("Btn1");
var Btn2 = document.getElementById("Btn2");
var Btn3 = document.getElementById("Btn3");
var Btn4 = document.getElementById("Btn4");
var LabelRs1 = document.getElementById("ResultLabel1");
var LabelRs2 = document.getElementById("ResultLabel2");
var LbAlert = document.getElementById("AlertStart");
var IndexQuestion = 0;
var QuizAcertos = 0;
var IntervalId = 0;

// === Utilidade
// Função para esconder um elemento
function HiddenElement(element)
{
    element.classList.add("invisible");
}

// Função para tornar um elemento visível
function VisibleElement(element)
{
    element.classList.remove("invisible");
}

// Array de perguntas e respostas do quiz
const quiz = [
    {
      pergunta: "O que é necessário para declarar uma variável em JavaScript?",
      opcoes: ["var, let ou const", "int, string, bool", "declare, new, const", "Nenhuma das anteriores"],
      respostaCorreta: 0
    },
    {
      pergunta: "Como você exibe algo no console do navegador?",
      opcoes: ["print()", "log.console()", "console.log()", "write.console()"],
      respostaCorreta: 2
    },
    {
      pergunta: "Qual é a saída de `console.log(2 + \"2\")`?",
      opcoes: ["4", "22", "undefined", "Error"],
      respostaCorreta: 1
    },
    {
      pergunta: "Qual método é usado para converter uma string em um número?",
      opcoes: ["parseInt()", "toString()", "Number()", "Ambos. (parseInt() e Number())"],
      respostaCorreta: 3
    },
    {
      pergunta: "Qual operador verifica igualdade de valor e tipo?",
      opcoes: ["==", "===", "!=", "!=="],
      respostaCorreta: 1
    }
  ];




// Inicializa a página
Setup();


function Setup()
{
    // Esconde as seções iniciais e reinicia variáveis
    HiddenElement(GameDiv);
    HiddenElement(ResultDiv);
    HiddenElement(LbAlert);
    IndexQuestion = -1;
    QuizAcertos = 0;
}

function OnStart()
{
    // Verifica se o usuário digitou um nome
    if (!TbNick.value)
    {
        VisibleElement(LbAlert);
        return;
    }

    // Configura a página e avança para a próxima pergunta
    Setup();
    NextQuestion();
}

function NextQuestion()
{
    // Limpa intervalo de tempo e avança para a próxima pergunta
    clearInterval(IntervalId);
    IndexQuestion++;

    if (IndexQuestion >= quiz.length)
    {
        EndQuiz();
        return;
    }
    // Configura a pergunta e opções
    let Question = quiz[IndexQuestion];

    QuestionH3.innerText = Question.pergunta;
    Btn1.innerText = Question.opcoes[0];
    Btn2.innerText = Question.opcoes[1];
    Btn3.innerText = Question.opcoes[2];
    Btn4.innerText = Question.opcoes[3];

    VisibleElement(GameDiv);
}

function OnSelectOp(Index)
{
    let Question = quiz[IndexQuestion];

    // Verifica se a resposta está correta
    if (Index === Question.respostaCorreta)
        QuizAcertos++;

    // Faz uma transição antes de passar para a próxima pergunta
    DelayNextQuestion();
}

// Esconde a seção do jogo temporariamente
function DelayNextQuestion()
{
    HiddenElement(GameDiv);
    IntervalId = setInterval(NextQuestion, 500);
}

function EndQuiz()
{
    // Exibe o resultado final
    LabelRs1.innerHTML = "<strong>" + TbNick.value + "</strong> Aqui esta o seu resultado:";
    LabelRs2.innerText = QuizAcertos + "/" + quiz.length + " (" + QuizAcertos / quiz.length * 100 + "%)";
    if (QuizAcertos > quiz.length * 0.6)
    {
        LabelRs2.innerText += "\nParabens você acertou mais que 60% das perguntas.";
    }

    // Atualiza a interface para mostrar os resultados
    HiddenElement(GameDiv);
    VisibleElement(ResultDiv);
}