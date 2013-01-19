class AddTokenToUser < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :authentication_token
    end
    add_index  :users, :authentication_token, :unique => true
  end
end