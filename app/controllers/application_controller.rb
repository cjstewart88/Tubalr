class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :ensure_domain, :check_current_user

  def index
    flash[:notice] = "Thanks a ton for your support, it means a lot!" if params[:thanks]

    render :layout => "application", :template => "index"
  end

  def stats
    @stats = {
      :registered_users                 => User.count,
      :playlists_created                => Playlist.count,
      :videos_added_to_playlists        => Video.count,
      :users_registered_today           => User.where("created_at >= ?", Date.today).count,
      :playlists_created_today          => Playlist.where("created_at >= ?", Date.today).count,
      :videos_added_to_playlists_today  => Video.where("created_at >= ?", Date.today).count
    }

    render :layout => "application", :template => "stats"
  end

  def explore
    render :layout => "application", :template => "explore"
  end

  def support
    render :layout => "application", :template => "support"
  end

  def dj
    @dj = params[:username]
    render :layout => "application", :template => "index"
  end

  private

  def ensure_domain
    if Rails.env.production? && request.env['HTTP_HOST'] != 'www.tubalr.com'
      redirect_to "http://www.tubalr.com#{request.fullpath}", :status => 301
    end
  end

  def check_current_user
    # set
    # current_user = User.find() if params[:auth_token]
  end
end