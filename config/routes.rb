Tubalr::Application.routes.draw do
  root :to => "application#index"

  get "/genres"            => "application#genres"
  get "/reddit-playlists"  => "application#reddit_playlists"

  get "/genres/:genre"     => "application#playing_now"
  get "/r/:subreddit"      => "application#playing_now"
  get "/random"            => "application#random"
end
