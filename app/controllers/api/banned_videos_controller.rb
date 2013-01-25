class Api::BannedVideosController < Api::BaseController
  before_filter :authenticate_user!

  def ban_video
    current_user.banned_videos.create(:video_id => params[:video_id])
    render :json => { :success => true }
  end
end