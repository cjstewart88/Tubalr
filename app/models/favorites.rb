class Favorites < ActiveRecord::Base
  def self.get(username, id, search)
    if username
      user = User.where(["username = ?", username]).first()
      user_id = user.present? ? user.id : nil
    else
      user_id = id
    end
    
    response = nil
    
    if user_id.present?
      where_clause = search.present? ? ["user_id = :id AND LOWER(video_title) LIKE :title", { :id => user_id, :title => "%#{search.gsub("+"," ").downcase}%" }] : ["user_id = ?", user_id]

      response = Favorites.where(where_clause)
    else
      response = []
    end
    
    return response
  end
end