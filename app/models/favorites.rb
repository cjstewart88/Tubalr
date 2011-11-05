class Favorites < ActiveRecord::Base
  def self.get(username, id)
    if username
      user = User.where(["username = ?", username]).first()
      user_id = user.present? ? user.id : nil
    else
      user_id = id
    end
    
    return user_id.present? ? Favorites.where(["user_id = ?", user_id]) : []
  end
end