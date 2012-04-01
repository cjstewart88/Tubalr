class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :video_title
      t.string :video_id
      t.integer :playlist_id

      t.timestamps
    end
  end
end
