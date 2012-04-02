class ApiController < ActionController::Base
  def search
    Searches.create({  
      :search_type  => params[:search_type],
      :what         => params[:search],
      :who          => request.remote_ip
    })
    
    render :json => ""
  end
  
  def user_playlist
    response      = []
    user          = User.where(:username => params[:username]).first
    
    if user.present?
      playlist_data = user.playlists.where("lower(playlist_name) = ?", params[:playlist_name].downcase).first
      
      if playlist_data.present?
        playlist_data.videos.each do | video |
          response.push(:VideoID => video["video_id"], :VideoTitle => video["video_title"])
        end
      end
    end

    render :json => response
  end
end