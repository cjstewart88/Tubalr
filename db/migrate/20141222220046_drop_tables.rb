class DropTables < ActiveRecord::Migration
  def up
    drop_table :users
    drop_table :banned_videos
    drop_table :playlists
    drop_table :videos
    drop_table :watched_videos
  end
end
