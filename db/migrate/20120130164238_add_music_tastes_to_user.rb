class AddMusicTastesToUser < ActiveRecord::Migration
  def change
    add_column :users, :music_tastes, :text
  end
end
