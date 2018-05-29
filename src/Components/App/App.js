import React, { Component } from 'react';
import PostList from './PostList/PostList';
import logo from './../../reddit.svg'
import './App.css';

class App extends Component {
  constructor(){
      super();

      const defaultSub = 'pic';

      this.state = {
        prevSub: defaultSub,
        sub: defaultSub,
        title: defaultSub,
        before: null,
        after: null,
        listData: []
      };
  };

  updateSub(evt){
    this.setState({
      prevSub: this.state.sub,
      sub: evt.target.value
    });
  }

  searchSub(){
    this.setState({
      after: null
    });

    this.getData()
    .then(results => {
      if(!results){
        return;
      }

      window.scrollTo(0, 0);

      this.setState({title: this.state.sub});

      if(results.data.after){
        this.setState({
          after: results.data.after,
          before: results.data.before
        });
      }
     
      console.log('before', results.data.before);
      console.log('after', results.data.after);

      let listData = results.data.children.map((post) => {
        return post.data;
      });

      this.setState({
        listData
      });
    })
  }

  getData(){
    const urlPrefix = 'https://www.reddit.com/';
    const url = `${urlPrefix}r/${this.state.sub}.json?count=25&&after=${this.state.after}`;

    return fetch(url)
      .then(response => {
        if(response.ok)
          return response.json();
        else
          throw new Error(response.status);
      })
      .catch(err => {
        console.log('error status: ', err);
      })
  }

  componentDidMount(){
    this.searchSub();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{this.state.title}</h1>
        </header>
        <div className="row Search">
          subreddit: <input type="textbox" value={this.state.sub} onChange={evt => this.updateSub(evt)}/>
          <button onClick={() => this.searchSub()}>Go</button>
        </div>
        <div className="App-intro">
          <PostList key={this.state.after} data={this.state.listData}/>
          <button onClick={() => this.searchSub()}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
