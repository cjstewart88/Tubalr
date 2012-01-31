Tubalr::Application.routes.draw do
  devise_for :users

  root :to => "application#index"
  
  get "/insert_search/:search_type/:search"   => "api#search"
  get "/just/:artist_band.json"               => "api#just"
  get "/similar/:artist_band.json"            => "api#similar"
  get "/:username/favorites.json"             => "api#userFavorites"
  get "/:username/favorites/:search.json"     => "api#userFavorites"
  
  get "/stats"                                => "stats#index"
  
  get "/genres"                               => "application#genres"
  get "/users"                                => "application#users"
  
  get "/genre/:artist_band"                   => "application#index"
  get "/just/:artist_band"                    => "application#index"
  get "/similar/:artist_band"                 => "application#index"
  
  get "/:username/favorites"                  => "favorites#init"
  get "/:username/favorites/:search"          => "favorites#init"
  
  post "/check_favorites"                     => "favorites#check"
  post "/favorites/add"                       => "favorites#add"
  post "/favorites/remove"                    => "favorites#remove"  
  
  post "/check_banned"                        => "bannedVideos#check"
  post "/ban_video"                           => "bannedVideos#add"

  devise_scope :user do
    get "/users/sign_out"                     => "devise/sessions#destroy"
  end
end
