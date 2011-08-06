Tubalr::Application.routes.draw do
  root :to => "application#index"
  
  get "/player/:search_type/:search/:first_video" => "application#player"
end
