class ApplicationController < ActionController::Base

  protect_from_forgery

  def index
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
