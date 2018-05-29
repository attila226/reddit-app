import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
        };

        this.emptyThumbnail = 'https://spotlight.dlme.clir.org/assets/default-52adc3dc03639885e8aa93763e29868269dd3b9dad4689f140c0175b4f945922.png';
    };

    formatDate(unixDate){
        const date = new Date(unixDate * 1000),
        day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear(),
        monthNames = [
            "January", "February", "March",
            "April", "May", "June", 
            "July", "August", "September", 
            "October", "November", "December"
        ],
        month = monthNames[monthIndex];

        let formattedDate = `${month} ${day} ${year}`;

        return formattedDate;
    }

    hasThumbnail(thumbnail){
        return (thumbnail !== '' && thumbnail !== 'self');
    }

    componentDidMount(){

    }

  render() {
    return (
    <div className="row form-group">
        <div className="col-sm-1">{this.props.ups}</div>
        <div className="col-sm-2">
            <img src={this.hasThumbnail(this.props.thumbnail) ? this.props.thumbnail : this.emptyThumbnail}
            height={this.props.thumbnail_height ? this.props.thumbnail_height : 140} 
            width={this.props.thumbnail_width ? this.props.thumbnail_width : 140}/>
        </div>
        <div className="col-sm-9">
            <h4 className="text-left"><a href={this.props.url} target='_new'>{this.props.title}</a></h4>
            <div className="small text-left">submitted {this.formatDate(this.props.created)} by {this.props.author}</div>
        </div>
    </div>
    );
  }
}

export default Post;
