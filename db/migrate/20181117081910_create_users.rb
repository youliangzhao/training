class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :mobi, null: false
      t.string :name, null: false
      t.string :email
      t.string :password_digest, null: false
      t.string :status, default: '1'
      t.string :adm, default: '0'

      t.timestamps
    end
  end
end
