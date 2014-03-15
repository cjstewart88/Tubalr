class Api::AnalyticsController < Api::BaseController

  def report_watched_video
    response = false

    if !params[:video_id].nil? && !params[:video_title].nil? && !params[:user_agent].nil?
      WatchedVideo.create(params.slice(:video_id, :video_title, :user_id, :user_agent))
      response = true
    end

    render :json => { :success => response }
  end

end
