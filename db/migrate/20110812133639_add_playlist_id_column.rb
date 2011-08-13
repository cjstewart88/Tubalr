class AddPlaylistIdColumn < ActiveRecord::Migration
  def self.up
    add_column :playlists, :playlist_id, :string
  end

  def self.down
    remove_column :playlists, :playlist_id
  end
end
