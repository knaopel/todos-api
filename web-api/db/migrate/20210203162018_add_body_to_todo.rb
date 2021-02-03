class AddBodyToTodo < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :body, :text, after: :created_by
  end
end
