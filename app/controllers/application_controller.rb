class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :ensure_domain

  APP_DOMAIN = 'www.tubalr.com'

  def ensure_domain
    if Rails.env.production? && request.env['HTTP_HOST'] != APP_DOMAIN
      redirect_to "http://#{APP_DOMAIN}#{request.fullpath}", :status => 301
    end
  end

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

  def current_user
    if current_user
      current_user
    elsif doorkeeper_token
      User.find(doorkeeper_token.resource_owner_id)
    end
  end
end