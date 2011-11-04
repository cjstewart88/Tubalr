class Favorites < ActiveRecord::Base
  def self.get(username)
    user = User.where(["username = ?", username]).first()

    return Favorites.where(["user_id = ?", user.id])
  end
end