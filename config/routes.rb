Tubalr::Application.routes.draw do
  devise_for :users

  root :to => "application#index"
  
  get "/player/:search_type/:search/:first_video" => "application#player"
  
  get "/just/:artist_band.json" => "api#just"
  get "/similar/:artist_band.json" => "api#similar"
  get "/:username/favorites.json" => "api#userFavorites"
  
  get "/just/:artist_band" => "application#index"
  get "/similar/:artist_band" => "application#index"
  
  get "/history" => "application#history"
  
  get "/:username/favorites" => "favorites#init"
  
  post "/check-favorites" => "favorites#check"
  post "/favorites/add" => "favorites#add"
  post "/favorites/remove" => "favorites#remove"  
  
  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end
end
