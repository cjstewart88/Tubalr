class CreateVideos < ActiveRecord::Migration
  def self.up
    create_table :videos do |t|
      t.string :playlist_id
      t.string :video_id
      t.string :video_title
      
      t.timestamps
    end
  end

  def self.down
    drop_table :videos
  end
end
