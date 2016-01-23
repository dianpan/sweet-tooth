class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :long
      t.string :lat
      t.timestamps null: false
    end
  end
end
