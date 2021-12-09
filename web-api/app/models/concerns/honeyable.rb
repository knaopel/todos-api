module Honeyable
  extend ActiveSupport::Concern

  included do
    has_many :honey_relationships, foreign_key: :dewer_id, class_name: 'Honey'
    has_many :honeys, through: :honey_relationships, source: :honey

    has_many :dewer_relationships, foreign_key: :honey_id, class_name: 'Honey'
    has_many :dewers, through: :dewer_relationships, source: :dewer
  end

  def add_honey(user_id)
    honey_relationships.create(honey_id: user_id)
  end

  def unhoney(user_id)
    honey_relationships.find_by(honey_id: user_id).destroy
  end

  def is_honey?(user_id)
    relationship = Honey.find_by(dewer_id: id, honey_id: user_id)
    return true if relationship
  end

  def add_dewer(user_id)
    dewer_relationships.create(dewer_id: user_id)
  end

  def undewer(user_id)
    dewer_relationships.find_by(dewer_id: user_id).destroy
  end

  def is_dewer?(user_id)
    relationship = Honey.find_by(honey_id: id, dewer_id: user_id)
    return true if relationship
  end
end