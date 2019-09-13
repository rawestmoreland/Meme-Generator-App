import React, { Component } from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            image: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.getRandomImage = this.getRandomImage.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes").then(response => response.json()).then(response => {
            const { memes } = response.data
            this.setState({ allMemeImgs: memes })
        }).then(() => console.log(this.state.allMemeImgs))
    }

    handleInputChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    getRandomImage(e) {
        e.preventDefault()
        const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length)
        this.setState({
            image: this.state.allMemeImgs[randomIndex].url
        })
        console.log(this.state.allMemeImgs[randomIndex].url)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.getRandomImage} className="meme-form">
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        placeholder="Top Text"
                        onChange={this.handleInputChange}
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        placeholder="Bottom Text"
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.image} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator