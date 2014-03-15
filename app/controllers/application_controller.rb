class ApplicationController < ActionController::Base

  protect_from_forgery

  def index
    flash[:notice] = "Thanks a ton for your support, it means a lot!" if params[:thanks]
  end

  def stats
    @stats = {
      :registered_users                 => User.count,
      :playlists_created                => Playlist.count,
      :videos_added_to_playlists        => Video.count,
      :videos_watched                   => WatchedVideo.where(:user_agent => 'web').count,
      :users_registered_today           => User.where("created_at >= ?", Date.today).count,
      :playlists_created_today          => Playlist.where("created_at >= ?", Date.today).count,
      :videos_added_to_playlists_today  => Video.where("created_at >= ?", Date.today).count,
      :videos_watch_today               => WatchedVideo.where("created_at >= ?", Date.today).where(:user_agent => 'web').count
    }
  end

  def genres
  end

  def subreddits
  end

  def random
    random_reddit   = REDDIT.sample[:subreddits].sample
    random_genre    = '/just/' + GENRES.sample.sub(' ','%20')
    random_playlist = [random_reddit, random_genre].sample

    redirect_to random_playlist
  end

end
