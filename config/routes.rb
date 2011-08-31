Tubalr::Application.routes.draw do
  root :to => "application#index"
  
  get "/player/:search_type/:search/:first_video" => "application#player"
  
  get "/just/:artist_band.json" => "api#just"
  get "/similar/:artist_band.json" => "api#similar"
  get "/playlist/:playlist_id.json" => "api#playlist"
  
  get "/just/:artist_band" => ""
  get "/similar/:artist_band" => ""
  
  get "/playlist" => "playlist#create"
  get "/playlist/:playlist_id" => "playlist#init"
  get "/playlist/video/:playlist_id/:video_id/:video_title" => "playlist#addVideo"
  
end
