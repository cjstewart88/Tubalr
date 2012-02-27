class BannedVideosController < ApplicationController  
  def check
    response = []
    
    bannedVideosData = BannedVideos.where(["user_id = ?", params[:user_id]]);
    
    bannedVideosData.each do | video |
      response.push(video["video_id"])
    end 
    
    render :json => response
  end
  
  def ban_video
    BannedVideos.create(:user_id => params[:user_id], :video_id => params[:video_id])
    render :json => { :success => true }
  end
end