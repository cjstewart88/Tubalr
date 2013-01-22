class Api::BaseController < ApplicationController
  def get_user_playlists
    playlists = []

    @user.playlists.each do | playlist |
      playlists.push(:playlist_id => playlist[:id], :playlist_name => playlist[:playlist_name])
    end
  end

  def ensure_json
    render :status => 406, :json => { :message => "The request must be json" } if request.format != :json
  end
end