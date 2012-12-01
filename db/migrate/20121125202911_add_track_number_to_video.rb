class AddTrackNumberToVideo < ActiveRecord::Migration
  def change
    add_column :videos, :track_number, :integer
  end
end
