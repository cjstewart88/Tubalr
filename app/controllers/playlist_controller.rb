class PlaylistController < ActionController::Base
  
  def init
    # if a playlist with the given id dosnt exsist
    # create a new playlist 
    if !Playlists.exists?(params[:id])
      newPlaylist = Playlists.create
      redirect_to "/playlist/#{newPlaylist["id"]}"
    else
      @playlist_id = params[:id]
      
      render :layout => "application", :action => "application/index"
    end
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