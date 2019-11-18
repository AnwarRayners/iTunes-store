import React, {Component} from 'react';

class Music extends Component{
    constructor(){
        super()
        this.state ={
            data: [],
            musicInput: ''
        }
    }

    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(data => this.setState({data}))
    }
    //fetches the information and allows user to search music
    musicSearch = async () => {
        let search = this.state.musicInput.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            data: res
        })
    }

    FaveSong= (i) => {
        let imFave = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        }
        console.log(imFave)

        fetch('/favoritesMusic', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(imFave)
        })
 
        alert('Song added to favourites')
    }
    render(){
        return (
            <div>
                <h1>Search an artist or song title:</h1>
                <div className="searchBar" id="bar">

                <input classname="bar" type="text" onChange={(e) => this.setState({musicInput: e.target.value})} />

                <button onClick={() => this.musicSearch()}>Search</button>
                </div>


                <fieldset>

                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}<br/>
                    {sort_data.trackName}<br/><img src={sort_data.artworkUrl100} alt={sort_data.trackId}/>
                    {console.log(sort_data)}<br/><audio controls><source src={sort_data.previewUrl}type='audio/mpeg'></source></audio>
                    <br/><br/>
                    <button onClick={() =>this.FaveSong(sort_data)}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Music