Tubalr::Application.routes.draw do
  devise_for :users

  root :to => "application#index"
  
  get "/insert_search/:search_type/:search"     => "api#search"
  get "/:username/favorites.json"               => "api#userFavorites"
  get "/:username/favorites/:search.json"       => "api#userFavorites"
  get "/:username/playlist/:playlist_name.json" => "api#user_playlist"
  
  get "/stats"                                => "stats#index"
  
  get "/genres"                               => "application#genres"
  
  get "/genre/:artist_band"                   => "application#index"
  get "/just/:artist_band"                    => "application#index"
  get "/similar/:artist_band"                 => "application#index"
  get "/video/:video_id"                      => "application#index"
  
  get "/:username/playlists"                  => "playlists#index"
  get "/:username/playlist/:playlist_name"    => "playlists#listen"
  
  get "/:username/favorites"                  => "favorites#init"
  get "/:username/favorites/:search"          => "favorites#init"
  
  post "/check_favorites"                     => "favorites#check"
  post "/favorites/add"                       => "favorites#add"
  post "/favorites/remove"                    => "favorites#remove"  
  post "/add_youtube_favorites"               => "favorites#add_youtube_favorites"
  
  post "/check_banned"                        => "bannedVideos#check"
  post "/ban_video"                           => "bannedVideos#ban_video"

  devise_scope :user do
    get "/users/sign_out"                     => "devise/sessions#destroy"
  end
end
