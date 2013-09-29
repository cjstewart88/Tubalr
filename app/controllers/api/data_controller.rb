class Api::DataController < Api::BaseController
  before_filter :authenticate_user!, :only => [:user_info]

  def library
    render :json => {
      :top_genres => TOP_GENRES,
      :genres     => GENRES,
      :reddit     => REDDIT,
      :whats_hot  => WHATS_HOT
    }
  end

  def user_info
    render :json => get_user_info
  end

  def user_playlists
    @user = User.find(params[:user_id])
    render :json => get_user_playlists
  rescue ActiveRecord::RecordNotFound
    render :status => 400, :json => { error: "User not found" }
  end

  def playlist_videos
    render :json => Playlist.find(params[:playlist_id]).videos.collect{ | video |
      {
        :video_id     => video.id,
        :video_title  => video.video_title
      }
    }
  rescue ActiveRecord::RecordNotFound
    render :status => 400, :json => { error: "Playlist not found" }
  end
end