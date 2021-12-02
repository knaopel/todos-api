class Author < ApplicationRecord
  # model association
  has_many :courses, dependent: :destroy
end
