require 'rails_helper'

RSpec.describe Honey, type: :model do
  # Association Test
  it { should belong_to(:honey) }
  it { should belong_to(:dewer) }
end
