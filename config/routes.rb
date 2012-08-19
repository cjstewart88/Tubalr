Tubalr::Application.routes.draw do
  devise_for :users

  root :to => "application#index"
  
  get "/insert_search/:search_type/:search"     => "api#search"
  get "/video_viewed/:video_id"                 => "api#video_viewed"
  get "/:username/playlist/:playlist_name.json" => "api#user_playlist"
  
  get "/rain"                                 => "application#rain"
  
  get "/stats"                                => "stats#index"
  
  get "/explore"                              => "explore#index"
  get "/recently_watched/:limit"              => "explore#recently_watched"
  
  get "/genre/:artist_band"                   => "application#index"
  get "/just/:artist_band"                    => "application#index"
  get "/similar/:artist_band"                 => "application#index"
  get "/video/:video_id"                      => "application#index"
  
  get "/:username/playlists"                  => "playlists#index"
  get "/:username/playlist/:playlist_name"    => "playlists#listen"
  match "/playlist/create"                    => "playlists#create"
  match "/playlist/add_video"                 => "playlists#add_video"
  match "/playlist/delete_video"              => "playlists#delete_video"
  match "/get_playlists_video_belongs_to"     => "playlists#get_playlists_video_belongs_to"
  
  post "/check_banned"                        => "bannedVideos#check"
  post "/ban_video"                           => "bannedVideos#ban_video"

  devise_scope :user do
    get "/users/sign_out"                     => "devise/sessions#destroy"
  end
end
