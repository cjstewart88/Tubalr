class PlaylistsController < ApplicationController
  def index
    @user = User.where(:username =>  params[:username]).first
    
    render :layout => "application", :template => "playlists"
  end
  
  def listen
    @username       = params[:username]
    @playlist_name  = params[:playlist_name]
    
    render :layout => "application", :template => "index"
  end  
end