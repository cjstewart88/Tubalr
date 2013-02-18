Tubalr::Application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }
  devise_scope :user do
    get "/users/sign_out"                           => "devise/sessions#destroy"
  end

  root :to => "application#index"

  namespace :api do
    post  "/ban_video"                              => "banned_videos#ban_video"
    post  "/playlist/create"                        => "playlists#create"
    post  "/playlist/add_video"                     => "playlists#add_video"
    post  "/event"                                  => "events#create"
    get   "/library.json"                           => "data#library"
    get   "/user/info.json"                         => "data#user_info"
    get   "/user/:user_id/playlists.json"           => "data#user_playlists"
    get   "/playlist/:playlist_id"                  => "data#playlist_videos"
    resources :sessions,      :only => [:create, :destroy]
    resources :registrations, :only => [:create]
  end

  get "/support"                                    => "application#support"

  get "/stats"                                      => "application#stats"
  get "/just/:artist_band"                          => "application#index"
  get "/similar/:artist_band"                       => "application#index"
  get "/video/:video_id"                            => "application#index"
  get "/r/:subreddit"                               => "application#index"
  get "/dj/:username"                               => "application#dj"

  get "/explore"                                    => "application#explore"

  get "/:username/profile"                          => "users#profile"

  get "/:username/playlist/:playlist_name.json"     => "playlists#get"
  get "/:username/playlist/:playlist_name"          => "playlists#listen"
  post "/:username/playlist/:playlist_name/sort"    => "playlists#sort"
  post "/playlist/delete_video"                     => "playlists#delete_video"

  resources :playlists, :only => [:destroy, :update]

  post "/import_youtube_playlists"                  => "playlists#import_youtube_playlists"
end