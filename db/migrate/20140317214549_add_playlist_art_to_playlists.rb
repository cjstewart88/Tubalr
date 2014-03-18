class AddPlaylistArtToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :art, :string
  end
end
