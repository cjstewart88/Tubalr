class ApplicationController < ActionController::Base

  protect_from_forgery

  def index
  end

  def playing_now
    if params[:genre]
      @genre = params[:genre].gsub('-', ' ')
    elsif params[:subreddit]
      @subreddit = params[:subreddit].gsub('-', ' ')
    end
  end

  def genres
  end

  def reddit_playlists
  end

  def random
    random_reddit   = REDDIT.sample[:subreddits].sample
    random_genre    = '/genres/' + GENRES.sample.parameterize
    random_playlist = [random_reddit, random_genre].sample

    redirect_to random_playlist
  end

end
