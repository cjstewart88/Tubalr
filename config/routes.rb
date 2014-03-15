Tubalr::Application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  devise_scope :user do
    get "/users/sign_out"                           => "devise/sessions#destroy"
  end

  root :to => "application#index"

  namespace :api do
    post  "/analytics/report_watched_video"         => "analytics#report_watched_video"
    post  "/ban_video"                              => "banned_videos#ban_video"
    post  "/playlist/create"                        => "playlists#create"
    post  "/playlist/add_video"                     => "playlists#add_video"
    get   "/playlist/:playlist_id"                  => "data#playlist_videos"
  end

  get "/genres"                                     => "application#genres"
  get "/subreddits"                                 => "application#subreddits"

  get "/stats"                                      => "application#stats"
  get "/just/:artist_band"                          => "application#index"
  get "/similar/:artist_band"                       => "application#index"
  get "/video/:video_id"                            => "application#index"
  get "/r/:subreddit"                               => "application#index"

  get "/random"                                     => "application#random"

  get "/:username/profile"                          => "users#profile"

  get "/:username/playlist/:playlist_name.json"     => "playlists#get"
  get "/:username/playlist/:playlist_name"          => "playlists#listen"
  post "/:username/playlist/:playlist_name/sort"    => "playlists#sort"
  post "/playlist/delete_video"                     => "playlists#delete_video"

  resources :playlists, :only => [:destroy, :update]

  post "/import_youtube_playlists"                  => "playlists#import_youtube_playlists"

  get "/lastfm/auth"                                => "lastfm#grant_access"
  get "/lastfm/revoke_access"                       => "lastfm#revoke_access"
  post "/lastfm/scrobble"                           => "lastfm#scrobble"
  post "/lastfm/update_now_playing"                 => "lastfm#update_now_playing"
end