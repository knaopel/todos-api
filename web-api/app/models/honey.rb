class Honey < ApplicationRecord
  belongs_to :honey, class_name: 'User', foreign_key: 'honey_id',
    counter_cache: :dewers_count,
    inverse_of: :dewer_relationships
  belongs_to :dewer, class_name: 'User', foreign_key: 'dewer_id',
    counter_cache: :honeys_count,
    inverse_of: :honey_relationships
end
