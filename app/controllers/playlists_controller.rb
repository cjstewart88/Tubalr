class PlaylistsController < ApplicationController
  def index
    @user = User.where(:username =>  params[:username]).first
    
    render :layout => "application", :template => "playlists"
  end
  
  def listen
    @username           = params[:username]
    @playlist_name      = params[:playlist_name]
    @is_playlist_owner  = true if current_user.present? && current_user.username == params[:username]
    
    render :layout => "application", :template => "index"
  end  
  
  def create
    user      = User.find(params[:user_id])
    playlist  = user.playlists.where("lower(playlist_name) = ?", params[:playlist_name].downcase).first
  
    if playlist.present?
      response = { 
        :already_exist  => true 
      }
    else
      new_playlist = user.playlists.create(:playlist_name => params[:playlist_name])
    
      response = {
        :new_playlist_id    => new_playlist.id,
        :new_playlist_name  => new_playlist.playlist_name
      }
    end
    
    render :json => response
  end
  
  def add_video
    playlist  = Playlist.find(params[:playlist_id])
    
    video     = playlist.videos.where("video_id = ?", params[:video_id]).first
    
    if video.present?
      response = { 
        :already_in_playlist  => true 
      }
    else
      playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])
    
      response = {
        :added_to_playlist    => true
      }
    end
    
    render :json => response
  end
  
  def delete_video
    if params[:user_id].to_i == current_user.id
      user      = User.find(params[:user_id])
      playlist  = user.playlists.where("lower(playlist_name) = ?", CGI::unescape(params[:playlist_name]).downcase).first

      playlist.videos.where(:video_id => params[:video_id]).first.delete
      
      response = { :success => true }
    else
      response = { :success => false }
    end
    
    render :json => response
  end
  
  def get_playlists_video_belongs_to
    playlists_video_belongs_to  = []
    playlists                   = current_user.playlists
    
    if playlists.present?
      playlists.each do | playlist |
        video = playlist.videos.where(:video_id => params[:video_id]).first
        
        playlists_video_belongs_to << playlist.id if video.present?
      end
    end
    
    render :json => { :playlists_video_belongs_to => playlists_video_belongs_to }
  end 
end