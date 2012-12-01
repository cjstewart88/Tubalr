class PlaylistsController < ApplicationController

  def index
    @user = User.where(:username =>  params[:username]).first
    
    render :layout => "application", :template => "playlists"
  end
  
  def listen
    @username           = params[:username]
    @playlist_name      = params[:playlist_name]
    @is_playlist_owner  = current_user.present? && current_user.username == params[:username]
    
    render :layout => "application", :template => "index"
  end  
  
  def create
    user      = User.find(params[:user_id])
    playlist  = user.playlists.where("lower(playlist_name) = ?", params[:playlist_name].downcase).first
    
    to_return = {}
    
    if playlist.present?
      playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])
    else
      playlist_name = params[:playlist_name].gsub("'","").gsub('"',"")
      
      new_playlist = user.playlists.create(:playlist_name => playlist_name)
    
      new_playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])

      to_return[:id]    = new_playlist.id
      to_return[:name]  = new_playlist.playlist_name
    end

    render :json => to_return
  end
  
  def add_video
    playlist  = Playlist.find(params[:playlist_id])
    video     = playlist.videos.where("video_id = ?", params[:video_id]).first
    
    if !video.present?
      playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])
    
      response = {
        :added_to_playlist => true
      }
    end
    
    render :json => response
  end

  def sort
    playlist = current_user.playlists.where("lower(playlist_name) = ?", CGI::unescape(params[:playlist_name]).downcase).first
    Rails.logger.debug(params[:tracks])
    playlist.reorder_tracks(params[:tracks])
    render :json => { :success => true }
  end

  def delete_video
    playlist = current_user.playlists.where("lower(playlist_name) = ?", CGI::unescape(params[:playlist_name]).downcase).first
    playlist.videos.where(:video_id => params[:video_id]).first.delete
    render :json => { :success => true }
  end
end