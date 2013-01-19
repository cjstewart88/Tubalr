class Api::DataController < ApplicationController
  before_filter :authenticate_user!, :only => [:user_info]
  before_filter :validate_user_id, :except => :library

  def library
    render :json => {
      :top_genres => TOP_GENRES,
      :genres     => GENRES,
      :reddit     => REDDIT
    }
  end

  def user_info
    render :json => {
      :id               => @user.id,
      :username         => @user.username,
      :email            => @user.email,
      :favorite_genres  => @user.favorite_genres.collect{ | g | g.name }
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

  def validate_user_id
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render :status => 400, :json => {error: "User not found"}
  end
end