class Api::DataController < ApplicationController
  before_filter :authenticate_user!, :only => [:user_info]
  before_filter :validate_user_authentication, :except => [:library, :user_info, :playlist_videos]

  def library
    render :json => {
      :top_genres => TOP_GENRES,
      :genres     => GENRES,
      :reddit     => REDDIT
    }
  end

  def user_info
    render :json => {
      :id               => current_user.id,
      :username         => current_user.username,
      :email            => current_user.email,
      :favorite_genres  => current_user.favorite_genres.collect{ | g | g.name },
      :banned_videos    => current_user.banned_videos.map(&:video_id)
    }
  end

  def user_playlists
    response = []

    @user.playlists.each do | playlist |
      response.push(:playlist_id => playlist[:id], :playlist_name => playlist[:playlist_name])
    end

    render :json => response
  end

  def playlist_videos
    response = []

    Playlist.find(params[:playlist_id]).videos.each do | video |
      response.push(:video_id => video.video_id, :video_title => video.video_title)
    end

    render :json => response
  end

  private

  def validate_user_authentication
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render :status => 400, :json => {error: "User not found"}
  end
end