class AddLastfmSessionKeyToUserTable < ActiveRecord::Migration
  def change
    add_column :users, :lastfm_session_key, :string
  end
end
