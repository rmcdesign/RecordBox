import React, { Component } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';

class AudioPlayer extends Component {

    render() {
        return (
            <ReactAudioPlayer
                src={ this.props.track}
                autoPlay="false"
            />
        );
    }
}

class HangmanGame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'],
            lives: 6,
            songTitle: this.props.answer,
            showArtwork: this.props.showArtwork,
            result: this.displayResult()
        }
    }

    componentDidMount() {
        console.log(this.props.answer.replace(/ /g,"").length)
    }

    letterClicked(letter, index) {

        if(this.state.lives > 0) {
            var currentLetters = this.state.alphabet;
            currentLetters[index] = '_'

            var title = this.state.songTitle;
            var titleArray = title.split("");

            var incorrect = title.indexOf(letter) === -1

            var lives = this.state.lives

            if(incorrect) {
                lives--
            }

            var resultArray = this.state.result

            var checkForMatch = function(element, index, array) {
                if(titleArray[index] === letter) {
                    resultArray[index] = letter
                }
            }

            titleArray.forEach(checkForMatch)

            var is_same = (titleArray.length === resultArray.length) && titleArray.every(function(element, index) {
                return element === resultArray[index];
            });

            if(is_same) {
                this.props.showArtwork()
            }

            this.setState({
                alphabet: currentLetters,
                result: resultArray,
                lives: lives
            })
        }

    }

    displayResult() {
        var result = []
        for (var i = 0; i < this.props.answer.length; i++) {
            if (this.props.answer[i] === " ") {
                result[i] = " ";
            } else {
                result[i] = "_";
            }
        }
        return result
    }

    render() {
        return (
            <div className="hangman-game">
                <h4>Guess the Artist and title to reveal the artwork</h4>
                <div className="letters">
                    {this.state.alphabet.map((letter, index) => {
                        return <div className="letter" key={index} onClick={()=> this.letterClicked(letter, index)}>{letter}</div>
                    })}
                </div>
                <div className={ 'hangman-sprite sprite-' + this.state.lives }></div>
                <div className="game-status">{ this.state.lives > 0 ? this.state.lives + ' guesses left' : 'You lost'}</div>
                <div className="song-title">
                    {this.state.result.map((character, index) => {
                        return <div className="character" key={index}>{character}</div>
                    })}
                </div>
            </div>
        );
    }
}

class RecordHolder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showArtwork: false
        }
    }

    showTheArtwork() {
        this.setState({
            showArtwork: true
        })
    }

    render() {
        return (
            <div className="record-holder">
                <div className="record-sleeve">
                    <HangmanGame answer={this.props.answer} showArtwork={this.showTheArtwork.bind(this)}/>
                </div>
                <div className="vinyl"></div>
                { this.state.showArtwork === true ? <RecordArtwork/> : ''}
            </div>
        );
    }
}

class RecordArtwork extends Component {

    render() {
        return (
            <div className="record-artwork"></div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audioSource: "http://rmc-design.co.uk/media/disciples-daylight.mp3",
            gameAnswer: 'disciples daylight'
        }
    }

    render() {
        return (
            <div className="App">
                <AudioPlayer track={this.state.audioSource}/>
                <RecordHolder answer={this.state.gameAnswer}/>
            </div>
        );
    }
}

export default App;
