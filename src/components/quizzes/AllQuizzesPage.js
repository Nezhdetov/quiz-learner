import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import toastr from 'toastr'
import Loader from '../common/loader/Loader'
import './QuizzessStyle.css'

class AllQuizzesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quizzes: [],
      loaded: false
    }

    this.handleQuizzesLoaded = this.handleQuizzesLoaded.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZZES_LOADED, this.handleQuizzesLoaded)
  }

  componentDidMount () {
    quizActions.getAllQuizzes()
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUIZZES_LOADED, this.handleQuizzesLoaded)
  }

  handleQuizzesLoaded (data) {
    console.log(data)

    // TODO: Validate!
    this.setState({
      quizzes: data.quizzes,
      loaded: true
    })
    toastr.success('Quizzes loaded!')
  }

  render () {
    if (!this.state.loaded) {
      return <Loader />
    }

    let quizRows = this.state.quizzes.map(quiz =>
      <tr key={quiz._id}>
        <td>{quiz.name}</td>
        <td>{quiz.description ? quiz.description : 'No description' }</td>
        <td><Link to={`/quiz-learner/quiz/details/${quiz._id}`}>Details</Link></td>
      </tr>
    )

    return (
      <div className='container'>
        <div className='row col-md-9 col-md-offset-1 custyle'>
          <h1>All quizzes!</h1>
            <table className='table table-striped custab'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                {quizRows}
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default AllQuizzesPage
