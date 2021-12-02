class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :slug
      t.string :category
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end
  end
end
