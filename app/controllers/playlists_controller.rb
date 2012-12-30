class PlaylistsController < ApplicationController

  def index
    @user = User.where(:username =>  params[:username]).first
    
    @playlist_owner = user_signed_in? && @user.username == current_user.username

    render :layout => "application", :template => "playlists"
  end
  
  def listen
    @user               = User.where(:username =>  params[:username]).first
    @username           = params[:username]
    @playlist_name      = params[:playlist_name]
    @is_playlist_owner  = current_user.present? && current_user.username == params[:username]
    
    render :layout => "application", :template => "index"
  end  
  
  def import_youtube_playlists
    params[:playlists].values.each do | youtube_playlist |
      playlist  = current_user.playlists.where("lower(playlist_name) = ?", youtube_playlist["name"].downcase).first
      
      if !playlist.present?
        playlist = current_user.playlists.create(:playlist_name => youtube_playlist["name"])
      end

      videos = []
      youtube_playlist["videos"].values.each do | video |
        videos << Video.new(:playlist_id => playlist.id, :video_id => video["id"], :video_title => video["title"])
      end

      Video.import videos
    end

    render :json => {}
  end

  def create
    playlist  = current_user.playlists.where("lower(playlist_name) = ?", params[:playlist_name].downcase).first
    
    to_return = {}
    
    if playlist.present?
      playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])
    else
      playlist_name = params[:playlist_name]
      
      new_playlist = current_user.playlists.create(:playlist_name => playlist_name)
    
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
    sorted_video_ids = params[:tracks].collect { |item| item[:videoID] }
    playlist.reorder_tracks(sorted_video_ids)
    render :json => { :success => true }
  end

  def delete_video
    playlist = current_user.playlists.where("lower(playlist_name) = ?", CGI::unescape(params[:playlist_name]).downcase).first
    playlist.videos.where(:video_id => params[:video_id]).first.delete
    render :json => { :success => true }
  end

  def destroy
    current_user.playlists.find(params[:id]).destroy
    
    render :json => {}
  end

  def update
    to_return = {}

    if current_user.playlists.where("lower(playlist_name) = ?", params[:name].downcase).present?
      to_return[:name_taken] = true
    else
      playlist = current_user.playlists.find(params[:id])
      playlist.playlist_name = params[:name]
      playlist.save
    end

    render :json => to_return
  end
end
