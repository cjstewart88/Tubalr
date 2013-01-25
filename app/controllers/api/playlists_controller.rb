class Api::PlaylistsController < Api::BaseController
  before_filter :authenticate_user!

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
    playlist  = current_user.playlists.find(params[:playlist_id])
    video     = playlist.videos.where("video_id = ?", params[:video_id]).first

    if !video.present?
      playlist.videos.create(:video_id => params[:video_id], :video_title => params[:video_title])

      response = {
        :added_to_playlist => true
      }
    end

    render :json => response
  end
end