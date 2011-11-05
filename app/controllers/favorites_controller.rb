class FavoritesController < ApplicationController
  def init
    @username = params[:username]

    render :layout => "application", :template => "index"
  end
  
  def check
    response = []
    
    tmp_favorites = Favorites.get(nil, params[:user_id])
    tmp_videos    = params[:videos]
    
    current_favorites = []
    current_videos    = []
    
    tmp_favorites.each do | favorite |
      current_favorites.push(favorite.video_id)
    end
    
    params[:videos].each do | val |
      current_videos.push(val[1]["VideoID"])
    end
    
    current_favorites.each do | favorite |
      response.push favorite if current_videos.include? favorite
    end

    render :json => response
  end
end
