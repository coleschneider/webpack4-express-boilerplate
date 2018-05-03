import React from 'react';
import axios from 'axios';


class App extends React.Component {
    
    constructor(){
        super();
        this.state = {
            src: null,
            signature: null,
            file: null
        }
        this.handleFileChange = ev => {
            ev.preventDefault();
            const file = ev.target.files[0]
            const reader = new FileReader();
            
            axios.get(`/api/images/signature?file-name=${file.name}&file-type=${file.type}`)
            .then(res => this.setState({signature: res.data.signedRequest}))
            
            reader.onloadend = () => {
                this.setState({
                    src: reader.result,
                    file: file
                })

            }
            reader.readAsDataURL(file)
        }
        this.handleUpload = () => {
            axios.put(this.state.signature, this.state.file)
        }
    }
    render(){
        const imagePreview = this.state.src ? <img src={this.state.src} /> : null
     return (
         <div>
        <input type="file" onChange={this.handleFileChange} />
        {imagePreview}
        <button onClick={this.handleUpload}>
        </button>
        </div>
     )
    }
}


export default App