Tubalr::Application.routes.draw do
  root :to => "application#index"
  
  get "/player/:search_type/:search/:first_video" => "application#player"
  
  get "/just/:artist_band.json" => "api#just"
  get "/similar/:artist_band.json" => "api#similar"
  
  get "/just/:artist_band" => "application#index"
  get "/similar/:artist_band" => "application#index"
  
end
