class Api::DataController < ApplicationController
  before_filter :authenticate_user!, :only => [:user_info]
  before_filter :validate_user_authentication, :except => [:library, :user_info]

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
      :favorite_genres  => current_user.favorite_genres.collect{ | g | g.name }
    }
  end

  def user_playlists
    response = []

    @user.playlists.each do | playlist |
      response.push(:playlist_id => playlist[:id], :playlist_name => playlist[:playlist_name])
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