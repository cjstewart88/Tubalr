class DropTables < ActiveRecord::Migration
  def self.up
    drop_table :playlists
  end

  def self.down
  end
end
