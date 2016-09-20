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

            var incorrect = title.indexOf(letter) === -1 ? true : false

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

            var is_same = (titleArray.length == resultArray.length) && titleArray.every(function(element, index) {
                return element === resultArray[index];
            });

            if(is_same) {
                alert('You won')
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

    render() {
        return (
            <div className="record-holder">
                <div className="record-sleeve">
                    <HangmanGame answer={this.props.answer}/>
                </div>
                <div className="vinyl"></div>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audioSource: "http://thesixteendigital.com.s3.amazonaws.com/testfiles/Hallelujah.mp3",
            gameAnswer: 'artist song title'
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
