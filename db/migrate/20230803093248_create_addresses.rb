class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :attention
      t.string :line_1
      t.string :line_2
      t.string :line_3
      t.string :line_4
      t.string :city
      t.string :region
      t.string :country
      t.string :postal_code
      t.decimal :latitude
      t.decimal :longitude
      t.string :full_address

      t.timestamps
    end
  end
end
