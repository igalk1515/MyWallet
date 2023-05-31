import React from 'react'
import './expense.css'
import { BackendApi } from '../BackendApi'
export class Summary extends React.Component {
  constructor(props) {
    super(props)
    this.api = new BackendApi()
    const data = this.api.getSummary()
    console.log('data', data)
  }
  render() {
    return (
      <div className="expense-form">
        <h1>סיכום</h1>
      </div>
    )
  }
}
