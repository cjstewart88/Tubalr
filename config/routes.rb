Tubalr::Application.routes.draw do
  root :to => "application#index"
  
  get "/player/:track" => "application#player"
end
