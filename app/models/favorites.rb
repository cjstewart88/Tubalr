class Favorites < ActiveRecord::Base
  def self.get(user_id)
    return Favorites.where(["user_id = ?", user_id])
  end
end