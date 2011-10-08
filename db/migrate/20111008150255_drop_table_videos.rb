class DropTableVideos < ActiveRecord::Migration
  def self.up
    drop_table :videos
  end

  def self.down
  end
end
