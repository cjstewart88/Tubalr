Tubalr::Application.routes.draw do
  use_doorkeeper

  devise_for :users, :controllers => { :registrations => "registrations" }

  root :to => "application#index"

  get "/support"                                    => "application#support"

  get "/stats"                                      => "application#stats"
  get "/just/:artist_band"                          => "application#index"
  get "/similar/:artist_band"                       => "application#index"
  get "/video/:video_id"                            => "application#index"
  get "/r/:subreddit"                               => "application#index"
  get "/dj/:username"                               => "application#dj"

  get "/r"                                          => "application#explore"
  get "/explore"                                    => "application#explore"

  post "/follow/:who"                               => "follows#follow"
  delete "/follow/:who"                             => "follows#unfollow"

  get "/users"                                      => "users#list"
  get "/:username/profile"                          => "users#profile"
  get "/:username/playlists"                        => "users#profile"
  
  get "/:username/playlist/:playlist_name.json"     => "playlists#get"
  get "/:username/playlist/:playlist_name"          => "playlists#listen"
  post "/:username/playlist/:playlist_name/sort"    => "playlists#sort"
  match "/playlist/create"                          => "playlists#create"
  match "/playlist/add_video"                       => "playlists#add_video"
  match "/playlist/delete_video"                    => "playlists#delete_video"
  
  resources :playlists, :only => [:destroy, :update]

  post "/import_youtube_playlists"                  => "playlists#import_youtube_playlists"

  post "/check_banned"                              => "bannedVideos#check"
  post "/ban_video"                                 => "bannedVideos#ban_video"

  post "/event"                                     => "events#create"

  devise_scope :user do
    get "/users/sign_out"                           => "devise/sessions#destroy"
  end
end