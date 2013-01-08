class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :event
      t.string :query
      t.string :playlist_name
      t.string :playlist_owner
      t.string :video_id
      t.string :video_title

      t.timestamps
    end
  end
end
