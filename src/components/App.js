import React from 'react';
import axios from 'axios';


class App extends React.Component {
    componentDidMount(){
        axios.get('/api/images/test').then(res=> console.log(res.data))
    }
    render(){
        return <h1>Hello World!</h1>
    }
}


export default App