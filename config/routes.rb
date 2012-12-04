Tubalr::Application.routes.draw do
  devise_for :users

  root :to => "application#index"
  
  get "/:username/playlist/:playlist_name.json"     => "api#user_playlist"

  get "/stats"                                      => "application#stats"
  get "/just/:artist_band"                          => "application#index"
  get "/similar/:artist_band"                       => "application#index"
  get "/video/:video_id"                            => "application#index"
  
  get "/:username/playlists"                        => "playlists#index"
  get "/:username/playlist/:playlist_name"          => "playlists#listen"
  post "/:username/playlist/:playlist_name/sort"    => "playlists#sort"
  match "/playlist/create"                          => "playlists#create"
  match "/playlist/add_video"                       => "playlists#add_video"
  match "/playlist/delete_video"                    => "playlists#delete_video"
  
  resources :playlists, :only => [:destroy, :update]

  post "/import_youtube_playlists"                  => "playlists#import_youtube_playlists"

  post "/check_banned"                              => "bannedVideos#check"
  post "/ban_video"                                 => "bannedVideos#ban_video"

  devise_scope :user do
    get "/users/sign_out"                           => "devise/sessions#destroy"
  end
end
