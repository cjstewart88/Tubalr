class ApiController < ActionController::Base
  def search
    Searches.create({  
      :search_type  => params[:search_type],
      :what         => params[:search],
      :who          => request.remote_ip
    })
    
    render :json => ""
  end
  
  def just
    response = []
    
    youtube_data = HTTParty.get("http://gdata.youtube.com/feeds/api/videos?q=#{URI.escape(params[:artist_band])}&orderby=relevance&start-index=1&max-results=20&v=2&alt=json")
    
    youtube_data["feed"]["entry"].each_with_index do | (key, val), i |
      response.push(:VideoID => key["id"]["$t"].split(":")[3], :VideoTitle => key["title"]["$t"])
    end
    
    render :json => response
  end
  
  def similar
    response = []
    
    lastfm_data = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{URI.escape(params[:artist_band])}&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json")
    
    lastfm_data["similarartists"]["artist"].each_with_index do |(key,val), index|
      youtube_data = HTTParty.get("http://gdata.youtube.com/feeds/api/videos?q=#{URI.escape(key["name"])}&orderby=relevance&start-index=1&max-results=1&v=2&alt=json")
      youtube_data["feed"]["entry"].each do |key,val|
        response.push(:VideoID => key["id"]["$t"].split(":")[3], :VideoTitle => key["title"]["$t"])
      end
    end    
    
    render :json => response
  end
  
  def userFavorites
    response = []

    favoritesData = Favorites.get(params[:username], nil, (params[:search] ? params[:search] : nil))    

    favoritesData.each do | video |
      response.push(:VideoID => video["video_id"], :VideoTitle => video["video_title"])
    end

    render :json => response
  end
end