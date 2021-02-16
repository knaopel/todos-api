class CreateHoneys < ActiveRecord::Migration[6.1]
  def change
    create_table :honeys do |t|
      t.integer :honey_id, null: false
      t.integer :dewer_id, null: false

      t.timestamps
    end

    add_index :honeys, :honey_id
    add_index :honeys, :dewer_id
    add_index :honeys, [:honey_id, :dewer_id], unique: true
  end
end
