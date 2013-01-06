class AddPlaylistCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :playlists_count, :integer, :default => 0

    User.find_each do |u|
      User.reset_counters(u.id, :playlists)
    end
  end
end
