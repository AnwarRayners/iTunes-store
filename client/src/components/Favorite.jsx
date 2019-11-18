import React, {Component} from 'react';

class Favorite extends Component {
    constructor(){
        super()
        this.state = {
            songFav: [],
            booksLike: []
        }
    }

    componentDidMount(){
        fetch('/favoritesMusic')
            .then(res => res.json())
            .then(music => this.setState({songFav: music}))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({booksLike: books}))
    }

    remSong = (i) => {
        let songDeleteFromFav = {
            deleted: i.id
        }

        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songDeleteFromFav)
        })

        document.location.reload()
    }
    render(){
        return(
            <div>
                <fieldset>
                    {this.state.songFav.map(favM => <article key={favM.trackId}> <p>{favM.artist}</p> <p>{favM.trackId}</p>
                        <img src={favM.artwork} alt='artwork'/><br/>
                        <audio controls><source src={favM.sample}/></audio>
                        <p>{favM.track}</p>
                    
                        <button onClick={() => {this.remSong(favM)}}>Remove</button>

                    </article>)}
                </fieldset>
            </div>    )
            
    }
}

export default Favorite