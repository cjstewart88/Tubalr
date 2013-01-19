class FollowsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :validate_follow_params

  def follow
    current_user.follow(@who)
    head 201
  end

  def unfollow
    current_user.stop_following(@who)
    head 204
  end

  private

  def validate_follow_params
    @who = User.find(params[:who])
  rescue ActiveRecord::RecordNotFound
    render :status => 400, :json => { error: "User not found" }
  end

end
