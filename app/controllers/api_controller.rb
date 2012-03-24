class ApiController < ActionController::Base
  def search
    Searches.create({  
      :search_type  => params[:search_type],
      :what         => params[:search],
      :who          => request.remote_ip
    })
    
    render :json => ""
  end
  
  def userFavorites
    response = []

    favoritesData = Favorites.get(params[:username], nil, (params[:search] ? params[:search] : nil))    

    favoritesData.each do | video |
      response.push(:VideoID => video["video_id"], :VideoTitle => video["video_title"])
    end

    render :json => response
  end
end