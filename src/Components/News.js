import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class News extends Component {

  static defaultProps = {
    country: "in",
    pagesize: 5,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
  }

  Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1,);
  }
  constructor(props) {
    super(props);
    // console.log('Hello,I am a Constructor from News');
    this.state = {
      articles: [],
      page: 1,
      loading:true
    }
    document.title = `${this.Capitalize(this.props.category)}-NewsMania`
  }

  async updateNews(Page) {
    this.props.setProgress(25)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${Page}&pagesize=${this.props.pagesize}`
    // this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(50)
    console.log(parsedData)
    this.props.setProgress(75)
    // this.setState({ articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,loading:false})
    this.setState({ articles: parsedData.articles, 
      totalResults: parsedData.totalResults})
      this.props.setProgress(100)
  }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
    this.updateNews(this.state.page);
  }

  // handleNextClick =  async () => {
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey= ${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
  //   // this.setState({loading:true});
  //   // let data= await fetch(url);
  //   // let parsedData= await data.json();
  //   // this.setState({articles: parsedData.articles,
  //   // page: this.state.page+1,
  //   // loading:false})
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews(this.state.page+1);
  // }

  // handlePreviousClick = async () => {
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
  //   // this.setState({loading:true})
  //   // let data= await fetch(url);
  //   // let parsedData= await data.json();

  //   // this.setState({
  //   //   page:this.state.page-1,
  //   //   articles: parsedData.articles,
  //   //   loading:false
  //   // })
  //  this.setState({ page: this.state.page - 1 });
  //   this.updateNews(this.state.page-1);
  // }

  fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(this.state.page);
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults,page:this.state.page+1})
  }

  render() {
    return (
      <>
          {/* <div className="container"> */}
        <h2 className='text-center my-5'>NewsMania-Top {this.Capitalize(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
            <div className="row">
               {/* {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4 my-5" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}  */}
              
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-5" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='d-flex justify-content-between my-5'>
            <button type="button" disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-primary">&larr; Previous</button>
            <button type="button" disabled={Math.ceil(this.state.totalResults / this.props.pagesize) < this.state.page + 1} onClick={this.handleNextClick} className="btn btn-primary">Next &rarr;</button>
          </div> */}
      {/* </div> */}
      </>
    )
  }
}
