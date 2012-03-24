class CreateSearches < ActiveRecord::Migration
  def self.up
    create_table :searches do |t|
      t.string :what
      t.string :who
      t.string :search_type

      t.timestamps
    end
  end

  def self.down
    drop_table :searches
  end
end
