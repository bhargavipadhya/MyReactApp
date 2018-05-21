import React from 'react';
import hello from './hello'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

const PageParam = ({match}) => {
    return(
        <h2>PageParam {match.params.id}
        </h2>
    )
};

class PageUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = { id: ''};
        this.updatePage =
            this.updatePage.bind(this);
    }

    componentDidMount() {
        this.updatePage
        (this.props.match.params.id);
    }
    componentWillReceiveProps(newProps){
        this.updatePage
        (newProps.match.params.id);
    }

    updatePage(id) {
        this.setState({id: id});
    }

    render() {
        return(
            <h2>PageUpdate &nbsp;
                {this.state.id}
            </h2>
        );}}


const App = () => {
    return(
        <Router>
            <div>
                <Link to="/pageParam/123">
                    Page 123</Link>
                <Link to="/pageParam/234">
                    Page 234</Link>
                <Route path='/pageParam/:id'
                       component={PageParam}/>
                <br/>

                    <Link to="/pageUpdate/345">
                        PageUpdate 345</Link>
                    <Link to="/pageUpdate/456">
                        PageUpdate 456</Link>
                    <Route path='/pageUpdate/:id'
                           component={PageUpdate}/>

            </div>
        </Router>
    );
};

export default App;
