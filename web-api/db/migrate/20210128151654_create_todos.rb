class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text   :body
      t.integer :created_by

      t.timestamps
    end
  end
end
