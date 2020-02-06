import React from "react";
import VideoList from "./VideoList";
import SearchBar from "./SearchBar";
import youtube from "./apis/youtube";
import axios from 'axios';
import VideoDetails from "./VideoDetails";

class App extends React.Component {

    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        this.onSubmit('buildings');
    }

    onSubmit = async term => {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBVI_YOZcOwGEPMWTClDqqx36DXYx8KRSU&part=snippet&q='+term);
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    }

    onVideoSelect = video => {
        this.setState({selectedVideo: video});
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.onSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetails video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
