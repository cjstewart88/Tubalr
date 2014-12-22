Tubalr::Application.routes.draw do
  root :to => "application#index"

  get "/genres"                                     => "application#genres"
  get "/subreddits"                                 => "application#subreddits"

  get "/just/:artist_band"                          => "application#index"
  get "/similar/:artist_band"                       => "application#index"
  get "/video/:video_id"                            => "application#index"
  get "/r/:subreddit"                               => "application#index"
  get "/random"                                     => "application#random"
end
