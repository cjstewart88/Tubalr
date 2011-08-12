class ApiController < ActionController::Base
  
  def just
    response = []
    
    youtubeData = HTTParty.get("http://gdata.youtube.com/feeds/api/videos?q=#{URI.escape(params[:artist_band])}&orderby=relevance&start-index=1&max-results=20&v=2&alt=json")
    
    youtubeData["feed"]["entry"].each_with_index do |(key,val), i|
      response.push(:VideoID => key["id"]["$t"].split(":")[3], :VideoTitle => key["title"]["$t"])
    end
    
    render :json => response
  end
  
  def similar
    response = []
    
    lastfmData = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{URI.escape(params[:artist_band])}&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json")
    
    lastfmData["similarartists"]["artist"].each_with_index do |(key,val), index|
      youtubeData = HTTParty.get("http://gdata.youtube.com/feeds/api/videos?q=#{URI.escape(key["name"])}&orderby=relevance&start-index=1&max-results=1&v=2&alt=json")
      youtubeData["feed"]["entry"].each do |key,val|
        response.push(:VideoID => key["id"]["$t"].split(":")[3], :VideoTitle => key["title"]["$t"])
      end
    end    
    
    render :json => response
  end
  
  def playlist
    response = []
    
    playlistData = Playlists.videos(params[:id])
    
    playlistData.each do |video|
      response.push(:VideoID => video["video_id"], :VideoTitle => video["video_title"])
    end
    
    render :json => response
  end
  
end