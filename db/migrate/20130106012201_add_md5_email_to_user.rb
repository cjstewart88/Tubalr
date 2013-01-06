class AddMd5EmailToUser < ActiveRecord::Migration
  def change
    add_column :users, :md5_email, :string

  end
end
