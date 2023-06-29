import { Component } from "react";
import styles from './Searchbar.module.css'
export class Searchbar extends Component{
  state = {
    searchValue: '',
  }

  handleChange =({target})=>{
    console.log(target.value)
 this.setState({searchValue: target.value});
  }

  handleSubmit=(e)=>{
e.preventDefault()
if(this.state.searchValue.trim() === ''){
  return
}
this.props.onSubmit(this.state.searchValue)
 this.setState({ searchValue: ''})
  }

    render() {
     
        return (
        <header className={styles.searchbar}
        >
        <form className={styles.searchForm}  onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.searchFormButton }>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>
      
          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
             value={this.state.searchValue}
             onChange={this.handleChange}
          />
          
        </form>
      </header>  )
      
      }
}