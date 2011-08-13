class PlaylistController < ActionController::Base
  
  def init
    if Playlists.exists?(:playlist_id => params[:playlist_id])
      @playlist_id = params[:playlist_id] 
    else
      @no_playlist = params[:playlist_id]
    end
    
    render :layout => "application", :template => "index"
  end
  
  def create
    playlist_id = (0...8).map{65.+(rand(25)).chr}.join
    
    newPlaylist = Playlists.create({
      :playlist_id => playlist_id
    })
    
    redirect_to "/playlist/#{newPlaylist["playlist_id"]}"
  end
  
  def addVideo
    Videos.create({  
      :playlist_id => params[:playlist_id],
      :video_id => params[:video_id],
      :video_title => params[:video_title]
    })
    
    render :json => { :success => true }
  end
  
end