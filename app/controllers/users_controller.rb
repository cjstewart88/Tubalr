class UsersController < ApplicationController

  before_filter :ensure_path, :only => :profile

  def profile
    @user = User.where(:username =>  params[:username]).first
    
    @profile_owner = user_signed_in? && @user && @user.username == current_user.username
  end

  def list
    @users = User.paginate(:page => params[:page]).order('playlists_count DESC')
  end

  private

  def ensure_path
    redirect_to "/#{params[:username]}/profile" if request.path.index("/playlists")
  end

end