import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:12,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  
  constructor(props){
    super(props)
    this.state={
      articles:[],
      loading:false,
      page:1
    }
    document.title=`${this.props.category}-NewsMonkee`;
  }
 
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44d946594d0748f69a2a67a7b9991518&page=1&pageSize=${this.props.pageSize}` ;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }
   handlePrevClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44d946594d0748f69a2a67a7b9991518&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })
  }
  handleNextClick=async ()=>{
    if(this.state.page>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{

    
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44d946594d0748f69a2a67a7b9991518&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles,
      loading:false
    })
  }

  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{marginTop:'90px'}}>NewsMonkee-Top {this.props.category} headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading&&this.state.articles.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       
          </div>
          
        })} 
        
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page>Math.ceil(this.state.totalResults/this.props.pageSize) } className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>


        </div>
      
      </div>
    )
  }
}

export default News
