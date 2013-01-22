class Api::BaseController < ApplicationController
  def get_user_info
    user = (@user || current_user)

    {
      :id               => user.id,
      :token            => user.authentication_token,
      :username         => user.username,
      :email            => user.email,
      :favorite_genres  => user.favorite_genres.collect{ | g | g.name },
      :playlists        => get_user_playlists,
      :banned_videos    => user.banned_videos.map(&:video_id)
    }
  end

  def get_user_playlists
    (@user || current_user).playlists.collect{ |playlist|
      {
        :id             => playlist.id,
        :playlist_name  => playlist.playlist_name
      }
    }
  end

  def ensure_json
    render :status => 406, :json => { :message => "The request must be json" } if request.format != :json
  end
end