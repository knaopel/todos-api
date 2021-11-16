class AddHoneyCountersToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :honeys_count, :integer, null: false, default: 0
    add_column :users, :dewers_count, :integer, null: false, default: 0
  end
end
