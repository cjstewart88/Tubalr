class FavoritesController < ApplicationController
  def init
    @username = params[:username]
    @search   = params[:search]

    render :layout => "application", :template => "index"
  end
  
  def check
    response = []
    
    tmp_favorites = Favorites.get(nil, params[:user_id], nil)
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
  
  def add
    Favorites.create(:user_id => params[:user_id], :video_id => params[:video_id], :video_title => params[:video_title])
    
    render :json => { :success => true }
  end
  
  def remove
    Favorites.where(:user_id => params[:user_id], :video_id => params[:video_id]).first().destroy
    
    render :json => { :success => true }
  end
  
  def add_youtube_favorites
    youtube_data                = HTTParty.get("http://gdata.youtube.com/feeds/api/users/#{params[:youtube_username]}/favorites?alt=json")
    current_user_favorites_data = Favorites.where(:user_id => current_user.id)
    current_user_favorites      = []
    
    current_user_favorites_data.each do | favorite |
      current_user_favorites << favorite.video_id
    end

    if youtube_data.code == 200
      youtube_data["feed"]["entry"].each_with_index do | (key, val), i |
        video_id    = key["id"]["$t"].split("/")[6]
        video_title = key["title"]["$t"]

        if !current_user_favorites.include?(video_id)
          Favorites.create(:user_id => current_user.id, :video_id => video_id, :video_title => video_title)
        end
      end if youtube_data["feed"]["entry"].present?
    end
    
    render :json => { :success => (youtube_data.code == 200 ? true : false) }
  end
end
