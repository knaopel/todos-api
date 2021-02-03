class TodoSerializer < ActiveModel::Serializer
  # Attributes to be serialized
  attributes :id, :title, :body, :created_by, :created_at, :updated_at
  # model association
  has_many :items
end
