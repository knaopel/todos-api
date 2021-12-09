class AddCompletedToTodos < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :is_completed, :boolean, null: false, default: false
  end
end
