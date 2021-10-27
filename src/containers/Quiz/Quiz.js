import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' | 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' | 'error' }
    quiz: [
      {
        id: 1,
        question: 'What colour is sky?',
        correctAnswerId: 2,
        answers: [
          {text: 'Black', id: 1},
          {text: 'Blue', id: 2},
          {text: 'Red', id: 3},
          {text: 'Green', id: 4},        ]
      },
      {
        id: 2,
        question: 'What year Chernihiv was founded?',
        correctAnswerId: 2,
        answers: [
          {text: '1300', id: 1},
          {text: '1100', id: 2},
          {text: '1000', id: 3},
          {text: '900', id: 4},        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.correctAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
          
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[question.id]: 'error'},
        results,
      })
    }   
  }
  
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>

          {
            this.state.isFinished
            ? <FinishedQuiz 
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
            : <ActiveQuiz 
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
          
        </div>
      </div>
    )
  }
}

export default Quiz