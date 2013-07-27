class AddResumeLastPlaylistToUser < ActiveRecord::Migration
  def change
    add_column :users, :resume_last_playlist, :boolean, :default => false
  end
end
