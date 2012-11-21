class ApiController < ActionController::Base
  def user_playlist
    response      = []
    user          = User.where(:username => params[:username]).first
    
    if user.present?
      playlist_data = user.playlists.where("lower(playlist_name) = ?", params[:playlist_name].downcase).first
      
      if playlist_data.present?
        playlist_data.videos.each do | video |
          response.push(:videoID => video["video_id"], :videoTitle => video["video_title"])
        end
      end
    end

    render :json => response
  end
end