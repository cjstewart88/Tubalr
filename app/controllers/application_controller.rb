class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :ensure_domain, :recently_viewed_playlist

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
      :videos_added_to_playlists_today  => Video.where("created_at >= ?", Date.today).count,
      :videos_watched                   => WatchedVideo.count,
      :videos_watched_on_web            => WatchedVideo.where(:user_agent => 'web').count,
      :videos_watched_on_android        => WatchedVideo.where(:user_agent => 'android').count,
      :videos_watched_on_ios            => WatchedVideo.where(:user_agent => 'ios').count
    }

    render :layout => "application", :template => "stats"
  end

  def explore
    render :layout => "application", :template => "explore"
  end

  def dj
    @dj = params[:username]
    render :layout => "application", :template => "index"
  end

  def random
    random_reddit   = REDDIT.sample[:subreddits].sample
    random_genre    = '/just/' + GENRES.sample.sub(' ','%20')
    random_playlist = [random_reddit, random_genre].sample

    redirect_to random_playlist
  end

  def recently_viewed_playlist
    @recently_viewed = session[:recent] ||= []
    session[:recent].delete_at(0) if session[:recent].size > 16
    if request.fullpath.start_with?('/just/','/r/') || request.fullpath.include?('/playlist/')
      unless request.fullpath.include?('.json')
        session[:recent] << request.fullpath
      end
    end
  end

  private

  def ensure_domain
    if Rails.env.production? && request.env['HTTP_HOST'] != 'www.tubalr.com'
      redirect_to "http://www.tubalr.com#{request.fullpath}", :status => 301
    end
  end
end