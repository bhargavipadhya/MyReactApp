import React from 'react'

export default class TopicPillItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li>
                {console.log("toh fir problem kya hai?")}
                {this.props.title}
            </li>
        )
    }
}